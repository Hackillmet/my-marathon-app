let tg = window.Telegram.WebApp;
tg.expand();

// Получаем ID пользователя
const userId = tg.initDataUnsafe?.user?.id || 'local_user';

// Ключи для хранения
const STORAGE_KEYS = {
    CURRENT_DAY: `run_day_${userId}`,
    DAY_STARTED: `run_started_${userId}`,
    DAY_START_TIME: `run_start_time_${userId}`,
    DAY_COMPLETED_TIME: `run_completed_time_${userId}`,
    WORKOUT_STEPS: `run_steps_${userId}`,
    WORKOUT_NAME: `run_name_${userId}`,
    WORKOUT_DIFFICULTY: `run_difficulty_${userId}`,
    TOTAL_DISTANCE: `run_total_${userId}`,
    HISTORY: `run_history_${userId}`,
    THEME: `theme_${userId}`,
    LANGUAGE: `language_${userId}`
};

// Тренировки для каждого дня
const DAILY_WORKOUTS = {
    1: {
        name: "🌅 Легкая пробежка",
        difficulty: "easy",
        steps: [
            { id: 1, text: "Разминка: суставная гимнастика", completed: false, distance: 0 },
            { id: 2, text: "Бег в легком темпе", completed: false, distance: 2 },
            { id: 3, text: "Растяжка после бега", completed: false, distance: 0 }
        ],
        totalDistance: 2
    },
    2: {
        name: "⚡ Интервальная тренировка",
        difficulty: "medium",
        steps: [
            { id: 1, text: "Разминка 5 минут", completed: false, distance: 0 },
            { id: 2, text: "5 x 400 м (быстро) / 200 м (медленно)", completed: false, distance: 3 },
            { id: 3, text: "Заминка 10 минут", completed: false, distance: 1 },
            { id: 4, text: "Растяжка", completed: false, distance: 0 }
        ],
        totalDistance: 4
    },
    3: {
        name: "🏔️ Длинная пробежка",
        difficulty: "hard",
        steps: [
            { id: 1, text: "Разминка 5 минут", completed: false, distance: 0 },
            { id: 2, text: "Бег 5 км в спокойном темпе", completed: false, distance: 5 },
            { id: 3, text: "Растяжка 10 минут", completed: false, distance: 0 }
        ],
        totalDistance: 5
    },
    4: {
        name: "🏃‍♂️ Бег с ускорениями",
        difficulty: "medium",
        steps: [
            { id: 1, text: "Разминка", completed: false, distance: 0 },
            { id: 2, text: "10 x 100 м ускорения", completed: false, distance: 2.5 },
            { id: 3, text: "Бег трусцой 1 км", completed: false, distance: 1 },
            { id: 4, text: "Растяжка", completed: false, distance: 0 }
        ],
        totalDistance: 3.5
    },
    5: {
        name: "🌄 Восстановительная",
        difficulty: "easy",
        steps: [
            { id: 1, text: "Разминка", completed: false, distance: 0 },
            { id: 2, text: "Бег 2 км в очень легком темпе", completed: false, distance: 2 },
            { id: 3, text: "Растяжка 15 минут", completed: false, distance: 0 }
        ],
        totalDistance: 2
    }
};

// Продолжение для следующих дней
for (let i = 6; i <= 30; i++) {
    const sourceDay = ((i - 1) % 5) + 1;
    DAILY_WORKOUTS[i] = {
        ...DAILY_WORKOUTS[sourceDay],
        name: DAILY_WORKOUTS[sourceDay].name + ` (День ${i})`,
        steps: DAILY_WORKOUTS[sourceDay].steps.map(step => ({
            ...step,
            completed: false
        }))
    };
}

