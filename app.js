let tg = window.Telegram.WebApp;
tg.expand(); // Растягиваем на всё окно

// Данные марафона (это может приходить с сервера)
const marathonData = {
    1: {
        title: "День 1: Старт",
        tasks: [
            { id: 1, text: "🔋 Сделать зарядку", completed: false },
            { id: 2, text: "💻 Писать код 15 минут", completed: false },
            { id: 3, text: "📖 Почитать книгу 10 страниц", completed: false }
        ]
    },
    2: {
        title: "День 2: Развитие",
        tasks: [
            { id: 1, text: "🏃 Пробежка", completed: false },
            { id: 2, text: "💻 Писать код 30 минут", completed: false },
            { id: 3, text: "🧘 Медитация 5 минут", completed: false }
        ]
    },
    3: {
        title: "День 3: Закрепление",
        tasks: [
            { id: 1, text: "🏋️ Силовая тренировка", completed: false },
            { id: 2, text: "💻 Писать код 45 минут", completed: false },
            { id: 3, text: "📝 Запланировать завтрашний день", completed: false }
        ]
    }
};

let currentDay = 1;
const totalDays = Object.keys(marathonData).length;

// DOM элементы
const titleSpan = document.getElementById('current-day');
const tasksList = document.getElementById('tasks-list');
const progressFill = document.getElementById('progress-fill');
const prevBtn = document.getElementById('prev-day');
const nextBtn = document.getElementById('next-day');

// Функция для сохранения прогресса (можно отправлять на сервер)
function saveProgress(day, tasks) {
    // Сохраняем в локальное хранилище браузера
    localStorage.setItem(`marathon_day_${day}`, JSON.stringify(tasks));
    
    // Здесь можно отправить данные на сервер через fetch
    // tg.sendData(JSON.stringify({day: day, tasks: tasks})); // Отправит боту
}

// Загрузка прогресса за день
function loadProgress(day) {
    const saved = localStorage.getItem(`marathon_day_${day}`);
    if (saved) {
        return JSON.parse(saved);
    }
    // Если нет сохранений, берем дефолтные задачи
    return marathonData[day].tasks.map(task => ({...task, completed: false}));
}

// Отрисовка экрана
function renderDay(day) {
    // Обновляем заголовок
    titleSpan.textContent = day;
    
    // Загружаем задачи (с учетом прогресса)
    const tasks = loadProgress(day);
    
    // Отрисовываем список задач
    tasksList.innerHTML = '';
    let completedCount = 0;
    
    tasks.forEach(task => {
        if (task.completed) completedCount++;
        
        const taskDiv = document.createElement('div');
        taskDiv.className = `task-item ${task.completed ? 'task-completed' : ''}`;
        taskDiv.innerHTML = `
            <input type="checkbox" class="task-checkbox" data-task-id="${task.id}" ${task.completed ? 'checked' : ''}>
            <span class="task-text">${task.text}</span>
        `;
        tasksList.appendChild(taskDiv);
    });
    
    // Обновляем прогресс бар
    const progress = (completedCount / tasks.length) * 100;
    progressFill.style.width = `${progress}%`;
    
    // Добавляем слушатели на чекбоксы
    document.querySelectorAll('.task-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', function(e) {
            const taskId = parseInt(this.dataset.taskId);
            const tasks = loadProgress(currentDay);
            const task = tasks.find(t => t.id === taskId);
            if (task) {
                task.completed = this.checked;
                saveProgress(currentDay, tasks);
                renderDay(currentDay); // Перерисовываем для обновления прогресс бара и стилей
            }
        });
    });
    
    // Блокируем кнопки навигации
    prevBtn.disabled = (day === 1);
    nextBtn.disabled = (day === totalDays);
}

// Навигация
prevBtn.addEventListener('click', () => {
    if (currentDay > 1) {
        currentDay--;
        renderDay(currentDay);
    }
});

nextBtn.addEventListener('click', () => {
    if (currentDay < totalDays) {
        currentDay++;
        renderDay(currentDay);
    }
});

// Инициализация
renderDay(currentDay);

// Сообщаем Telegram, что приложение готово
tg.ready();
