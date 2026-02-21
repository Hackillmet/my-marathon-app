let tg = window.Telegram.WebApp;
tg.expand();

// ========== КЛЮЧИ ДЛЯ ХРАНЕНИЯ ==========
const STORAGE_KEYS = {
    CURRENT_DAY: 'current_day',
    DAY_STARTED: 'day_started',
    DAY_START_TIME: 'day_start_time',
    DAY_COMPLETED_TIME: 'day_completed_time',
    COMPLETED_STEPS: 'completed_steps',
    WORKOUT_HISTORY: 'workout_history',
    CUSTOM_WORKOUTS: 'custom_workouts',
    ACTIVE_CUSTOM_WORKOUT: 'active_custom_workout',
    TOTAL_DISTANCE: 'total_distance',
    TOTAL_WORKOUTS: 'total_workouts',
    DIARY_ENTRIES: 'diary_entries',
    THEME: 'theme'
};

// ========== БАЗОВЫЕ ТРЕНИРОВКИ (30 ДНЕЙ) ==========
const BASE_WORKOUTS = {
    1: {
        name: "🔥 День 1: Легкий старт",
        difficulty: "easy",
        steps: [
            { id: 1, text: "🏋️ Разминка 10 минут", distance: 0 },
            { id: 2, text: "🏃 Бег 15 минут в легком темпе", distance: 2.0 },
            { id: 3, text: "🦵 Спец беговые: махи ногами", distance: 0 },
            { id: 4, text: "⚡ Ускорение 4х200 метров", distance: 0.8 }
        ],
        totalDistance: 2.8
    },
    2: {
        name: "⚡ День 2: Интервалы",
        difficulty: "medium",
        steps: [
            { id: 1, text: "🏋️ Разминка 15 минут", distance: 0 },
            { id: 2, text: "🏃 Бег 20 минут", distance: 3.0 },
            { id: 3, text: "🦵 Спец беговые: прыжки", distance: 0 },
            { id: 4, text: "⚡ Ускорение 6х200 метров", distance: 1.2 }
        ],
        totalDistance: 4.2
    },
    3: {
        name: "🏔️ День 3: Силовая",
        difficulty: "hard",
        steps: [
            { id: 1, text: "🏋️ Разминка 20 минут", distance: 0 },
            { id: 2, text: "🏃 Бег 25 минут", distance: 4.0 },
            { id: 3, text: "🦵 Спец беговые: многоскоки", distance: 0 },
            { id: 4, text: "⚡ Ускорение 8х200 метров", distance: 1.6 }
        ],
        totalDistance: 5.6
    },
    4: {
        name: "🌅 День 4: Восстановление",
        difficulty: "easy",
        steps: [
            { id: 1, text: "🏋️ Разминка 10 минут", distance: 0 },
            { id: 2, text: "🏃 Бег 15 минут легкий", distance: 2.0 },
            { id: 3, text: "🦵 Спец беговые: растяжка", distance: 0 },
            { id: 4, text: "⚡ Ускорение 4х100 метров", distance: 0.4 }
        ],
        totalDistance: 2.4
    },
    5: {
        name: "🔥 День 5: Скорость",
        difficulty: "hard",
        steps: [
            { id: 1, text: "🏋️ Разминка 15 минут", distance: 0 },
            { id: 2, text: "🏃 Бег 20 минут", distance: 3.0 },
            { id: 3, text: "🦵 Спец беговые: семенящий", distance: 0 },
            { id: 4, text: "⚡ Ускорение 10х100 метров", distance: 1.0 }
        ],
        totalDistance: 4.0
    }
};

// Добавляем тренировки с 6 по 30
for (let i = 6; i <= 30; i++) {
    const sourceDay = ((i - 1) % 5) + 1;
    BASE_WORKOUTS[i] = {
        ...BASE_WORKOUTS[sourceDay],
        name: BASE_WORKOUTS[sourceDay].name.replace(`День ${sourceDay}`, `День ${i}`),
        steps: BASE_WORKOUTS[sourceDay].steps.map(step => ({
            ...step,
            id: step.id + (i * 10)
        }))
    };
}

// ========== СОСТОЯНИЕ ==========
let currentDay = parseInt(localStorage.getItem(STORAGE_KEYS.CURRENT_DAY)) || 1;
let dayStarted = localStorage.getItem(STORAGE_KEYS.DAY_STARTED) === 'true' || false;
let dayStartTime = localStorage.getItem(STORAGE_KEYS.DAY_START_TIME);
let dayCompletedTime = localStorage.getItem(STORAGE_KEYS.DAY_COMPLETED_TIME);
let completedSteps = JSON.parse(localStorage.getItem(STORAGE_KEYS.COMPLETED_STEPS)) || [];

