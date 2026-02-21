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
    CURRENT_WORKOUT_DISTANCE: `current_workout_distance_${userId}`,
    WORKOUT_COMPLETED: `workout_completed_${userId}`,
    HISTORY: `run_history_${userId}`,
    DIARY_ENTRIES: `diary_entries_${userId}`,
    THEME: `theme_${userId}`,
    LANGUAGE: `language_${userId}`
};

// ===== 30 РАЗНЫХ ТРЕНИРОВОК =====
const DAILY_WORKOUTS = {
    1: {
        id: 1,
        name: "🏃‍♂️ День 1: Легкий старт",
        difficulty: "easy",
        steps: [
            { id: 1, text: "🏋️ Разминка 10 минут", completed: false, distance: 0 },
            { id: 2, text: "🏃 Бег 15 минут в легком темпе", completed: false, distance: 2 },
            { id: 3, text: "🦵 Спец беговые: махи ногами", completed: false, distance: 0 },
            { id: 4, text: "⚡ Ускорение 4х200 метров", completed: false, distance: 0.8 }
        ],
        totalDistance: 2.8
    },
    2: {
        id: 2,
        name: "⚡ День 2: Интервалы",
        difficulty: "medium",
        steps: [
            { id: 1, text: "🏋️ Разминка 15 минут", completed: false, distance: 0 },
            { id: 2, text: "🏃 Бег 20 минут", completed: false, distance: 3 },
            { id: 3, text: "🦵 Спец беговые: прыжки", completed: false, distance: 0 },
            { id: 4, text: "⚡ Ускорение 6х200 метров", completed: false, distance: 1.2 }
        ],
        totalDistance: 4.2
    },
    3: {
        id: 3,
        name: "🏔️ День 3: Силовая",
        difficulty: "hard",
        steps: [
            { id: 1, text: "🏋️ Разминка 20 минут", completed: false, distance: 0 },
            { id: 2, text: "🏃 Бег 25 минут", completed: false, distance: 4 },
            { id: 3, text: "🦵 Спец беговые: многоскоки", completed: false, distance: 0 },
            { id: 4, text: "⚡ Ускорение 8х200 метров", completed: false, distance: 1.6 }
        ],
        totalDistance: 5.6
    },
    4: {
        id: 4,
        name: "🌅 День 4: Восстановление",
        difficulty: "easy",
        steps: [
            { id: 1, text: "🏋️ Разминка 10 минут", completed: false, distance: 0 },
            { id: 2, text: "🏃 Бег 15 минут легкий", completed: false, distance: 2 },
            { id: 3, text: "🦵 Спец беговые: растяжка", completed: false, distance: 0 },
            { id: 4, text: "⚡ Ускорение 4х100 метров", completed: false, distance: 0.4 }
        ],
        totalDistance: 2.4
    },
    5: {
        id: 5,
        name: "🔥 День 5: Скорость",
        difficulty: "hard",
        steps: [
            { id: 1, text: "🏋️ Разминка 15 минут", completed: false, distance: 0 },
            { id: 2, text: "🏃 Бег 20 минут", completed: false, distance: 3 },
            { id: 3, text: "🦵 Спец беговые: семенящий", completed: false, distance: 0 },
            { id: 4, text: "⚡ Ускорение 10х100 метров", completed: false, distance: 1 }
        ],
        totalDistance: 4
    }
};

// Продолжение для следующих дней (до 30)
for (let i = 6; i <= 30; i++) {
    const sourceDay = ((i - 1) % 5) + 1;
    DAILY_WORKOUTS[i] = {
        ...DAILY_WORKOUTS[sourceDay],
        id: i,
        name: DAILY_WORKOUTS[sourceDay].name.replace(`День ${sourceDay}`, `День ${i}`),
        steps: DAILY_WORKOUTS[sourceDay].steps.map(step => ({
            ...step,
            id: step.id + (i * 10),
            completed: false
        }))
    };
}

