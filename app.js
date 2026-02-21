let tg = window.Telegram.WebApp;
tg.expand();

// Получаем ID пользователя
const userId = tg.initDataUnsafe?.user?.id || 'local_user';

// Ключи для хранения
const STORAGE_KEYS = {
    DAY_STARTED: `day_started_${userId}`,
    HABITS: `habits_${userId}`,
    TASKS: `tasks_${userId}`,
    CUSTOM_HABITS: `custom_habits_${userId}`,
    CUSTOM_TASKS: `custom_tasks_${userId}`,
    CURRENT_DAY: `current_day_${userId}`
};

// Стартовые данные - ФИКСИРОВАННЫЕ привычки (всегда есть)
const FIXED_HABITS = [
    { id: 1, text: "💧 Выпить стакан воды", completed: false, fixed: true },
    { id: 2, text: "🏃 Сделать зарядку", completed: false, fixed: true },
    { id: 3, text: "📖 Почитать 10 минут", completed: false, fixed: true },
    { id: 4, text: "🧘 Медитация 5 минут", completed: false, fixed: true }
];

// Стартовые данные - ФИКСИРОВАННЫЕ задачи (всегда есть)
const FIXED_TASKS = [
    { id: 1, text: "🛏️ Заправить кровать", completed: false, fixed: true },
    { id: 2, text: "🚀 Начать марафон", completed: false, fixed: true },
    { id: 3, text: "💻 Писать код 30 минут", completed: false, fixed: true },
    { id: 4, text: "🚶 Прогулка на свежем воздухе", completed: false, fixed: true }
];

// Состояние приложения
let currentDay = 1;
let fixedHabits = [];
let customHabits = [];
let fixedTasks = [];
let customTasks = [];
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
const addTaskBtn = document.getElementById('add-task-btn');
const addHabitInput = document.getElementById('add-habit-input');
const addTaskInput = document.getElementById('add-task-input');
const habitText = document.getElementById('habit-text');
const taskText = document.getElementById('task-text');
const saveHabitBtn = document.getElementById('save-habit-btn');
const saveTaskBtn = document.getElementById('save-task-btn');

// Элементы меню
const menuBtn = document.getElementById('menu-btn');
const menuDropdown = document.getElementById('menu-dropdown');
const resetDayBtn = document.getElementById('reset-day');
const newMarathonBtn = document.getElementById('new-marathon');
const statsBtn = document.getElementById('stats');
const supportBtn = document.getElementById('support');
const telegramSupport = document.getElementById('telegram-support');
const faqBtn = document.getElementById('faq');

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
    
    // Загружаем кастомные привычки
    const savedCustomHabits = localStorage.getItem(STORAGE_KEYS.CUSTOM_HABITS);
    customHabits = savedCustomHabits ? JSON.parse(savedCustomHabits) : [];
    
    // Загружаем кастомные задачи
    const savedCustomTasks = localStorage.getItem(STORAGE_KEYS.CUSTOM_TASKS);
    customTasks = savedCustomTasks ? JSON.parse(savedCustomTasks) : [];
    
    // Фиксированные привычки всегда сбрасываем на начало дня
    fixedHabits = FIXED_HABITS.map(h => ({...h, completed: false}));
    fixedTasks = FIXED_TASKS.map(t => ({...t, completed: false}));
}

// Сохранение данных
function saveData() {
    localStorage.setItem(STORAGE_KEYS.DAY_STARTED, dayStarted);
    localStorage.setItem(STORAGE_KEYS.CURRENT_DAY, currentDay);
    localStorage.setItem(STORAGE_KEYS.CUSTOM_HABITS, JSON.stringify(customHabits));
    localStorage.setItem(STORAGE_KEYS.CUSTOM_TASKS, JSON.stringify(customTasks));
}

// Объединяем все привычки
function getAllHabits() {
    return [...fixedHabits, ...customHabits];
}