// ПЕРЕВОДЫ
const translations = {
    ru: {
        startMessage: "Готов к тренировке?",
        startBtn: "🏃 Начать бег",
        completeBtn: "✅ Завершить день",
        waitUntil4am: "⏰ Жди 4 утра",
        waitHours: (h, m) => `⏳ Следующий день через ${h}ч ${m}м`,
        canStart: "✅ Можно начинать",
        nextDayIn: (h, m) => `⏳ Следующий день через ${h}ч ${m}м`,
        dayExpired: "⏰ День истек",
        until23: "⏳ До 23:00",
        timeLeft: (h, m) => `⏳ Осталось: ${h}ч ${m}м`,
        dayExpiredMsg: "⏰ Время вышло! Новый день с 4 утра.",
        completedMessage: (day, km) => `🎉 День ${day} завершен!\nПробежал(а): ${km} км`,
        
        marathon: "🏃 МАРАФОН",
        resetMarathon: "🔄 Сбросить марафон",
        stats: "📊 Моя статистика",
        help: "🆘 ПОМОЩЬ",
        support: "💬 Поддержка",
        contact: "Связаться:",
        contacts: "📞 КОНТАКТЫ",
        author: "👤 Автор:",
        
        confirmReset: "Сбросить весь марафон? Весь прогресс будет потерян.",
        statsMessage: (day, totalKm, avgKm) => 
            `📊 Статистика:\nДень: ${day}\nВсего км: ${totalKm}\nСреднее: ${avgKm} км`
    },
    en: {
        startMessage: "Ready for workout?",
        startBtn: "🏃 Start Run",
        completeBtn: "✅ Complete Day",
        waitUntil4am: "⏰ Wait 4 AM",
        waitHours: (h, m) => `⏳ Next day in ${h}h ${m}m`,
        canStart: "✅ You can start",
        nextDayIn: (h, m) => `⏳ Next day in ${h}h ${m}m`,
        dayExpired: "⏰ Day expired",
        until23: "⏳ Until 11 PM",
        timeLeft: (h, m) => `⏳ Time left: ${h}h ${m}m`,
        dayExpiredMsg: "⏰ Time is up! New day at 4 AM.",
        completedMessage: (day, km) => `🎉 Day ${day} completed!\nRan: ${km} km`,
        
        marathon: "🏃 MARATHON",
        resetMarathon: "🔄 Reset Marathon",
        stats: "📊 My Stats",
        help: "🆘 HELP",
        support: "💬 Support",
        contact: "Contact:",
        contacts: "📞 CONTACTS",
        author: "👤 Author:",
        
        confirmReset: "Reset entire marathon? All progress will be lost.",
        statsMessage: (day, totalKm, avgKm) => 
            `📊 Statistics:\nDay: ${day}\nTotal km: ${totalKm}\nAverage: ${avgKm} km`
    }
};

// Состояние
let currentDay = 1;
let dayStarted = false;
let dayStartTime = null;
let dayCompletedTime = null;
let currentWorkout = null;
let currentLanguage = 'ru';
let currentTheme = 'dark';
let runningHistory = [];

// Функция перевода
function t(key, ...args) {
    const keys = key.split('.');
    let value = translations[currentLanguage];
    for (const k of keys) {
        if (value && value[k] !== undefined) value = value[k];
        else return key;
    }
    if (typeof value === 'function') return value(...args);
    return value;
}

// ========== ВРЕМЯ ==========
function canStartByTime() {
    const hours = new Date().getHours();
    return hours >= 4;
}

function canCompleteByTime() {
    const hours = new Date().getHours();
    return hours < 23;
}

function canStartNewDay() {
    if (!dayCompletedTime) return true;
    const now = new Date().getTime();
    const completed = parseInt(dayCompletedTime);
    const hoursPassed = (now - completed) / (1000 * 60 * 60);
    return hoursPassed >= 24;
}

function getTimeRemaining() {
    if (!dayCompletedTime) return null;
    const now = new Date().getTime();
    const completed = parseInt(dayCompletedTime);
    const hoursPassed = (now - completed) / (1000 * 60 * 60);
    if (hoursPassed >= 24) return null;
    const remaining = 24 - hoursPassed;
    return {
        hours: Math.floor(remaining),
        minutes: Math.ceil((remaining - Math.floor(remaining)) * 60)
    };
}

function isDayExpired() {
    if (!dayStartTime) return false;
    const now = new Date().getTime();
    const start = parseInt(dayStartTime);
    return (now - start) / (1000 * 60 * 60) >= 24;
}