// ПЕРЕВОДЫ
const translations = {
    ru: {
        startMessage: "Готов к тренировке?",
        startBtn: "🏃 Начать бег",
        completeDayBtn: "✅ Завершить день",
        waitUntil4am: "⏰ Жди 4 утра",
        waitHours: (h, m) => `⏳ Следующий день через ${h}ч ${m}м`,
        canStart: "✅ Можно начинать",
        nextDayIn: (h, m) => `⏳ Следующий день через ${h}ч ${m}м`,
        dayExpired: "⏰ День истек",
        until23: "⏳ До 23:00",
        timeLeft: (h, m) => `⏳ Осталось: ${h}ч ${m}м`,
        dayExpiredMsg: "⏰ Время вышло! Новый день с 4 утра.",
        workoutCompletedMsg: "🎉 Тренировка завершена! Теперь можно завершить день.",
        completedMessage: (day, km) => `🎉 День ${day} завершен!\nПробежал(а): ${km} км`,
        
        marathon: "🏃 МАРАФОН",
        resetMarathon: "🔄 Сбросить марафон",
        stats: "📊 Статистика",
        help: "🆘 ПОМОЩЬ",
        support: "💬 Поддержка",
        contact: "Связаться:",
        faq: "❓ FAQ",
        contacts: "📞 КОНТАКТЫ",
        author: "👤 Автор:",
        
        confirmReset: "Сбросить весь марафон? Весь прогресс будет потерян.",
        faqText: "❓ Часто задаваемые вопросы:\n\n• Каждый день новая тренировка\n• Начать бег можно с 4 утра\n• Завершить день до 23:00\n• После завершения дня - 24ч таймер\n• Статистика сохраняется",
        
        newEntry: "Новая запись",
        save: "Сохранить",
        cancel: "Отмена",
        noEntries: "📝 Пока нет записей",
        entryPlaceholder: "Как прошла тренировка?",
        
        themeTitle: "ТЕМА",
        dark: "🌑 Темная",
        light: "☀️ Светлая",
        languageTitle: "ЯЗЫК",
        aboutTitle: "О ПРИЛОЖЕНИИ",
        version: "Версия:",
        authorLabel: "Автор:"
    },
    en: {
        startMessage: "Ready for workout?",
        startBtn: "🏃 Start Run",
        completeDayBtn: "✅ Complete Day",
        waitUntil4am: "⏰ Wait 4 AM",
        waitHours: (h, m) => `⏳ Next day in ${h}h ${m}m`,
        canStart: "✅ You can start",
        nextDayIn: (h, m) => `⏳ Next day in ${h}h ${m}m`,
        dayExpired: "⏰ Day expired",
        until23: "⏳ Until 11 PM",
        timeLeft: (h, m) => `⏳ Time left: ${h}h ${m}m`,
        dayExpiredMsg: "⏰ Time is up! New day at 4 AM.",
        workoutCompletedMsg: "🎉 Workout completed! Now you can complete the day.",
        completedMessage: (day, km) => `🎉 Day ${day} completed!\nRan: ${km} km`,
        
        marathon: "🏃 MARATHON",
        resetMarathon: "🔄 Reset Marathon",
        stats: "📊 Statistics",
        help: "🆘 HELP",
        support: "💬 Support",
        contact: "Contact:",
        faq: "❓ FAQ",
        contacts: "📞 CONTACTS",
        author: "👤 Author:",
        
        confirmReset: "Reset entire marathon? All progress will be lost.",
        faqText: "❓ Frequently Asked Questions:\n\n• New workout every day\n• Start running from 4 AM\n• Complete day before 11 PM\n• 24h timer after completion\n• Statistics are saved",
        
        newEntry: "New entry",
        save: "Save",
        cancel: "Cancel",
        noEntries: "📝 No entries yet",
        entryPlaceholder: "How was your workout?",
        
        themeTitle: "THEME",
        dark: "🌑 Dark",
        light: "☀️ Light",
        languageTitle: "LANGUAGE",
        aboutTitle: "ABOUT",
        version: "Version:",
        authorLabel: "Author:"
    }
};

