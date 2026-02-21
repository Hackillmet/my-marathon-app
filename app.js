let tg = window.Telegram.WebApp;
tg.expand();

// Получаем ID пользователя
const userId = tg.initDataUnsafe?.user?.id || 'local_user';

// Ключи для хранения
const STORAGE_KEYS = {
    RUNNING_HISTORY: `running_history_${userId}`,
    ACTIVE_WORKOUT: `active_workout_${userId}`,
    DIARY_ENTRIES: `diary_entries_${userId}`,
    THEME: `theme_${userId}`,
    LANGUAGE: `language_${userId}`,
    WEEKLY_GOAL: `weekly_goal_${userId}`
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

// ПЕРЕВОДЫ
const translations = {
    ru: {
        stats: "Статистика",
        run: "Бег",
        diary: "Дневник",
        settings: "Настройки",
        
        // Статистика
        totalWorkouts: "Всего тренировок",
        totalKm: "Всего км",
        avgDistance: "Средняя км",
        bestDistance: "Лучшая",
        currentStreak: "Дней подряд",
        thisWeek: "Эта неделя",
        recent: "Последние",
        
        // Бег
        runningTitle: "🏃 БЕГ",
        totalRuns: "Тренировок",
        totalKmShort: "Всего км",
        startRun: "🏃 Начать бегать",
        workoutHistory: "📋 История тренировок",
        emptyHistory: "Пока нет тренировок",
        completeWorkout: "✅ Завершить тренировку",
        cancelWorkout: "❌ Отменить",
        workoutCompleted: "🎉 Тренировка завершена!",
        workoutCompletedText: (name, km) => `Ты пробежал ${km} км!`,
        
        // Дневник
        diaryTitle: "📔 ДНЕВНИК ТРЕНИРОВОК",
        newEntry: "Новая запись",
        save: "Сохранить",
        cancel: "Отмена",
        noEntries: "📝 Пока нет записей",
        entryPlaceholder: "Как прошла тренировка? Поделись впечатлениями...",
        
        // Настройки
        settingsTitle: "⚙️ НАСТРОЙКИ",
        themeTitle: "🎨 Тема оформления",
        dark: "🌑 Темная",
        light: "☀️ Светлая",
        languageTitle: "🌍 Язык",
        goalsTitle: "🎯 Цели",
        weeklyGoal: "Недельная цель (км)",
        aboutTitle: "ℹ️ О приложении",
        version: "Версия:",
        author: "Автор:",
        description: "Спортивная дисциплина - трекинг тренировок",
        
        // Меню
        stats_menu: "📊 СТАТИСТИКА",
        resetStats: "🔄 Сбросить статистику",
        exportData: "📤 Экспорт данных",
        help: "🆘 ПОМОЩЬ",
        support: "💬 Поддержка",
        contact: "Связаться:",
        faq: "❓ FAQ",
        contacts: "📞 КОНТАКТЫ",
        authorLabel: "👤 Автор:",
        
        // Сообщения
        confirmReset: "Сбросить всю статистику? Это действие нельзя отменить.",
        noWorkouts: "Нет тренировок"
    },
    en: {
        stats: "Statistics",
        run: "Run",
        diary: "Diary",
        settings: "Settings",
        
        // Statistics
        totalWorkouts: "Total workouts",
        totalKm: "Total km",
        avgDistance: "Avg km",
        bestDistance: "Best",
        currentStreak: "Day streak",
        thisWeek: "This week",
        recent: "Recent",
        
        // Running
        runningTitle: "🏃 RUNNING",
        totalRuns: "Workouts",
        totalKmShort: "Total km",
        startRun: "🏃 Start Running",
        workoutHistory: "📋 Workout History",
        emptyHistory: "No workouts yet",
        completeWorkout: "✅ Complete Workout",
        cancelWorkout: "❌ Cancel",
        workoutCompleted: "🎉 Workout Completed!",
        workoutCompletedText: (name, km) => `You ran ${km} km!`,
        
        // Diary
        diaryTitle: "📔 WORKOUT DIARY",
        newEntry: "New entry",
        save: "Save",
        cancel: "Cancel",
        noEntries: "📝 No entries yet",
        entryPlaceholder: "How was your workout? Share your thoughts...",
        
        // Settings
        settingsTitle: "⚙️ SETTINGS",
        themeTitle: "🎨 Theme",
        dark: "🌑 Dark",
        light: "☀️ Light",
        languageTitle: "🌍 Language",
        goalsTitle: "🎯 Goals",
        weeklyGoal: "Weekly goal (km)",
        aboutTitle: "ℹ️ About",
        version: "Version:",
        author: "Author:",
        description: "Sport Discipline - workout tracking",
        
        // Menu
        stats_menu: "📊 STATISTICS",
        resetStats: "🔄 Reset Stats",
        exportData: "📤 Export Data",
        help: "🆘 HELP",
        support: "💬 Support",
        contact: "Contact:",
        faq: "❓ FAQ",
        contacts: "📞 CONTACTS",
        authorLabel: "👤 Author:",
        
        // Messages
        confirmReset: "Reset all statistics? This cannot be undone.",
        noWorkouts: "No workouts"
    }
};

// Состояние приложения
let runningHistory = JSON.parse(localStorage.getItem(STORAGE_KEYS.RUNNING_HISTORY)) || [];
let diaryEntries = JSON.parse(localStorage.getItem(STORAGE_KEYS.DIARY_ENTRIES)) || [];
let activeWorkout = null;
let currentLanguage = localStorage.getItem(STORAGE_KEYS.LANGUAGE) || 'ru';
let currentTheme = localStorage.getItem(STORAGE_KEYS.THEME) || 'dark';
let weeklyGoal = parseInt(localStorage.getItem(STORAGE_KEYS.WEEKLY_GOAL)) || 20;
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

// Загрузка активной тренировки
function loadActiveWorkout() {
    const saved = localStorage.getItem(STORAGE_KEYS.ACTIVE_WORKOUT);
    if (saved) {
        activeWorkout = JSON.parse(saved);
    }
}

// Сохранение
function saveAll() {
    localStorage.setItem(STORAGE_KEYS.RUNNING_HISTORY, JSON.stringify(runningHistory));
    localStorage.setItem(STORAGE_KEYS.DIARY_ENTRIES, JSON.stringify(diaryEntries));
    localStorage.setItem(STORAGE_KEYS.THEME, currentTheme);
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, currentLanguage);
    localStorage.setItem(STORAGE_KEYS.WEEKLY_GOAL, weeklyGoal);
    
    if (activeWorkout) {
        localStorage.setItem(STORAGE_KEYS.ACTIVE_WORKOUT, JSON.stringify(activeWorkout));
    } else {
        localStorage.removeItem(STORAGE_KEYS.ACTIVE_WORKOUT);
    }
}

