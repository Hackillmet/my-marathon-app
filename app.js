let tg = window.Telegram.WebApp;
tg.expand();

// Получаем ID пользователя
const userId = tg.initDataUnsafe?.user?.id || 'local_user';

// Ключи для хранения
const STORAGE_KEYS = {
    DAY_STARTED: `day_started_${userId}`,
    HABITS: `habits_${userId}`,
    TASKS: `tasks_${userId}`,
    CURRENT_DAY: `current_day_${userId}`,
    THEME: `theme_${userId}`,
    LANGUAGE: `language_${userId}`,
    DIARY_ENTRIES: `diary_entries_${userId}`,
    DAY_COMPLETED_TIME: `day_completed_time_${userId}`,
    DAY_START_TIME: `day_start_time_${userId}`
};

// ===== ДАННЫЕ ДЛЯ БЕГА =====
const RUNNING_KEYS = {
    HISTORY: `running_history_${userId}`,
    ACTIVE_WORKOUT: `active_workout_${userId}`
};

// Тренировки для бега
const RUNNING_WORKOUTS = [
    {
        id: 1,
        name: "🌅 Легкая пробежка",
        difficulty: "easy",
        steps: [
            { id: 1, text: "Разминка: суставная гимнастика", completed: false, distance: 0 },
            { id: 2, text: "Бег в легком темпе", completed: false, distance: 2 },
            { id: 3, text: "Растяжка после бега", completed: false, distance: 0 }
        ],
        totalDistance: 2
    },
    {
        id: 2,
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
    {
        id: 3,
        name: "🏔️ Длинная пробежка",
        difficulty: "hard",
        steps: [
            { id: 1, text: "Разминка 5 минут", completed: false, distance: 0 },
            { id: 2, text: "Бег 5 км в спокойном темпе", completed: false, distance: 5 },
            { id: 3, text: "Растяжка 10 минут", completed: false, distance: 0 }
        ],
        totalDistance: 5
    },
    {
        id: 4,
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
    {
        id: 5,
        name: "🌄 Восстановительная",
        difficulty: "easy",
        steps: [
            { id: 1, text: "Разминка", completed: false, distance: 0 },
            { id: 2, text: "Бег 2 км в очень легком темпе", completed: false, distance: 2 },
            { id: 3, text: "Растяжка 15 минут", completed: false, distance: 0 }
        ],
        totalDistance: 2
    }
];

// Загружаем историю бега
let runningHistory = JSON.parse(localStorage.getItem(RUNNING_KEYS.HISTORY)) || [];

// Активная тренировка
let activeWorkout = null;

// СТАНДАРТНЫЕ привычки (всегда должны быть)
const DEFAULT_HABITS = [
    { id: 1, text: "💧 Выпить стакан воды", completed: false },
    { id: 2, text: "🏃 Сделать зарядку", completed: false },
    { id: 3, text: "📖 Почитать 10 минут", completed: false },
    { id: 4, text: "🧘 Медитация 5 минут", completed: false }
];

// СТАНДАРТНЫЕ задачи (всегда должны быть)
const DEFAULT_TASKS = [
    { id: 1, text: "🛏️ Заправить кровать", completed: false },
    { id: 2, text: "🚀 Начать марафон", completed: false },
    { id: 3, text: "💻 Писать код 30 минут", completed: false },
    { id: 4, text: "🚶 Прогулка на свежем воздухе", completed: false }
];

// ПЕРЕВОДЫ
const translations = {
    ru: {
        // Общее
        day: "День",
        startMessage: "Готов начать свой путь к балансу?",
        startDayBtn: "🚀 Начать день",
        completeBtn: "✅ Завершить день",
        home: "Главная",
        settings: "Настройки",
        run: "Бег",
        diary: "Дневник",
        
        // Баланс
        balanceTitle: "⚖️ БАЛАНС СИСТЕМЫ",
        mind: "Разум",
        spirit: "Дух",
        
        // Привычки
        habitsTitle: "🌱 ПРИВЫЧКИ",
        habitPlaceholder: "➕ Добавить свою привычку...",
        addBtn: "Добавить",
        habitsNote: "📌 Стандартные (4 шт)  ➕ Добавленные",
        
        // Задачи
        tasksTitle: "📋 ЗАДАЧИ НА СЕГОДНЯ",
        taskPlaceholder: "➕ Добавить свою задачу...",
        tasksNote: "📌 Стандартные (4 шт)  ➕ Добавленные",
        
        // Время
        waitUntil4am: "⏰ Жди 4 утра",
        waitHours: (h, m) => `⏳ ${h}ч ${m}м`,
        canStart: "✅ Можно начинать день",
        nextDayIn: (h, m) => `⏳ Следующий день через ${h}ч ${m}м`,
        dayExpired: "⏰ День истек",
        until23: "⏳ До 23:00",
        timeLeft: (h, m) => `⏳ Осталось времени: ${h}ч ${m}м`,
        
        // Бег
        runningTitle: "🏃 БЕГ",
        totalRuns: "Тренировок",
        totalKm: "Всего км",
        startRun: "🏃 Начать бегать",
        workoutHistory: "📋 История тренировок",
        emptyHistory: "Пока нет тренировок",
        completeWorkout: "✅ Завершить тренировку",
        cancelWorkout: "❌ Отменить",
        workoutCompleted: "🎉 Тренировка завершена!",
        workoutCompletedText: (name, km) => `Ты пробежал ${km} км!`,
        
        // Дневник
        newEntry: "Новая запись",
        save: "Сохранить",
        cancel: "Отмена",
        noEntries: "📝 Пока нет записей",
        entryPlaceholder: "Что сегодня произошло? Поделись своими мыслями...",
        
        // Меню
        marathon: "📋 МАРАФОН",
        resetDay: "🔄 Сбросить день",
        newMarathon: "✨ Новый марафон",
        stats: "📊 Моя статистика",
        help: "🆘 ПОМОЩЬ",
        support: "💬 Поддержка",
        contact: "Связаться:",
        faq: "❓ FAQ",
        contacts: "📞 КОНТАКТЫ",
        author: "👤 Автор:",
        
        // Настройки
        settingsTitle: "⚙️ НАСТРОЙКИ",
        themeTitle: "🎨 Тема оформления",
        dark: "🌑 Темная",
        light: "☀️ Светлая",
        languageTitle: "🌍 Язык",
        aboutTitle: "ℹ️ О приложении",
        version: "Версия:",
        authorLabel: "Автор:",
        description: "Марафон баланса - развивай разум и дух каждый день",
        timeMode: "⏰ Режим: 4:00 - 23:00",
        
        // Завершение
        congratsTitle: "🎉 ДЕНЬ ЗАВЕРШЕН!",
        yourBalance: "Твой баланс:",
        homeBtn: "🏠 На главную",
        
        // Сообщения
        confirmReset: "Сбросить текущий день? Весь прогресс будет потерян.",
        confirmNew: "Начать новый марафон? Весь прогресс будет сброшен.",
        cantDeleteStandard: "❌ Это стандартная привычка",
        cantDeleteStandardTask: "❌ Это стандартная задача",
        waitMessage: (h, m) => `⏳ Подожди ${h}ч ${m}м`,
        onlyFrom4am: "⏰ Новый день можно начать только с 4 утра!",
        onlyUntil23: "⏰ Завершить день можно только до 23:00!",
        dayExpiredMsg: "⏰ День истек! Начни следующий день с 4 утра.",
        completedMessage: (day, mind, spirit) => `🎉 Молодец! День ${day} завершен!\n🧠 Разум: ${mind}%\n💚 Дух: ${spirit}%`,
        
        // Статистика
        statsMessage: (day, customHabits, customTasks, entries) => 
            `📊 Статистика:\nДень: ${day}\nСтандартных привычек: 4\nДобавленных привычек: ${customHabits}\nСтандартных задач: 4\nДобавленных задач: ${customTasks}\nЗаписей в дневнике: ${entries}`,
        
        // FAQ
        faqText: "❓ FAQ:\n\n📌 Стандартные - нельзя удалить\n➕ Добавленные - можно удалить\n⏰ Режим: 4:00 - 23:00\n📔 Дневник для записей\n🏃 Бег с мини-тренировками"
    },
    en: {
        // General
        day: "Day",
        startMessage: "Ready to start your journey to balance?",
        startDayBtn: "🚀 Start Day",
        completeBtn: "✅ Complete Day",
        home: "Home",
        settings: "Settings",
        run: "Run",
        diary: "Diary",
        
        // Balance
        balanceTitle: "⚖️ SYSTEM BALANCE",
        mind: "Mind",
        spirit: "Spirit",
        
        // Habits
        habitsTitle: "🌱 HABITS",
        habitPlaceholder: "➕ Add your habit...",
        addBtn: "Add",
        habitsNote: "📌 Standard (4)  ➕ Added",
        
        // Tasks
        tasksTitle: "📋 TODAY'S TASKS",
        taskPlaceholder: "➕ Add your task...",
        tasksNote: "📌 Standard (4)  ➕ Added",
        
        // Time
        waitUntil4am: "⏰ Wait 4 AM",
        waitHours: (h, m) => `⏳ ${h}h ${m}m`,
        canStart: "✅ You can start",
        nextDayIn: (h, m) => `⏳ Next day in ${h}h ${m}m`,
        dayExpired: "⏰ Day expired",
        until23: "⏳ Until 11 PM",
        timeLeft: (h, m) => `⏳ Time left: ${h}h ${m}m`,
        
        // Running
        runningTitle: "🏃 RUNNING",
        totalRuns: "Workouts",
        totalKm: "Total km",
        startRun: "🏃 Start Running",
        workoutHistory: "📋 Workout History",
        emptyHistory: "No workouts yet",
        completeWorkout: "✅ Complete Workout",
        cancelWorkout: "❌ Cancel",
        workoutCompleted: "🎉 Workout Completed!",
        workoutCompletedText: (name, km) => `You ran ${km} km!`,
        
        // Diary
        newEntry: "New entry",
        save: "Save",
        cancel: "Cancel",
        noEntries: "📝 No entries yet",
        entryPlaceholder: "What happened today? Share your thoughts...",
        
        // Menu
        marathon: "📋 MARATHON",
        resetDay: "🔄 Reset Day",
        newMarathon: "✨ New Marathon",
        stats: "📊 My Stats",
        help: "🆘 HELP",
        support: "💬 Support",
        contact: "Contact:",
        faq: "❓ FAQ",
        contacts: "📞 CONTACTS",
        author: "👤 Author:",
        
        // Settings
        settingsTitle: "⚙️ SETTINGS",
        themeTitle: "🎨 Theme",
        dark: "🌑 Dark",
        light: "☀️ Light",
        languageTitle: "🌍 Language",
        aboutTitle: "ℹ️ About",
        version: "Version:",
        authorLabel: "Author:",
        description: "Balance Marathon - develop your mind and spirit every day",
        timeMode: "⏰ Mode: 4 AM - 11 PM",
        
        // Completion
        congratsTitle: "🎉 DAY COMPLETED!",
        yourBalance: "Your balance:",
        homeBtn: "🏠 Home",
        
        // Messages
        confirmReset: "Reset current day? All progress will be lost.",
        confirmNew: "Start new marathon? All progress will be reset.",
        cantDeleteStandard: "❌ This is a standard habit",
        cantDeleteStandardTask: "❌ This is a standard task",
        waitMessage: (h, m) => `⏳ Wait ${h}h ${m}m`,
        onlyFrom4am: "⏰ New day can only start at 4 AM!",
        onlyUntil23: "⏰ You can only complete day before 11 PM!",
        dayExpiredMsg: "⏰ Day expired! Start next day at 4 AM.",
        completedMessage: (day, mind, spirit) => `🎉 Great job! Day ${day} completed!\n🧠 Mind: ${mind}%\n💚 Spirit: ${spirit}%`,
        
        // Statistics
        statsMessage: (day, customHabits, customTasks, entries) => 
            `📊 Statistics:\nDay: ${day}\nStandard habits: 4\nAdded habits: ${customHabits}\nStandard tasks: 4\nAdded tasks: ${customTasks}\nDiary entries: ${entries}`,
        
        // FAQ
        faqText: "❓ FAQ:\n\n📌 Standard - cannot delete\n➕ Added - can delete\n⏰ Mode: 4 AM - 11 PM\n📔 Diary for notes\n🏃 Running with mini-workouts"
    }
};

// Состояние приложения
let currentDay = 1;
let habits = [];
let tasks = [];
let diaryEntries = [];
let dayStarted = false;
let dayStartTime = null;
let dayCompletedTime = null;
let currentLanguage = 'ru';
let currentTheme = 'dark';
let currentSlide = 0;

// Функция перевода
function t(key, ...args) {
    const keys = key.split('.');
    let value = translations[currentLanguage];
    
    for (const k of keys) {
        if (value && value[k] !== undefined) {
            value = value[k];
        } else {
            return key;
        }
    }
    
    if (typeof value === 'function') {
        return value(...args);
    }
    
    return value;
}

// Обновление всего текста на странице
function updateAllText() {
    // Обновляем статические элементы с data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = t(key);
    });
    
    // Обновляем placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        el.placeholder = t(key);
    });
    
    // Обновляем навигацию
    document.querySelectorAll('.nav-text')[0].textContent = t('home');
    document.querySelectorAll('.nav-text')[1].textContent = t('settings');
    document.querySelectorAll('.nav-text')[2].textContent = t('run');
    document.querySelectorAll('.nav-text')[3].textContent = t('diary');
    
    // Обновляем заголовки секций
    const balanceTitle = document.querySelector('.balance-title');
    if (balanceTitle) balanceTitle.textContent = t('balanceTitle');
    
    const habitsTitle = document.querySelector('.habits-section .section-header h3');
    if (habitsTitle) habitsTitle.textContent = t('habitsTitle');
    
    const tasksTitle = document.querySelector('.tasks-section .section-header h3');
    if (tasksTitle) tasksTitle.textContent = t('tasksTitle');
    
    // Обновляем заметки
    const habitNote = document.querySelector('.habit-note');
    if (habitNote) habitNote.innerHTML = `<span>${t('habitsNote')}</span>`;
    
    const taskNote = document.querySelector('.task-note');
    if (taskNote) taskNote.innerHTML = `<span>${t('tasksNote')}</span>`;
    
    // Обновляем меню
    document.querySelectorAll('.menu-title')[0].textContent = t('marathon');
    document.querySelectorAll('.menu-title')[1].textContent = t('help');
    document.querySelectorAll('.menu-title')[2].textContent = t('contacts');
    
    document.getElementById('reset-day').innerHTML = t('resetDay');
    document.getElementById('new-marathon').innerHTML = t('newMarathon');
    document.getElementById('stats').innerHTML = t('stats');
    document.getElementById('support').innerHTML = t('support');
    document.getElementById('telegram-support').innerHTML = `📱 ${t('contact')} @frontendchikk`;
    document.getElementById('faq').innerHTML = t('faq');
    
    // Обновляем контакты
    const contactItems = document.querySelectorAll('.contact-item');
    if (contactItems[0]) {
        contactItems[0].innerHTML = `<span>${t('author')}</span><span class="contact-highlight">@frontendchikk</span>`;
    }
    
    // Обновляем настройки
    const settingsTitle = document.querySelector('.settings-title');
    if (settingsTitle) settingsTitle.textContent = t('settingsTitle');
    
    const settingsGroups = document.querySelectorAll('.settings-group h3');
    if (settingsGroups[0]) settingsGroups[0].textContent = t('themeTitle');
    if (settingsGroups[1]) settingsGroups[1].textContent = t('languageTitle');
    if (settingsGroups[2]) settingsGroups[2].textContent = t('aboutTitle');
    
    const themeDark = document.getElementById('theme-dark');
    const themeLight = document.getElementById('theme-light');
    if (themeDark) themeDark.innerHTML = '<span class="theme-preview dark-preview"></span><span>' + t('dark') + '</span>';
    if (themeLight) themeLight.innerHTML = '<span class="theme-preview light-preview"></span><span>' + t('light') + '</span>';
    
    // Обновляем информацию о приложении
    const aboutInfo = document.querySelector('.about-info');
    if (aboutInfo) {
        aboutInfo.innerHTML = `
            <p>${t('version')} 3.0.0</p>
            <p>${t('authorLabel')} @frontendchikk</p>
            <p>${t('description')}</p>
            <p>${t('timeMode')}</p>
        `;
    }
    
    // Обновляем бег
    const runningTitle = document.querySelector('.running-title');
    if (runningTitle) runningTitle.textContent = t('runningTitle');
    
    const startWorkoutBtn = document.getElementById('start-workout-btn');
    if (startWorkoutBtn) startWorkoutBtn.innerHTML = t('startRun');
    
    const workoutHistoryTitle = document.querySelector('.workout-history h3');
    if (workoutHistoryTitle) workoutHistoryTitle.textContent = t('workoutHistory');
    
    // Обновляем дневник
    const diaryTitle = document.querySelector('.diary-title');
    if (diaryTitle) diaryTitle.textContent = t('diary');
    
    const addEntryBtn = document.getElementById('add-entry-btn');
    if (addEntryBtn) addEntryBtn.innerHTML = `<span class="plus-icon">+</span> ${t('newEntry')}`;
    
    const saveEntryBtn = document.getElementById('save-entry-btn');
    const cancelEntryBtn = document.getElementById('cancel-entry-btn');
    if (saveEntryBtn) saveEntryBtn.textContent = t('save');
    if (cancelEntryBtn) cancelEntryBtn.textContent = t('cancel');
    
    const entryTextarea = document.getElementById('entry-text');
    if (entryTextarea) entryTextarea.placeholder = t('entryPlaceholder');
    
    // Обновляем экран завершения
    const congratsH2 = document.querySelector('#congrats h2');
    const congratsP = document.querySelector('#congrats p');
    const continueBtn = document.getElementById('continue-btn');
    
    if (congratsH2) congratsH2.textContent = t('congratsTitle');
    if (congratsP) congratsP.textContent = t('yourBalance');
    if (continueBtn) continueBtn.textContent = t('homeBtn');
    
    // Обновляем стартовый экран
    const startMessage = document.getElementById('start-message');
    if (startMessage) startMessage.textContent = t('startMessage');
    
    // Обновляем дату
    updateDate();
    
    // Обновляем UI с учетом времени
    updateUI();
    
    // Обновляем бег
    renderRunningSection();
}