// Состояние
let currentDay = 1;
let dayStarted = false;
let dayStartTime = null;
let dayCompletedTime = null;
let currentWorkout = null;
let workoutCompleted = false;
let currentWorkoutDistance = 0;
let currentLanguage = 'ru';
let currentTheme = 'dark';
let runningHistory = [];
let diaryEntries = [];
let currentSlide = 0;

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
    workoutCompleted = localStorage.getItem(STORAGE_KEYS.WORKOUT_COMPLETED) === 'true';
    currentWorkoutDistance = parseFloat(localStorage.getItem(STORAGE_KEYS.CURRENT_WORKOUT_DISTANCE)) || 0;
    runningHistory = JSON.parse(localStorage.getItem(STORAGE_KEYS.HISTORY)) || [];
    diaryEntries = JSON.parse(localStorage.getItem(STORAGE_KEYS.DIARY_ENTRIES)) || [];
    
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
                id: parseInt(localStorage.getItem(STORAGE_KEYS.CURRENT_DAY)),
                name: localStorage.getItem(STORAGE_KEYS.WORKOUT_NAME),
                difficulty: localStorage.getItem(STORAGE_KEYS.WORKOUT_DIFFICULTY),
                steps: steps,
                totalDistance: parseFloat(localStorage.getItem(STORAGE_KEYS.TOTAL_DISTANCE))
            };
        } else {
            const template = DAILY_WORKOUTS[currentDay] || DAILY_WORKOUTS[((currentDay - 1) % 30) + 1];
            currentWorkout = {
                id: currentDay,
                name: template.name,
                difficulty: template.difficulty,
                steps: template.steps.map(s => ({...s, completed: false})),
                totalDistance: template.totalDistance
            };
        }
    }
}

function saveData() {
    localStorage.setItem(STORAGE_KEYS.CURRENT_DAY, currentDay);
    localStorage.setItem(STORAGE_KEYS.DAY_STARTED, dayStarted);
    localStorage.setItem(STORAGE_KEYS.DAY_START_TIME, dayStartTime);
    localStorage.setItem(STORAGE_KEYS.DAY_COMPLETED_TIME, dayCompletedTime);
    localStorage.setItem(STORAGE_KEYS.WORKOUT_COMPLETED, workoutCompleted);
    localStorage.setItem(STORAGE_KEYS.CURRENT_WORKOUT_DISTANCE, currentWorkoutDistance);
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(runningHistory));
    localStorage.setItem(STORAGE_KEYS.DIARY_ENTRIES, JSON.stringify(diaryEntries));
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
    
    if (pageIndex === 1) updateStats();
    if (pageIndex === 2) renderDiary();
}

// ========== БЕГ ==========
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
        const template = DAILY_WORKOUTS[currentDay] || DAILY_WORKOUTS[((currentDay - 1) % 30) + 1];
        currentWorkout = {
            id: currentDay,
            name: template.name,
            difficulty: template.difficulty,
            steps: template.steps.map(s => ({...s, completed: false})),
            totalDistance: template.totalDistance
        };
        workoutCompleted = false;
        currentWorkoutDistance = 0;
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
    
    const allStepsCompleted = currentWorkout.steps.every(s => s.completed);
    
    if (allStepsCompleted && !workoutCompleted) {
        workoutCompleted = true;
        
        let distance = 0;
        currentWorkout.steps.forEach(step => {
            if (step.completed) distance += step.distance || 0;
        });
        currentWorkoutDistance = distance;
        
        saveData();
        
        tg.showPopup({
            title: '🎉 Отлично!',
            message: t('workoutCompletedMsg'),
            buttons: [{ type: 'close' }]
        });
    }
    
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
        btn.disabled = !workoutCompleted;
        btn.textContent = t('completeDayBtn');
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