// ========== СТАТИСТИКА ==========
function updateStats() {
    // Общая статистика
    const totalWorkouts = runningHistory.length;
    const totalDistance = runningHistory.reduce((sum, run) => sum + run.distance, 0);
    const avgDistance = totalWorkouts > 0 ? (totalDistance / totalWorkouts).toFixed(1) : 0;
    const bestDistance = runningHistory.length > 0 
        ? Math.max(...runningHistory.map(r => r.distance)) 
        : 0;
    
    // Streak (дни подряд)
    let streak = 0;
    if (runningHistory.length > 0) {
        const sorted = [...runningHistory].sort((a, b) => new Date(b.date) - new Date(a.date));
        const today = new Date().toDateString();
        const lastWorkout = new Date(sorted[0].date).toDateString();
        
        if (lastWorkout === today) streak = 1;
    }
    
    // Недельный прогресс
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1));
    startOfWeek.setHours(0, 0, 0, 0);
    
    const weekDistance = runningHistory
        .filter(run => new Date(run.date) >= startOfWeek)
        .reduce((sum, run) => sum + run.distance, 0);
    
    const weekProgress = (weekDistance / weeklyGoal) * 100;
    
    // Обновляем UI
    document.getElementById('total-workouts').textContent = totalWorkouts;
    document.getElementById('total-distance').textContent = totalDistance.toFixed(1);
    document.getElementById('avg-distance').textContent = avgDistance;
    document.getElementById('best-distance').textContent = bestDistance.toFixed(1);
    document.getElementById('current-streak').textContent = streak;
    document.getElementById('week-current').textContent = weekDistance.toFixed(1);
    document.getElementById('week-goal').textContent = weeklyGoal;
    document.getElementById('week-progress').style.width = `${Math.min(weekProgress, 100)}%`;
    
    // Последние тренировки
    const recentList = document.getElementById('recent-list');
    if (recentList) {
        recentList.innerHTML = '';
        
        const recent = runningHistory.slice(-5).reverse();
        if (recent.length === 0) {
            recentList.innerHTML = `<div class="recent-item">${t('noWorkouts')}</div>`;
        } else {
            recent.forEach(run => {
                const date = new Date(run.date);
                const formattedDate = date.toLocaleDateString(currentLanguage === 'ru' ? 'ru-RU' : 'en-US', {
                    day: 'numeric',
                    month: 'short'
                });
                
                const item = document.createElement('div');
                item.className = 'recent-item';
                item.innerHTML = `
                    <span class="recent-date">${formattedDate}</span>
                    <span class="recent-distance">${run.distance} км</span>
                `;
                recentList.appendChild(item);
            });
        }
    }
}