// DOM элементы
const startScreen = document.getElementById('start-screen');
const marathonScreen = document.getElementById('marathon-screen');
const congratsDiv = document.getElementById('congrats');
const startDayBtn = document.getElementById('start-day-btn');
const completeDayBtn = document.getElementById('complete-day-btn');
const startDayNumber = document.getElementById('start-day-number');
const currentDateEl = document.getElementById('current-date');
const habitsList = document.getElementById('habits-list');
const tasksList = document.getElementById('tasks-list');
const mindFill = document.getElementById('mind-fill');
const spiritFill = document.getElementById('spirit-fill');
const mindPercent = document.getElementById('mind-percent');
const spiritPercent = document.getElementById('spirit-percent');
const addHabitBtn = document.getElementById('add-habit-btn');
const addTaskBtn = document.getElementById('add-task-btn');
const addHabitInput = document.getElementById('add-habit-input');
const addTaskInput = document.getElementById('add-task-input');
const habitText = document.getElementById('habit-text');
const taskText = document.getElementById('task-text');
const saveHabitBtn = document.getElementById('save-habit-btn');
const saveTaskBtn = document.getElementById('save-task-btn');
const menuBtn = document.getElementById('menu-btn');
const menuDropdown = document.getElementById('menu-dropdown');
const resetDayBtn = document.getElementById('reset-day');
const newMarathonBtn = document.getElementById('new-marathon');
const statsBtn = document.getElementById('stats');
const supportBtn = document.getElementById('support');
const telegramSupport = document.getElementById('telegram-support');
const faqBtn = document.getElementById('faq');
const continueBtn = document.getElementById('continue-btn');
const timeInfo = document.getElementById('time-info');
const deadlineInfo = document.getElementById('deadline-info');
const startMessage = document.getElementById('start-message');