// Статистика
let workoutHistory = JSON.parse(localStorage.getItem(STORAGE_KEYS.WORKOUT_HISTORY)) || [];
let customWorkouts = JSON.parse(localStorage.getItem(STORAGE_KEYS.CUSTOM_WORKOUTS)) || [];
let activeCustomWorkout = JSON.parse(localStorage.getItem(STORAGE_KEYS.ACTIVE_CUSTOM_WORKOUT)) || null;
let totalDistance = parseFloat(localStorage.getItem(STORAGE_KEYS.TOTAL_DISTANCE)) || 0;
let totalWorkouts = parseInt(localStorage.getItem(STORAGE_KEYS.TOTAL_WORKOUTS)) || 0;

// Дневник
let diaryEntries = JSON.parse(localStorage.getItem(STORAGE_KEYS.DIARY_ENTRIES)) || [];

// Текущие данные для создания тренировки
let currentCustomTasks = [];

// ========== ФУНКЦИИ ВРЕМЕНИ ==========
function getCurrentHour() {
    return new Date().getHours();
}

function canStartDay() {
    const hour = getCurrentHour();
    return hour >= 4 && hour < 23;
}

function canCompleteDay() {
    const hour = getCurrentHour();
    return hour < 23;
}

function canStartNewDay() {
    if (!dayCompletedTime) return true;
    
    const now = Date.now();
    const completed = parseInt(dayCompletedTime);
    const hoursPassed = (now - completed) / (1000 * 60 * 60);
    
    return hoursPassed >= 24;
}

function getTimeRemaining() {
    if (!dayCompletedTime) return null;
    
    const now = Date.now();
    const completed = parseInt(dayCompletedTime);
    const hoursPassed = (now - completed) / (1000 * 60 * 60);
    
    if (hoursPassed >= 24) return null;
    
    const remaining = 24 - hoursPassed;
    const hours = Math.floor(remaining);
    const minutes = Math.ceil((remaining - hours) * 60);
    
    return { hours, minutes };
}

function isDayExpired() {
    if (!dayStartTime) return false;
    const now = Date.now();
    const start = parseInt(dayStartTime);
    return (now - start) / (1000 * 60 * 60) >= 24;
}

// ========== СОХРАНЕНИЕ ==========
function saveState() {
    localStorage.setItem(STORAGE_KEYS.CURRENT_DAY, currentDay);
    localStorage.setItem(STORAGE_KEYS.DAY_STARTED, dayStarted);
    localStorage.setItem(STORAGE_KEYS.DAY_START_TIME, dayStartTime || '');
    localStorage.setItem(STORAGE_KEYS.DAY_COMPLETED_TIME, dayCompletedTime || '');
    localStorage.setItem(STORAGE_KEYS.COMPLETED_STEPS, JSON.stringify(completedSteps));
    localStorage.setItem(STORAGE_KEYS.WORKOUT_HISTORY, JSON.stringify(workoutHistory));
    localStorage.setItem(STORAGE_KEYS.CUSTOM_WORKOUTS, JSON.stringify(customWorkouts));
    localStorage.setItem(STORAGE_KEYS.ACTIVE_CUSTOM_WORKOUT, JSON.stringify(activeCustomWorkout));
    localStorage.setItem(STORAGE_KEYS.TOTAL_DISTANCE, totalDistance);
    localStorage.setItem(STORAGE_KEYS.TOTAL_WORKOUTS, totalWorkouts);
}

// ========== СТАТИСТИКА ==========
function updateStats() {
    const totalWorkoutsEl = document.getElementById('total-workouts');
    const totalDistanceEl = document.getElementById('total-distance');
    const avgDistanceEl = document.getElementById('avg-distance');
    const bestDistanceEl = document.getElementById('best-distance');
    const weekCurrentEl = document.getElementById('week-current');
    const weekProgressEl = document.getElementById('week-progress');
    
    if (totalWorkoutsEl) totalWorkoutsEl.textContent = totalWorkouts;
    if (totalDistanceEl) totalDistanceEl.textContent = totalDistance.toFixed(1);
    
    const avgDistance = totalWorkouts > 0 ? (totalDistance / totalWorkouts).toFixed(1) : 0;
    if (avgDistanceEl) avgDistanceEl.textContent = avgDistance;
    
    const bestDistance = workoutHistory.length > 0 
        ? Math.max(...workoutHistory.map(w => w.distance)).toFixed(1)
        : 0;
    if (bestDistanceEl) bestDistanceEl.textContent = bestDistance;
    
    if (weekCurrentEl) weekCurrentEl.textContent = currentDay - 1;
    const weekProgress = ((currentDay - 1) / 30) * 100;
    if (weekProgressEl) weekProgressEl.style.width = `${weekProgress}%`;
    
    const historyList = document.getElementById('history-list');
    if (historyList) {
        historyList.innerHTML = '';
        
        if (workoutHistory.length === 0) {
            historyList.innerHTML = '<div class="empty-history">Пока нет тренировок</div>';
        } else {
            const recent = [...workoutHistory].reverse().slice(0, 10);
            recent.forEach(workout => {
                const date = new Date(workout.date);
                const formattedDate = date.toLocaleDateString('ru-RU', {
                    day: 'numeric',
                    month: 'short'
                });
                
                const item = document.createElement('div');
                item.className = 'history-item';
                item.innerHTML = `
                    <span class="history-date">${formattedDate}</span>
                    <span class="history-workout">${workout.name || `День ${workout.day}`}</span>
                    <span class="history-stats">${workout.distance} км</span>
                `;
                historyList.appendChild(item);
            });
        }
    }
}

