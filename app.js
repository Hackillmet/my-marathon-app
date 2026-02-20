let tg = window.Telegram.WebApp;
tg.expand();

// Получаем ID пользователя
const userId = tg.initDataUnsafe?.user?.id || 'local_user';

// Ключи для хранения
const STORAGE_KEYS = {
    DAY_STARTED: `day_started_${userId}`,
    HABITS: `habits_${userId}`,
    TASKS: `tasks_${userId}`,
    BALANCE: `balance_${userId}`
};

// Стартовые данные
const DEFAULT_HABITS = [
    { id: 1, text: "💧 Выпить стакан воды", completed: false, type: 'mind' },
    { id: 2, text: "🏃 Сделать зарядку", completed: false, type: 'spirit' },
    { id: 3, text: "📖 Почитать 10 минут", completed: false, type: 'mind' },
    { id: 4, text: "🧘 Медитация 5 минут", completed: false, type: 'spirit' }
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

// Показываем дату
function updateDate() {
    const now = new Date();
    const options = { day: 'numeric', month: 'long' };
    currentDateEl.textContent = now.toLocaleDateString('ru-RU', options);
}

// Загрузка данных
function loadData() {
    dayStarted = localStorage.getItem(STORAGE_KEYS.DAY_STARTED) === 'true';
    
    const savedHabits = localStorage.getItem(STORAGE_KEYS.HABITS);
    habits = savedHabits ? JSON.parse(savedHabits) : DEFAULT_HABITS.map(h => ({...h}));
    
    const savedTasks = localStorage.getItem(STORAGE_KEYS.TASKS);
    tasks = savedTasks ? JSON.parse(savedTasks) : DEFAULT_TASKS.map(t => ({...t}));
}

// Сохранение данных
function saveData() {
    localStorage.setItem(STORAGE_KEYS.DAY_STARTED, dayStarted);
    localStorage.setItem(STORAGE_KEYS.HABITS, JSON.stringify(habits));
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
}

// Обновление баланса
function updateBalance() {
    // Считаем выполненные привычки для разума и духа
    const mindHabits = habits.filter(h => h.type === 'mind');
    const spiritHabits = habits.filter(h => h.type === 'spirit');
    
    const mindCompleted = mindHabits.filter(h => h.completed).length;
    const spiritCompleted = spiritHabits.filter(h => h.completed).length;
    
    const mindTotal = mindHabits.length || 1; // Чтобы не делить на 0
    const spiritTotal = spiritHabits.length || 1;
    
    const mindProgress = (mindCompleted / mindTotal) * 100;
    const spiritProgress = (spiritCompleted / spiritTotal) * 100;
    
    // Обновляем полоски
    mindFill.style.width = `${mindProgress}%`;
    spiritFill.style.width = `${spiritProgress}%`;
    
    mindPercent.textContent = `${Math.round(mindProgress)}%`;
    spiritPercent.textContent = `${Math.round(spiritProgress)}%`;
    
    // Проверяем, можно ли завершить день
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
    
    // Обработчики для чекбоксов
    document.querySelectorAll('.habit-checkbox').forEach(cb => {
        cb.addEventListener('change', function() {
            const id = parseInt(this.dataset.id);
            const habit = habits.find(h => h.id === id);
            if (habit) {
                habit.completed = this.checked;
                saveData();
                updateBalance();
                renderHabits(); // Перерисовываем для изменения стиля текста
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
    
    tasks.forEach(task => {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task-item';
        taskDiv.innerHTML = `
            <input type="checkbox" class="task-checkbox" data-id="${task.id}" ${task.completed ? 'checked' : ''}>
            <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
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
}

// Обновление UI
function updateUI() {
    if (!dayStarted) {
        startScreen.style.display = 'block';
        marathonScreen.style.display = 'none';
        congratsDiv.style.display = 'none';
        startDayNumber.textContent = currentDay;
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
    // Показываем итоги
    const mindHabits = habits.filter(h => h.type === 'mind');
    const spiritHabits = habits.filter(h => h.type === 'spirit');
    
    const mindCompleted = mindHabits.filter(h => h.completed).length;
    const spiritCompleted = spiritHabits.filter(h => h.completed).length;
    
    const mindTotal = mindHabits.length || 1;
    const spiritTotal = spiritHabits.length || 1;
    
    const mindProgress = Math.round((mindCompleted / mindTotal) * 100);
    const spiritProgress = Math.round((spiritCompleted / spiritTotal) * 100);
    
    document.getElementById('final-mind').textContent = mindProgress;
    document.getElementById('final-spirit').textContent = spiritProgress;
    
    // Показываем поздравление
    startScreen.style.display = 'none';
    marathonScreen.style.display = 'none';
    congratsDiv.style.display = 'block';
    
    tg.showAlert(`🎉 Молодец! День ${currentDay} завершен! Баланс: Разум ${mindProgress}%, Дух ${spiritProgress}%`);
});

// Добавление привычки
addHabitBtn.addEventListener('click', () => {
    addHabitInput.style.display = 'flex';
    addHabitBtn.style.display = 'none';
});

saveHabitBtn.addEventListener('click', () => {
    const text = habitText.value.trim();
    if (text) {
        // Случайно определяем тип (mind или spirit)
        const type = Math.random() > 0.5 ? 'mind' : 'spirit';
        const newHabit = {
            id: Date.now(),
            text: text,
            completed: false,
            type: type
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

// Добавление по Enter
habitText.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        saveHabitBtn.click();
    }
});

// Инициализация
updateDate();
loadData();
updateUI();

tg.ready();
