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
    DAY_COMPLETED_TIME: `day_completed_time_${userId}` // Время завершения дня
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
let dayCompletedTime = null;

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
    dayCompletedTime = localStorage.getItem(STORAGE_KEYS.DAY_COMPLETED_TIME);
    
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
    if (dayCompletedTime) {
        localStorage.setItem(STORAGE_KEYS.DAY_COMPLETED_TIME, dayCompletedTime);
    }
}

// Проверка, можно ли начать новый день
function canStartNewDay() {
    if (!dayCompletedTime) return true; // Если день не завершен, можно начать
    
    const now = new Date().getTime();
    const completedTime = parseInt(dayCompletedTime);
    const hoursPassed = (now - completedTime) / (1000 * 60 * 60);
    
    return hoursPassed >= 24; // Прошло 24 часа?
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
    
    // Проверяем, можно ли начать день
    const canStart = canStartNewDay();
    
    if (!dayStarted) {
        startScreen.style.display = 'block';
        marathonScreen.style.display = 'none';
        congratsDiv.style.display = 'none';
        
        // Если день завершен и еще не прошло 24 часа
        if (dayCompletedTime && !canStart) {
            const remaining = getTimeRemaining();
            if (remaining) {
                startDayBtn.textContent = `⏳ Следующий день через ${remaining.hours}ч ${remaining.minutes}м`;
                startDayBtn.disabled = true;
                startDayBtn.style.opacity = '0.5';
            }
        } else {
            startDayBtn.textContent = '🚀 Начать день';
            startDayBtn.disabled = false;
            startDayBtn.style.opacity = '1';
        }
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
    if (!canStartNewDay()) {
        const remaining = getTimeRemaining();
        tg.showAlert(`⏳ Еще не прошло 24 часа! Следующий день откроется через ${remaining.hours}ч ${remaining.minutes}м`);
        return;
    }
    
    dayStarted = true;
    dayCompletedTime = null; // Сбрасываем время завершения
    localStorage.removeItem(STORAGE_KEYS.DAY_COMPLETED_TIME);
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
    
    // Сохраняем время завершения дня
    dayCompletedTime = new Date().getTime().toString();
    dayStarted = false;
    
    // Не увеличиваем currentDay сразу, ждем 24 часа
    saveData();
    
    startScreen.style.display = 'none';
    marathonScreen.style.display = 'none';
    congratsDiv.style.display = 'block';
    
    tg.showAlert(`🎉 Молодец! День ${currentDay} завершен!\n🧠 Разум: ${mindProgress}%\n💚 Дух: ${spiritProgress}%\n\n⏳ Следующий день откроется через 24 часа`);
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

// Меню с анимацией
menuBtn.addEventListener('click', () => {
    if (menuDropdown.style.display === 'none') {
        menuDropdown.style.display = 'block';
        menuBtn.classList.add('active');
        setTimeout(() => {
            menuDropdown.style.opacity = '1';
        }, 10);
    } else {
        menuDropdown.style.opacity = '0';
        menuBtn.classList.remove('active');
        setTimeout(() => {
            menuDropdown.style.display = 'none';
        }, 300);
    }
});

// Закрыть меню при клике вне его
document.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !menuDropdown.contains(e.target)) {
        menuDropdown.style.opacity = '0';
        menuBtn.classList.remove('active');
        setTimeout(() => {
            menuDropdown.style.display = 'none';
        }, 300);
    }
});

// Функции меню
resetDayBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (confirm('Сбросить текущий день? Весь прогресс будет потерян.')) {
        dayStarted = false;
        dayCompletedTime = null;
        habits = DEFAULT_HABITS.map(h => ({...h, completed: false}));
        tasks = DEFAULT_TASKS.map(t => ({...t, completed: false}));
        saveData();
        updateUI();
        menuDropdown.style.opacity = '0';
        menuBtn.classList.remove('active');
        setTimeout(() => {
            menuDropdown.style.display = 'none';
        }, 300);
    }
});

newMarathonBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (confirm('Начать новый марафон? Весь прогресс будет сброшен.')) {
        currentDay = 1;
        dayStarted = false;
        dayCompletedTime = null;
        habits = DEFAULT_HABITS.map(h => ({...h, completed: false}));
        tasks = DEFAULT_TASKS.map(t => ({...t, completed: false}));
        saveData();
        updateUI();
        menuDropdown.style.opacity = '0';
        menuBtn.classList.remove('active');
        setTimeout(() => {
            menuDropdown.style.display = 'none';
        }, 300);
    }
});

statsBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const totalDays = dayCompletedTime ? currentDay : currentDay - 1;
    tg.showAlert(`📊 Статистика:\nПройдено дней: ${totalDays}\nТекущий день: ${currentDay}`);
    menuDropdown.style.opacity = '0';
    menuBtn.classList.remove('active');
    setTimeout(() => {
        menuDropdown.style.display = 'none';
    }, 300);
});

supportBtn.addEventListener('click', (e) => {
    e.preventDefault();
    tg.showAlert('💬 Поддержка: @frontendchikk');
    menuDropdown.style.opacity = '0';
    menuBtn.classList.remove('active');
    setTimeout(() => {
        menuDropdown.style.display = 'none';
    }, 300);
});

telegramSupport.addEventListener('click', (e) => {
    e.preventDefault();
    tg.openTelegramLink('https://t.me/frontendchikk');
    menuDropdown.style.opacity = '0';
    menuBtn.classList.remove('active');
    setTimeout(() => {
        menuDropdown.style.display = 'none';
    }, 300);
});

faqBtn.addEventListener('click', (e) => {
    e.preventDefault();
    tg.showAlert('❓ Часто задаваемые вопросы:\n\n1. Как сбросить день? - В меню "Сбросить день"\n2. Как добавить привычку? - Нажмите +\n3. Связь с автором: @frontendchikk\n4. Следующий день открывается через 24 часа');
    menuDropdown.style.opacity = '0';
    menuBtn.classList.remove('active');
    setTimeout(() => {
        menuDropdown.style.display = 'none';
    }, 300);
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

// Проверяем каждую минуту, не прошло ли 24 часа
setInterval(() => {
    if (!dayStarted && dayCompletedTime) {
        updateUI(); // Обновляем UI, чтобы изменить текст кнопки если время прошло
    }
}, 60000); // Проверка каждую минуту

// Инициализация
updateDate();
loadData();
updateUI();

tg.ready();