// ========== ФУНКЦИИ ДЛЯ СОЗДАНИЯ ТРЕНИРОВКИ ==========
function renderCustomCreator() {
    const container = document.getElementById('custom-tasks-list');
    const createBtn = document.getElementById('create-plan-btn');
    const goalCard = document.querySelector('.goal-card');
    const tasksCreator = document.querySelector('.tasks-creator');
    
    if (!container) return;
    
    // Если есть активная тренировка, показываем её вместо формы создания
    if (activeCustomWorkout) {
        if (goalCard) goalCard.style.display = 'none';
        if (tasksCreator) tasksCreator.style.display = 'none';
        if (createBtn) createBtn.style.display = 'none';
        
        renderActiveCustomWorkout();
    } else {
        if (goalCard) goalCard.style.display = 'block';
        if (tasksCreator) tasksCreator.style.display = 'block';
        if (createBtn) createBtn.style.display = 'block';
        
        renderCustomTasks();
    }
}

function renderCustomTasks() {
    const container = document.getElementById('custom-tasks-list');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (currentCustomTasks.length === 0) {
        container.innerHTML = '<div class="empty-tasks">➕ Добавь задания для тренировки</div>';
        const createBtn = document.getElementById('create-plan-btn');
        if (createBtn) createBtn.disabled = true;
        return;
    }
    
    currentCustomTasks.forEach((task, index) => {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'custom-task-item';
        taskDiv.innerHTML = `
            <span class="custom-task-text">${task.text}</span>
            <span class="custom-task-distance">${task.distance > 0 ? '+' + task.distance + ' км' : 'разминка'}</span>
            <button class="custom-task-delete" data-index="${index}">✕</button>
        `;
        container.appendChild(taskDiv);
    });
    
    document.querySelectorAll('.custom-task-delete').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            currentCustomTasks.splice(index, 1);
            renderCustomTasks();
            updateCreateButtonState();
        });
    });
    
    updateCreateButtonState();
}

function renderActiveCustomWorkout() {
    const container = document.getElementById('custom-tasks-list');
    if (!container || !activeCustomWorkout) return;
    
    container.innerHTML = '';
    
    const workout = activeCustomWorkout;
    let completedCount = 0;
    
    workout.steps.forEach((step, index) => {
        if (step.completed) completedCount++;
        
        const stepDiv = document.createElement('div');
        stepDiv.className = `workout-step ${step.completed ? 'step-completed' : ''}`;
        stepDiv.innerHTML = `
            <input type="checkbox" class="workout-checkbox" data-index="${index}" ${step.completed ? 'checked' : ''}>
            <span class="step-text">${step.text}</span>
            ${step.distance > 0 ? `<span class="step-distance">+${step.distance} км</span>` : ''}
        `;
        container.appendChild(stepDiv);
    });
    
    // Добавляем прогресс-бар для активной тренировки
    const progressBar = document.createElement('div');
    progressBar.className = 'custom-workout-progress';
    const progress = (completedCount / workout.steps.length) * 100;
    progressBar.innerHTML = `
        <div class="progress-bar" style="margin: 20px 0;">
            <div class="progress-fill mind-fill" style="width: ${progress}%;"></div>
        </div>
        <div style="text-align: center; margin-bottom: 20px;">
            Прогресс: ${Math.round(progress)}%
        </div>
    `;
    container.appendChild(progressBar);
    
    // Кнопка завершения тренировки
    const completeBtn = document.createElement('button');
    completeBtn.className = 'complete-workout-btn';
    completeBtn.textContent = '✅ Завершить тренировку';
    completeBtn.disabled = completedCount !== workout.steps.length;
    completeBtn.addEventListener('click', completeCustomWorkout);
    container.appendChild(completeBtn);
    
    // Добавляем обработчики для чекбоксов
    document.querySelectorAll('#custom-tasks-list .workout-checkbox').forEach(cb => {
        cb.addEventListener('change', function() {
            const index = parseInt(this.dataset.index);
            activeCustomWorkout.steps[index].completed = this.checked;
            saveState();
            renderActiveCustomWorkout();
        });
    });
}