// ========== ЗАГРУЗКА/СОХРАНЕНИЕ ==========
function loadData() {
    currentDay = parseInt(localStorage.getItem(STORAGE_KEYS.CURRENT_DAY)) || 1;
    dayStarted = localStorage.getItem(STORAGE_KEYS.DAY_STARTED) === 'true';
    dayStartTime = localStorage.getItem(STORAGE_KEYS.DAY_START_TIME);
    dayCompletedTime = localStorage.getItem(STORAGE_KEYS.DAY_COMPLETED_TIME);
    runningHistory = JSON.parse(localStorage.getItem(STORAGE_KEYS.HISTORY)) || [];
    
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
    if (savedTheme) setTheme(savedTheme);
    
    const savedLang = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
    if (savedLang) {
        currentLanguage = savedLang;
    }
    
    if (dayStarted) {
        const steps = JSON.parse(localStorage.getItem(STORAGE_KEYS.WORKOUT_STEPS));
        if (steps) {
            currentWorkout = {
                name: localStorage.getItem(STORAGE_KEYS.WORKOUT_NAME),
                difficulty: localStorage.getItem(STORAGE_KEYS.WORKOUT_DIFFICULTY),
                steps: steps,
                totalDistance: parseFloat(localStorage.getItem(STORAGE_KEYS.TOTAL_DISTANCE))
            };
        }
    }
}

function saveData() {
    localStorage.setItem(STORAGE_KEYS.CURRENT_DAY, currentDay);
    localStorage.setItem(STORAGE_KEYS.DAY_STARTED, dayStarted);
    localStorage.setItem(STORAGE_KEYS.DAY_START_TIME, dayStartTime);
    localStorage.setItem(STORAGE_KEYS.DAY_COMPLETED_TIME, dayCompletedTime);
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(runningHistory));
    localStorage.setItem(STORAGE_KEYS.THEME, currentTheme);
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, currentLanguage);
    
    if (currentWorkout && dayStarted) {
        localStorage.setItem(STORAGE_KEYS.WORKOUT_STEPS, JSON.stringify(currentWorkout.steps));
        localStorage.setItem(STORAGE_KEYS.WORKOUT_NAME, currentWorkout.name);
        localStorage.setItem(STORAGE_KEYS.WORKOUT_DIFFICULTY, currentWorkout.difficulty);
        localStorage.setItem(STORAGE_KEYS.TOTAL_DISTANCE, currentWorkout.totalDistance);
    }
}

// ========== ТЕМА И ЯЗЫК ==========
function setTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
}

function setLanguage(lang) {
    currentLanguage = lang;
    updateAllText();
}

// ========== ОТРИСОВКА ==========
function updateUI() {
    document.getElementById('start-day-number').textContent = currentDay;
    document.getElementById('current-day').textContent = currentDay;
    
    if (!dayStarted) {
        document.getElementById('start-screen').style.display = 'block';
        document.getElementById('marathon-screen').style.display = 'none';
        document.getElementById('congrats').style.display = 'none';
        
        const canStart = canStartNewDay();
        const canStartByTime = canStartByTime();
        const btn = document.getElementById('start-day-btn');
        
        if (dayCompletedTime && !canStart) {
            btn.disabled = true;
            const remaining = getTimeRemaining();
            if (remaining) {
                btn.textContent = t('waitHours', remaining.hours, remaining.minutes);
            }
        } else if (!canStartByTime) {
            btn.disabled = true;
            btn.textContent = t('waitUntil4am');
        } else {
            btn.disabled = false;
            btn.textContent = t('startBtn');
        }
        
        updateTimeInfo();
        
    } else {
        document.getElementById('start-screen').style.display = 'none';
        document.getElementById('marathon-screen').style.display = 'block';
        document.getElementById('congrats').style.display = 'none';
        
        if (isDayExpired()) {
            dayStarted = false;
            dayCompletedTime = new Date().getTime().toString();
            saveData();
            tg.showAlert(t('dayExpiredMsg'));
            updateUI();
            return;
        }
        
        renderWorkout();
        updateProgress();
        updateDeadlineInfo();
    }
}

function renderWorkout() {
    if (!currentWorkout) {
        const template = DAILY_WORKOUTS[currentDay] || DAILY_WORKOUTS[((currentDay - 1) % 5) + 1];
        currentWorkout = {
            name: template.name,
            difficulty: template.difficulty,
            steps: template.steps.map(s => ({...s, completed: false})),
            totalDistance: template.totalDistance
        };
    }
    
    document.getElementById('workout-name').textContent = currentWorkout.name;
    
    const difficultyEl = document.getElementById('workout-difficulty');
    difficultyEl.textContent = 
        currentWorkout.difficulty === 'easy' ? 'Легкая' :
        currentWorkout.difficulty === 'medium' ? 'Средняя' : 'Сложная';
    difficultyEl.className = `workout-difficulty difficulty-${currentWorkout.difficulty}`;
    
    const stepsContainer = document.getElementById('workout-steps');
    stepsContainer.innerHTML = '';
    
    currentWorkout.steps.forEach(step => {
        const stepDiv = document.createElement('div');
        stepDiv.className = `workout-step ${step.completed ? 'step-completed' : ''}`;
        stepDiv.innerHTML = `
            <input type="checkbox" class="workout-checkbox" data-id="${step.id}" ${step.completed ? 'checked' : ''}>
            <span class="step-text">${step.text}</span>
            ${step.distance > 0 ? `<span class="step-distance">${step.distance} км</span>` : ''}
        `;
        stepsContainer.appendChild(stepDiv);
    });
    
    document.querySelectorAll('.workout-checkbox').forEach(cb => {
        cb.addEventListener('change', function() {
            const id = parseInt(this.dataset.id);
            const step = currentWorkout.steps.find(s => s.id === id);
            if (step) {
                step.completed = this.checked;
                saveData();
                updateProgress();
            }
        });
    });
}