// ========== БЕГ ==========
function updateRunningStats() {
    const totalRuns = runningHistory.length;
    const totalKm = runningHistory.reduce((sum, run) => sum + run.distance, 0);
    
    document.getElementById('total-runs').textContent = totalRuns;
    document.getElementById('total-km').textContent = totalKm.toFixed(1);
}

function renderRunningHistory() {
    const historyList = document.getElementById('history-list');
    if (!historyList) return;
    
    historyList.innerHTML = '';
    
    if (runningHistory.length === 0) {
        historyList.innerHTML = `<div class="empty-history">${t('emptyHistory')}</div>`;
        return;
    }
    
    const recentHistory = runningHistory.slice(-10).reverse();
    
    recentHistory.forEach(run => {
        const date = new Date(run.date);
        const formattedDate = date.toLocaleDateString(currentLanguage === 'ru' ? 'ru-RU' : 'en-US', {
            day: 'numeric',
            month: 'short'
        });
        
        const item = document.createElement('div');
        item.className = 'history-item';
        item.innerHTML = `
            <span class="history-date">${formattedDate}</span>
            <span class="history-workout">${run.name}</span>
            <span class="history-stats">${run.distance} км</span>
        `;
        historyList.appendChild(item);
    });
}

function startWorkout() {
    const randomIndex = Math.floor(Math.random() * RUNNING_WORKOUTS.length);
    const workout = JSON.parse(JSON.stringify(RUNNING_WORKOUTS[randomIndex]));
    
    workout.steps.forEach(step => {
        step.completed = false;
    });
    
    workout.startTime = new Date().toISOString();
    activeWorkout = workout;
    saveAll();
    renderRunningSection();
}

function cancelWorkout() {
    activeWorkout = null;
    saveAll();
    renderRunningSection();
}