function updateCreateButtonState() {
    const goalInput = document.getElementById('goal-distance');
    const goal = parseFloat(goalInput?.value) || 0;
    const createBtn = document.getElementById('create-plan-btn');
    
    if (goal > 0 && currentCustomTasks.length > 0) {
        createBtn.disabled = false;
    } else {
        createBtn.disabled = true;
    }
}

function calculateTotalDistance() {
    return currentCustomTasks.reduce((sum, task) => sum + (task.distance || 0), 0);
}

function createCustomWorkout() {
    const goalInput = document.getElementById('goal-distance');
    const goal = parseFloat(goalInput.value);
    
    const total = calculateTotalDistance();
    
    if (Math.abs(total - goal) > 0.1) {
        tg.showPopup({
            title: '⚠️ Внимание',
            message: `Сумма дистанций заданий (${total.toFixed(1)} км) не совпадает с целью (${goal} км). Продолжить?`,
            buttons: [
                { id: 'continue', type: 'default', text: 'Да, создать' },
                { type: 'cancel', text: 'Отмена' }
            ]
        }, (buttonId) => {
            if (buttonId === 'continue') {
                saveCustomWorkout();
            }
        });
    } else {
        saveCustomWorkout();
    }
}

function saveCustomWorkout() {
    const goalInput = document.getElementById('goal-distance');
    const goal = parseFloat(goalInput.value);
    
    activeCustomWorkout = {
        id: Date.now(),
        day: currentDay,
        name: `🎯 Моя тренировка (День ${currentDay})`,
        steps: currentCustomTasks.map((task, index) => ({
            id: index + 1,
            text: task.text,
            completed: false,
            distance: task.distance
        })),
        totalDistance: goal,
        createdAt: new Date().toISOString()
    };
    
    tg.showPopup({
        title: '✅ Тренировка создана!',
        message: `Тренировка готова. Отмечай выполнение прямо здесь!`,
        buttons: [{ type: 'close' }]
    });
    
    // Очищаем форму
    currentCustomTasks = [];
    goalInput.value = 5;
    const taskText = document.getElementById('new-task-text');
    const taskDistance = document.getElementById('new-task-distance');
    if (taskText) taskText.value = '';
    if (taskDistance) taskDistance.value = 0;
    
    saveState();
    renderCustomCreator();
}

function completeCustomWorkout() {
    if (!activeCustomWorkout) return;
    
    // Проверяем, все ли шаги выполнены
    if (!activeCustomWorkout.steps.every(s => s.completed)) {
        tg.showAlert('⚠️ Сначала выполни все шаги!');
        return;
    }
    
    // Считаем дистанцию
    let actualDistance = 0;
    activeCustomWorkout.steps.forEach(step => {
        actualDistance += step.distance || 0;
    });
    
    // Сохраняем в историю
    workoutHistory.push({
        day: currentDay,
        distance: actualDistance,
        date: new Date().toISOString(),
        name: activeCustomWorkout.name
    });
    
    totalDistance += actualDistance;
    totalWorkouts++;
    
    // Очищаем активную тренировку
    activeCustomWorkout = null;
    
    saveState();
    updateStats();
    
    tg.showPopup({
        title: '🎉 Отлично!',
        message: `Тренировка завершена! Ты пробежал ${actualDistance.toFixed(1)} км.`,
        buttons: [{ type: 'close' }]
    });
    
    renderCustomCreator();
}

// ========== ПОЛУЧЕНИЕ ТРЕНИРОВКИ ДНЯ ==========
function getTodaysWorkout() {
    // Для главного слайда используем базовые тренировки
    return BASE_WORKOUTS[currentDay] || BASE_WORKOUTS[((currentDay - 1) % 30) + 1];
}