// Элементы дневника
const addEntryBtn = document.getElementById('add-entry-btn');
const addEntryForm = document.getElementById('add-entry-form');
const entryText = document.getElementById('entry-text');
const saveEntryBtn = document.getElementById('save-entry-btn');
const cancelEntryBtn = document.getElementById('cancel-entry-btn');
const entriesList = document.getElementById('entries-list');

// Элементы бега
const workoutContainer = document.getElementById('workout-container');
const startWorkoutBtn = document.getElementById('start-workout-btn');
const totalRunsEl = document.getElementById('total-runs');
const totalKmEl = document.getElementById('total-km');
const historyList = document.getElementById('history-list');

// ========== ФУНКЦИИ ВРЕМЕНИ ==========

function canStartDayByTime() {
    const now = new Date();
    const hours = now.getHours();
    return hours >= 4;
}

function canCompleteDayByTime() {
    const now = new Date();
    const hours = now.getHours();
    return hours < 23;
}

function canStartNewDay() {
    if (!dayCompletedTime) return true;
    
    const now = new Date().getTime();
    const completedTime = parseInt(dayCompletedTime);
    const hoursPassed = (now - completedTime) / (1000 * 60 * 60);
    
    return hoursPassed >= 24;
}

function getTimeRemaining() {
    if (!dayCompletedTime) return null;
    
    const now = new Date().getTime();
    const completedTime = parseInt(dayCompletedTime);
    const hoursPassed = (now - completedTime) / (1000 * 60 * 60);
    
    if (hoursPassed >= 24) return null;
    
    const remainingHours = 24 - hoursPassed;
    const remainingMinutes = Math.ceil((remainingHours - Math.floor(remainingHours)) * 60);
    
    return {
        hours: Math.floor(remainingHours),
        minutes: remainingMinutes
    };
}

