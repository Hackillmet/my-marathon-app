let tg = window.Telegram.WebApp;
tg.expand();

// Получаем ID пользователя
const userId = tg.initDataUnsafe?.user?.id || 'local_user';

// Ключи для хранения
const STORAGE_KEYS = {
    CURRENT_DAY: `run_day_${userId}`,
    DAY_STARTED: `run_started_${userId}`,
    DAY_START_TIME: `run_start_time_${userId}`,
    DAY_COMPLETED_TIME: `run_completed_time_${userId}`,
    WORKOUT_STEPS: `run_steps_${userId}`,
    WORKOUT_NAME: `run_name_${userId}`,
    WORKOUT_DIFFICULTY: `run_difficulty_${userId}`,
    TOTAL_DISTANCE: `run_total_${userId}`,
    CURRENT_WORKOUT_DISTANCE: `current_workout_distance_${userId}`,
    WORKOUT_COMPLETED: `workout_completed_${userId}`,
    HISTORY: `run_history_${userId}`,
    DIARY_ENTRIES: `diary_entries_${userId}`,
    THEME: `theme_${userId}`,
    LANGUAGE: `language_${userId}`
};

// Тестовая тренировка
const TEST_WORKOUT = {
    id: 1,
    name: "🏃‍♂️ Тестовая тренировка",
    difficulty: "easy",
    steps: [
        { id: 1, text: "🏋️ Разминка 10 минут", completed: false, distance: 0 },
        { id: 2, text: "🏃 Бег 15 минут", completed: false, distance: 2 },
        { id: 3, text: "🦵 Спец беговые упражнения", completed: false, distance: 0 },
        { id: 4, text: "⚡ Ускорение 4х400 метров", completed: false, distance: 1.6 }
    ],
    totalDistance: 3.6
};

// Состояние
let currentDay = 1;
let dayStarted = false;
let dayStartTime = null;
let dayCompletedTime = null;
let currentWorkout = null;
let workoutCompleted = false;
let currentWorkoutDistance = 0;
let currentLanguage = 'ru';
let currentTheme = 'dark';
let runningHistory = [];
let diaryEntries = [];
let currentSlide = 0;

// Функции времени (упрощенные для теста)
function canStartByTime() {
    return true; // Всегда можно для теста
}

function canCompleteByTime() {
    return true; // Всегда можно для теста
}

function canStartNewDay() {
    return true; // Всегда можно для теста
}

function isDayExpired() {
    return false; // Никогда не истекает для теста
}

// Загрузка/сохранение
function loadData() {
    currentDay = parseInt(localStorage.getItem(STORAGE_KEYS.CURRENT_DAY)) || 1;
    dayStarted = localStorage.getItem(STORAGE_KEYS.DAY_STARTED) === 'true';
    dayStartTime = localStorage.getItem(STORAGE_KEYS.DAY_START_TIME);
    dayCompletedTime = localStorage.getItem(STORAGE_KEYS.DAY_COMPLETED_TIME);
    workoutCompleted = localStorage.getItem(STORAGE_KEYS.WORKOUT_COMPLETED) === 'true';
    currentWorkoutDistance = parseFloat(localStorage.getItem(STORAGE_KEYS.CURRENT_WORKOUT_DISTANCE)) || 0;
    runningHistory = JSON.parse(localStorage.getItem(STORAGE_KEYS.HISTORY)) || [];
    diaryEntries = JSON.parse(localStorage.getItem(STORAGE_KEYS.DIARY_ENTRIES)) || [];
    
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
    if (savedTheme) setTheme(savedTheme);
    
    const savedLang = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
    if (savedLang) {
        currentLanguage = savedLang;
    }
    
    if (dayStarted) {
        const steps = JSON.parse(localStorage.getItem(STORAGE_KEYS.WORKOUT_STEPS));
        if (steps) {
            currentWorkout = {
                id: parseInt(localStorage.getItem(STORAGE_KEYS.CURRENT_DAY)),
                name: localStorage.getItem(STORAGE_KEYS.WORKOUT_NAME),
                difficulty: localStorage.getItem(STORAGE_KEYS.WORKOUT_DIFFICULTY),
                steps: steps,
                totalDistance: parseFloat(localStorage.getItem(STORAGE_KEYS.TOTAL_DISTANCE))
            };
        }
    }
}