// ========== ОБНОВЛЕНИЕ ИНТЕРФЕЙСА БЕГА ==========
function updateUI() {
    const startDayNumber = document.getElementById('start-day-number');
    const currentDayEl = document.getElementById('current-day');
    if (startDayNumber) startDayNumber.textContent = currentDay;
    if (currentDayEl) currentDayEl.textContent = currentDay;
    
    if (dayStarted && dayStartTime) {
        const now = Date.now();
        const start = parseInt(dayStartTime);
        const hoursPassed = (now - start) / (1000 * 60 * 60);
        
        if (hoursPassed >= 24) {
            dayStarted = false;
            dayStartTime = null;
            dayCompletedTime = now.toString();
            completedSteps = [];
            saveState();
            tg.showAlert('⏰ Время тренировки истекло! Новый день начнется через 24 часа.');
        }
    }
    
    const startScreen = document.getElementById('start-screen');
    const marathonScreen = document.getElementById('marathon-screen');
    const congratsScreen = document.getElementById('congrats');
    
    if (!startScreen || !marathonScreen || !congratsScreen) return;
    
    if (dayStarted) {
        startScreen.style.display = 'none';
        marathonScreen.style.display = 'block';
        congratsScreen.style.display = 'none';
        renderWorkout();
        updateDeadlineInfo();
    } else if (dayCompletedTime && !canStartNewDay()) {
        startScreen.style.display = 'block';
        marathonScreen.style.display = 'none';
        congratsScreen.style.display = 'none';
        
        const remaining = getTimeRemaining();
        const timeInfo = document.getElementById('time-info');
        const startBtn = document.getElementById('start-day-btn');
        
        if (timeInfo && remaining) {
            timeInfo.textContent = `⏳ Следующий день через ${remaining.hours}ч ${remaining.minutes}м`;
            timeInfo.style.color = 'var(--warning)';
        }
        if (startBtn) startBtn.disabled = true;
    } else {
        startScreen.style.display = 'block';
        marathonScreen.style.display = 'none';
        congratsScreen.style.display = 'none';
        
        const timeInfo = document.getElementById('time-info');
        const startBtn = document.getElementById('start-day-btn');
        
        if (!canStartDay()) {
            if (timeInfo) {
                timeInfo.textContent = '⏰ Жди 4 утра';
                timeInfo.style.color = 'var(--warning)';
            }
            if (startBtn) startBtn.disabled = true;
        } else {
            if (timeInfo) {
                timeInfo.textContent = '✅ Можно начинать';
                timeInfo.style.color = 'var(--success)';
            }
            if (startBtn) startBtn.disabled = false;
        }
    }
}

function renderWorkout() {
    const workout = getTodaysWorkout();
    
    const workoutName = document.getElementById('workout-name');
    const workoutDifficulty = document.getElementById('workout-difficulty');
    
    if (workoutName) workoutName.textContent = workout.name;
    
    if (workoutDifficulty) {
        workoutDifficulty.textContent = 
            workout.difficulty === 'easy' ? 'Легкая' :
            workout.difficulty === 'medium' ? 'Средняя' : 'Сложная';
        workoutDifficulty.className = `workout-difficulty difficulty-${workout.difficulty}`;
    }
    
    const stepsContainer = document.getElementById('workout-steps');
    if (!stepsContainer) return;
    
    stepsContainer.innerHTML = '';
    
    // Инициализируем completedSteps, если нужно
    if (completedSteps.length !== workout.steps.length) {
        completedSteps = new Array(workout.steps.length).fill(false);
    }
    
    workout.steps.forEach((step, index) => {
        const stepDiv = document.createElement('div');
        stepDiv.className = `workout-step ${completedSteps[index] ? 'step-completed' : ''}`;
        stepDiv.innerHTML = `
            <input type="checkbox" class="workout-checkbox" data-index="${index}" ${completedSteps[index] ? 'checked' : ''}>
            <span class="step-text">${step.text}</span>
            ${step.distance > 0 ? `<span class="step-distance">+${step.distance} км</span>` : ''}
        `;
        stepsContainer.appendChild(stepDiv);
    });
    
    document.querySelectorAll('.workout-checkbox').forEach(cb => {
        cb.addEventListener('change', function() {
            const index = parseInt(this.dataset.index);
            completedSteps[index] = this.checked;
            saveState();
            updateProgress();
            
            const stepDiv = this.closest('.workout-step');
            if (this.checked) {
                stepDiv.classList.add('step-completed');
            } else {
                stepDiv.classList.remove('step-completed');
            }
        });
    });
    
    updateProgress();
}

function updateProgress() {
    const completed = completedSteps.filter(v => v).length;
    const total = completedSteps.length;
    const progress = total > 0 ? (completed / total) * 100 : 0;
    
    const workoutFill = document.getElementById('workout-fill');
    const workoutPercent = document.getElementById('workout-percent');
    const completeBtn = document.getElementById('complete-day-btn');
    
    if (workoutFill) workoutFill.style.width = progress + '%';
    if (workoutPercent) workoutPercent.textContent = Math.round(progress) + '%';
    
    const allCompleted = completed === total;
    
    if (allCompleted && canCompleteDay()) {
        if (completeBtn) completeBtn.disabled = false;
    } else {
        if (completeBtn) completeBtn.disabled = true;
    }
}