function isDayExpired() {
    if (!dayStartTime) return false;
    
    const now = new Date().getTime();
    const startTime = parseInt(dayStartTime);
    const hoursPassed = (now - startTime) / (1000 * 60 * 60);
    
    return hoursPassed >= 24;
}

function updateTimeInfo() {
    if (!timeInfo) return;
    
    if (dayCompletedTime && !canStartNewDay()) {
        const remaining = getTimeRemaining();
        if (remaining) {
            timeInfo.textContent = t('nextDayIn', remaining.hours, remaining.minutes);
            timeInfo.style.color = 'var(--warning)';
        }
    } else if (!canStartDayByTime()) {
        timeInfo.textContent = t('waitUntil4am');
        timeInfo.style.color = 'var(--warning)';
    } else {
        timeInfo.textContent = t('canStart');
        timeInfo.style.color = 'var(--success)';
    }
}

function updateDeadlineInfo() {
    if (!deadlineInfo || !dayStarted) return;
    
    if (isDayExpired()) {
        deadlineInfo.textContent = t('dayExpiredMsg');
        deadlineInfo.style.color = 'var(--danger)';
    } else if (!canCompleteDayByTime()) {
        deadlineInfo.textContent = t('onlyUntil23');
        deadlineInfo.style.color = 'var(--warning)';
    } else {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const timeLeft = (22 - hours) * 60 + (60 - minutes);
        if (timeLeft > 0) {
            const leftHours = Math.floor(timeLeft / 60);
            const leftMinutes = timeLeft % 60;
            deadlineInfo.textContent = t('timeLeft', leftHours, leftMinutes);
            deadlineInfo.style.color = 'var(--text-secondary)';
        }
    }
}

// ========== ФУНКЦИИ ДЛЯ БЕГА ==========

// Сохраняем историю бега
function saveRunningHistory() {
    localStorage.setItem(RUNNING_KEYS.HISTORY, JSON.stringify(runningHistory));
}