// Объединяем все задачи
function getAllTasks() {
    return [...fixedTasks, ...customTasks];
}

// Обновление баланса
function updateBalance() {
    const allHabits = getAllHabits();
    const allTasks = getAllTasks();
    
    // РАЗУМ - от всех привычек (и фиксированных, и кастомных)
    const totalHabits = allHabits.length || 1;
    const completedHabits = allHabits.filter(h => h.completed).length;
    const mindProgress = (completedHabits / totalHabits) * 100;
    
    // ДУХ - от всех задач (и фиксированных, и кастомных)
    const totalTasks = allTasks.length || 1;
    const completedTasks = allTasks.filter(t => t.completed).length;
    const spiritProgress = (completedTasks / totalTasks) * 100;
    
    mindFill.style.width = `${mindProgress}%`;
    spiritFill.style.width = `${spiritProgress}%`;
    
    mindPercent.textContent = `${Math.round(mindProgress)}%`;
    spiritPercent.textContent = `${Math.round(spiritProgress)}%`;
    
    const allTasksCompleted = allTasks.every(t => t.completed);
    completeDayBtn.disabled = !allTasksCompleted;
}

// Отрисовка привычек
function renderHabits() {
    habitsList.innerHTML = '';
    
    // Сначала фиксированные привычки
    fixedHabits.forEach((habit, index) => {
        const habitDiv = document.createElement('div');
        habitDiv.className = 'habit-item fixed';
        habitDiv.style.animationDelay = `${index * 0.05}s`;
        habitDiv.innerHTML = `
            <input type="checkbox" class="habit-checkbox" data-id="${habit.id}" data-type="fixed" ${habit.completed ? 'checked' : ''}>
            <span class="habit-text ${habit.completed ? 'completed' : ''}">${habit.text}</span>
            <span class="fixed-badge" title="Нельзя удалить">📌</span>
        `;
        habitsList.appendChild(habitDiv);
    });
    
    // Потом кастомные привычки
    customHabits.forEach((habit, index) => {
        const habitDiv = document.createElement('div');
        habitDiv.className = 'habit-item';
        habitDiv.style.animationDelay = `${(index + fixedHabits.length) * 0.05}s`;
        habitDiv.innerHTML = `
            <input type="checkbox" class="habit-checkbox" data-id="${habit.id}" data-type="custom" ${habit.completed ? 'checked' : ''}>
            <span class="habit-text ${habit.completed ? 'completed' : ''}">${habit.text}</span>
            <button class="delete-btn" data-id="${habit.id}" data-type="habit">✕</button>
        `;
        habitsList.appendChild(habitDiv);
    });
    
    // Обработчики для чекбоксов
    document.querySelectorAll('.habit-checkbox').forEach(cb => {
        cb.addEventListener('change', function() {
            const id = parseInt(this.dataset.id);
            const type = this.dataset.type;
            
            if (type === 'fixed') {
                const habit = fixedHabits.find(h => h.id === id);
                if (habit) habit.completed = this.checked;
            } else {
                const habit = customHabits.find(h => h.id === id);
                if (habit) habit.completed = this.checked;
            }
            
            saveData();
            updateBalance();
            renderHabits();
        });
    });
    
    // Обработчики для удаления (только кастомные)
    document.querySelectorAll('.delete-btn[data-type="habit"]').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.dataset.id);
            customHabits = customHabits.filter(h => h.id !== id);
            saveData();
            renderHabits();
            updateBalance();
        });
    });
}