function updateDeadlineInfo() {
    const deadlineInfo = document.getElementById('deadline-info');
    if (!deadlineInfo) return;
    
    const hour = getCurrentHour();
    
    if (hour >= 23) {
        deadlineInfo.textContent = '⏰ День истек';
        deadlineInfo.style.color = 'var(--danger)';
    } else {
        const timeLeft = (22 - hour) * 60 + (60 - new Date().getMinutes());
        const hours = Math.floor(timeLeft / 60);
        const minutes = timeLeft % 60;
        deadlineInfo.textContent = `⏳ Осталось: ${hours}ч ${minutes}м`;
        deadlineInfo.style.color = 'var(--text-secondary)';
    }
}

// ========== ДНЕВНИК ==========
function renderDiary() {
    const entriesList = document.getElementById('entries-list');
    if (!entriesList) return;
    
    entriesList.innerHTML = '';
    
    if (diaryEntries.length === 0) {
        entriesList.innerHTML = '<div class="empty-entries">📝 Пока нет записей</div>';
        return;
    }
    
    [...diaryEntries].reverse().forEach(entry => {
        const entryDiv = document.createElement('div');
        entryDiv.className = 'entry-item';
        
        const date = new Date(entry.date);
        const formattedDate = date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
        
        entryDiv.innerHTML = `
            <div class="entry-header">
                <span class="entry-date">${formattedDate}</span>
                <button class="entry-delete" data-id="${entry.id}">✕</button>
            </div>
            <div class="entry-content">${entry.text}</div>
        `;
        entriesList.appendChild(entryDiv);
    });
    
    document.querySelectorAll('.entry-delete').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.dataset.id);
            diaryEntries = diaryEntries.filter(e => e.id !== id);
            localStorage.setItem(STORAGE_KEYS.DIARY_ENTRIES, JSON.stringify(diaryEntries));
            renderDiary();
        });
    });
}

// ========== ОБНОВЛЕНИЕ ДАТЫ ==========
function updateDate() {
    const now = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const dateEl = document.getElementById('current-date');
    if (dateEl) {
        dateEl.textContent = now.toLocaleDateString('ru-RU', options);
    }
}

// ========== НАВИГАЦИЯ ==========
window.switchPage = function(pageIndex) {
    const slides = document.querySelectorAll('.slide');
    const navButtons = document.querySelectorAll('.nav-btn');
    const container = document.getElementById('slidesContainer');
    
    if (!container || slides.length === 0) return;
    
    container.scrollTo({
        left: pageIndex * container.clientWidth,
        behavior: 'smooth'
    });
    
    navButtons.forEach((btn, index) => {
        btn.classList.toggle('active', index === pageIndex);
    });
    
    if (pageIndex === 1) updateStats();
    if (pageIndex === 2) {
        renderCustomCreator();
    }
    if (pageIndex === 3) renderDiary();
};

// ========== ТЕМЫ ==========
window.setTheme = function(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
    
    const themeDark = document.getElementById('theme-dark');
    const themeLight = document.getElementById('theme-light');
    
    if (themeDark) themeDark.classList.toggle('active', theme === 'dark');
    if (themeLight) themeLight.classList.toggle('active', theme === 'light');
};

window.setLanguage = function(lang) {
    console.log('Язык:', lang);
    // Здесь можно добавить логику перевода
};