// Сохраняем активную тренировку
function saveActiveWorkout() {
    if (activeWorkout) {
        localStorage.setItem(RUNNING_KEYS.ACTIVE_WORKOUT, JSON.stringify(activeWorkout));
    } else {
        localStorage.removeItem(RUNNING_KEYS.ACTIVE_WORKOUT);
    }
}

// Загружаем активную тренировку
function loadActiveWorkout() {
    const saved = localStorage.getItem(RUNNING_KEYS.ACTIVE_WORKOUT);
    if (saved) {
        activeWorkout = JSON.parse(saved);
    }
}

// Обновляем статистику бега
function updateRunningStats() {
    if (totalRunsEl) {
        totalRunsEl.textContent = runningHistory.length;
    }
    
    if (totalKmEl) {
        const totalKm = runningHistory.reduce((sum, run) => sum + run.distance, 0);
        totalKmEl.textContent = totalKm.toFixed(1);
    }
}

// Рендерим историю тренировок
function renderRunningHistory() {
    if (!historyList) return;
    
    historyList.innerHTML = '';
    
    if (runningHistory.length === 0) {
        historyList.innerHTML = `<div class="empty-history">${t('emptyHistory')}</div>`;
        return;
    }
    
    // Показываем последние 5 тренировок
    const recentHistory = runningHistory.slice(-5).reverse();
    
    recentHistory.forEach(run => {
        const date = new Date(run.date);
        const formattedDate = date.toLocaleDateString(currentLanguage === 'ru' ? 'ru-RU' : 'en-US', {
            day: 'numeric',
            month: 'short'
        });
        
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.innerHTML = `
            <span class="history-date">${formattedDate}</span>
            <span class="history-workout">${run.name}</span>
            <span class="history-stats">${run.distance} км</span>
        `;
        historyList.appendChild(historyItem);
    });
}

// Начать тренировку
function startWorkout() {
    // Выбираем случайную тренировку
    const randomIndex = Math.floor(Math.random() * RUNNING_WORKOUTS.length);
    const workout = JSON.parse(JSON.stringify(RUNNING_WORKOUTS[randomIndex])); // Копируем
    
    // Сбрасываем completed для всех шагов
    workout.steps.forEach(step => {
        step.completed = false;
    });
    
    workout.startTime = new Date().toISOString();
    
    activeWorkout = workout;
    saveActiveWorkout();
    
    renderRunningSection();
}

// Отменить тренировку
function cancelWorkout() {
    activeWorkout = null;
    saveActiveWorkout();
    renderRunningSection();
}

// Завершить тренировку
function completeWorkout() {
    if (!activeWorkout) return;
    
    // Считаем пройденную дистанцию (только выполненные шаги)
    let completedDistance = 0;
    activeWorkout.steps.forEach(step => {
        if (step.completed) {
            completedDistance += step.distance || 0;
        }
    });
    
    // Создаем запись в истории
    const historyEntry = {
        id: Date.now(),
        name: activeWorkout.name,
        distance: completedDistance,
        date: new Date().toISOString(),
        completedSteps: activeWorkout.steps.filter(s => s.completed).length,
        totalSteps: activeWorkout.steps.length
    };
    
    runningHistory.push(historyEntry);
    saveRunningHistory();
    
    // Очищаем активную тренировку
    activeWorkout = null;
    saveActiveWorkout();
    
    // Обновляем статистику
    updateRunningStats();
    renderRunningSection();
    
    // Показываем поздравление
    tg.showPopup({
        title: t('workoutCompleted'),
        message: t('workoutCompletedText', activeWorkout?.name, completedDistance.toFixed(1)),
        buttons: [{ type: 'close' }]
    });
}

// Обновить шаг тренировки
function updateWorkoutStep(stepId, completed) {
    if (!activeWorkout) return;
    
    const step = activeWorkout.steps.find(s => s.id === stepId);
    if (step) {
        step.completed = completed;
        saveActiveWorkout();
        renderRunningSection();
        
        // Проверяем, все ли шаги выполнены
        const allCompleted = activeWorkout.steps.every(s => s.completed);
        if (allCompleted) {
            tg.showPopup({
                title: '🎉 Отлично!',
                message: 'Все шаги тренировки выполнены! Завершить?',
                buttons: [
                    { id: 'complete', type: 'default', text: t('completeWorkout') },
                    { type: 'cancel' }
                ]
            }, (buttonId) => {
                if (buttonId === 'complete') {
                    completeWorkout();
                }
            });
        }
    }
}

// Рендерим секцию бега
function renderRunningSection() {
    updateRunningStats();
    renderRunningHistory();
    
    if (!workoutContainer) return;
    
    if (activeWorkout) {
        // Показываем активную тренировку
        const difficultyClass = 
            activeWorkout.difficulty === 'easy' ? 'difficulty-easy' :
            activeWorkout.difficulty === 'medium' ? 'difficulty-medium' :
            'difficulty-hard';
        
        const completedSteps = activeWorkout.steps.filter(s => s.completed).length;
        const totalSteps = activeWorkout.steps.length;
        const progress = (completedSteps / totalSteps) * 100;
        
        let stepsHtml = '';
        activeWorkout.steps.forEach(step => {
            stepsHtml += `
                <div class="workout-step ${step.completed ? 'step-completed' : ''}">
                    <input type="checkbox" class="workout-checkbox" 
                           data-step-id="${step.id}" ${step.completed ? 'checked' : ''}>
                    <span class="step-text">${step.text}</span>
                    ${step.distance > 0 ? `<span class="step-distance">${step.distance} км</span>` : ''}
                </div>
            `;
        });
        
        workoutContainer.innerHTML = `
            <div class="workout-card">
                <div class="workout-header">
                    <span class="workout-name">${activeWorkout.name}</span>
                    <span class="workout-difficulty ${difficultyClass}">
                        ${activeWorkout.difficulty === 'easy' ? 'Легкая' : 
                          activeWorkout.difficulty === 'medium' ? 'Средняя' : 'Сложная'}
                    </span>
                </div>
                
                <div class="workout-stats">
                    <div class="workout-stat">
                        <span class="workout-stat-value">${completedSteps}/${totalSteps}</span>
                        <span class="workout-stat-label">Шаги</span>
                    </div>
                    <div class="workout-stat">
                        <span class="workout-stat-value">${progress}%</span>
                        <span class="workout-stat-label">Прогресс</span>
                    </div>
                </div>
                
                <div class="progress-bar" style="margin-bottom: 20px;">
                    <div class="progress-fill mind-fill" style="width: ${progress}%;"></div>
                </div>
                
                <div class="workout-steps">
                    ${stepsHtml}
                </div>
                
                <button class="complete-workout-btn" id="complete-workout-btn">
                    ${t('completeWorkout')}
                </button>
                <button class="cancel-workout-btn" id="cancel-workout-btn">
                    ${t('cancelWorkout')}
                </button>
            </div>
        `;
        
        // Добавляем обработчики для чекбоксов
        document.querySelectorAll('.workout-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const stepId = parseInt(this.dataset.stepId);
                updateWorkoutStep(stepId, this.checked);
            });
        });
        
        document.getElementById('complete-workout-btn')?.addEventListener('click', completeWorkout);
        document.getElementById('cancel-workout-btn')?.addEventListener('click', cancelWorkout);
        
    } else {
        // Показываем кнопку начала тренировки
        workoutContainer.innerHTML = `
            <button class="start-workout-btn" id="start-workout-btn">
                🏃 ${t('startRun')}
            </button>
        `;
        
        document.getElementById('start-workout-btn')?.addEventListener('click', startWorkout);
    }
}

