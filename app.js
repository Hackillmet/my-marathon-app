let tg = window.Telegram.WebApp;
tg.expand();

// ========== ПРОСТЫЕ ПЕРЕМЕННЫЕ ==========
let currentDay = 1;
let customWorkout = null;
let customTasks = [];

// ========== ЭЛЕМЕНТЫ ==========
const customTasksList = document.getElementById('custom-tasks-list');
const goalInput = document.getElementById('goal-distance');
const taskText = document.getElementById('new-task-text');
const taskDistance = document.getElementById('new-task-distance');
const addTaskBtn = document.getElementById('add-task-btn');
const createPlanBtn = document.getElementById('create-plan-btn');

// ========== ФУНКЦИЯ ОТОБРАЖЕНИЯ ==========
function updateDisplay() {
    if (!customTasksList) return;
    
    // Если есть активная тренировка - показываем её
    if (customWorkout) {
        customTasksList.innerHTML = '';
        
        // Показываем шаги тренировки
        customWorkout.steps.forEach((step, index) => {
            const stepDiv = document.createElement('div');
            stepDiv.className = `workout-step ${step.completed ? 'step-completed' : ''}`;
            stepDiv.innerHTML = `
                <input type="checkbox" class="workout-checkbox" data-index="${index}" ${step.completed ? 'checked' : ''}>
                <span class="step-text">${step.text}</span>
                ${step.distance > 0 ? `<span class="step-distance">+${step.distance} км</span>` : ''}
            `;
            customTasksList.appendChild(stepDiv);
        });
        
        // Добавляем обработчики на чекбоксы
        document.querySelectorAll('#custom-tasks-list .workout-checkbox').forEach(cb => {
            cb.addEventListener('change', function() {
                const index = parseInt(this.dataset.index);
                customWorkout.steps[index].completed = this.checked;
                
                // Обновляем класс
                const stepDiv = this.closest('.workout-step');
                if (this.checked) {
                    stepDiv.classList.add('step-completed');
                } else {
                    stepDiv.classList.remove('step-completed');
                }
                
                // Проверяем, все ли выполнены
                const allCompleted = customWorkout.steps.every(s => s.completed);
                if (allCompleted) {
                    tg.showPopup({
                        title: '🎉 Отлично!',
                        message: 'Тренировка выполнена!',
                        buttons: [{ type: 'close' }]
                    });
                }
            });
        });
        
        // Прячем форму создания
        document.querySelector('.goal-card').style.display = 'none';
        document.querySelector('.tasks-creator').style.display = 'none';
        createPlanBtn.style.display = 'none';
        
    } else {
        // Показываем форму создания
        document.querySelector('.goal-card').style.display = 'block';
        document.querySelector('.tasks-creator').style.display = 'block';
        createPlanBtn.style.display = 'block';
        
        // Показываем список заданий или пустое сообщение
        if (customTasks.length === 0) {
            customTasksList.innerHTML = '<div class="empty-tasks">➕ Добавь задания для тренировки</div>';
        } else {
            customTasksList.innerHTML = '';
            customTasks.forEach((task, index) => {
                const taskDiv = document.createElement('div');
                taskDiv.className = 'custom-task-item';
                taskDiv.innerHTML = `
                    <span class="custom-task-text">${task.text}</span>
                    <span class="custom-task-distance">${task.distance > 0 ? '+' + task.distance + ' км' : 'разминка'}</span>
                    <button class="custom-task-delete" data-index="${index}">✕</button>
                `;
                customTasksList.appendChild(taskDiv);
            });
            
            // Добавляем обработчики удаления
            document.querySelectorAll('.custom-task-delete').forEach(btn => {
                btn.addEventListener('click', function() {
                    const index = parseInt(this.dataset.index);
                    customTasks.splice(index, 1);
                    updateDisplay();
                });
            });
        }
        
        // Обновляем состояние кнопки создания
        const goal = parseFloat(goalInput?.value) || 0;
        createPlanBtn.disabled = !(goal > 0 && customTasks.length > 0);
    }
}

// ========== ДОБАВЛЕНИЕ ЗАДАНИЯ ==========
if (addTaskBtn) {
    addTaskBtn.addEventListener('click', function() {
        const text = taskText?.value.trim();
        const distance = parseFloat(taskDistance?.value) || 0;
        
        if (!text) {
            tg.showAlert('Введите название задания');
            return;
        }
        
        customTasks.push({ text, distance });
        
        if (taskText) taskText.value = '';
        if (taskDistance) taskDistance.value = 0;
        
        updateDisplay();
    });
}

// ========== СОЗДАНИЕ ТРЕНИРОВКИ ==========
if (createPlanBtn) {
    createPlanBtn.addEventListener('click', function() {
        const goal = parseFloat(goalInput?.value) || 0;
        
        customWorkout = {
            name: `🎯 Моя тренировка`,
            steps: customTasks.map((task, index) => ({
                id: index + 1,
                text: task.text,
                completed: false,
                distance: task.distance
            }))
        };
        
        customTasks = [];
        
        tg.showPopup({
            title: '✅ Тренировка создана!',
            message: 'Отмечай выполнение прямо здесь!',
            buttons: [{ type: 'close' }]
        });
        
        updateDisplay();
    });
}

// ========== ОБНОВЛЕНИЕ СОСТОЯНИЯ КНОПКИ ==========
if (goalInput) {
    goalInput.addEventListener('input', function() {
        const goal = parseFloat(goalInput.value) || 0;
        createPlanBtn.disabled = !(goal > 0 && customTasks.length > 0);
    });
}

// ========== НАВИГАЦИЯ ==========
window.switchPage = function(pageIndex) {
    const slides = document.querySelectorAll('.slide');
    const navButtons = document.querySelectorAll('.nav-btn');
    const container = document.getElementById('slidesContainer');
    
    if (!container || slides.length === 0) return;
    
    container.scrollTo({
        left: pageIndex * container.clientWidth,
        behavior: 'smooth'
    });
    
    navButtons.forEach((btn, index) => {
        btn.classList.toggle('active', index === pageIndex);
    });
    
    // При переходе на слайд создания обновляем отображение
    if (pageIndex === 2) {
        updateDisplay();
    }
};

// ========== ТЕМЫ ==========
window.setTheme = function(theme) {
    document.documentElement.setAttribute('data-theme', theme);
};

// ========== МЕНЮ ==========
const menuBtn = document.getElementById('menu-btn');
if (menuBtn) {
    menuBtn.addEventListener('click', function() {
        const menu = document.getElementById('menu-dropdown');
        if (menu) {
            if (menu.style.display === 'none' || menu.style.display === '') {
                menu.style.display = 'block';
                menuBtn.classList.add('active');
            } else {
                menu.style.display = 'none';
                menuBtn.classList.remove('active');
            }
        }
    });
}

document.addEventListener('click', function(e) {
    const menu = document.getElementById('menu-dropdown');
    const btn = document.getElementById('menu-btn');
    if (btn && menu && !btn.contains(e.target) && !menu.contains(e.target)) {
        menu.style.display = 'none';
        btn.classList.remove('active');
    }
});

// ========== ДАТА ==========
function updateDate() {
    const now = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const dateEl = document.getElementById('current-date');
    if (dateEl) {
        dateEl.textContent = now.toLocaleDateString('ru-RU', options);
    }
}
updateDate();

tg.ready();
