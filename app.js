let tg = window.Telegram.WebApp;
tg.expand();

// ===== ДАННЫЕ ПРИЛОЖЕНИЯ =====
const appSections = {
    1: { // Слайд 1: Марафон
        type: 'marathon',
        title: '🔥 Марафон',
        daysData: {
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
                    { id: 1, text: "🏃 Пробежка 2 км", completed: false },
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
        }
    },
    2: { // Слайд 2: Бег
        type: 'running',
        title: '🏃 Бег',
        stats: {
            weeklyGoal: 20,
            currentWeek: 12.5,
            totalKM: 187,
            runs: 34
        },
        recentRuns: [
            { date: "2024-02-21", km: 5.2, time: "28:30" },
            { date: "2024-02-19", km: 3.8, time: "20:15" },
            { date: "2024-02-17", km: 7.1, time: "38:42" },
            { date: "2024-02-15", km: 4.3, time: "23:10" }
        ]
    },
    3: { // Слайд 3: Дневник
        type: 'diary',
        title: '📔 Дневник',
        entries: [
            { date: "2024-02-21", text: "Отличный день! Выполнил все задачи марафона и сходил на пробежку." },
            { date: "2024-02-20", text: "Немного устал, но зарядку сделал. Завтра нужно больше кода!" },
            { date: "2024-02-19", text: "Начало положено! Установил рекорд по пробежке." }
        ]
    },
    4: { // Слайд 4: Настройки
        type: 'settings',
        title: '⚙️ Настройки',
        options: {
            notifications: true,
            theme: 'auto',
            language: 'ru'
        }
    }
};

// ===== ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ =====
let currentSlide = 1;
let currentMarathonDay = 1;
const totalMarathonDays = Object.keys(appSections[1].daysData).length;

// DOM элементы
const titleElement = document.getElementById('section-title');
const contentElement = document.getElementById('tasks-list');
const progressBarContainer = document.getElementById('progress-bar-container');
const progressFill = document.getElementById('progress-fill');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

// ===== ЗАГРУЗКА И СОХРАНЕНИЕ =====
function loadMarathonProgress(day) {
    const saved = localStorage.getItem(`marathon_day_${day}`);
    if (saved) {
        return JSON.parse(saved);
    }
    // Возвращаем копию задач с completed = false
    return appSections[1].daysData[day].tasks.map(task => ({...task, completed: false}));
}

function saveMarathonProgress(day, tasks) {
    localStorage.setItem(`marathon_day_${day}`, JSON.stringify(tasks));
    updateMarathonProgress(day, tasks);
}

function loadSettings() {
    const saved = localStorage.getItem('appSettings');
    if (saved) {
        appSections[4].options = JSON.parse(saved);
    }
}

function saveSettings() {
    localStorage.setItem('appSettings', JSON.stringify(appSections[4].options));
}

function loadDiary() {
    const saved = localStorage.getItem('diaryEntries');
    if (saved) {
        appSections[3].entries = JSON.parse(saved);
    }
}

function saveDiary() {
    localStorage.setItem('diaryEntries', JSON.stringify(appSections[3].entries));
}

function loadRunningData() {
    const saved = localStorage.getItem('runningData');
    if (saved) {
        const data = JSON.parse(saved);
        appSections[2].stats = data.stats;
        appSections[2].recentRuns = data.recentRuns;
    }
}

function saveRunningData() {
    localStorage.setItem('runningData', JSON.stringify({
        stats: appSections[2].stats,
        recentRuns: appSections[2].recentRuns
    }));
}

// ===== ОТРИСОВКА СЛАЙДОВ =====
function renderSlide(slideNumber) {
    const section = appSections[slideNumber];
    if (!section) return;
    
    // Обновляем заголовок
    titleElement.textContent = section.title;
    
    // Прячем прогресс бар на всех слайдах кроме марафона
    if (section.type === 'marathon') {
        progressBarContainer.style.display = 'block';
    } else {
        progressBarContainer.style.display = 'none';
    }
    
    // Очищаем контент и рисуем нужный слайд
    contentElement.innerHTML = '';
    
    switch(section.type) {
        case 'marathon':
            renderMarathonSlide(section);
            break;
        case 'running':
            renderRunningSlide(section);
            break;
        case 'diary':
            renderDiarySlide(section);
            break;
        case 'settings':
            renderSettingsSlide(section);
            break;
    }
    
    updateNavigationButtons(slideNumber);
}