// ========== ЗАГРУЗКА И СОХРАНЕНИЕ ==========

function loadData() {
    dayStarted = localStorage.getItem(STORAGE_KEYS.DAY_STARTED) === 'true';
    currentDay = parseInt(localStorage.getItem(STORAGE_KEYS.CURRENT_DAY)) || 1;
    dayStartTime = localStorage.getItem(STORAGE_KEYS.DAY_START_TIME);
    dayCompletedTime = localStorage.getItem(STORAGE_KEYS.DAY_COMPLETED_TIME);
    
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
    if (savedTheme) setTheme(savedTheme);
    
    const savedLang = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
    if (savedLang) {
        currentLanguage = savedLang;
        document.getElementById('lang-ru').classList.toggle('active', savedLang === 'ru');
        document.getElementById('lang-en').classList.toggle('active', savedLang === 'en');
    }
    
    const savedHabits = localStorage.getItem(STORAGE_KEYS.HABITS);
    if (savedHabits) {
        habits = JSON.parse(savedHabits);
        DEFAULT_HABITS.forEach(defaultHabit => {
            const exists = habits.some(h => h.id === defaultHabit.id);
            if (!exists) {
                habits.push({...defaultHabit});
            }
        });
    } else {
        habits = DEFAULT_HABITS.map(h => ({...h}));
    }
    
    const savedTasks = localStorage.getItem(STORAGE_KEYS.TASKS);
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        DEFAULT_TASKS.forEach(defaultTask => {
            const exists = tasks.some(t => t.id === defaultTask.id);
            if (!exists) {
                tasks.push({...defaultTask});
            }
        });
    } else {
        tasks = DEFAULT_TASKS.map(t => ({...t}));
    }
    
    const savedEntries = localStorage.getItem(STORAGE_KEYS.DIARY_ENTRIES);
    diaryEntries = savedEntries ? JSON.parse(savedEntries) : [];
    
    // Загружаем данные для бега
    runningHistory = JSON.parse(localStorage.getItem(RUNNING_KEYS.HISTORY)) || [];
    loadActiveWorkout();
    
    sortItems();
}

function saveData() {
    localStorage.setItem(STORAGE_KEYS.DAY_STARTED, dayStarted);
    localStorage.setItem(STORAGE_KEYS.CURRENT_DAY, currentDay);
    localStorage.setItem(STORAGE_KEYS.HABITS, JSON.stringify(habits));
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
    localStorage.setItem(STORAGE_KEYS.DIARY_ENTRIES, JSON.stringify(diaryEntries));
    
    if (dayStartTime) {
        localStorage.setItem(STORAGE_KEYS.DAY_START_TIME, dayStartTime);
    }
    if (dayCompletedTime) {
        localStorage.setItem(STORAGE_KEYS.DAY_COMPLETED_TIME, dayCompletedTime);
    }
}

function sortItems() {
    habits.sort((a, b) => a.id - b.id);
    tasks.sort((a, b) => a.id - b.id);
    diaryEntries.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// ========== ТЕМА И ЯЗЫК ==========

function setTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
    
    document.getElementById('theme-dark').classList.toggle('active', theme === 'dark');
    document.getElementById('theme-light').classList.toggle('active', theme === 'light');
}

function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
    
    document.getElementById('lang-ru').classList.toggle('active', lang === 'ru');
    document.getElementById('lang-en').classList.toggle('active', lang === 'en');
    
    updateAllText();
    updateDate();
    updateUI();
    renderRunningSection();
}

// ========== НАВИГАЦИЯ ==========

function switchPage(pageIndex) {
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
    
    currentSlide = pageIndex;
    
    // Если перешли на слайд бега, обновляем его
    if (pageIndex === 2) {
        renderRunningSection();
    }
}

// ========== ДАТА ==========

function updateDate() {
    const now = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    currentDateEl.textContent = now.toLocaleDateString(currentLanguage === 'ru' ? 'ru-RU' : 'en-US', options);
}

// ========== БАЛАНС ==========

