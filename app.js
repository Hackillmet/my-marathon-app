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
    LANGUAGE: `language_${userId}`
};

// Стартовые данные
const DEFAULT_HABITS = [
    { id: 1, text: "💧 Выпить стакан воды", completed: false },
    { id: 2, text: "🏃 Сделать зарядку", completed: false },
    { id: 3, text: "📖 Почитать 10 минут", completed: false },
    { id: 4, text: "🧘 Медитация 5 минут", completed: false }
];

const DEFAULT_TASKS = [
    { id: 1, text: "🧹 Убраться в комнате", completed: false },
    { id: 2, text: "💻 Сделать проект", completed: false },
    { id: 3, text: "📞 Позвонить родителям", completed: false }
];

// Переводы
const translations = {
    ru: {
        // Общее
        day: "День",
        startMessage: "Готов начать свой путь к балансу?",
        startDayBtn: "🚀 Начать день",
        completeBtn: "✅ Завершить день",
        
        // Баланс
        balance: {
            system: "⚖️ БАЛАНС СИСТЕМЫ",
            mind: "Разум",
            spirit: "Дух"
        },
        
        // Привычки
        habits: {
            title: "🌱 ПРИВЫЧКИ",
            placeholder: "➕ Добавить свою привычку...",
            addBtn: "Добавить",
            note: "Привычки влияют на"
        },
        
        // Задачи
        tasks: {
            title: "📋 ЗАДАЧИ НА СЕГОДНЯ",
            note: "Задачи влияют на"
        },
        
        // Меню
        menu: {
            marathon: "📋 МАРАФОН",
            resetDay: "🔄 Сбросить день",
            newMarathon: "✨ Новый марафон",
            stats: "📊 Моя статистика",
            help: "🆘 ПОМОЩЬ",
            support: "💬 Поддержка",
            contact: "Связаться:",
            faq: "❓ FAQ",
            contacts: "📞 КОНТАКТЫ",
            author: "👤 Автор:"
        },
        
        // Настройки
        settings: {
            title: "⚙️ НАСТРОЙКИ",
            theme: "🎨 Тема оформления",
            dark: "🌑 Темная",
            light: "☀️ Светлая",
            language: "🌍 Язык",
            about: "ℹ️ О приложении",
            version: "Версия:",
            author: "Автор:",
            description: "Марафон баланса - развивай разум и дух каждый день"
        }
    },
    en: {
        // General
        day: "Day",
        startMessage: "Ready to start your journey to balance?",
        startDayBtn: "🚀 Start Day",
        completeBtn: "✅ Complete Day",
        
        // Balance
        balance: {
            system: "⚖️ SYSTEM BALANCE",
            mind: "Mind",
            spirit: "Spirit"
        },
        
        // Habits
        habits: {
            title: "🌱 HABITS",
            placeholder: "➕ Add your habit...",
            addBtn: "Add",
            note: "Habits affect"
        },
        
        // Tasks
        tasks: {
            title: "📋 TODAY'S TASKS",
            note: "Tasks affect"
        },
        
        // Menu
        menu: {
            marathon: "📋 MARATHON",
            resetDay: "🔄 Reset Day",
            newMarathon: "✨ New Marathon",
            stats: "📊 My Stats",
            help: "🆘 HELP",
            support: "💬 Support",
            contact: "Contact:",
            faq: "❓ FAQ",
            contacts: "📞 CONTACTS",
            author: "👤 Author:"
        },
        
        // Settings
        settings: {
            title: "⚙️ SETTINGS",
            theme: "🎨 Theme",
            dark: "🌑 Dark",
            light: "☀️ Light",
            language: "🌍 Language",
            about: "ℹ️ About",
            version: "Version:",
            author: "Author:",
            description: "Balance Marathon - develop your mind and spirit every day"
        }
    }
};

// Текущий язык и тема
let currentLanguage = 'ru';
let currentTheme = 'dark';

// Состояние приложения
let currentDay = 1;
let habits = [];
let tasks = [];
let dayStarted = false;

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
const addHabitInput = document.getElementById('add-habit-input');
const habitText = document.getElementById('habit-text');
const saveHabitBtn = document.getElementById('save-habit-btn');

// Элементы меню
const menuBtn = document.getElementById('menu-btn');
const menuDropdown = document.getElementById('menu-dropdown');
const resetDayBtn = document.getElementById('reset-day');
const newMarathonBtn = document.getElementById('new-marathon');
const statsBtn = document.getElementById('stats');
const supportBtn = document.getElementById('support');
const telegramSupport = document.getElementById('telegram-support');
const faqBtn = document.getElementById('faq');

// Функция перевода
function t(key) {
    const keys = key.split('.');
    let value = translations[currentLanguage];
    
    for (const k of keys) {
        if (value && value[k]) {
            value = value[k];
        } else {
            return key;
        }
    }
    
    return value;
}

