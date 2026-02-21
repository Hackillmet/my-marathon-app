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

// Стартовые данные - ВСЕ можно удалять
const DEFAULT_HABITS = [
    { id: 1, text: "💧 Выпить стакан воды", completed: false },
    { id: 2, text: "🏃 Сделать зарядку", completed: false },
    { id: 3, text: "📖 Почитать 10 минут", completed: false },
    { id: 4, text: "🧘 Медитация 5 минут", completed: false }
];

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
let dayStarted = false;
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

// Загрузка данных
function loadData() {
    dayStarted = localStorage.getItem(STORAGE_KEYS.DAY_STARTED) === 'true';
    currentDay = parseInt(localStorage.getItem(STORAGE_KEYS.CURRENT_DAY)) || 1;
    
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
    if (savedTheme) setTheme(savedTheme);
    
    const savedLang = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
    if (savedLang) setLanguage(savedLang);
    
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

// Переключение темы
function setTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
    
    document.getElementById('theme-dark').classList.toggle('active', theme === 'dark');
    document.getElementById('theme-light').classList.toggle('active', theme === 'light');
}

// Переключение языка
function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
    
    document.getElementById('lang-ru').classList.toggle('active', lang === 'ru');
    document.getElementById('lang-en').classList.toggle('active', lang === 'en');
    
    updateDate();
}

// Переключение страниц
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

// Показываем дату
function updateDate() {
    const now = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    currentDateEl.textContent = now.toLocaleDateString('ru-RU', options);
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
    
    // Обработчики для чекбоксов
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
    
    // Обработчики для удаления
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
            <button class="delete-btn" data-id="${task.id}">✕</button>
        `;
        tasksList.appendChild(taskDiv);
    });
    
    // Обработчики для чекбоксов
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
    
    // Обработчики для удаления
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.dataset.id);
            tasks = tasks.filter(t => t.id !== id);
            saveData();
            renderTasks();
            updateBalance();
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
    
    // Сбрасываем completed, но НЕ удаляем привычки
    habits.forEach(h => h.completed = false);
    tasks.forEach(t => t.completed = false);
    
    saveData();
    
    startScreen.style.display = 'none';
    marathonScreen.style.display = 'none';
    congratsDiv.style.display = 'block';
    
    tg.showAlert(`🎉 Молодец! День ${currentDay-1} завершен!\n🧠 Разум: ${mindProgress}%\n💚 Дух: ${spiritProgress}%`);
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

// Добавление задачи
addTaskBtn.addEventListener('click', () => {
    addTaskInput.style.display = 'flex';
    addTaskBtn.style.display = 'none';
});

saveTaskBtn.addEventListener('click', () => {
    const text = taskText.value.trim();
    if (text) {
        const newTask = {
            id: Date.now(),
            text: text,
            completed: false
        };
        tasks.push(newTask);
        saveData();
        renderTasks();
        updateBalance();
        
        taskText.value = '';
        addTaskInput.style.display = 'none';
        addTaskBtn.style.display = 'flex';
    }
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
    if (confirm('Сбросить текущий день? Весь прогресс будет потерян.')) {
        dayStarted = false;
        habits.forEach(h => h.completed = false);
        tasks.forEach(t => t.completed = false);
        saveData();
        updateUI();
        menuDropdown.style.display = 'none';
    }
});

newMarathonBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (confirm('Начать новый марафон? Весь прогресс будет сброшен.')) {
        currentDay = 1;
        dayStarted = false;
        habits = DEFAULT_HABITS.map(h => ({...h}));
        tasks = DEFAULT_TASKS.map(t => ({...t}));
        saveData();
        updateUI();
        menuDropdown.style.display = 'none';
    }
});

statsBtn.addEventListener('click', (e) => {
    e.preventDefault();
    tg.showAlert(`📊 Статистика:\nДень: ${currentDay}\nПривычек: ${habits.length}\nЗадач: ${tasks.length}`);
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
    tg.showAlert('❓ FAQ:\n\n✕ - удалить элемент\n➕ - добавить свой');
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

// Глобальные функции
window.switchPage = switchPage;
window.setTheme = setTheme;
window.setLanguage = setLanguage;

// Инициализация
updateDate();
loadData();
updateUI();

tg.ready();
