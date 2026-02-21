let tg = window.Telegram.WebApp;
tg.expand();

// ========== КЛЮЧИ ДЛЯ ХРАНЕНИЯ ==========
const STORAGE_KEYS = {
    CURRENT_DAY: 'current_day',
    DAY_COMPLETED_TIME: 'day_completed_time',
    DAY_START_TIME: 'day_start_time',
    COMPLETED_STEPS: 'completed_steps'
};

// ========== ТРЕНИРОВКИ ==========
const WORKOUTS = [
    {
        name: "🔥 День 1: Легкий старт",
        steps: [
            "🏋️ Разминка 10 минут",
            "🏃 Бег 15 минут в легком темпе",
            "🦵 Спец беговые: махи ногами",
            "⚡ Ускорение 4х200 метров"
        ],
        distance: 2.8
    },
    {
        name: "⚡ День 2: Интервалы",
        steps: [
            "🏋️ Разминка 15 минут",
            "🏃 Бег 20 минут",
            "🦵 Спец беговые: прыжки",
            "⚡ Ускорение 6х200 метров"
        ],
        distance: 4.2
    },
    {
        name: "🏔️ День 3: Силовая",
        steps: [
            "🏋️ Разминка 20 минут",
            "🏃 Бег 25 минут",
            "🦵 Спец беговые: многоскоки",
            "⚡ Ускорение 8х200 метров"
        ],
        distance: 5.6
    },
    {
        name: "🌅 День 4: Восстановление",
        steps: [
            "🏋️ Разминка 10 минут",
            "🏃 Бег 15 минут легкий",
            "🦵 Спец беговые: растяжка",
            "⚡ Ускорение 4х100 метров"
        ],
        distance: 2.4
    },
    {
        name: "🔥 День 5: Скорость",
        steps: [
            "🏋️ Разминка 15 минут",
            "🏃 Бег 20 минут",
            "🦵 Спец беговые: семенящий",
            "⚡ Ускорение 10х100 метров"
        ],
        distance: 4.0
    }
];

// ========== СОСТОЯНИЕ ==========
let currentDay = parseInt(localStorage.getItem(STORAGE_KEYS.CURRENT_DAY)) || 1;
let dayStarted = false;
let dayStartTime = localStorage.getItem(STORAGE_KEYS.DAY_START_TIME);
let dayCompletedTime = localStorage.getItem(STORAGE_KEYS.DAY_COMPLETED_TIME);
let completedSteps = JSON.parse(localStorage.getItem(STORAGE_KEYS.COMPLETED_STEPS)) || [false, false, false, false];

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
    
    // Сложность (чередуем)
    const difficulties = ['easy', 'medium', 'hard', 'easy', 'hard'];
    const difficulty = difficulties[workoutIndex % difficulties.length];
    const difficultyEl = document.getElementById('workout-difficulty');
    difficultyEl.textContent = 
        difficulty === 'easy' ? 'Легкая' :
        difficulty === 'medium' ? 'Средняя' : 'Сложная';
    difficultyEl.className = `workout-difficulty difficulty-${difficulty}`;
    
    // Отрисовываем шаги
    const stepsContainer = document.getElementById('workout-steps');
    stepsContainer.innerHTML = '';
    
    workout.steps.forEach((stepText, index) => {
        const stepDiv = document.createElement('div');
        stepDiv.className = `workout-step ${completedSteps[index] ? 'step-completed' : ''}`;
        stepDiv.innerHTML = `
            <input type="checkbox" class="workout-checkbox" data-index="${index}" ${completedSteps[index] ? 'checked' : ''}>
            <span class="step-text">${stepText}</span>
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
            
            // Считаем дистанцию
            const workoutIndex = (currentDay - 1) % WORKOUTS.length;
            const distance = WORKOUTS[workoutIndex].distance;
            
            // Показываем экран завершения
            document.getElementById('marathon-screen').style.display = 'none';
            document.getElementById('congrats').style.display = 'block';
            document.getElementById('final-distance').textContent = distance.toFixed(1);
            
            // Завершаем день
            dayStarted = false;
            dayCompletedTime = Date.now().toString();
            dayStartTime = null;
            currentDay++;
            completedSteps = [false, false, false, false];
            saveState();
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
            localStorage.clear();
            updateUI();
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
        tg.showAlert('❓ FAQ:\n\n• Начать день можно с 4 утра\n• Завершить день до 23:00\n• После завершения - 24ч таймер\n• Каждый день новая тренировка');
        document.getElementById('menu-dropdown').style.display = 'none';
        document.getElementById('menu-btn').classList.remove('active');
    });
    
    // ===== СТАТИСТИКА =====
    window.updateStats = function() {
        // Здесь можно добавить статистику из истории
        document.getElementById('total-workouts').textContent = currentDay - 1;
        document.getElementById('total-distance').textContent = ((currentDay - 1) * 3.5).toFixed(1);
        document.getElementById('avg-distance').textContent = '3.5';
        document.getElementById('best-distance').textContent = '5.6';
        document.getElementById('week-current').textContent = currentDay - 1;
    };
    
    // ===== ДНЕВНИК =====
    let diaryEntries = JSON.parse(localStorage.getItem('diary_entries')) || [];
    
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
                localStorage.setItem('diary_entries', JSON.stringify(diaryEntries));
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
            localStorage.setItem('diary_entries', JSON.stringify(diaryEntries));
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
        localStorage.setItem('theme', theme);
        
        document.getElementById('theme-dark')?.classList.toggle('active', theme === 'dark');
        document.getElementById('theme-light')?.classList.toggle('active', theme === 'light');
    };
    
    // Загружаем сохраненную тему
    const savedTheme = localStorage.getItem('theme') || 'dark';
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