function saveData() {
    localStorage.setItem(STORAGE_KEYS.CURRENT_DAY, currentDay);
    localStorage.setItem(STORAGE_KEYS.DAY_STARTED, dayStarted);
    localStorage.setItem(STORAGE_KEYS.DAY_START_TIME, dayStartTime);
    localStorage.setItem(STORAGE_KEYS.DAY_COMPLETED_TIME, dayCompletedTime);
    localStorage.setItem(STORAGE_KEYS.WORKOUT_COMPLETED, workoutCompleted);
    localStorage.setItem(STORAGE_KEYS.CURRENT_WORKOUT_DISTANCE, currentWorkoutDistance);
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(runningHistory));
    localStorage.setItem(STORAGE_KEYS.DIARY_ENTRIES, JSON.stringify(diaryEntries));
    localStorage.setItem(STORAGE_KEYS.THEME, currentTheme);
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, currentLanguage);
    
    if (currentWorkout && dayStarted) {
        localStorage.setItem(STORAGE_KEYS.WORKOUT_STEPS, JSON.stringify(currentWorkout.steps));
        localStorage.setItem(STORAGE_KEYS.WORKOUT_NAME, currentWorkout.name);
        localStorage.setItem(STORAGE_KEYS.WORKOUT_DIFFICULTY, currentWorkout.difficulty);
        localStorage.setItem(STORAGE_KEYS.TOTAL_DISTANCE, currentWorkout.totalDistance);
    }
}

// Тема и язык
function setTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
    
    document.getElementById('theme-dark')?.classList.toggle('active', theme === 'dark');
    document.getElementById('theme-light')?.classList.toggle('active', theme === 'light');
}

function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
    
    document.getElementById('lang-ru')?.classList.toggle('active', lang === 'ru');
    document.getElementById('lang-en')?.classList.toggle('active', lang === 'en');
}

// Навигация
function switchPage(pageIndex) {
    const slides = document.querySelectorAll('.slide');
    const navButtons = document.querySelectorAll('.nav-btn');
    const container = document.getElementById('slidesContainer');
    
    if (pageIndex < 0 || pageIndex >= slides.length) return;
    
    container.scrollTo({
        left: pageIndex * container.clientWidth,
        behavior: 'smooth'
    });
    
    navButtons.forEach((btn, index) => {
        btn.classList.toggle('active', index === pageIndex);
    });
    
    currentSlide = pageIndex;
}

// ========== ОСНОВНАЯ ФУНКЦИЯ ==========
function updateUI() {
    console.log('updateUI called', { dayStarted, currentDay });
    
    document.getElementById('start-day-number').textContent = currentDay;
    document.getElementById('current-day').textContent = currentDay;
    
    if (!dayStarted) {
        // Показываем стартовый экран
        document.getElementById('start-screen').style.display = 'block';
        document.getElementById('marathon-screen').style.display = 'none';
        document.getElementById('congrats').style.display = 'none';
        
        // Активируем кнопку
        const btn = document.getElementById('start-day-btn');
        btn.disabled = false;
        btn.textContent = "🏃 Начать бег";
        
    } else {
        // Показываем экран тренировки
        console.log('Показываем экран тренировки');
        document.getElementById('start-screen').style.display = 'none';
        document.getElementById('marathon-screen').style.display = 'block';
        document.getElementById('congrats').style.display = 'none';
        
        renderWorkout();
    }
}