function updateProgress() {
    const completed = currentWorkout.steps.filter(s => s.completed).length;
    const total = currentWorkout.steps.length;
    const progress = (completed / total) * 100;
    
    document.getElementById('workout-fill').style.width = `${progress}%`;
    document.getElementById('workout-percent').textContent = `${Math.round(progress)}%`;
    
    const allCompleted = currentWorkout.steps.every(s => s.completed);
    const canComplete = canCompleteByTime();
    const expired = isDayExpired();
    
    const btn = document.getElementById('complete-day-btn');
    
    if (expired) {
        btn.disabled = true;
        btn.textContent = t('dayExpired');
    } else if (!canComplete) {
        btn.disabled = true;
        btn.textContent = t('until23');
    } else {
        btn.disabled = !allCompleted;
        btn.textContent = t('completeBtn');
    }
}

function updateTimeInfo() {
    const el = document.getElementById('time-info');
    if (!el) return;
    
    if (dayCompletedTime && !canStartNewDay()) {
        const remaining = getTimeRemaining();
        if (remaining) {
            el.textContent = t('nextDayIn', remaining.hours, remaining.minutes);
            el.style.color = 'var(--warning)';
        }
    } else if (!canStartByTime()) {
        el.textContent = t('waitUntil4am');
        el.style.color = 'var(--warning)';
    } else {
        el.textContent = t('canStart');
        el.style.color = 'var(--success)';
    }
}

function updateDeadlineInfo() {
    const el = document.getElementById('deadline-info');
    if (!el || !dayStarted) return;
    
    if (isDayExpired()) {
        el.textContent = t('dayExpiredMsg');
        el.style.color = 'var(--danger)';
    } else if (!canCompleteByTime()) {
        el.textContent = t('until23');
        el.style.color = 'var(--warning)';
    } else {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const timeLeft = (22 - hours) * 60 + (60 - minutes);
        if (timeLeft > 0) {
            const leftHours = Math.floor(timeLeft / 60);
            const leftMinutes = timeLeft % 60;
            el.textContent = t('timeLeft', leftHours, leftMinutes);
            el.style.color = 'var(--text-secondary)';
        }
    }
}

function updateAllText() {
    document.getElementById('start-message').textContent = t('startMessage');
    
    const menuTitles = document.querySelectorAll('.menu-title');
    if (menuTitles[0]) menuTitles[0].textContent = t('marathon');
    if (menuTitles[1]) menuTitles[1].textContent = t('help');
    if (menuTitles[2]) menuTitles[2].textContent = t('contacts');
    
    document.getElementById('reset-marathon').innerHTML = t('resetMarathon');
    document.getElementById('stats').innerHTML = t('stats');
    document.getElementById('support').innerHTML = t('support');
    document.getElementById('telegram-support').innerHTML = `📱 ${t('contact')} @frontendchikk`;
    
    const contactItem = document.querySelector('.contact-item');
    if (contactItem) {
        contactItem.innerHTML = `<span>${t('author')}</span><span class="contact-highlight">@frontendchikk</span>`;
    }
    
    updateUI();
}

function updateDate() {
    const now = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    document.getElementById('current-date').textContent = now.toLocaleDateString(currentLanguage === 'ru' ? 'ru-RU' : 'en-US', options);
}

