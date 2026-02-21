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

// ========== ФУНКЦИИ ВРЕМЕНИ ==========

// Проверка времени для начала дня (можно только с 4 утра)
function canStartDayByTime() {
    const now = new Date();
    const hours = now.getHours();
    return hours >= 4;
}

// Проверка времени для завершения дня (нужно до 23:00)
function canCompleteDayByTime() {
    const now = new Date();
    const hours = now.getHours();
    return hours < 23;
}

// Проверка, можно ли начать новый день (прошло 24 часа)
function canStartNewDay() {
    if (!dayCompletedTime) return true;
    
    const now = new Date().getTime();
    const completedTime = parseInt(dayCompletedTime);
    const hoursPassed = (now - completedTime) / (1000 * 60 * 60);
    
    return hoursPassed >= 24;
}

// Получить оставшееся время до следующего дня
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

// Проверка, не истек ли день (прошло 24 часа с начала)
function isDayExpired() {
    if (!dayStartTime) return false;
    
    const now = new Date().getTime();
    const startTime = parseInt(dayStartTime);
    const hoursPassed = (now - startTime) / (1000 * 60 * 60);
    
    return hoursPassed >= 24;
}

// Обновление информации о времени на стартовом экране
function updateTimeInfo() {
    if (!timeInfo) return;
    
    if (dayCompletedTime && !canStartNewDay()) {
        const remaining = getTimeRemaining();
        if (remaining) {
            timeInfo.textContent = `⏳ Следующий день через ${remaining.hours}ч ${remaining.minutes}м`;
            timeInfo.style.color = 'var(--warning)';
        }
    } else if (!canStartDayByTime()) {
        timeInfo.textContent = '⏰ Новый день можно начать только с 4:00 утра';
        timeInfo.style.color = 'var(--warning)';
    } else {
        timeInfo.textContent = '✅ Можно начинать день';
        timeInfo.style.color = 'var(--success)';
    }
}