// Обновление всего текста на странице
function updateLanguage() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = t(key);
    });
    
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        element.placeholder = t(key);
    });
}

// Переключение языка
function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
    
    // Обновляем активную кнопку
    document.getElementById('lang-ru').classList.toggle('active', lang === 'ru');
    document.getElementById('lang-en').classList.toggle('active', lang === 'en');
    
    updateLanguage();
}

// Переключение темы
function setTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
    
    // Обновляем активную кнопку
    document.getElementById('theme-dark').classList.toggle('active', theme === 'dark');
    document.getElementById('theme-light').classList.toggle('active', theme === 'light');
}

// Переключение слайдов
function switchPage(pageIndex) {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    
    slides.forEach((slide, index) => {
        if (index === pageIndex) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });
    
    indicators.forEach((indicator, index) => {
        if (index === pageIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
    
    // Прокрутка к слайду
    document.getElementById('slidesContainer').scrollTo({
        left: pageIndex * window.innerWidth,
        behavior: 'smooth'
    });
}

// Показываем дату
function updateDate() {
    const now = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    currentDateEl.textContent = now.toLocaleDateString(currentLanguage === 'ru' ? 'ru-RU' : 'en-US', options);
}

// Загрузка данных
function loadData() {
    dayStarted = localStorage.getItem(STORAGE_KEYS.DAY_STARTED) === 'true';
    currentDay = parseInt(localStorage.getItem(STORAGE_KEYS.CURRENT_DAY)) || 1;
    
    // Загрузка темы
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
    if (savedTheme) {
        setTheme(savedTheme);
    }
    
    // Загрузка языка
    const savedLang = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
    if (savedLang) {
        setLanguage(savedLang);
    }
    
    const savedHabits = localStorage.getItem(STORAGE_KEYS.HABITS);
    habits = savedHabits ? JSON.parse(savedHabits) : DEFAULT_HABITS.map(h => ({...h}));
    
    const savedTasks = localStorage.getItem(STORAGE_KEYS.TASKS);
    tasks = savedTasks ? JSON.parse(savedTasks) : DEFAULT_TASKS.map(t => ({...t}));
}

// Сохранение данных
function saveData() {
    localStorage.setItem(STORAGE_KEYS.DAY_STARTED, dayStarted);
    localStorage.setItem(STORAGE_KEYS.CURRENT_DAY, currentDay);
    localStorage.setItem(STORAGE_KEYS.HABITS, JSON.stringify(habits));
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
}

// Обновление баланса
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
    completeDayBtn.disabled = !allTasksCompleted;
}

// Отрисовка привычек
function renderHabits() {
    habitsList.innerHTML = '';
    
    habits.forEach((habit, index) => {
        const habitDiv = document.createElement('div');
        habitDiv.className = 'habit-item';
        habitDiv.style.animationDelay = `${index * 0.05}s`;
        habitDiv.innerHTML = `
            <input type="checkbox" class="habit-checkbox" data-id="${habit.id}" ${habit.completed ? 'checked' : ''}>
            <span class="habit-text ${habit.completed ? 'completed' : ''}">${habit.text}</span>
            <button class="delete-btn" data-id="${habit.id}">✕</button>
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
            habits = habits.filter(h => h.id !== id);
            saveData();
            renderHabits();
            updateBalance();
        });
    });
}

// Отрисовка задач
function renderTasks() {
    tasksList.innerHTML = '';
    
    tasks.forEach((task, index) => {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task-item';
        taskDiv.style.animationDelay = `${index * 0.05}s`;
        taskDiv.innerHTML = `
            <input type="checkbox" class="task-checkbox" data-id="${task.id}" ${task.completed ? 'checked' : ''}>
            <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
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
}

// Обновление UI
function updateUI() {
    startDayNumber.textContent = currentDay;
    
    if (!dayStarted) {
        startScreen.style.display = 'block';
        marathonScreen.style.display = 'none';
        congratsDiv.style.display = 'none';
    } else {
        startScreen.style.display = 'none';
        marathonScreen.style.display = 'block';
        congratsDiv.style.display = 'none';
        renderHabits();
        renderTasks();
        updateBalance();
    }
}

// Начать день
startDayBtn.addEventListener('click', () => {
    dayStarted = true;
    saveData();
    updateUI();
});

// Завершить день
completeDayBtn.addEventListener('click', () => {
    const totalHabits = habits.length || 1;
    const completedHabits = habits.filter(h => h.completed).length;
    const mindProgress = Math.round((completedHabits / totalHabits) * 100);
    
    const totalTasks = tasks.length || 1;
    const completedTasks = tasks.filter(t => t.completed).length;
    const spiritProgress = Math.round((completedTasks / totalTasks) * 100);
    
    document.getElementById('final-mind').textContent = mindProgress;
    document.getElementById('final-spirit').textContent = spiritProgress;
    
    currentDay++;
    dayStarted = false;
    
    habits = DEFAULT_HABITS.map(h => ({...h, completed: false}));
    tasks = DEFAULT_TASKS.map(t => ({...t, completed: false}));
    
    saveData();
    
    startScreen.style.display = 'none';
    marathonScreen.style.display = 'none';
    congratsDiv.style.display = 'block';
    
    const message = currentLanguage === 'ru' 
        ? `🎉 Молодец! День ${currentDay-1} завершен!\n🧠 Разум: ${mindProgress}%\n💚 Дух: ${spiritProgress}%`
        : `🎉 Great job! Day ${currentDay-1} completed!\n🧠 Mind: ${mindProgress}%\n💚 Spirit: ${spiritProgress}%`;
    
    tg.showAlert(message);
});

// Добавление привычки
addHabitBtn.addEventListener('click', () => {
    addHabitInput.style.display = 'flex';
    addHabitBtn.style.display = 'none';
});

saveHabitBtn.addEventListener('click', () => {
    const text = habitText.value.trim();
    if (text) {
        const newHabit = {
            id: Date.now(),
            text: text,
            completed: false
        };
        habits.push(newHabit);
        saveData();
        renderHabits();
        updateBalance();
        
        habitText.value = '';
        addHabitInput.style.display = 'none';
        addHabitBtn.style.display = 'flex';
    }
});

habitText.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        saveHabitBtn.click();
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
    const confirmMsg = currentLanguage === 'ru' 
        ? 'Сбросить текущий день? Весь прогресс будет потерян.'
        : 'Reset current day? All progress will be lost.';
    
    if (confirm(confirmMsg)) {
        dayStarted = false;
        habits = DEFAULT_HABITS.map(h => ({...h, completed: false}));
        tasks = DEFAULT_TASKS.map(t => ({...t, completed: false}));
        saveData();
        updateUI();
        menuDropdown.style.display = 'none';
    }
});

newMarathonBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const confirmMsg = currentLanguage === 'ru'
        ? 'Начать новый марафон? Весь прогресс будет сброшен.'
        : 'Start new marathon? All progress will be reset.';
    
    if (confirm(confirmMsg)) {
        currentDay = 1;
        dayStarted = false;
        habits = DEFAULT_HABITS.map(h => ({...h, completed: false}));
        tasks = DEFAULT_TASKS.map(t => ({...t, completed: false}));
        saveData();
        updateUI();
        menuDropdown.style.display = 'none';
    }
});

statsBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const totalDays = currentDay - 1;
    const message = currentLanguage === 'ru'
        ? `📊 Статистика:\nПройдено дней: ${totalDays}\nТекущий день: ${currentDay}`
        : `📊 Statistics:\nDays completed: ${totalDays}\nCurrent day: ${currentDay}`;
    
    tg.showAlert(message);
    menuDropdown.style.display = 'none';
});

supportBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const message = currentLanguage === 'ru'
        ? '💬 Поддержка: @frontendchikk'
        : '💬 Support: @frontendchikk';
    
    tg.showAlert(message);
    menuDropdown.style.display = 'none';
});

telegramSupport.addEventListener('click', (e) => {
    e.preventDefault();
    tg.openTelegramLink('https://t.me/frontendchikk');
    menuDropdown.style.display = 'none';
});

faqBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const message = currentLanguage === 'ru'
        ? '❓ Часто задаваемые вопросы:\n\n1. Как сбросить день? - В меню "Сбросить день"\n2. Как добавить привычку? - Нажмите +\n3. Связь с автором: @frontendchikk'
        : '❓ FAQ:\n\n1. How to reset day? - In menu "Reset Day"\n2. How to add habit? - Press +\n3. Contact author: @frontendchikk';
    
    tg.showAlert(message);
    menuDropdown.style.display = 'none';
});

// Кнопка продолжения
const continueBtn = document.createElement('button');
continueBtn.className = 'start-day-btn';
continueBtn.textContent = currentLanguage === 'ru' ? '🏠 На главную' : '🏠 Home';
continueBtn.style.marginTop = '20px';
continueBtn.addEventListener('click', () => {
    congratsDiv.style.display = 'none';
    updateUI();
});
congratsDiv.appendChild(continueBtn);

// Обработчики для слайдов
document.getElementById('slidesContainer').addEventListener('scroll', (e) => {
    const scrollLeft = e.target.scrollLeft;
    const pageIndex = Math.round(scrollLeft / window.innerWidth);
    
    document.querySelectorAll('.indicator').forEach((ind, i) => {
        ind.classList.toggle('active', i === pageIndex);
    });
});

// Инициализация
updateDate();
loadData();
updateUI();

tg.ready();

// Делаем функции глобальными
window.setTheme = setTheme;
window.setLanguage = setLanguage;
window.switchPage = switchPage;
