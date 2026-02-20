let tg = window.Telegram.WebApp;
tg.expand();

// Получаем ID пользователя Telegram
const userId = tg.initDataUnsafe?.user?.id || 'local_user';

// Ключи для хранения данных
const STORAGE_KEYS = {
    CURRENT_DAY: `marathon_current_day_${userId}`,
    DAY_STATUS: (day) => `marathon_day_${day}_status_${userId}`,
    DAY_TASKS: (day) => `marathon_day_${day}_tasks_${userId}`
};

// Готовые задачи для каждого дня
const DEFAULT_TASKS = {
    1: [
        "🔋 Сделать зарядку",
        "💻 Писать код 15 минут",
        "📖 Почитать книгу 10 страниц",
        "🚶 Прогулка на свежем воздухе"
    ],
    2: [
        "🏃 Пробежка 1 км",
        "💻 Писать код 30 минут",
        "🧘 Медитация 10 минут",
        "🥗 Здоровый завтрак"
    ],
    3: [
        "💪 Силовая тренировка",
        "💻 Писать код 45 минут",
        "📝 План на неделю",
        "🎯 Изучить что-то новое"
    ],
    4: [
        "🧘 Йога 20 минут",
        "💻 Писать код 1 час",
        "📚 Чтение 30 минут",
        "🤝 Помочь кому-то"
    ],
    5: [
        "🏊 Бассейн",
        "💻 Проект 2 часа",
        "🎨 Творчество",
        "🌟 Визуализация целей"
    ]
};

// Состояние приложения
let currentDay = 1;
let maxDay = 5; // Всего дней в марафоне

// DOM элементы
const dayTitle = document.getElementById('day-title');
const dayStatus = document.getElementById('day-status');
const startBtn = document.getElementById('start-day-btn');
const tasksSection = document.getElementById('tasks-section');
const tasksList = document.getElementById('tasks-list');
const completeBtn = document.getElementById('complete-day-btn');
const congratsDiv = document.getElementById('congrats');
const currentDateEl = document.getElementById('current-date');
const addTaskBtn = document.getElementById('add-task-btn');
const newTaskInput = document.getElementById('new-task-input');

// Показываем текущую дату
function updateDate() {
    const now = new Date();
    const options = { day: 'numeric', month: 'long' };
    currentDateEl.textContent = now.toLocaleDateString('ru-RU', options);
}

// Загрузка статуса дня
function getDayStatus(day) {
    const status = localStorage.getItem(STORAGE_KEYS.DAY_STATUS(day));
    return status || 'not_started'; // not_started, in_progress, completed
}

// Сохранение статуса дня
function setDayStatus(day, status) {
    localStorage.setItem(STORAGE_KEYS.DAY_STATUS(day), status);
}

// Загрузка задач дня
function getDayTasks(day) {
    const tasks = localStorage.getItem(STORAGE_KEYS.DAY_TASKS(day));
    if (tasks) {
        return JSON.parse(tasks);
    } else {
        // Если задач нет, берем готовые
        const defaultTasks = DEFAULT_TASKS[day] || DEFAULT_TASKS[1];
        return defaultTasks.map((text, index) => ({
            id: Date.now() + index,
            text: text,
            completed: false
        }));
    }
}

// Сохранение задач
function saveDayTasks(day, tasks) {
    localStorage.setItem(STORAGE_KEYS.DAY_TASKS(day), JSON.stringify(tasks));
}

// Определяем какой день сегодня должен быть
function calculateCurrentDay() {
    // Проверяем все дни по порядку, ищем первый незавершенный
    for (let day = 1; day <= maxDay; day++) {
        const status = getDayStatus(day);
        if (status !== 'completed') {
            return day;
        }
    }
    return maxDay + 1; // Все дни завершены
}

// Обновляем интерфейс
function updateUI() {
    // Сначала вычисляем текущий день
    currentDay = calculateCurrentDay();
    
    // Проверяем, закончен ли марафон
    if (currentDay > maxDay) {
        document.getElementById('day-card').style.display = 'none';
        congratsDiv.style.display = 'block';
        return;
    } else {
        document.getElementById('day-card').style.display = 'block';
        congratsDiv.style.display = 'none';
    }
    
    const status = getDayStatus(currentDay);
    const tasks = getDayTasks(currentDay);
    
    // Обновляем заголовок
    dayTitle.textContent = `День ${currentDay}`;
    
    // Обновляем статус
    dayStatus.textContent = status === 'not_started' ? '❌ Не начат' : 
                           status === 'in_progress' ? '⏳ В процессе' : '✅ Завершен';
    dayStatus.className = `day-status ${status}`;
    
    // Показываем/скрываем кнопки
    startBtn.style.display = status === 'not_started' ? 'block' : 'none';
    tasksSection.style.display = status === 'in_progress' ? 'block' : 'none';
    
    // Если день в процессе, показываем задачи
    if (status === 'in_progress') {
        renderTasks(tasks);
    }
    
    // Проверяем, все ли задачи выполнены
    if (status === 'in_progress') {
        const allCompleted = tasks.every(task => task.completed);
        completeBtn.style.display = allCompleted ? 'block' : 'none';
    } else {
        completeBtn.style.display = 'none';
    }
}

// Отрисовка задач
function renderTasks(tasks) {
    tasksList.innerHTML = '';
    
    tasks.forEach(task => {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task-item';
        taskDiv.innerHTML = `
            <input type="checkbox" class="task-checkbox" data-task-id="${task.id}" ${task.completed ? 'checked' : ''}>
            <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
            <button class="delete-task" data-task-id="${task.id}">✕</button>
        `;
        tasksList.appendChild(taskDiv);
    });
    
    // Добавляем обработчики на чекбоксы
    document.querySelectorAll('.task-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const taskId = parseInt(this.dataset.taskId);
            const tasks = getDayTasks(currentDay);
            const task = tasks.find(t => t.id === taskId);
            if (task) {
                task.completed = this.checked;
                saveDayTasks(currentDay, tasks);
                updateUI(); // Обновляем интерфейс (для кнопки завершения)
            }
        });
    });
    
    // Добавляем обработчики на удаление
    document.querySelectorAll('.delete-task').forEach(btn => {
        btn.addEventListener('click', function() {
            const taskId = parseInt(this.dataset.taskId);
            let tasks = getDayTasks(currentDay);
            tasks = tasks.filter(t => t.id !== taskId);
            saveDayTasks(currentDay, tasks);
            updateUI();
        });
    });
}

// Начать день
startBtn.addEventListener('click', () => {
    setDayStatus(currentDay, 'in_progress');
    updateUI();
});

// Завершить день
completeBtn.addEventListener('click', () => {
    setDayStatus(currentDay, 'completed');
    
    // Показываем поздравление
    tg.showAlert(`🎉 Молодец! Ты выполнил все задачи дня ${currentDay}! Завтра откроется следующий день.`);
    
    updateUI();
});

// Добавить свою задачу
addTaskBtn.addEventListener('click', () => {
    const taskText = newTaskInput.value.trim();
    if (taskText) {
        const tasks = getDayTasks(currentDay);
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        };
        tasks.push(newTask);
        saveDayTasks(currentDay, tasks);
        newTaskInput.value = '';
        updateUI();
    }
});

// Добавление по Enter
newTaskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTaskBtn.click();
    }
});

// Инициализация
updateDate();
updateUI();

tg.ready();