function updateBalance() {
    const totalHabits = habits.length || 1;
    const completedHabits = habits.filter(h => h.completed).length;
    const mindProgress = (completedHabits / totalHabits) * 100;
    
    const totalTasks = tasks.length || 1;
    const completedTasks = tasks.filter(t => t.completed).length;
    const spiritProgress = (completedTasks / totalTasks) * 100;
    
    mindFill.style.width = `${mindProgress}%`;
    spiritFill.style.width = `${spiritProgress}%`;
    
    mindPercent.textContent = `${Math.round(mindProgress)}%`;
    spiritPercent.textContent = `${Math.round(spiritProgress)}%`;
    
    const allTasksCompleted = tasks.every(t => t.completed);
    const canComplete = canCompleteDayByTime();
    const dayExpired = isDayExpired();
    
    if (dayExpired) {
        completeDayBtn.disabled = true;
        completeDayBtn.textContent = t('dayExpired');
    } else if (!canComplete) {
        completeDayBtn.disabled = true;
        completeDayBtn.textContent = t('until23');
    } else {
        completeDayBtn.disabled = !allTasksCompleted;
        completeDayBtn.textContent = t('completeBtn');
    }
}

// ========== ОТРИСОВКА ==========

function renderHabits() {
    habitsList.innerHTML = '';
    
    habits.forEach((habit, index) => {
        const habitDiv = document.createElement('div');
        habitDiv.className = 'habit-item';
        habitDiv.style.animationDelay = `${index * 0.05}s`;
        
        const deleteBtn = habit.id <= 4 ? '' : `<button class="delete-btn" data-id="${habit.id}">✕</button>`;
        
        habitDiv.innerHTML = `
            <input type="checkbox" class="habit-checkbox" data-id="${habit.id}" ${habit.completed ? 'checked' : ''}>
            <span class="habit-text ${habit.completed ? 'completed' : ''}">${habit.text}</span>
            ${deleteBtn}
        `;
        habitsList.appendChild(habitDiv);
    });
    
    document.querySelectorAll('.habit-checkbox').forEach(cb => {
        cb.addEventListener('change', function() {
            const id = parseInt(this.dataset.id);
            const habit = habits.find(h => h.id === id);
            if (habit) {
                habit.completed = this.checked;
                saveData();
                updateBalance();
                renderHabits();
            }
        });
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.dataset.id);
            if (id <= 4) {
                tg.showAlert(t('cantDeleteStandard'));
                return;
            }
            habits = habits.filter(h => h.id !== id);
            saveData();
            renderHabits();
            updateBalance();
        });
    });
}

function renderTasks() {
    tasksList.innerHTML = '';
    
    tasks.forEach((task, index) => {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task-item';
        taskDiv.style.animationDelay = `${index * 0.05}s`;
        
        const deleteBtn = task.id <= 4 ? '' : `<button class="delete-btn" data-id="${task.id}">✕</button>`;
        
        taskDiv.innerHTML = `
            <input type="checkbox" class="task-checkbox" data-id="${task.id}" ${task.completed ? 'checked' : ''}>
            <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
            ${deleteBtn}
        `;
        tasksList.appendChild(taskDiv);
    });
    
    document.querySelectorAll('.task-checkbox').forEach(cb => {
        cb.addEventListener('change', function() {
            const id = parseInt(this.dataset.id);
            const task = tasks.find(t => t.id === id);
            if (task) {
                task.completed = this.checked;
                saveData();
                renderTasks();
                updateBalance();
            }
        });
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.dataset.id);
            if (id <= 4) {
                tg.showAlert(t('cantDeleteStandardTask'));
                return;
            }
            tasks = tasks.filter(t => t.id !== id);
            saveData();
            renderTasks();
            updateBalance();
        });
    });
}

function renderDiary() {
    if (!entriesList) return;
    
    entriesList.innerHTML = '';
    
    if (diaryEntries.length === 0) {
        entriesList.innerHTML = `<div class="empty-entries">${t('noEntries')}</div>`;
        return;
    }
    
    diaryEntries.forEach((entry, index) => {
        const entryDiv = document.createElement('div');
        entryDiv.className = 'entry-item';
        entryDiv.style.animationDelay = `${index * 0.05}s`;
        
        const date = new Date(entry.date);
        const formattedDate = date.toLocaleDateString(currentLanguage === 'ru' ? 'ru-RU' : 'en-US', {
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
            saveData();
            renderDiary();
        });
    });
}

// ========== UI ОБНОВЛЕНИЕ ==========

function updateUI() {
    startDayNumber.textContent = currentDay;
    
    if (!dayStarted) {
        startScreen.style.display = 'block';
        marathonScreen.style.display = 'none';
        congratsDiv.style.display = 'none';
        
        const canStart = canStartNewDay();
        const canStartByTime = canStartDayByTime();
        
        if (dayCompletedTime && !canStart) {
            startDayBtn.disabled = true;
            const remaining = getTimeRemaining();
            if (remaining) {
                startDayBtn.textContent = t('waitHours', remaining.hours, remaining.minutes);
            }
        } else if (!canStartByTime) {
            startDayBtn.disabled = true;
            startDayBtn.textContent = t('waitUntil4am');
        } else {
            startDayBtn.disabled = false;
            startDayBtn.textContent = t('startDayBtn');
        }
        
        updateTimeInfo();
    } else {
        startScreen.style.display = 'none';
        marathonScreen.style.display = 'block';
        congratsDiv.style.display = 'none';
        
        if (isDayExpired()) {
            dayStarted = false;
            dayCompletedTime = new Date().getTime().toString();
            saveData();
            tg.showAlert(t('dayExpiredMsg'));
            updateUI();
            return;
        }
        
        renderHabits();
        renderTasks();
        updateBalance();
        updateDeadlineInfo();
    }
    
    renderDiary();
}

// ========== ОБРАБОТЧИКИ ==========

startDayBtn.addEventListener('click', () => {
    if (!canStartNewDay()) {
        const remaining = getTimeRemaining();
        tg.showAlert(t('waitMessage', remaining.hours, remaining.minutes));
        return;
    }
    
    if (!canStartDayByTime()) {
        tg.showAlert(t('onlyFrom4am'));
        return;
    }
    
    dayStarted = true;
    dayStartTime = new Date().getTime().toString();
    dayCompletedTime = null;
    saveData();
    updateUI();
});

