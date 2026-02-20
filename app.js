let tg = window.Telegram.WebApp;
tg.expand();

// Получаем ID пользователя
const userId = tg.initDataUnsafe?.user?.id || 'local_user';

// Ключи для хранения
const STORAGE_KEYS = {
    DAY_STARTED: `day_started_${userId}`,
    HABITS: `habits_${userId}`,
    TASKS: `tasks_${userId}`,
    CURRENT_DAY: `current_day_${userId}`
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
const aboutBtn = document.getElementById('about');

// Показываем дату
function updateDate() {
    const now = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    currentDateEl.textContent = now.toLocaleDateString('ru-RU', options);
}

// Загрузка данных
function loadData() {
    dayStarted = localStorage.getItem(STORAGE_KEYS.DAY_STARTED) === 'true';
    currentDay = parseInt(localStorage.getItem(STORAGE_KEYS.CURRENT_DAY)) || 1;
    
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
    // РАЗУМ - заполняется от привычек
    const totalHabits = habits.length || 1;
    const completedHabits = habits.filter(h => h.completed).length;
    const mindProgress = (completedHabits / totalHabits) * 100;
    
    // ДУХ - заполняется от задач на сегодня
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
    
    habits.forEach(habit => {
        const habitDiv = document.createElement('div');
        habitDiv.className = 'habit-item';
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
    
    tasks.forEach(task => {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task-item';
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

habitText.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        saveHabitBtn.click();
    }
});

// Меню
menuBtn.addEventListener('click', () => {
    if (menuDropdown.style.display === 'none') {
        menuDropdown.style.display = 'block';
    } else {
        menuDropdown.style.display = 'none';
    }
});

// Закрыть меню при клике вне его
document.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !menuDropdown.contains(e.target)) {
        menuDropdown.style.display = 'none';
    }
});

// Функции меню
resetDayBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (confirm('Сбросить текущий день? Все прогресс будет потерян.')) {
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
    if (confirm('Начать новый марафон? Весь прогресс будет сброшен.')) {
        currentDay = 1;
        dayStarted = false;
        habits = DEFAULT_HABITS.map(h => ({...h, completed: false}));
        tasks = DEFAULT_TASKS.map(t => ({...t, completed: false}));
        saveData();
        updateUI();
        menuDropdown.style.display = 'none';
    }
});

aboutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    tg.showAlert('Марафон Баланса v1.0\nРазработано с ❤️');
    menuDropdown.style.display = 'none';
});

// Кнопка для продолжения после завершения
const continueBtn = document.createElement('button');
continueBtn.className = 'start-day-btn';
continueBtn.textContent = '🚀 К следующему дню';
continueBtn.style.marginTop = '20px';
continueBtn.addEventListener('click', () => {
    congratsDiv.style.display = 'none';
    updateUI();
});
congratsDiv.appendChild(continueBtn);

// Инициализация
updateDate();
loadData();
updateUI();

tg.ready();