function completeWorkout() {
    if (!activeWorkout) return;
    
    let completedDistance = 0;
    activeWorkout.steps.forEach(step => {
        if (step.completed) {
            completedDistance += step.distance || 0;
        }
    });
    
    const historyEntry = {
        id: Date.now(),
        name: activeWorkout.name,
        distance: completedDistance,
        date: new Date().toISOString()
    };
    
    runningHistory.push(historyEntry);
    activeWorkout = null;
    saveAll();
    
    updateRunningStats();
    renderRunningSection();
    updateStats(); // Обновляем статистику
    
    tg.showPopup({
        title: t('workoutCompleted'),
        message: t('workoutCompletedText', historyEntry.name, completedDistance.toFixed(1)),
        buttons: [{ type: 'close' }]
    });
}

function updateWorkoutStep(stepId, completed) {
    if (!activeWorkout) return;
    
    const step = activeWorkout.steps.find(s => s.id === stepId);
    if (step) {
        step.completed = completed;
        saveAll();
        renderRunningSection();
        
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

function renderRunningSection() {
    const workoutContainer = document.getElementById('workout-container');
    if (!workoutContainer) return;
    
    updateRunningStats();
    renderRunningHistory();
    
    if (activeWorkout) {
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
                        <span class="workout-stat-value">${Math.round(progress)}%</span>
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
        
        document.querySelectorAll('.workout-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const stepId = parseInt(this.dataset.stepId);
                updateWorkoutStep(stepId, this.checked);
            });
        });
        
        document.getElementById('complete-workout-btn')?.addEventListener('click', completeWorkout);
        document.getElementById('cancel-workout-btn')?.addEventListener('click', cancelWorkout);
        
    } else {
        workoutContainer.innerHTML = `
            <button class="start-workout-btn" id="start-workout-btn">
                🏃 ${t('startRun')}
            </button>
        `;
        
        document.getElementById('start-workout-btn')?.addEventListener('click', startWorkout);
    }
}

// ========== ДНЕВНИК ==========
function renderDiary() {
    const entriesList = document.getElementById('entries-list');
    if (!entriesList) return;
    
    entriesList.innerHTML = '';
    
    if (diaryEntries.length === 0) {
        entriesList.innerHTML = `<div class="empty-entries">${t('noEntries')}</div>`;
        return;
    }
    
    [...diaryEntries].reverse().forEach((entry, index) => {
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
            saveAll();
            renderDiary();
        });
    });
}

// ========== ТЕМА И ЯЗЫК ==========
function setTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
    
    document.getElementById('theme-dark')?.classList.toggle('active', theme === 'dark');
    document.getElementById('theme-light')?.classList.toggle('active', theme === 'light');
}

function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
    
    document.getElementById('lang-ru')?.classList.toggle('active', lang === 'ru');
    document.getElementById('lang-en')?.classList.toggle('active', lang === 'en');
    
    updateAllText();
    updateStats();
}