// СЛАЙД 1: Марафон
function renderMarathonSlide(section) {
    const dayData = section.daysData[currentMarathonDay];
    const tasks = loadMarathonProgress(currentMarathonDay);
    
    // Индикатор дня
    const dayIndicator = document.createElement('div');
    dayIndicator.className = 'day-indicator';
    dayIndicator.textContent = `День ${currentMarathonDay} из ${totalMarathonDays}`;
    contentElement.appendChild(dayIndicator);
    
    // Список задач
    let completedCount = 0;
    
    tasks.forEach(task => {
        if (task.completed) completedCount++;
        
        const taskDiv = document.createElement('div');
        taskDiv.className = `task-item ${task.completed ? 'task-completed' : ''}`;
        taskDiv.innerHTML = `
            <input type="checkbox" class="task-checkbox" data-task-id="${task.id}" ${task.completed ? 'checked' : ''}>
            <span class="task-text">${task.text}</span>
        `;
        contentElement.appendChild(taskDiv);
    });
    
    // Обновляем прогресс бар
    const progress = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;
    progressFill.style.width = `${progress}%`;
    
    // Добавляем обработчики на чекбоксы
    document.querySelectorAll('.task-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', function(e) {
            const taskId = parseInt(this.dataset.taskId);
            const tasks = loadMarathonProgress(currentMarathonDay);
            const task = tasks.find(t => t.id === taskId);
            if (task) {
                task.completed = this.checked;
                saveMarathonProgress(currentMarathonDay, tasks);
                renderMarathonSlide(section); // Перерисовываем
            }
        });
    });
    
    // Кнопки навигации по дням (внутри слайда)
    const dayNav = document.createElement('div');
    dayNav.className = 'nav-buttons';
    dayNav.style.marginTop = '20px';
    dayNav.innerHTML = `
        <button class="btn" id="prev-day" ${currentMarathonDay === 1 ? 'disabled' : ''}>← Предыдущий день</button>
        <button class="btn" id="next-day" ${currentMarathonDay === totalMarathonDays ? 'disabled' : ''}>Следующий день →</button>
    `;
    contentElement.appendChild(dayNav);
    
    document.getElementById('prev-day')?.addEventListener('click', () => {
        if (currentMarathonDay > 1) {
            currentMarathonDay--;
            renderMarathonSlide(section);
        }
    });
    
    document.getElementById('next-day')?.addEventListener('click', () => {
        if (currentMarathonDay < totalMarathonDays) {
            currentMarathonDay++;
            renderMarathonSlide(section);
        }
    });
}

// СЛАЙД 2: Бег
function renderRunningSlide(section) {
    const stats = section.stats;
    const runs = section.recentRuns;
    
    const weekProgress = (stats.currentWeek / stats.weeklyGoal) * 100;
    
    let html = `
        <div class="running-stats">
            <div class="stat-card">
                <span class="stat-value">${stats.totalKM} км</span>
                <span class="stat-label">Всего</span>
            </div>
            <div class="stat-card">
                <span class="stat-value">${stats.runs}</span>
                <span class="stat-label">Тренировок</span>
            </div>
        </div>
        
        <div class="weekly-goal">
            <h3>Цель недели: ${stats.weeklyGoal} км</h3>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${weekProgress}%;"></div>
            </div>
            <p style="text-align: center; margin-top: 8px;">
                ✅ Пройдено: ${stats.currentWeek} км
            </p>
        </div>
        
        <h3>Последние пробежки</h3>
        <div class="runs-list">
    `;
    
    runs.forEach(run => {
        html += `
            <div class="run-item">
                <span class="run-date">${run.date}</span>
                <span>
                    <span class="run-distance">${run.km} км</span>
                    <span class="run-time">${run.time}</span>
                </span>
            </div>
        `;
    });
    
    html += `
        </div>
        <button class="btn add-run-btn" id="add-run-btn">+ Добавить пробежку</button>
    `;
    
    contentElement.innerHTML = html;
    
    document.getElementById('add-run-btn')?.addEventListener('click', addNewRun);
}

// СЛАЙД 3: Дневник
function renderDiarySlide(section) {
    let html = `
        <div class="diary-entries">
    `;
    
    section.entries.slice().reverse().forEach(entry => {
        html += `
            <div class="diary-entry">
                <div class="entry-date">${entry.date}</div>
                <div class="entry-text">${entry.text}</div>
            </div>
        `;
    });
    
    html += `
        </div>
        <textarea id="new-entry-text" placeholder="Напишите что-нибудь о сегодняшнем дне..."></textarea>
        <button class="btn" id="save-entry-btn">Сохранить запись</button>
    `;
    
    contentElement.innerHTML = html;
    
    document.getElementById('save-entry-btn')?.addEventListener('click', addDiaryEntry);
}