// Обновление информации о дедлайне
function updateDeadlineInfo() {
    if (!deadlineInfo || !dayStarted) return;
    
    if (isDayExpired()) {
        deadlineInfo.textContent = '⏰ День истек! Не успел выполнить задачи вовремя.';
        deadlineInfo.style.color = 'var(--danger)';
    } else if (!canCompleteDayByTime()) {
        deadlineInfo.textContent = '⏰ Завершить день можно только до 23:00';
        deadlineInfo.style.color = 'var(--warning)';
    } else {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const timeLeft = (22 - hours) * 60 + (60 - minutes);
        if (timeLeft > 0) {
            const leftHours = Math.floor(timeLeft / 60);
            const leftMinutes = timeLeft % 60;
            deadlineInfo.textContent = `⏳ Осталось времени: ${leftHours}ч ${leftMinutes}м`;
            deadlineInfo.style.color = 'var(--text-secondary)';
        }
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
    if (savedLang) setLanguage(savedLang);
    
    // Загружаем привычки
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
    
    // Загружаем задачи
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
    
    // Загружаем записи дневника
    const savedEntries = localStorage.getItem(STORAGE_KEYS.DIARY_ENTRIES);
    diaryEntries = savedEntries ? JSON.parse(savedEntries) : [];
    
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
    
    updateDate();
    updateUIText();
}

function updateUIText() {
    if (currentLanguage === 'ru') {
        if (startMessage) startMessage.textContent = 'Готов начать свой путь к балансу?';
        document.querySelectorAll('.nav-text')[0].textContent = 'Главная';
        document.querySelectorAll('.nav-text')[1].textContent = 'Настройки';
        document.querySelectorAll('.nav-text')[2].textContent = 'Дневник';
        if (addEntryBtn) addEntryBtn.innerHTML = '<span class="plus-icon">+</span> Новая запись';
        if (saveEntryBtn) saveEntryBtn.textContent = 'Сохранить';
        if (cancelEntryBtn) cancelEntryBtn.textContent = 'Отмена';
    } else {
        if (startMessage) startMessage.textContent = 'Ready to start your journey to balance?';
        document.querySelectorAll('.nav-text')[0].textContent = 'Home';
        document.querySelectorAll('.nav-text')[1].textContent = 'Settings';
        document.querySelectorAll('.nav-text')[2].textContent = 'Diary';
        if (addEntryBtn) addEntryBtn.innerHTML = '<span class="plus-icon">+</span> New entry';
        if (saveEntryBtn) saveEntryBtn.textContent = 'Save';
        if (cancelEntryBtn) cancelEntryBtn.textContent = 'Cancel';
    }
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
        completeDayBtn.textContent = currentLanguage === 'ru' ? '⏰ День истек' : '⏰ Day expired';
    } else if (!canComplete) {
        completeDayBtn.disabled = true;
        completeDayBtn.textContent = currentLanguage === 'ru' ? '⏳ До 23:00' : '⏳ Until 23:00';
    } else {
        completeDayBtn.disabled = !allTasksCompleted;
        completeDayBtn.textContent = currentLanguage === 'ru' ? '✅ Завершить день' : '✅ Complete day';
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
                tg.showAlert(currentLanguage === 'ru' ? '❌ Это стандартная привычка' : '❌ This is a standard habit');
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
                tg.showAlert(currentLanguage === 'ru' ? '❌ Это стандартная задача' : '❌ This is a standard task');
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
        entriesList.innerHTML = `<div class="empty-entries">${currentLanguage === 'ru' ? '📝 Пока нет записей' : '📝 No entries yet'}</div>`;
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
                startDayBtn.textContent = currentLanguage === 'ru' 
                    ? `⏳ ${remaining.hours}ч ${remaining.minutes}м`
                    : `⏳ ${remaining.hours}h ${remaining.minutes}m`;
            }
        } else if (!canStartByTime) {
            startDayBtn.disabled = true;
            startDayBtn.textContent = currentLanguage === 'ru' ? '⏰ Жди 4 утра' : '⏰ Wait 4 AM';
        } else {
            startDayBtn.disabled = false;
            startDayBtn.textContent = currentLanguage === 'ru' ? '🚀 Начать день' : '🚀 Start day';
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
            tg.showAlert(currentLanguage === 'ru' 
                ? '⏰ День истек! Начни следующий день с 4 утра.'
                : '⏰ Day expired! Start next day at 4 AM.');
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
        tg.showAlert(currentLanguage === 'ru' 
            ? `⏳ Подожди ${remaining.hours}ч ${remaining.minutes}м`
            : `⏳ Wait ${remaining.hours}h ${remaining.minutes}m`);
        return;
    }
    
    if (!canStartDayByTime()) {
        tg.showAlert(currentLanguage === 'ru' 
            ? '⏰ Новый день можно начать только с 4 утра!'
            : '⏰ New day can only start at 4 AM!');
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
        tg.showAlert(currentLanguage === 'ru' 
            ? '⏰ Завершить день можно только до 23:00!'
            : '⏰ You can only complete day before 23:00!');
        return;
    }
    
    if (isDayExpired()) {
        tg.showAlert(currentLanguage === 'ru' 
            ? '⏰ День истек!'
            : '⏰ Day expired!');
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
    
    tg.showAlert(currentLanguage === 'ru' 
        ? `🎉 Молодец! День ${currentDay} завершен!\n🧠 Разум: ${mindProgress}%\n💚 Дух: ${spiritProgress}%`
        : `🎉 Great job! Day ${currentDay} completed!\n🧠 Mind: ${mindProgress}%\n💚 Spirit: ${spiritProgress}%`);
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
    if (confirm(currentLanguage === 'ru' 
        ? 'Сбросить текущий день? Весь прогресс будет потерян.'
        : 'Reset current day? All progress will be lost.')) {
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
    if (confirm(currentLanguage === 'ru' 
        ? 'Начать новый марафон? Весь прогресс будет сброшен.'
        : 'Start new marathon? All progress will be reset.')) {
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
    
    tg.showAlert(currentLanguage === 'ru' 
        ? `📊 Статистика:\nДень: ${currentDay}\nСтандартных привычек: 4\nДобавленных привычек: ${customHabits}\nСтандартных задач: 4\nДобавленных задач: ${customTasks}\nЗаписей в дневнике: ${diaryEntries.length}`
        : `📊 Statistics:\nDay: ${currentDay}\nStandard habits: 4\nAdded habits: ${customHabits}\nStandard tasks: 4\nAdded tasks: ${customTasks}\nDiary entries: ${diaryEntries.length}`);
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
    tg.showAlert(currentLanguage === 'ru' 
        ? '❓ FAQ:\n\n📌 Стандартные - нельзя удалить\n➕ Добавленные - можно удалить\n⏰ Режим: 4:00 - 23:00\n📔 Дневник для записей'
        : '❓ FAQ:\n\n📌 Standard - cannot delete\n➕ Added - can delete\n⏰ Mode: 4 AM - 11 PM\n📔 Diary for notes');
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
updateUI();
updateUIText();

tg.ready();