function updateAllText() {
    // Навигация
    document.querySelectorAll('.nav-text')[0].textContent = t('stats');
    document.querySelectorAll('.nav-text')[1].textContent = t('run');
    document.querySelectorAll('.nav-text')[2].textContent = t('diary');
    document.querySelectorAll('.nav-text')[3].textContent = t('settings');
    
    // Заголовки
    document.querySelector('.stats-title').textContent = t('stats').toUpperCase();
    document.querySelector('.running-title').textContent = t('runningTitle');
    document.querySelector('.diary-title').textContent = t('diaryTitle');
    document.querySelector('.settings-title').textContent = t('settingsTitle');
    
    // Статистика
    document.querySelectorAll('.stat-card.large .stat-label')[0].textContent = t('totalWorkouts');
    document.querySelectorAll('.stat-card.large .stat-label')[1].textContent = t('totalKm');
    
    const secondaryLabels = document.querySelectorAll('.secondary-stats .stat-label');
    if (secondaryLabels[0]) secondaryLabels[0].textContent = t('avgDistance');
    if (secondaryLabels[1]) secondaryLabels[1].textContent = t('bestDistance');
    if (secondaryLabels[2]) secondaryLabels[2].textContent = t('currentStreak');
    
    document.querySelector('.weekly-progress h3').textContent = t('thisWeek');
    document.querySelector('.recent-workouts h3').textContent = t('recent');
    
    // Настройки
    const settingsGroups = document.querySelectorAll('.settings-group h3');
    if (settingsGroups[0]) settingsGroups[0].textContent = t('themeTitle');
    if (settingsGroups[1]) settingsGroups[1].textContent = t('languageTitle');
    if (settingsGroups[2]) settingsGroups[2].textContent = t('goalsTitle');
    if (settingsGroups[3]) settingsGroups[3].textContent = t('aboutTitle');
    
    document.getElementById('theme-dark').innerHTML = '<span class="theme-preview dark-preview"></span><span>' + t('dark') + '</span>';
    document.getElementById('theme-light').innerHTML = '<span class="theme-preview light-preview"></span><span>' + t('light') + '</span>';
    
    document.querySelector('.goal-setting label').textContent = t('weeklyGoal');
    
    const aboutInfo = document.querySelector('.about-info');
    if (aboutInfo) {
        aboutInfo.innerHTML = `
            <p>${t('version')} 2.0.0</p>
            <p>${t('author')} @frontendchikk</p>
            <p>${t('description')}</p>
        `;
    }
    
    // Меню
    document.querySelectorAll('.menu-title')[0].textContent = t('stats_menu');
    document.querySelectorAll('.menu-title')[1].textContent = t('help');
    document.querySelectorAll('.menu-title')[2].textContent = t('contacts');
    
    document.getElementById('reset-stats').innerHTML = t('resetStats');
    document.getElementById('export-data').innerHTML = t('exportData');
    document.getElementById('support').innerHTML = t('support');
    document.getElementById('telegram-support').innerHTML = `📱 ${t('contact')} @frontendchikk`;
    document.getElementById('faq').innerHTML = t('faq');
    
    const contactItems = document.querySelectorAll('.contact-item');
    if (contactItems[0]) {
        contactItems[0].innerHTML = `<span>${t('authorLabel')}</span><span class="contact-highlight">@frontendchikk</span>`;
    }
    
    // Дневник
    document.getElementById('add-entry-btn').innerHTML = `<span class="plus-icon">+</span> ${t('newEntry')}`;
    document.getElementById('save-entry-btn').textContent = t('save');
    document.getElementById('cancel-entry-btn').textContent = t('cancel');
    document.getElementById('entry-text').placeholder = t('entryPlaceholder');
    
    // Бег
    const startWorkoutBtn = document.getElementById('start-workout-btn');
    if (startWorkoutBtn) startWorkoutBtn.innerHTML = `🏃 ${t('startRun')}`;
    
    const workoutHistoryTitle = document.querySelector('.workout-history h3');
    if (workoutHistoryTitle) workoutHistoryTitle.textContent = t('workoutHistory');
}

// ========== НАВИГАЦИЯ ==========
function switchPage(pageIndex) {
    const slides = document.querySelectorAll('.slide');
    const navButtons = document.querySelectorAll('.nav-btn');
    const container = document.getElementById('slidesContainer');
    
    if (pageIndex < 0 || pageIndex >= slides.length) return;
    
    container.scrollTo({
        left: pageIndex * container.clientWidth,
        behavior: 'smooth'
    });
    
    navButtons.forEach((btn, index) => {
        btn.classList.toggle('active', index === pageIndex);
    });
    
    currentSlide = pageIndex;
    
    // Обновляем контент при переключении
    if (pageIndex === 0) updateStats();
    if (pageIndex === 1) renderRunningSection();
    if (pageIndex === 2) renderDiary();
}

// ========== ДАТА ==========
function updateDate() {
    const now = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    document.getElementById('current-date').textContent = now.toLocaleDateString(currentLanguage === 'ru' ? 'ru-RU' : 'en-US', options);
}