// ========== СТАТИСТИКА ==========
function updateStats() {
    const totalWorkouts = runningHistory.length;
    const totalDistance = runningHistory.reduce((sum, run) => sum + run.distance, 0);
    const avgDistance = totalWorkouts > 0 ? (totalDistance / totalWorkouts).toFixed(1) : 0;
    const bestDistance = runningHistory.length > 0 
        ? Math.max(...runningHistory.map(r => r.distance)) 
        : 0;
    
    document.getElementById('total-workouts').textContent = totalWorkouts;
    document.getElementById('total-distance').textContent = totalDistance.toFixed(1);
    document.getElementById('avg-distance').textContent = avgDistance;
    document.getElementById('best-distance').textContent = bestDistance.toFixed(1);
    
    document.getElementById('week-current').textContent = currentDay - 1;
    document.getElementById('week-goal').textContent = '30';
    const weekProgress = ((currentDay - 1) / 30) * 100;
    document.getElementById('week-progress').style.width = `${weekProgress}%`;
    
    const historyList = document.getElementById('history-list');
    if (historyList) {
        historyList.innerHTML = '';
        
        if (runningHistory.length === 0) {
            historyList.innerHTML = '<div class="empty-history">Пока нет тренировок</div>';
        } else {
            const recent = runningHistory.slice(-10).reverse();
            recent.forEach(run => {
                const date = new Date(run.date);
                const formattedDate = date.toLocaleDateString(currentLanguage === 'ru' ? 'ru-RU' : 'en-US', {
                    day: 'numeric',
                    month: 'short'
                });
                
                const item = document.createElement('div');
                item.className = 'history-item';
                item.innerHTML = `
                    <span class="history-date">${formattedDate}</span>
                    <span class="history-workout">${run.workout || 'Тренировка'}</span>
                    <span class="history-stats">${run.distance} км</span>
                `;
                historyList.appendChild(item);
            });
        }
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
    
    [...diaryEntries].reverse().forEach(entry => {
        const entryDiv = document.createElement('div');
        entryDiv.className = 'entry-item';
        
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

// ========== ОБНОВЛЕНИЕ ТЕКСТА ==========
function updateAllText() {
    document.getElementById('start-message').textContent = t('startMessage');
    
    const menuTitles = document.querySelectorAll('.menu-title');
    if (menuTitles[0]) menuTitles[0].textContent = t('marathon');
    if (menuTitles[1]) menuTitles[1].textContent = t('help');
    if (menuTitles[2]) menuTitles[2].textContent = t('contacts');
    
    document.getElementById('reset-marathon').innerHTML = t('resetMarathon');
    document.getElementById('stats-menu').innerHTML = `📊 ${t('stats')}`;
    document.getElementById('support').innerHTML = t('support');
    document.getElementById('telegram-support').innerHTML = `📱 ${t('contact')} @frontendchikk`;
    document.getElementById('faq').innerHTML = t('faq');
    
    const contactItem = document.querySelector('.contact-item');
    if (contactItem) {
        contactItem.innerHTML = `<span>${t('author')}</span><span class="contact-highlight">@frontendchikk</span>`;
    }
    
    const settingsGroups = document.querySelectorAll('.settings-group h3');
    if (settingsGroups[0]) settingsGroups[0].textContent = t('themeTitle');
    if (settingsGroups[1]) settingsGroups[1].textContent = t('languageTitle');
    if (settingsGroups[2]) settingsGroups[2].textContent = t('aboutTitle');
    
    document.getElementById('theme-dark').innerHTML = '<span class="theme-preview dark-preview"></span><span>' + t('dark') + '</span>';
    document.getElementById('theme-light').innerHTML = '<span class="theme-preview light-preview"></span><span>' + t('light') + '</span>';
    
    const aboutInfo = document.querySelector('.about-info');
    if (aboutInfo) {
        aboutInfo.innerHTML = `
            <p>${t('version')} 2.0.0</p>
            <p>${t('authorLabel')} @frontendchikk</p>
            <p>Беговой марафон - 30 разных тренировок</p>
        `;
    }
    
    document.getElementById('add-entry-btn').innerHTML = `<span class="plus-icon">+</span> ${t('newEntry')}`;
    document.getElementById('save-entry-btn').textContent = t('save');
    document.getElementById('cancel-entry-btn').textContent = t('cancel');
    document.getElementById('entry-text').placeholder = t('entryPlaceholder');
    
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
    updateStats();
    renderDiary();
    
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
        workoutCompleted = false;
        currentWorkoutDistance = 0;
        
        const template = DAILY_WORKOUTS[currentDay] || DAILY_WORKOUTS[((currentDay - 1) % 30) + 1];
        currentWorkout = {
            id: currentDay,
            name: template.name,
            difficulty: template.difficulty,
            steps: template.steps.map(s => ({...s, completed: false})),
            totalDistance: template.totalDistance
        };
        
        saveData();
        updateUI();
    });
    
    document.getElementById('complete-day-btn').addEventListener('click', () => {
        if (!canCompleteByTime()) {
            tg.showAlert('⏰ Завершить день можно только до 23:00!');
            return;
        }
        
        if (isDayExpired()) {
            tg.showAlert(t('dayExpiredMsg'));
            return;
        }
        
        if (!workoutCompleted) {
            tg.showAlert('⚠️ Сначала заверши тренировку!');
            return;
        }
        
        runningHistory.push({
            day: currentDay,
            distance: currentWorkoutDistance,
            date: new Date().toISOString(),
            workout: currentWorkout.name
        });
        
        document.getElementById('final-distance').textContent = currentWorkoutDistance.toFixed(1);
        
        dayCompletedTime = new Date().getTime().toString();
        dayStarted = false;
        dayStartTime = null;
        currentDay++;
        workoutCompleted = false;
        currentWorkoutDistance = 0;
        
        saveData();
        
        document.getElementById('start-screen').style.display = 'none';
        document.getElementById('marathon-screen').style.display = 'none';
        document.getElementById('congrats').style.display = 'block';
        
        tg.showAlert(t('completedMessage', currentDay - 1, currentWorkoutDistance.toFixed(1)));
        
        updateStats();
    });
    
    document.getElementById('continue-btn').addEventListener('click', () => {
        document.getElementById('congrats').style.display = 'none';
        updateUI();
    });
    
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
    
    document.getElementById('reset-marathon').addEventListener('click', (e) => {
        e.preventDefault();
        if (confirm(t('confirmReset'))) {
            currentDay = 1;
            dayStarted = false;
            dayStartTime = null;
            dayCompletedTime = null;
            currentWorkout = null;
            workoutCompleted = false;
            currentWorkoutDistance = 0;
            runningHistory = [];
            diaryEntries = [];
            saveData();
            updateUI();
            updateStats();
            renderDiary();
            document.getElementById('menu-dropdown').style.display = 'none';
            document.getElementById('menu-btn').classList.remove('active');
        }
    });
    
    document.getElementById('stats-menu').addEventListener('click', (e) => {
        e.preventDefault();
        switchPage(1);
        document.getElementById('menu-dropdown').style.display = 'none';
        document.getElementById('menu-btn').classList.remove('active');
    });
    
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
        tg.showAlert(t('faqText'));
        document.getElementById('menu-dropdown').style.display = 'none';
        document.getElementById('menu-btn').classList.remove('active');
    });
    
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
            saveData();
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
    
    document.getElementById('slidesContainer').addEventListener('scroll', (e) => {
        const container = e.target;
        const pageIndex = Math.round(container.scrollLeft / container.clientWidth);
        const navButtons = document.querySelectorAll('.nav-btn');
        
        if (pageIndex !== currentSlide && pageIndex >= 0 && pageIndex < navButtons.length) {
            currentSlide = pageIndex;
            navButtons.forEach((btn, index) => {
                btn.classList.toggle('active', index === pageIndex);
            });
            
            if (pageIndex === 1) updateStats();
            if (pageIndex === 2) renderDiary();
        }
    });
    
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
window.switchPage = switchPage;
window.setTheme = setTheme;
window.setLanguage = setLanguage;
