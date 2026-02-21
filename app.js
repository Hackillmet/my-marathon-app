let tg = window.Telegram.WebApp;
tg.expand();

// ========== КЛЮЧИ ДЛЯ ХРАНЕНИЯ ==========
const STORAGE_KEYS = {
    CURRENT_DAY: 'current_day',
    DAY_COMPLETED_TIME: 'day_completed_time',
    DAY_START_TIME: 'day_start_time',
    COMPLETED_STEPS: 'completed_steps',
    WORKOUT_HISTORY: 'workout_history',
    TOTAL_DISTANCE: 'total_distance',
    TOTAL_WORKOUTS: 'total_workouts',
    DIARY_ENTRIES: 'diary_entries',
    THEME: 'theme'
};

// ========== ТРЕНИРОВКИ ==========
const WORKOUTS = [
    {
        name: "🔥 День 1: Легкий старт",
        difficulty: "easy",
        steps: [
            { text: "🏋️ Разминка 10 минут", distance: 0 },
            { text: "🏃 Бег 15 минут в легком темпе", distance: 2.0 },
            { text: "🦵 Спец беговые: махи ногами", distance: 0 },
            { text: "⚡ Ускорение 4х200 метров", distance: 0.8 }
        ],
        totalDistance: 2.8
    },
    {
        name: "⚡ День 2: Интервалы",
        difficulty: "medium",
        steps: [
            { text: "🏋️ Разминка 15 минут", distance: 0 },
            { text: "🏃 Бег 20 минут", distance: 3.0 },
            { text: "🦵 Спец беговые: прыжки", distance: 0 },
            { text: "⚡ Ускорение 6х200 метров", distance: 1.2 }
        ],
        totalDistance: 4.2
    },
    {
        name: "🏔️ День 3: Силовая",
        difficulty: "hard",
        steps: [
            { text: "🏋️ Разминка 20 минут", distance: 0 },
            { text: "🏃 Бег 25 минут", distance: 4.0 },
            { text: "🦵 Спец беговые: многоскоки", distance: 0 },
            { text: "⚡ Ускорение 8х200 метров", distance: 1.6 }
        ],
        totalDistance: 5.6
    },
    {
        name: "🌅 День 4: Восстановление",
        difficulty: "easy",
        steps: [
            { text: "🏋️ Разминка 10 минут", distance: 0 },
            { text: "🏃 Бег 15 минут легкий", distance: 2.0 },
            { text: "🦵 Спец беговые: растяжка", distance: 0 },
            { text: "⚡ Ускорение 4х100 метров", distance: 0.4 }
        ],
        totalDistance: 2.4
    },
    {
        name: "🔥 День 5: Скорость",
        difficulty: "hard",
        steps: [
            { text: "🏋️ Разминка 15 минут", distance: 0 },
            { text: "🏃 Бег 20 минут", distance: 3.0 },
            { text: "🦵 Спец беговые: семенящий", distance: 0 },
            { text: "⚡ Ускорение 10х100 метров", distance: 1.0 }
        ],
        totalDistance: 4.0
    },
    {
        name: "🏃‍♂️ День 6: Кросс",
        difficulty: "medium",
        steps: [
            { text: "🏋️ Разминка 15 минут", distance: 0 },
            { text: "🏃 Бег 30 минут по пересеченной", distance: 4.5 },
            { text: "🦵 Спец беговые: приставные", distance: 0 },
            { text: "⚡ Ускорение 5х300 метров", distance: 1.5 }
        ],
        totalDistance: 6.0
    },
    {
        name: "⚡ День 7: Пирамида",
        difficulty: "hard",
        steps: [
            { text: "🏋️ Разминка 15 минут", distance: 0 },
            { text: "🏃 Бег 20 минут", distance: 3.0 },
            { text: "🦵 Спец беговые: бег с высоким", distance: 0 },
            { text: "⚡ Пирамида: 200-400-600-400-200", distance: 1.8 }
        ],
        totalDistance: 4.8
    },
    {
        name: "🌅 День 8: Техника",
        difficulty: "easy",
        steps: [
            { text: "🏋️ Разминка 20 минут", distance: 0 },
            { text: "🏃 Бег 15 минут с ускорениями", distance: 2.5 },
            { text: "🦵 Спец беговые: все виды", distance: 0 },
            { text: "⚡ Ускорение 8х100 метров", distance: 0.8 }
        ],
        totalDistance: 3.3
    },
    {
        name: "🏔️ День 9: Длинная",
        difficulty: "hard",
        steps: [
            { text: "🏋️ Разминка 15 минут", distance: 0 },
            { text: "🏃 Бег 40 минут", distance: 6.0 },
            { text: "🦵 Спец беговые: прыжки", distance: 0 },
            { text: "⚡ Ускорение 6х300 метров", distance: 1.8 }
        ],
        totalDistance: 7.8
    },
    {
        name: "🔥 День 10: Спринт",
        difficulty: "medium",
        steps: [
            { text: "🏋️ Разминка 20 минут", distance: 0 },
            { text: "🏃 Бег 15 минут", distance: 2.5 },
            { text: "🦵 Спец беговые: ускорения", distance: 0 },
            { text: "⚡ 12х100 метров", distance: 1.2 }
        ],
        totalDistance: 3.7
    }
];