// ========== ОБРАБОТЧИКИ ==========
document.addEventListener('DOMContentLoaded', () => {
    // Загрузка
    loadActiveWorkout();
    setTheme(currentTheme);
    document.documentElement.setAttribute('data-theme', currentTheme);
    document.getElementById('lang-ru')?.classList.toggle('active', currentLanguage === 'ru');
    document.getElementById('lang-en')?.classList.toggle('active', currentLanguage === 'en');
    
    // Weekly goal input
    const weeklyGoalInput = document.getElementById('weekly-goal');
    if (weeklyGoalInput) {
        weeklyGoalInput.value = weeklyGoal;
        weeklyGoalInput.addEventListener('change', (e) => {
            weeklyGoal = parseInt(e.target.value) || 20;
            localStorage.setItem(STORAGE_KEYS.WEEKLY_GOAL, weeklyGoal);
            updateStats();
        });
    }
    
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
    
    // Сброс статистики
    document.getElementById('reset-stats').addEventListener('click', (e) => {
        e.preventDefault();
        if (confirm(t('confirmReset'))) {
            runningHistory = [];
            diaryEntries = [];
            activeWorkout = null;
            saveAll();
            updateStats();
            renderRunningSection();
            renderDiary();
            document.getElementById('menu-dropdown').style.display = 'none';
            document.getElementById('menu-btn').classList.remove('active');
        }
    });
    
    // Экспорт данных
    document.getElementById('export-data').addEventListener('click', (e) => {
        e.preventDefault();
        const data = {
            workouts: runningHistory,
            diary: diaryEntries,
            stats: {
                total: runningHistory.length,
                distance: runningHistory.reduce((sum, r) => sum + r.distance, 0)
            }
        };
        tg.showAlert(JSON.stringify(data, null, 2));
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
    
    document.getElementById('faq').addEventListener('click', (e) => {
        e.preventDefault();
        tg.showAlert('❓ FAQ - скоро будет');
        document.getElementById('menu-dropdown').style.display = 'none';
        document.getElementById('menu-btn').classList.remove('active');
    });
    
    // Дневник
    document.getElementById('add-entry-btn').addEventListener('click', () => {
        document.getElementById('add-entry-form').style.display = 'block';
        document.getElementById('add-entry-btn').style.display = 'none';
    });
    
    document.getElementById('save-entry-btn').addEventListener('click', () => {
        const text = document.getElementById('entry-text').value.trim();
        if (text) {
            diaryEntries.push({
                id: Date.now(),
                text: text,
                date: new Date().toISOString()
            });
            saveAll();
            renderDiary();
            
            document.getElementById('entry-text').value = '';
            document.getElementById('add-entry-form').style.display = 'none';
            document.getElementById('add-entry-btn').style.display = 'flex';
        }
    });
    
    document.getElementById('cancel-entry-btn').addEventListener('click', () => {
        document.getElementById('entry-text').value = '';
        document.getElementById('add-entry-form').style.display = 'none';
        document.getElementById('add-entry-btn').style.display = 'flex';
    });
    
    // Следим за скроллом
    document.getElementById('slidesContainer').addEventListener('scroll', (e) => {
        const container = e.target;
        const pageIndex = Math.round(container.scrollLeft / container.clientWidth);
        const navButtons = document.querySelectorAll('.nav-btn');
        
        if (pageIndex !== currentSlide && pageIndex >= 0 && pageIndex < navButtons.length) {
            currentSlide = pageIndex;
            navButtons.forEach((btn, index) => {
                btn.classList.toggle('active', index === pageIndex);
            });
            
            if (pageIndex === 0) updateStats();
            if (pageIndex === 1) renderRunningSection();
            if (pageIndex === 2) renderDiary();
        }
    });
    
    // Инициализация
    updateDate();
    updateAllText();
    updateStats();
    renderRunningSection();
    renderDiary();
    
    tg.ready();
});

// Глобальные функции
window.switchPage = switchPage;
window.setTheme = setTheme;
window.setLanguage = setLanguage;