completeDayBtn.addEventListener('click', () => {
    if (!canCompleteDayByTime()) {
        tg.showAlert(t('onlyUntil23'));
        return;
    }
    
    if (isDayExpired()) {
        tg.showAlert(t('dayExpiredMsg'));
        return;
    }
    
    const totalHabits = habits.length || 1;
    const completedHabits = habits.filter(h => h.completed).length;
    const mindProgress = Math.round((completedHabits / totalHabits) * 100);
    
    const totalTasks = tasks.length || 1;
    const completedTasks = tasks.filter(t => t.completed).length;
    const spiritProgress = Math.round((completedTasks / totalTasks) * 100);
    
    document.getElementById('final-mind').textContent = mindProgress;
    document.getElementById('final-spirit').textContent = spiritProgress;
    
    dayCompletedTime = new Date().getTime().toString();
    dayStarted = false;
    dayStartTime = null;
    
    saveData();
    
    startScreen.style.display = 'none';
    marathonScreen.style.display = 'none';
    congratsDiv.style.display = 'block';
    
    tg.showAlert(t('completedMessage', currentDay, mindProgress, spiritProgress));
});

// Добавление привычки
addHabitBtn.addEventListener('click', () => {
    addHabitInput.style.display = 'flex';
    addHabitBtn.style.display = 'none';
});

saveHabitBtn.addEventListener('click', () => {
    const text = habitText.value.trim();
    if (text) {
        const newId = Math.max(...habits.map(h => h.id), 4) + 1;
        habits.push({
            id: newId,
            text: text,
            completed: false
        });
        saveData();
        renderHabits();
        updateBalance();
        
        habitText.value = '';
        addHabitInput.style.display = 'none';
        addHabitBtn.style.display = 'flex';
    }
});

// Добавление задачи
addTaskBtn.addEventListener('click', () => {
    addTaskInput.style.display = 'flex';
    addTaskBtn.style.display = 'none';
});

saveTaskBtn.addEventListener('click', () => {
    const text = taskText.value.trim();
    if (text) {
        const newId = Math.max(...tasks.map(t => t.id), 4) + 1;
        tasks.push({
            id: newId,
            text: text,
            completed: false
        });
        saveData();
        renderTasks();
        updateBalance();
        
        taskText.value = '';
        addTaskInput.style.display = 'none';
        addTaskBtn.style.display = 'flex';
    }
});

// Дневник
addEntryBtn.addEventListener('click', () => {
    addEntryForm.style.display = 'block';
    addEntryBtn.style.display = 'none';
});

saveEntryBtn.addEventListener('click', () => {
    const text = entryText.value.trim();
    if (text) {
        const newEntry = {
            id: Date.now(),
            text: text,
            date: new Date().toISOString()
        };
        diaryEntries.unshift(newEntry);
        saveData();
        renderDiary();
        
        entryText.value = '';
        addEntryForm.style.display = 'none';
        addEntryBtn.style.display = 'flex';
    }
});

cancelEntryBtn.addEventListener('click', () => {
    entryText.value = '';
    addEntryForm.style.display = 'none';
    addEntryBtn.style.display = 'flex';
});

// Enter
habitText.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        saveHabitBtn.click();
    }
});

taskText.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        saveTaskBtn.click();
    }
});

// Меню
menuBtn.addEventListener('click', () => {
    if (menuDropdown.style.display === 'none') {
        menuDropdown.style.display = 'block';
        menuBtn.classList.add('active');
    } else {
        menuDropdown.style.display = 'none';
        menuBtn.classList.remove('active');
    }
});

document.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !menuDropdown.contains(e.target)) {
        menuDropdown.style.display = 'none';
        menuBtn.classList.remove('active');
    }
});

// Функции меню
resetDayBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (confirm(t('confirmReset'))) {
        dayStarted = false;
        dayStartTime = null;
        dayCompletedTime = null;
        habits.forEach(h => h.completed = false);
        tasks.forEach(t => t.completed = false);
        saveData();
        updateUI();
        menuDropdown.style.display = 'none';
    }
});

newMarathonBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (confirm(t('confirmNew'))) {
        currentDay = 1;
        dayStarted = false;
        dayStartTime = null;
        dayCompletedTime = null;
        habits = DEFAULT_HABITS.map(h => ({...h}));
        tasks = DEFAULT_TASKS.map(t => ({...t}));
        diaryEntries = [];
        saveData();
        updateUI();
        menuDropdown.style.display = 'none';
    }
});

statsBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const customHabits = habits.filter(h => h.id > 4).length;
    const customTasks = tasks.filter(t => t.id > 4).length;
    
    tg.showAlert(t('statsMessage', currentDay, customHabits, customTasks, diaryEntries.length));
    menuDropdown.style.display = 'none';
});

supportBtn.addEventListener('click', (e) => {
    e.preventDefault();
    tg.showAlert('💬 Поддержка: @frontendchikk');
    menuDropdown.style.display = 'none';
});

telegramSupport.addEventListener('click', (e) => {
    e.preventDefault();
    tg.openTelegramLink('https://t.me/frontendchikk');
    menuDropdown.style.display = 'none';
});

faqBtn.addEventListener('click', (e) => {
    e.preventDefault();
    tg.showAlert(t('faqText'));
    menuDropdown.style.display = 'none';
});

// Кнопка продолжения
continueBtn.addEventListener('click', () => {
    congratsDiv.style.display = 'none';
    updateUI();
});

// Следим за скроллом
document.getElementById('slidesContainer').addEventListener('scroll', (e) => {
    const container = e.target;
    const pageIndex = Math.round(container.scrollLeft / container.clientWidth);
    
    if (pageIndex !== currentSlide) {
        currentSlide = pageIndex;
        document.querySelectorAll('.nav-btn').forEach((btn, index) => {
            btn.classList.toggle('active', index === pageIndex);
        });
        
        // Если перешли на слайд бега, обновляем его
        if (pageIndex === 2) {
            renderRunningSection();
        }
    }
});

// Проверка времени каждую минуту
setInterval(() => {
    if (dayStarted) {
        updateUI();
    } else {
        updateTimeInfo();
    }
}, 60000);

// Глобальные функции
window.switchPage = switchPage;
window.setTheme = setTheme;
window.setLanguage = setLanguage;

// Инициализация
updateDate();
loadData();
updateAllText();
updateUI();
renderRunningSection();

tg.ready();