// ========== СОСТОЯНИЕ ==========
let currentDay = parseInt(localStorage.getItem(STORAGE_KEYS.CURRENT_DAY)) || 1;
let dayStarted = false;
let dayStartTime = localStorage.getItem(STORAGE_KEYS.DAY_START_TIME);
let dayCompletedTime = localStorage.getItem(STORAGE_KEYS.DAY_COMPLETED_TIME);
let completedSteps = JSON.parse(localStorage.getItem(STORAGE_KEYS.COMPLETED_STEPS)) || [false, false, false, false];

// Статистика
let workoutHistory = JSON.parse(localStorage.getItem(STORAGE_KEYS.WORKOUT_HISTORY)) || [];
let totalDistance = parseFloat(localStorage.getItem(STORAGE_KEYS.TOTAL_DISTANCE)) || 0;
let totalWorkouts = parseInt(localStorage.getItem(STORAGE_KEYS.TOTAL_WORKOUTS)) || 0;

// Дневник
let diaryEntries = JSON.parse(localStorage.getItem(STORAGE_KEYS.DIARY_ENTRIES)) || [];

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

// ========== СОХРАНЕНИЕ ==========
function saveState() {
    localStorage.setItem(STORAGE_KEYS.CURRENT_DAY, currentDay);
    localStorage.setItem(STORAGE_KEYS.DAY_START_TIME, dayStartTime);
    localStorage.setItem(STORAGE_KEYS.DAY_COMPLETED_TIME, dayCompletedTime);
    localStorage.setItem(STORAGE_KEYS.COMPLETED_STEPS, JSON.stringify(completedSteps));
    localStorage.setItem(STORAGE_KEYS.WORKOUT_HISTORY, JSON.stringify(workoutHistory));
    localStorage.setItem(STORAGE_KEYS.TOTAL_DISTANCE, totalDistance);
    localStorage.setItem(STORAGE_KEYS.TOTAL_WORKOUTS, totalWorkouts);
    localStorage.setItem(STORAGE_KEYS.DIARY_ENTRIES, JSON.stringify(diaryEntries));
}