function renderWorkout() {
    if (!currentWorkout) {
        currentWorkout = JSON.parse(JSON.stringify(TEST_WORKOUT));
        workoutCompleted = false;
        currentWorkoutDistance = 0;
    }
    
    document.getElementById('workout-name').textContent = currentWorkout.name;
    
    const difficultyEl = document.getElementById('workout-difficulty');
    difficultyEl.textContent = 'Легкая';
    difficultyEl.className = 'workout-difficulty difficulty-easy';
    
    const stepsContainer = document.getElementById('workout-steps');
    stepsContainer.innerHTML = '';
    
    currentWorkout.steps.forEach(step => {
        const stepDiv = document.createElement('div');
        stepDiv.className = `workout-step ${step.completed ? 'step-completed' : ''}`;
        stepDiv.innerHTML = `
            <input type="checkbox" class="workout-checkbox" data-id="${step.id}" ${step.completed ? 'checked' : ''}>
            <span class="step-text">${step.text}</span>
            ${step.distance > 0 ? `<span class="step-distance">${step.distance} км</span>` : ''}
        `;
        stepsContainer.appendChild(stepDiv);
    });
    
    document.querySelectorAll('.workout-checkbox').forEach(cb => {
        cb.addEventListener('change', function() {
            const id = parseInt(this.dataset.id);
            const step = currentWorkout.steps.find(s => s.id === id);
            if (step) {
                step.completed = this.checked;
                saveData();
                updateProgress();
            }
        });
    });
    
    updateProgress();
}

function updateProgress() {
    const completed = currentWorkout.steps.filter(s => s.completed).length;
    const total = currentWorkout.steps.length;
    const progress = (completed / total) * 100;
    
    document.getElementById('workout-fill').style.width = `${progress}%`;
    document.getElementById('workout-percent').textContent = `${Math.round(progress)}%`;
    
    const allStepsCompleted = currentWorkout.steps.every(s => s.completed);
    
    if (allStepsCompleted && !workoutCompleted) {
        workoutCompleted = true;
        
        let distance = 0;
        currentWorkout.steps.forEach(step => {
            if (step.completed) distance += step.distance || 0;
        });
        currentWorkoutDistance = distance;
        
        saveData();
        
        tg.showPopup({
            title: '🎉 Отлично!',
            message: 'Тренировка завершена!',
            buttons: [{ type: 'close' }]
        });
    }
    
    const btn = document.getElementById('complete-day-btn');
    btn.disabled = !workoutCompleted;
}

function updateDate() {
    const now = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    document.getElementById('current-date').textContent = now.toLocaleDateString('ru-RU', options);
}

// ========== ЗАПУСК ==========
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM загружен');
    
    loadData();
    setTheme(currentTheme);
    updateDate();
    updateUI();
    
    // КНОПКА "НАЧАТЬ БЕГ"
    const startBtn = document.getElementById('start-day-btn');
    if (startBtn) {
        console.log('Кнопка найдена!');
        
        startBtn.addEventListener('click', function() {
            console.log('Кнопка нажата!');
            
            // Просто запускаем день
            dayStarted = true;
            dayStartTime = new Date().getTime().toString();
            dayCompletedTime = null;
            workoutCompleted = false;
            currentWorkoutDistance = 0;
            currentWorkout = JSON.parse(JSON.stringify(TEST_WORKOUT));
            
            saveData();
            updateUI();
        });
        
    } else {
        console.error('КНОПКА НЕ НАЙДЕНА! Проверь ID="start-day-btn" в HTML');
    }
    
    // Кнопка "Завершить день"
    const completeBtn = document.getElementById('complete-day-btn');
    if (completeBtn) {
        completeBtn.addEventListener('click', function() {
            if (!workoutCompleted) {
                tg.showAlert('Сначала выполни все шаги!');
                return;
            }
            
            tg.showAlert('День завершен!');
            dayStarted = false;
            saveData();
            updateUI();
        });
    }
    
    // Меню
    const menuBtn = document.getElementById('menu-btn');
    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            const menu = document.getElementById('menu-dropdown');
            if (menu.style.display === 'none') {
                menu.style.display = 'block';
                menuBtn.classList.add('active');
            } else {
                menu.style.display = 'none';
                menuBtn.classList.remove('active');
            }
        });
    }
    
    tg.ready();
});

// Глобальные функции
window.switchPage = switchPage;
window.setTheme = setTheme;
window.setLanguage = setLanguage;