// Отрисовка задач
function renderTasks() {
    tasksList.innerHTML = '';
    
    // Сначала фиксированные задачи
    fixedTasks.forEach((task, index) => {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task-item fixed';
        taskDiv.style.animationDelay = `${index * 0.05}s`;
        taskDiv.innerHTML = `
            <input type="checkbox" class="task-checkbox" data-id="${task.id}" data-type="fixed" ${task.completed ? 'checked' : ''}>
            <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
            <span class="fixed-badge" title="Нельзя удалить">📌</span>
        `;
        tasksList.appendChild(taskDiv);
    });
    
    // Потом кастомные задачи
    customTasks.forEach((task, index) => {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task-item';
        taskDiv.style.animationDelay = `${(index + fixedTasks.length) * 0.05}s`;
        taskDiv.innerHTML = `
            <input type="checkbox" class="task-checkbox" data-id="${task.id}" data-type="custom" ${task.completed ? 'checked' : ''}>
            <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
            <button class="delete-btn" data-id="${task.id}" data-type="task">✕</button>
        `;
        tasksList.appendChild(taskDiv);
    });
    
    // Обработчики для чекбоксов
    document.querySelectorAll('.task-checkbox').forEach(cb => {
        cb.addEventListener('change', function() {
            const id = parseInt(this.dataset.id);
            const type = this.dataset.type;
            
            if (type === 'fixed') {
                const task = fixedTasks.find(t => t.id === id);
                if (task) task.completed = this.checked;
            } else {
                const task = customTasks.find(t => t.id === id);
                if (task) task.completed = this.checked;
            }
            
            saveData();
            renderTasks();
            updateBalance();
        });
    });
    
    // Обработчики для удаления (только кастомные)
    document.querySelectorAll('.delete-btn[data-type="task"]').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.dataset.id);
            customTasks = customTasks.filter(t => t.id !== id);
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
    const allHabits = getAllHabits();
    const allTasks = getAllTasks();
    
    const totalHabits = allHabits.length || 1;
    const completedHabits = allHabits.filter(h => h.completed).length;
    const mindProgress = Math.round((completedHabits / totalHabits) * 100);
    
    const totalTasks = allTasks.length || 1;
    const completedTasks = allTasks.filter(t => t.completed).length;
    const spiritProgress = Math.round((completedTasks / totalTasks) * 100);
    
    document.getElementById('final-mind').textContent = mindProgress;
    document.getElementById('final-spirit').textContent = spiritProgress;
    
    currentDay++;
    dayStarted = false;
    
    // Сбрасываем только completed статусы, но не удаляем привычки
    fixedHabits.forEach(h => h.completed = false);
    fixedTasks.forEach(t => t.completed = false);
    customHabits.forEach(h => h.completed = false);
    customTasks.forEach(t => t.completed = false);
    
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
            completed: false,
            fixed: false
        };
        customHabits.push(newHabit);
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
            completed: false,
            fixed: false
        };
        customTasks.push(newTask);
        saveData();
        renderTasks();
        updateBalance();
        
        taskText.value = '';
        addTaskInput.style.display = 'none';
        addTaskBtn.style.display = 'flex';
    }
});

// Enter для добавления
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
        fixedHabits.forEach(h => h.completed = false);
        fixedTasks.forEach(t => t.completed = false);
        customHabits.forEach(h => h.completed = false);
        customTasks.forEach(t => t.completed = false);
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
        
        // Сбрасываем все
        fixedHabits.forEach(h => h.completed = false);
        fixedTasks.forEach(t => t.completed = false);
        customHabits = [];
        customTasks = [];
        
        saveData();
        updateUI();
        menuDropdown.style.display = 'none';
    }
});

statsBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const allHabits = getAllHabits();
    const allTasks = getAllTasks();
    const totalHabits = allHabits.length;
    const totalTasks = allTasks.length;
    
    tg.showAlert(`📊 Статистика:\nДень: ${currentDay}\nПривычек: ${totalHabits}\nЗадач: ${totalTasks}`);
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
    tg.showAlert('❓ FAQ:\n\n📌 - фиксированные (нельзя удалить)\n✕ - можно удалить\n➕ - добавить своё');
    menuDropdown.style.display = 'none';
});

// Кнопка для продолжения после завершения
const continueBtn = document.createElement('button');
continueBtn.className = 'start-day-btn';
continueBtn.textContent = '🏠 На главную';
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