// ========== СТАТИСТИКА ==========
function updateStats() {
    // Общая статистика
    document.getElementById('total-workouts').textContent = totalWorkouts;
    document.getElementById('total-distance').textContent = totalDistance.toFixed(1);
    
    // Средняя дистанция
    const avgDistance = totalWorkouts > 0 ? (totalDistance / totalWorkouts).toFixed(1) : 0;
    document.getElementById('avg-distance').textContent = avgDistance;
    
    // Лучшая дистанция
    const bestDistance = workoutHistory.length > 0 
        ? Math.max(...workoutHistory.map(w => w.distance)).toFixed(1)
        : 0;
    document.getElementById('best-distance').textContent = bestDistance;
    
    // Прогресс (дни)
    document.getElementById('week-current').textContent = currentDay - 1;
    document.getElementById('week-goal').textContent = '30';
    const weekProgress = ((currentDay - 1) / 30) * 100;
    document.getElementById('week-progress').style.width = `${weekProgress}%`;
    
    // История тренировок
    const historyList = document.getElementById('history-list');
    if (historyList) {
        historyList.innerHTML = '';
        
        if (workoutHistory.length === 0) {
            historyList.innerHTML = '<div class="empty-history">Пока нет тренировок</div>';
        } else {
            // Показываем последние 10 тренировок
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
                    <span class="history-workout">День ${workout.day}</span>
                    <span class="history-stats">${workout.distance} км</span>
                `;
                historyList.appendChild(item);
            });
        }
    }
}

// ========== ОБНОВЛЕНИЕ ИНТЕРФЕЙСА ==========
function updateUI() {
    console.log('Обновление UI', { currentDay, dayStarted, dayCompletedTime });
    
    // Обновляем номер дня
    document.getElementById('start-day-number').textContent = currentDay;
    document.getElementById('current-day').textContent = currentDay;
    
    // Проверяем, не истек ли день (если начат)
    if (dayStarted && dayStartTime) {
        const now = Date.now();
        const start = parseInt(dayStartTime);
        const hoursPassed = (now - start) / (1000 * 60 * 60);
        
        if (hoursPassed >= 24) {
            // День истек
            dayStarted = false;
            dayStartTime = null;
            dayCompletedTime = now.toString();
            completedSteps = [false, false, false, false];
            saveState();
            tg.showAlert('⏰ Время тренировки истекло! Новый день начнется через 24 часа.');
        }
    }
    
    // Обновляем стартовый экран
    const startScreen = document.getElementById('start-screen');
    const marathonScreen = document.getElementById('marathon-screen');
    const congratsScreen = document.getElementById('congrats');
    
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
        
        timeInfo.textContent = `⏳ Следующий день через ${remaining.hours}ч ${remaining.minutes}м`;
        timeInfo.style.color = 'var(--warning)';
        startBtn.disabled = true;
    } else {
        startScreen.style.display = 'block';
        marathonScreen.style.display = 'none';
        congratsScreen.style.display = 'none';
        
        const timeInfo = document.getElementById('time-info');
        const startBtn = document.getElementById('start-day-btn');
        
        if (!canStartDay()) {
            timeInfo.textContent = '⏰ Жди 4 утра';
            timeInfo.style.color = 'var(--warning)';
            startBtn.disabled = true;
        } else {
            timeInfo.textContent = '✅ Можно начинать';
            timeInfo.style.color = 'var(--success)';
            startBtn.disabled = false;
        }
    }
}

function renderWorkout() {
    // Получаем тренировку для текущего дня
    const workoutIndex = (currentDay - 1) % WORKOUTS.length;
    const workout = WORKOUTS[workoutIndex];
    
    document.getElementById('workout-name').textContent = workout.name;
    
    // Сложность
    const difficultyEl = document.getElementById('workout-difficulty');
    difficultyEl.textContent = 
        workout.difficulty === 'easy' ? 'Легкая' :
        workout.difficulty === 'medium' ? 'Средняя' : 'Сложная';
    difficultyEl.className = `workout-difficulty difficulty-${workout.difficulty}`;
    
    // Отрисовываем шаги
    const stepsContainer = document.getElementById('workout-steps');
    stepsContainer.innerHTML = '';
    
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
    
    // Добавляем обработчики
    document.querySelectorAll('.workout-checkbox').forEach(cb => {
        cb.addEventListener('change', function() {
            const index = parseInt(this.dataset.index);
            completedSteps[index] = this.checked;
            saveState();
            updateProgress();
            
            // Визуальное обновление
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
    const progress = (completed / total) * 100;
    
    document.getElementById('workout-fill').style.width = progress + '%';
    document.getElementById('workout-percent').textContent = Math.round(progress) + '%';
    
    const allCompleted = completed === total;
    const completeBtn = document.getElementById('complete-day-btn');
    
    if (allCompleted && canCompleteDay()) {
        completeBtn.disabled = false;
    } else {
        completeBtn.disabled = true;
    }
}

function updateDeadlineInfo() {
    const deadlineInfo = document.getElementById('deadline-info');
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

// ========== ОБРАБОТЧИКИ ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('Страница загружена');
    
    // Инициализация
    updateUI();
    updateStats();
    
    // ===== КНОПКА "НАЧАТЬ БЕГ" =====
    const startBtn = document.getElementById('start-day-btn');
    if (startBtn) {
        startBtn.addEventListener('click', function() {
            console.log('Начать день');
            
            // Проверяем, можно ли начать новый день
            if (dayCompletedTime && !canStartNewDay()) {
                const remaining = getTimeRemaining();
                tg.showAlert(`⏳ Подожди ${remaining.hours}ч ${remaining.minutes}м`);
                return;
            }
            
            // Проверяем время
            if (!canStartDay()) {
                tg.showAlert('⏰ Новый день можно начать только с 4 утра!');
                return;
            }
            
            // Запускаем день
            dayStarted = true;
            dayStartTime = Date.now().toString();
            dayCompletedTime = null;
            completedSteps = [false, false, false, false];
            saveState();
            updateUI();
        });
    }
    
    // ===== КНОПКА "ЗАВЕРШИТЬ ДЕНЬ" =====
    const completeBtn = document.getElementById('complete-day-btn');
    if (completeBtn) {
        completeBtn.addEventListener('click', function() {
            console.log('Завершить день');
            
            // Проверяем время
            if (!canCompleteDay()) {
                tg.showAlert('⏰ Завершить день можно только до 23:00!');
                return;
            }
            
            // Проверяем, все ли шаги выполнены
            if (!completedSteps.every(v => v)) {
                tg.showAlert('⚠️ Сначала выполни все шаги тренировки!');
                return;
            }
            
            // Получаем тренировку и считаем дистанцию
            const workoutIndex = (currentDay - 1) % WORKOUTS.length;
            const workout = WORKOUTS[workoutIndex];
            
            // Считаем реальную дистанцию (только беговые шаги)
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
                workoutName: workout.name
            });
            
            // Обновляем общую статистику
            totalDistance += actualDistance;
            totalWorkouts++;
            
            // Показываем экран завершения
            document.getElementById('marathon-screen').style.display = 'none';
            document.getElementById('congrats').style.display = 'block';
            document.getElementById('final-distance').textContent = actualDistance.toFixed(1);
            
            // Завершаем день
            dayStarted = false;
            dayCompletedTime = Date.now().toString();
            dayStartTime = null;
            currentDay++;
            completedSteps = [false, false, false, false];
            saveState();
            
            // Обновляем статистику
            updateStats();
        });
    }
    
    // ===== КНОПКА "НА ГЛАВНУЮ" =====
    const continueBtn = document.getElementById('continue-btn');
    if (continueBtn) {
        continueBtn.addEventListener('click', function() {
            console.log('На главную');
            document.getElementById('congrats').style.display = 'none';
            updateUI();
        });
    }
    
    // ===== МЕНЮ =====
    const menuBtn = document.getElementById('menu-btn');
    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            const menu = document.getElementById('menu-dropdown');
            if (menu.style.display === 'none') {
                menu.style.display = 'block';
                menuBtn.classList.add('active');
            } else {
                menu.style.display = 'none';
                menuBtn.classList.remove('active');
            }
        });
    }
    
    // Закрытие меню при клике вне
    document.addEventListener('click', function(e) {
        const menu = document.getElementById('menu-dropdown');
        const btn = document.getElementById('menu-btn');
        if (btn && menu && !btn.contains(e.target) && !menu.contains(e.target)) {
            menu.style.display = 'none';
            btn.classList.remove('active');
        }
    });
    
    // ===== ПУНКТЫ МЕНЮ =====
    document.getElementById('reset-marathon')?.addEventListener('click', function(e) {
        e.preventDefault();
        if (confirm('Сбросить весь марафон? Весь прогресс будет потерян.')) {
            currentDay = 1;
            dayStarted = false;
            dayStartTime = null;
            dayCompletedTime = null;
            completedSteps = [false, false, false, false];
            workoutHistory = [];
            totalDistance = 0;
            totalWorkouts = 0;
            diaryEntries = [];
            localStorage.clear();
            updateUI();
            updateStats();
            renderDiary();
            document.getElementById('menu-dropdown').style.display = 'none';
            document.getElementById('menu-btn').classList.remove('active');
        }
    });
    
    document.getElementById('stats-menu')?.addEventListener('click', function(e) {
        e.preventDefault();
        switchPage(1);
        updateStats();
        document.getElementById('menu-dropdown').style.display = 'none';
        document.getElementById('menu-btn').classList.remove('active');
    });
    
    document.getElementById('support')?.addEventListener('click', function(e) {
        e.preventDefault();
        tg.showAlert('💬 Поддержка: @frontendchikk');
        document.getElementById('menu-dropdown').style.display = 'none';
        document.getElementById('menu-btn').classList.remove('active');
    });
    
    document.getElementById('telegram-support')?.addEventListener('click', function(e) {
        e.preventDefault();
        tg.openTelegramLink('https://t.me/frontendchikk');
        document.getElementById('menu-dropdown').style.display = 'none';
        document.getElementById('menu-btn').classList.remove('active');
    });
    
    document.getElementById('faq')?.addEventListener('click', function(e) {
        e.preventDefault();
        tg.showAlert('❓ FAQ:\n\n• Начать день можно с 4 утра\n• Завершить день до 23:00\n• После завершения - 24ч таймер\n• Каждый день новая тренировка\n• Статистика сохраняется');
        document.getElementById('menu-dropdown').style.display = 'none';
        document.getElementById('menu-btn').classList.remove('active');
    });
    
    // ===== ДНЕВНИК =====
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
    
    document.getElementById('add-entry-btn')?.addEventListener('click', function() {
        document.getElementById('add-entry-form').style.display = 'block';
        document.getElementById('add-entry-btn').style.display = 'none';
    });
    
    document.getElementById('save-entry-btn')?.addEventListener('click', function() {
        const text = document.getElementById('entry-text').value.trim();
        if (text) {
            diaryEntries.push({
                id: Date.now(),
                text: text,
                date: new Date().toISOString()
            });
            localStorage.setItem(STORAGE_KEYS.DIARY_ENTRIES, JSON.stringify(diaryEntries));
            renderDiary();
            
            document.getElementById('entry-text').value = '';
            document.getElementById('add-entry-form').style.display = 'none';
            document.getElementById('add-entry-btn').style.display = 'flex';
        }
    });
    
    document.getElementById('cancel-entry-btn')?.addEventListener('click', function() {
        document.getElementById('entry-text').value = '';
        document.getElementById('add-entry-form').style.display = 'none';
        document.getElementById('add-entry-btn').style.display = 'flex';
    });
    
    renderDiary();
    
    // ===== НАВИГАЦИЯ =====
    window.switchPage = function(pageIndex) {
        const slides = document.querySelectorAll('.slide');
        const navButtons = document.querySelectorAll('.nav-btn');
        const container = document.getElementById('slidesContainer');
        
        container.scrollTo({
            left: pageIndex * container.clientWidth,
            behavior: 'smooth'
        });
        
        navButtons.forEach((btn, index) => {
            btn.classList.toggle('active', index === pageIndex);
        });
        
        if (pageIndex === 1) updateStats();
        if (pageIndex === 2) renderDiary();
    };
    
    // ===== ТЕМЫ =====
    window.setTheme = function(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(STORAGE_KEYS.THEME, theme);
        
        document.getElementById('theme-dark')?.classList.toggle('active', theme === 'dark');
        document.getElementById('theme-light')?.classList.toggle('active', theme === 'light');
    };
    
    // Загружаем сохраненную тему
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) || 'dark';
    setTheme(savedTheme);
    
    // ===== ДАТА =====
    function updateDate() {
        const now = new Date();
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        document.getElementById('current-date').textContent = now.toLocaleDateString('ru-RU', options);
    }
    updateDate();
    
    // Обновление каждую минуту
    setInterval(function() {
        if (dayStarted) {
            updateDeadlineInfo();
        } else {
            updateUI();
        }
        updateDate();
    }, 60000);
    
    tg.ready();
});