// ========== ОБРАБОТЧИКИ ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('Страница загружена');
    
    // Загружаем сохраненную тему
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) || 'dark';
    setTheme(savedTheme);
    
    // Инициализация
    updateDate();
    updateStats();
    renderDiary();
    updateUI();
    
    // ===== КНОПКА "НАЧАТЬ БЕГ" =====
    const startBtn = document.getElementById('start-day-btn');
    if (startBtn) {
        startBtn.addEventListener('click', function() {
            console.log('Начать день');
            
            if (dayCompletedTime && !canStartNewDay()) {
                const remaining = getTimeRemaining();
                if (remaining) {
                    tg.showAlert(`⏳ Подожди ${remaining.hours}ч ${remaining.minutes}м`);
                }
                return;
            }
            
            if (!canStartDay()) {
                tg.showAlert('⏰ Новый день можно начать только с 4 утра!');
                return;
            }
            
            dayStarted = true;
            dayStartTime = Date.now().toString();
            dayCompletedTime = null;
            
            const workout = getTodaysWorkout();
            completedSteps = new Array(workout.steps.length).fill(false);
            
            saveState();
            updateUI();
        });
    }
    
    // ===== КНОПКА "ЗАВЕРШИТЬ ДЕНЬ" =====
    const completeBtn = document.getElementById('complete-day-btn');
    if (completeBtn) {
        completeBtn.addEventListener('click', function() {
            console.log('Завершить день');
            
            if (!canCompleteDay()) {
                tg.showAlert('⏰ Завершить день можно только до 23:00!');
                return;
            }
            
            if (!completedSteps.every(v => v)) {
                tg.showAlert('⚠️ Сначала выполни все шаги тренировки!');
                return;
            }
            
            const workout = getTodaysWorkout();
            let actualDistance = 0;
            
            workout.steps.forEach((step, index) => {
                if (completedSteps[index]) {
                    actualDistance += step.distance || 0;
                }
            });
            
            // Сохраняем в историю
            workoutHistory.push({
                day: currentDay,
                distance: actualDistance,
                date: new Date().toISOString(),
                name: workout.name
            });
            
            totalDistance += actualDistance;
            totalWorkouts++;
            
            const finalDistance = document.getElementById('final-distance');
            if (finalDistance) finalDistance.textContent = actualDistance.toFixed(1);
            
            const marathonScreen = document.getElementById('marathon-screen');
            const congratsScreen = document.getElementById('congrats');
            
            if (marathonScreen) marathonScreen.style.display = 'none';
            if (congratsScreen) congratsScreen.style.display = 'block';
            
            dayStarted = false;
            dayCompletedTime = Date.now().toString();
            dayStartTime = null;
            currentDay++;
            completedSteps = [];
            
            saveState();
            updateStats();
        });
    }
    
    // ===== КНОПКА "НА ГЛАВНУЮ" =====
    const continueBtn = document.getElementById('continue-btn');
    if (continueBtn) {
        continueBtn.addEventListener('click', function() {
            const congratsScreen = document.getElementById('congrats');
            if (congratsScreen) congratsScreen.style.display = 'none';
            updateUI();
        });
    }
    
    // ===== СОЗДАНИЕ ТРЕНИРОВКИ =====
    const addTaskBtn = document.getElementById('add-task-btn');
    if (addTaskBtn) {
        console.log('Кнопка добавления задания найдена');
        addTaskBtn.addEventListener('click', function() {
            console.log('Добавление задания');
            const taskText = document.getElementById('new-task-text')?.value.trim();
            const taskDistance = parseFloat(document.getElementById('new-task-distance')?.value) || 0;
            
            if (!taskText) {
                tg.showAlert('Введите название задания');
                return;
            }
            
            currentCustomTasks.push({
                text: taskText,
                distance: taskDistance
            });
            
            const taskTextInput = document.getElementById('new-task-text');
            const taskDistanceInput = document.getElementById('new-task-distance');
            if (taskTextInput) taskTextInput.value = '';
            if (taskDistanceInput) taskDistanceInput.value = 0;
            renderCustomTasks();
        });
    }
    
    const goalInput = document.getElementById('goal-distance');
    if (goalInput) {
        goalInput.addEventListener('input', updateCreateButtonState);
    }
    
    const createPlanBtn = document.getElementById('create-plan-btn');
    if (createPlanBtn) {
        console.log('Кнопка создания плана найдена');
        createPlanBtn.addEventListener('click', function() {
            console.log('Создание плана');
            createCustomWorkout();
        });
    }
    
    // ===== МЕНЮ =====
    const menuBtn = document.getElementById('menu-btn');
    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            const menu = document.getElementById('menu-dropdown');
            if (menu) {
                if (menu.style.display === 'none' || menu.style.display === '') {
                    menu.style.display = 'block';
                    menuBtn.classList.add('active');
                } else {
                    menu.style.display = 'none';
                    menuBtn.classList.remove('active');
                }
            }
        });
    }
    
    document.addEventListener('click', function(e) {
        const menu = document.getElementById('menu-dropdown');
        const btn = document.getElementById('menu-btn');
        if (btn && menu && !btn.contains(e.target) && !menu.contains(e.target)) {
            menu.style.display = 'none';
            btn.classList.remove('active');
        }
    });
    
    // ===== ПУНКТЫ МЕНЮ =====
    const resetBtn = document.getElementById('reset-marathon');
    if (resetBtn) {
        resetBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('Сбросить весь марафон? Весь прогресс будет потерян.')) {
                currentDay = 1;
                dayStarted = false;
                dayStartTime = null;
                dayCompletedTime = null;
                completedSteps = [];
                workoutHistory = [];
                customWorkouts = [];
                activeCustomWorkout = null;
                totalDistance = 0;
                totalWorkouts = 0;
                diaryEntries = [];
                localStorage.clear();
                updateUI();
                updateStats();
                renderDiary();
                renderCustomCreator();
                
                const menu = document.getElementById('menu-dropdown');
                const menuBtn = document.getElementById('menu-btn');
                if (menu) menu.style.display = 'none';
                if (menuBtn) menuBtn.classList.remove('active');
            }
        });
    }
    
    const statsMenu = document.getElementById('stats-menu');
    if (statsMenu) {
        statsMenu.addEventListener('click', function(e) {
            e.preventDefault();
            switchPage(1);
            const menu = document.getElementById('menu-dropdown');
            const menuBtn = document.getElementById('menu-btn');
            if (menu) menu.style.display = 'none';
            if (menuBtn) menuBtn.classList.remove('active');
        });
    }
    
    const supportBtn = document.getElementById('support');
    if (supportBtn) {
        supportBtn.addEventListener('click', function(e) {
            e.preventDefault();
            tg.showAlert('💬 Поддержка: @frontendchikk');
            const menu = document.getElementById('menu-dropdown');
            const menuBtn = document.getElementById('menu-btn');
            if (menu) menu.style.display = 'none';
            if (menuBtn) menuBtn.classList.remove('active');
        });
    }
    
    const telegramBtn = document.getElementById('telegram-support');
    if (telegramBtn) {
        telegramBtn.addEventListener('click', function(e) {
            e.preventDefault();
            tg.openTelegramLink('https://t.me/frontendchikk');
            const menu = document.getElementById('menu-dropdown');
            const menuBtn = document.getElementById('menu-btn');
            if (menu) menu.style.display = 'none';
            if (menuBtn) menuBtn.classList.remove('active');
        });
    }
    
    const faqBtn = document.getElementById('faq');
    if (faqBtn) {
        faqBtn.addEventListener('click', function(e) {
            e.preventDefault();
            tg.showAlert('❓ FAQ:\n\n• Начать день можно с 4 утра\n• Завершить день до 23:00\n• После завершения - 24ч таймер\n• Есть готовые тренировки на 30 дней\n• Можно создавать свои тренировки\n• Статистика сохраняется');
            const menu = document.getElementById('menu-dropdown');
            const menuBtn = document.getElementById('menu-btn');
            if (menu) menu.style.display = 'none';
            if (menuBtn) menuBtn.classList.remove('active');
        });
    }
    
    // ===== ДНЕВНИК =====
    const addEntryBtn = document.getElementById('add-entry-btn');
    if (addEntryBtn) {
        addEntryBtn.addEventListener('click', function() {
            const form = document.getElementById('add-entry-form');
            const btn = document.getElementById('add-entry-btn');
            if (form) form.style.display = 'block';
            if (btn) btn.style.display = 'none';
        });
    }
    
    const saveEntryBtn = document.getElementById('save-entry-btn');
    if (saveEntryBtn) {
        saveEntryBtn.addEventListener('click', function() {
            const text = document.getElementById('entry-text')?.value.trim();
            if (text) {
                diaryEntries.push({
                    id: Date.now(),
                    text: text,
                    date: new Date().toISOString()
                });
                localStorage.setItem(STORAGE_KEYS.DIARY_ENTRIES, JSON.stringify(diaryEntries));
                renderDiary();
                
                const textarea = document.getElementById('entry-text');
                const form = document.getElementById('add-entry-form');
                const btn = document.getElementById('add-entry-btn');
                
                if (textarea) textarea.value = '';
                if (form) form.style.display = 'none';
                if (btn) btn.style.display = 'flex';
            }
        });
    }
    
    const cancelEntryBtn = document.getElementById('cancel-entry-btn');
    if (cancelEntryBtn) {
        cancelEntryBtn.addEventListener('click', function() {
            const textarea = document.getElementById('entry-text');
            const form = document.getElementById('add-entry-form');
            const btn = document.getElementById('add-entry-btn');
            
            if (textarea) textarea.value = '';
            if (form) form.style.display = 'none';
            if (btn) btn.style.display = 'flex';
        });
    }
    
    // ===== СЛЕДИМ ЗА СКРОЛЛОМ =====
    const slidesContainer = document.getElementById('slidesContainer');
    if (slidesContainer) {
        slidesContainer.addEventListener('scroll', function(e) {
            const container = e.target;
            const pageIndex = Math.round(container.scrollLeft / container.clientWidth);
            const navButtons = document.querySelectorAll('.nav-btn');
            
            if (pageIndex >= 0 && pageIndex < navButtons.length) {
                navButtons.forEach((btn, index) => {
                    btn.classList.toggle('active', index === pageIndex);
                });
                
                if (pageIndex === 1) updateStats();
                if (pageIndex === 2) renderCustomCreator();
                if (pageIndex === 3) renderDiary();
            }
        });
    }
    
    // ===== ИНТЕРВАЛ ОБНОВЛЕНИЯ =====
    setInterval(function() {
        if (dayStarted) {
            updateProgress();
            updateDeadlineInfo();
        } else {
            updateUI();
        }
        updateDate();
    }, 60000);
    
    tg.ready();
});