// ========== ОБРАБОТЧИКИ ==========
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    setTheme(currentTheme);
    updateDate();
    updateAllText();
    updateUI();
    
    // Старт дня
    document.getElementById('start-day-btn').addEventListener('click', () => {
        if (!canStartNewDay()) {
            const remaining = getTimeRemaining();
            tg.showAlert(t('waitHours', remaining.hours, remaining.minutes));
            return;
        }
        
        if (!canStartByTime()) {
            tg.showAlert('⏰ Новый день можно начать только с 4 утра!');
            return;
        }
        
        dayStarted = true;
        dayStartTime = new Date().getTime().toString();
        dayCompletedTime = null;
        currentWorkout = null;
        saveData();
        updateUI();
    });
    
    // Завершение дня
    document.getElementById('complete-day-btn').addEventListener('click', () => {
        if (!canCompleteByTime()) {
            tg.showAlert('⏰ Завершить день можно только до 23:00!');
            return;
        }
        
        if (isDayExpired()) {
            tg.showAlert(t('dayExpiredMsg'));
            return;
        }
        
        let totalKm = 0;
        currentWorkout.steps.forEach(step => {
            if (step.completed) totalKm += step.distance || 0;
        });
        
        runningHistory.push({
            day: currentDay,
            distance: totalKm,
            date: new Date().toISOString(),
            workout: currentWorkout.name
        });
        
        document.getElementById('final-distance').textContent = totalKm.toFixed(1);
        
        dayCompletedTime = new Date().getTime().toString();
        dayStarted = false;
        dayStartTime = null;
        currentDay++;
        
        saveData();
        
        document.getElementById('start-screen').style.display = 'none';
        document.getElementById('marathon-screen').style.display = 'none';
        document.getElementById('congrats').style.display = 'block';
        
        tg.showAlert(t('completedMessage', currentDay - 1, totalKm.toFixed(1)));
    });
    
    // Продолжить
    document.getElementById('continue-btn').addEventListener('click', () => {
        document.getElementById('congrats').style.display = 'none';
        updateUI();
    });
    
    // Меню
    document.getElementById('menu-btn').addEventListener('click', () => {
        const menu = document.getElementById('menu-dropdown');
        const btn = document.getElementById('menu-btn');
        if (menu.style.display === 'none') {
            menu.style.display = 'block';
            btn.classList.add('active');
        } else {
            menu.style.display = 'none';
            btn.classList.remove('active');
        }
    });
    
    document.addEventListener('click', (e) => {
        const menu = document.getElementById('menu-dropdown');
        const btn = document.getElementById('menu-btn');
        if (!btn.contains(e.target) && !menu.contains(e.target)) {
            menu.style.display = 'none';
            btn.classList.remove('active');
        }
    });
    
    // Сброс
    document.getElementById('reset-marathon').addEventListener('click', (e) => {
        e.preventDefault();
        if (confirm(t('confirmReset'))) {
            currentDay = 1;
            dayStarted = false;
            dayStartTime = null;
            dayCompletedTime = null;
            currentWorkout = null;
            runningHistory = [];
            saveData();
            updateUI();
            document.getElementById('menu-dropdown').style.display = 'none';
            document.getElementById('menu-btn').classList.remove('active');
        }
    });
    
    // Статистика
    document.getElementById('stats').addEventListener('click', (e) => {
        e.preventDefault();
        const totalKm = runningHistory.reduce((sum, r) => sum + r.distance, 0);
        const avgKm = runningHistory.length > 0 ? (totalKm / runningHistory.length).toFixed(1) : 0;
        tg.showAlert(t('statsMessage', currentDay - 1, totalKm.toFixed(1), avgKm));
        document.getElementById('menu-dropdown').style.display = 'none';
        document.getElementById('menu-btn').classList.remove('active');
    });
    
    // Поддержка
    document.getElementById('support').addEventListener('click', (e) => {
        e.preventDefault();
        tg.showAlert('💬 Поддержка: @frontendchikk');
        document.getElementById('menu-dropdown').style.display = 'none';
        document.getElementById('menu-btn').classList.remove('active');
    });
    
    document.getElementById('telegram-support').addEventListener('click', (e) => {
        e.preventDefault();
        tg.openTelegramLink('https://t.me/frontendchikk');
        document.getElementById('menu-dropdown').style.display = 'none';
        document.getElementById('menu-btn').classList.remove('active');
    });
    
    // Интервал
    setInterval(() => {
        if (dayStarted) {
            updateProgress();
            updateDeadlineInfo();
        } else {
            updateTimeInfo();
        }
        updateDate();
    }, 60000);
    
    tg.ready();
});

// Глобальные функции
window.setTheme = setTheme;
window.setLanguage = setLanguage;