// СЛАЙД 4: Настройки
function renderSettingsSlide(section) {
    let html = `
        <div class="settings-group">
            <label class="setting-item">
                <span>🔔 Уведомления</span>
                <input type="checkbox" id="notifications" ${section.options.notifications ? 'checked' : ''}>
            </label>
            
            <label class="setting-item">
                <span>🎨 Тема</span>
                <select id="theme">
                    <option value="auto" ${section.options.theme === 'auto' ? 'selected' : ''}>Авто</option>
                    <option value="light" ${section.options.theme === 'light' ? 'selected' : ''}>Светлая</option>
                    <option value="dark" ${section.options.theme === 'dark' ? 'selected' : ''}>Темная</option>
                </select>
            </label>
            
            <label class="setting-item">
                <span>🌐 Язык</span>
                <select id="language">
                    <option value="ru" ${section.options.language === 'ru' ? 'selected' : ''}>Русский</option>
                    <option value="en" ${section.options.language === 'en' ? 'selected' : ''}>English</option>
                </select>
            </label>
        </div>
        
        <button class="btn" id="save-settings-btn">Сохранить настройки</button>
        <button class="btn reset-btn" id="reset-progress-btn">Сбросить весь прогресс</button>
    `;
    
    contentElement.innerHTML = html;
    
    document.getElementById('save-settings-btn')?.addEventListener('click', saveSettings);
    document.getElementById('reset-progress-btn')?.addEventListener('click', resetAllProgress);
}

// ===== НАВИГАЦИЯ =====
function updateNavigationButtons(current) {
    prevBtn.onclick = () => {
        if (current === 1) {
            goToSlide(4);
        } else {
            goToSlide(current - 1);
        }
    };
    
    nextBtn.onclick = () => {
        if (current === 4) {
            goToSlide(1);
        } else {
            goToSlide(current + 1);
        }
    };
}

function goToSlide(slideNumber) {
    currentSlide = slideNumber;
    renderSlide(currentSlide);
}

// ===== ДЕЙСТВИЯ =====

// Добавить пробежку
function addNewRun() {
    tg.showPopup({
        title: 'Новая пробежка',
        message: 'Введите дистанцию (км) и время',
        buttons: [{
            id: 'add',
            type: 'default',
            text: 'Добавить'
        }, {
            type: 'cancel'
        }]
    }, (buttonId) => {
        if (buttonId === 'add') {
            // Здесь можно добавить форму, но пока упростим
            const km = prompt("Дистанция (км):", "5");
            const time = prompt("Время (мм:сс):", "25:00");
            
            if (km && time) {
                const today = new Date().toISOString().split('T')[0];
                const newRun = {
                    date: today,
                    km: parseFloat(km),
                    time: time
                };
                
                appSections[2].recentRuns.unshift(newRun);
                appSections[2].stats.totalKM += parseFloat(km);
                appSections[2].stats.runs += 1;
                appSections[2].stats.currentWeek += parseFloat(km);
                
                saveRunningData();
                renderSlide(2); // Перерисовываем слайд бега
                tg.showAlert('Пробежка добавлена! 🏃');
            }
        }
    });
}

// Добавить запись в дневник
function addDiaryEntry() {
    const text = document.getElementById('new-entry-text')?.value;
    if (text && text.trim()) {
        const today = new Date().toISOString().split('T')[0];
        const newEntry = {
            date: today,
            text: text.trim()
        };
        
        appSections[3].entries.push(newEntry);
        saveDiary();
        renderSlide(3); // Перерисовываем
        
        tg.showAlert('Запись сохранена! 📝');
    } else {
        tg.showAlert('Напишите что-нибудь перед сохранением');
    }
}

// Сохранить настройки
function saveSettings() {
    const options = appSections[4].options;
    
    options.notifications = document.getElementById('notifications')?.checked || false;
    options.theme = document.getElementById('theme')?.value || 'auto';
    options.language = document.getElementById('language')?.value || 'ru';
    
    saveSettings();
    tg.showAlert('Настройки сохранены! ⚙️');
}

// Сбросить весь прогресс
function resetAllProgress() {
    tg.showPopup({
        title: 'Сброс прогресса',
        message: 'Вы уверены? Все данные будут удалены безвозвратно!',
        buttons: [
            { id: 'reset', type: 'destructive', text: 'Сбросить' },
            { type: 'cancel' }
        ]
    }, (buttonId) => {
        if (buttonId === 'reset') {
            // Очищаем localStorage
            localStorage.clear();
            
            // Восстанавливаем начальные данные
            location.reload(); // Просто перезагружаем страницу
        }
    });
}

// Обновление прогресса марафона (вспомогательная)
function updateMarathonProgress(day, tasks) {
    const completed = tasks.filter(t => t.completed).length;
    const progress = tasks.length > 0 ? (completed / tasks.length) * 100 : 0;
    progressFill.style.width = `${progress}%`;
}

// ===== ИНИЦИАЛИЗАЦИЯ =====
function init() {
    // Загружаем сохраненные данные
    loadSettings();
    loadDiary();
    loadRunningData();
    
    // Показываем первый слайд
    renderSlide(1);
    
    // Сообщаем Telegram, что приложение готово
    tg.ready();
    
    console.log('Mini App запущен!');
}

// Запускаем при загрузке страницы
init();
