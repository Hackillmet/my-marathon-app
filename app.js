let tg = window.Telegram.WebApp;
tg.expand();

// Получаем данные пользователя
const userId = tg.initDataUnsafe?.user?.id || 'local_user_' + Date.now();
const userName = tg.initDataUnsafe?.user?.first_name || 'Космонавт';
const userUsername = tg.initDataUnsafe?.user?.username || 'cosmonaut_' + Date.now().toString().slice(-4);

// ========== ДАТА СТАРТА МАРАФОНА ==========
const MARATHON_START_DATE = new Date(2025, 5, 1);

// ========== КЛЮЧИ ДЛЯ ХРАНЕНИЯ ==========
const STORAGE_KEYS = {
    CURRENT_DAY: 'current_day',
    DAY_STARTED: 'day_started',
    DAY_START_TIME: 'day_start_time',
    DAY_COMPLETED_TIME: 'day_completed_time',
    COMPLETED_STEPS: 'completed_steps',
    ADDITIONAL_TASKS: 'additional_tasks',
    ADDITIONAL_COMPLETED: 'additional_completed',
    WORKOUT_HISTORY: 'workout_history',
    TOTAL_DISTANCE: 'total_distance',
    TOTAL_WORKOUTS: 'total_workouts',
    TOTAL_TIME: 'total_time',
    TOTAL_CALORIES: 'total_calories',
    DIARY_ENTRIES: 'diary_entries',
    THEME: 'theme',
    LANGUAGE: 'language',
    FRIENDS: 'friends',
    FRIEND_REQUESTS: 'friend_requests',
    SENT_REQUESTS: 'sent_requests',
    SAVED_WORKOUTS: 'saved_workouts',
    ACTIVE_WORKOUT: 'active_workout',
    INVITE_CODE: 'invite_code',
    INVITED_FRIENDS: 'invited_friends',
    BONUS_POINTS: 'bonus_points',
    STRENGTH_HISTORY: 'strength_history',
    STRENGTH_TOTAL_PULLUPS: 'strength_total_pullups',
    STRENGTH_TOTAL_PUSHUPS: 'strength_total_pushups',
    STRENGTH_TOTAL_DAYS: 'strength_total_days',
    STRENGTH_BEST_PULLUPS: 'strength_best_pullups',
    STRENGTH_TODAY: 'strength_today',
    USER_LEVEL: 'user_level',
    USER_XP: 'user_xp'
};

// ========== ПЕРЕВОДЫ ==========
const translations = {
    ru: {
        ready: "Готов к полету?",
        startBtn: "🚀 Начать тренировку",
        completeBtn: "✅ Завершить день",
        progress: "Прогресс",
        waitUntil4am: "⏰ Старт в 4:00",
        waitUntilNextDay: (h, m) => `⏳ Следующий день в 4:00 (осталось ${h}ч ${m}м)`,
        canStart: "✅ Можно начинать",
        dayExpired: "⏰ День истек",
        timeLeft: (h, m) => `⏳ Осталось: ${h}ч ${m}м`,
        dayExpiredMsg: "⏰ Время тренировки истекло!",
        newDayAvailable: "🌟 Новый день доступен!",
        mainWorkout: "КОСМИЧЕСКАЯ ТРЕНИРОВКА",
        addedTasks: "➕ ДОПОЛНИТЕЛЬНЫЕ ЗАДАНИЯ",
        congrats: "🎉 ТРЕНИРОВКА ЗАВЕРШЕНА!",
        youRan: "Ты преодолел(а):",
        home: "🏠 На главную",
        distance: "км",
        minutes: "мин",
        kcal: "ккал",
        pace: "мин/км",
        
        // Уровни
        level_names: {
            1: "🌱 Новобранец",
            2: "🚀 Пилот",
            3: "⭐ Астронавт",
            4: "🌕 Лунный бегун",
            5: "🪐 Покоритель планет",
            6: "☄️ Метеорит",
            7: "🌌 Галактический",
            8: "⚡ Космическая молния",
            9: "👾 Пришелец",
            10: "👽 Легенда"
        },
        
        // Друзья
        myFriends: "Друзья в космосе",
        findFriends: "Поиск",
        top: "Топ космонавтов",
        diary: "Дневник",
        noFriends: "Пока нет друзей",
        noFriendsDesc: "Пригласите друзей в полет",
        addFriend: "➕ Добавить друга",
        friendPlaceholder: "@username",
        search: "🔍 Поиск",
        noResults: "Ничего не найдено",
        sendRequest: "📤 Отправить",
        requestSent: "✅ Заявка отправлена",
        accept: "✓ Принять",
        decline: "✗ Отклонить",
        remove: "Удалить",
        message: "💬 Написать",
        
        // Приглашения
        inviteFriends: "🔗 Пригласить друга",
        inviteText: "Пригласи друга и получи 50 космо-бонусов!",
        sendInvite: "📤 Отправить",
        copyLink: "📋 Копировать",
        inviteCopied: "✅ Ссылка скопирована!",
        
        // Дневник
        newEntry: "➕ Новая запись",
        save: "Сохранить",
        cancel: "Отмена",
        noEntries: "📝 Пока нет записей",
        entryPlaceholder: "Как прошла тренировка? Поделись мыслями..."
    },
    en: {
        ready: "Ready for flight?",
        startBtn: "🚀 Start training",
        completeBtn: "✅ Complete day",
        progress: "Progress",
        waitUntil4am: "⏰ Start at 4:00 AM",
        waitUntilNextDay: (h, m) => `⏳ Next day at 4:00 AM (${h}h ${m}m left)`,
        canStart: "✅ You can start",
        dayExpired: "⏰ Day expired",
        timeLeft: (h, m) => `⏳ Time left: ${h}h ${m}m`,
        dayExpiredMsg: "⏰ Workout expired!",
        newDayAvailable: "🌟 New day available!",
        mainWorkout: "COSMIC WORKOUT",
        addedTasks: "➕ ADDED TASKS",
        congrats: "🎉 WORKOUT COMPLETED!",
        youRan: "You ran:",
        home: "🏠 Home",
        distance: "km",
        minutes: "min",
        kcal: "kcal",
        pace: "min/km",
        
        // Levels
        level_names: {
            1: "🌱 Rookie",
            2: "🚀 Pilot",
            3: "⭐ Astronaut",
            4: "🌕 Moon runner",
            5: "🪐 Planet conqueror",
            6: "☄️ Meteor",
            7: "🌌 Galactic",
            8: "⚡ Cosmic lightning",
            9: "👾 Alien",
            10: "👽 Legend"
        }
    }
};

// ========== СОСТОЯНИЕ ==========
let currentDay = parseInt(localStorage.getItem(STORAGE_KEYS.CURRENT_DAY)) || 1;
let dayStarted = localStorage.getItem(STORAGE_KEYS.DAY_STARTED) === 'true';
let dayStartTime = localStorage.getItem(STORAGE_KEYS.DAY_START_TIME);
let dayCompletedTime = localStorage.getItem(STORAGE_KEYS.DAY_COMPLETED_TIME);
let completedSteps = JSON.parse(localStorage.getItem(STORAGE_KEYS.COMPLETED_STEPS)) || [];
let additionalTasks = JSON.parse(localStorage.getItem(STORAGE_KEYS.ADDITIONAL_TASKS)) || [];
let additionalCompleted = JSON.parse(localStorage.getItem(STORAGE_KEYS.ADDITIONAL_COMPLETED)) || [];
let workoutHistory = JSON.parse(localStorage.getItem(STORAGE_KEYS.WORKOUT_HISTORY)) || [];
let totalDistance = parseFloat(localStorage.getItem(STORAGE_KEYS.TOTAL_DISTANCE)) || 0;
let totalWorkouts = parseInt(localStorage.getItem(STORAGE_KEYS.TOTAL_WORKOUTS)) || 0;
let totalTime = parseInt(localStorage.getItem(STORAGE_KEYS.TOTAL_TIME)) || 0;
let totalCalories = parseInt(localStorage.getItem(STORAGE_KEYS.TOTAL_CALORIES)) || 0;
let diaryEntries = JSON.parse(localStorage.getItem(STORAGE_KEYS.DIARY_ENTRIES)) || [];
let currentCustomTasks = [];
let savedWorkouts = JSON.parse(localStorage.getItem(STORAGE_KEYS.SAVED_WORKOUTS)) || [];
let activeWorkout = JSON.parse(localStorage.getItem(STORAGE_KEYS.ACTIVE_WORKOUT)) || null;
let friends = JSON.parse(localStorage.getItem(STORAGE_KEYS.FRIENDS)) || [];
let friendRequests = JSON.parse(localStorage.getItem(STORAGE_KEYS.FRIEND_REQUESTS)) || [];
let sentRequests = JSON.parse(localStorage.getItem(STORAGE_KEYS.SENT_REQUESTS)) || [];
let invitedFriends = JSON.parse(localStorage.getItem(STORAGE_KEYS.INVITED_FRIENDS)) || [];
let bonusPoints = parseInt(localStorage.getItem(STORAGE_KEYS.BONUS_POINTS)) || 0;
let userLevel = parseInt(localStorage.getItem(STORAGE_KEYS.USER_LEVEL)) || 1;
let userXP = parseInt(localStorage.getItem(STORAGE_KEYS.USER_XP)) || 0;

let inviteCode = localStorage.getItem(STORAGE_KEYS.INVITE_CODE);
if (!inviteCode) {
    inviteCode = 'cosmos_' + userId + '_' + Date.now();
    localStorage.setItem(STORAGE_KEYS.INVITE_CODE, inviteCode);
}

// Силовые тренировки
let strengthHistory = JSON.parse(localStorage.getItem(STORAGE_KEYS.STRENGTH_HISTORY)) || [];
let totalPullups = parseInt(localStorage.getItem(STORAGE_KEYS.STRENGTH_TOTAL_PULLUPS)) || 0;
let totalPushups = parseInt(localStorage.getItem(STORAGE_KEYS.STRENGTH_TOTAL_PUSHUPS)) || 0;
let strengthDays = parseInt(localStorage.getItem(STORAGE_KEYS.STRENGTH_TOTAL_DAYS)) || 0;
let bestPullups = parseInt(localStorage.getItem(STORAGE_KEYS.STRENGTH_BEST_PULLUPS)) || 0;

let strengthToday = JSON.parse(localStorage.getItem(STORAGE_KEYS.STRENGTH_TODAY)) || {
    pullups: { goal: 30, sets: [{ reps: 10, completed: false }], completed: false },
    pushups: { goal: 50, sets: [{ reps: 15, completed: false }], completed: false },
    mixed: {
        completed: false,
        rounds: [
            { pullups: 10, pushups: 20, pullupsCompleted: false, pushupsCompleted: false, completed: false },
            { pullups: 8, pushups: 15, pullupsCompleted: false, pushupsCompleted: false, completed: false },
            { pullups: 5, pushups: 10, pullupsCompleted: false, pushupsCompleted: false, completed: false }
        ]
    }
};

let currentStrengthType = 'pullups';
let currentLanguage = localStorage.getItem(STORAGE_KEYS.LANGUAGE) || 'ru';
let currentTab = 'friends';
let resultsPeriod = 'all';

// ========== БАЗОВЫЕ ТРЕНИРОВКИ ==========
const BASE_WORKOUTS = {
    1: {
        name: "🔥 День 1: Первый полет",
        name_en: "🔥 Day 1: First flight",
        difficulty: "easy",
        steps: [
            { id: 1, text: "🏋️ Разминка 10 мин", text_en: "🏋️ Warm-up 10 min", distance: 0, time: 10, calories: 30 },
            { id: 2, text: "🚀 Легкий бег 15 мин", text_en: "🚀 Easy run 15 min", distance: 2.0, time: 15, calories: 150 },
            { id: 3, text: "🦵 Спец. упражнения", text_en: "🦵 Special exercises", distance: 0, time: 5, calories: 20 },
            { id: 4, text: "⚡ Ускорения 4x200м", text_en: "⚡ Accelerations 4x200m", distance: 0.8, time: 8, calories: 80 }
        ],
        totalDistance: 2.8,
        totalTime: 38,
        totalCalories: 280
    },
    2: {
        name: "⚡ День 2: Набор высоты",
        name_en: "⚡ Day 2: Climbing",
        difficulty: "medium",
        steps: [
            { id: 1, text: "🏋️ Разминка 15 мин", text_en: "🏋️ Warm-up 15 min", distance: 0, time: 15, calories: 45 },
            { id: 2, text: "🚀 Бег 20 мин", text_en: "🚀 Run 20 min", distance: 3.0, time: 20, calories: 200 },
            { id: 3, text: "🦵 Прыжки", text_en: "🦵 Jumping", distance: 0, time: 8, calories: 40 },
            { id: 4, text: "⚡ Ускорения 6x200м", text_en: "⚡ Accelerations 6x200m", distance: 1.2, time: 12, calories: 120 }
        ],
        totalDistance: 4.2,
        totalTime: 55,
        totalCalories: 405
    }
};

// Добавляем остальные дни
for (let i = 3; i <= 30; i++) {
    BASE_WORKOUTS[i] = {
        ...BASE_WORKOUTS[((i-2) % 2) + 1],
        name: `День ${i}: Космическая тренировка`,
        name_en: `Day ${i}: Space workout`,
        steps: BASE_WORKOUTS[((i-2) % 2) + 1].steps.map(step => ({
            ...step,
            id: step.id + (i * 10)
        }))
    };
}

// ========== ФУНКЦИИ ВРЕМЕНИ ==========
function getCurrentTime() {
    return new Date().getTime();
}

function getCurrentHour() {
    return new Date().getHours();
}

function getCurrentMinutes() {
    return new Date().getMinutes();
}

function canStartNewDay() {
    if (!dayCompletedTime) return true;
    const now = getCurrentTime();
    const completedDay = new Date(parseInt(dayCompletedTime));
    const nextDay4am = new Date(completedDay);
    nextDay4am.setDate(nextDay4am.getDate() + 1);
    nextDay4am.setHours(4, 0, 0, 0);
    return now >= nextDay4am.getTime();
}

function canStartDay() {
    const hour = getCurrentHour();
    return hour >= 4 && hour < 23;
}

function canCompleteDay() {
    const hour = getCurrentHour();
    return hour < 23;
}

function isDayExpired() {
    return getCurrentHour() >= 23;
}

function getTimeUntilNextDay4am() {
    if (!dayCompletedTime) return null;
    const now = getCurrentTime();
    const completedDay = new Date(parseInt(dayCompletedTime));
    const nextDay4am = new Date(completedDay);
    nextDay4am.setDate(nextDay4am.getDate() + 1);
    nextDay4am.setHours(4, 0, 0, 0);
    const diffMs = nextDay4am.getTime() - now;
    if (diffMs <= 0) return null;
    return {
        hours: Math.floor(diffMs / (1000 * 60 * 60)),
        minutes: Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
    };
}

// ========== СИСТЕМА УРОВНЕЙ ==========
const levelRequirements = [
    0,      // 1 уровень
    100,    // 2 уровень
    250,    // 3 уровень
    500,    // 4 уровень
    1000,   // 5 уровень
    2000,   // 6 уровень
    3500,   // 7 уровень
    5500,   // 8 уровень
    8000,   // 9 уровень
    10000   // 10 уровень
];

function addXP(amount) {
    userXP += amount;
    let newLevel = userLevel;
    for (let i = userLevel; i < levelRequirements.length; i++) {
        if (userXP >= levelRequirements[i]) {
            newLevel = i + 1;
        } else {
            break;
        }
    }
    if (newLevel > userLevel) {
        userLevel = newLevel;
        tg.showPopup({
            title: '🌟 ПОВЫШЕНИЕ УРОВНЯ!',
            message: `Поздравляем! Ты достиг ${userLevel} уровня!`,
            buttons: [{ type: 'close' }]
        });
    }
    saveState();
    updateAvatar();
}

function getLevelProgress() {
    const currentLevelXP = levelRequirements[userLevel - 1] || 0;
    const nextLevelXP = levelRequirements[userLevel] || levelRequirements[userLevel - 1] * 2;
    const xpForCurrentLevel = userXP - currentLevelXP;
    const xpNeededForNext = nextLevelXP - currentLevelXP;
    return {
        current: xpForCurrentLevel,
        needed: xpNeededForNext,
        percent: (xpForCurrentLevel / xpNeededForNext) * 100
    };
}

// ========== 3D-АВАТАРКА ==========
function updateAvatar() {
    const avatar = document.getElementById('avatar3d');
    const avatarFront = document.getElementById('avatar-front');
    const avatarBack = document.getElementById('avatar-back');
    const muscleOverlay = document.getElementById('muscleOverlay');
    const levelBadge = document.getElementById('userLevel');
    
    if (!avatar) return;
    
    // Меняем эмодзи в зависимости от уровня
    const levelEmojis = ['🌱', '🚀', '⭐', '🌕', '🪐', '☄️', '🌌', '⚡', '👾', '👽'];
    const levelIndex = Math.min(userLevel - 1, levelEmojis.length - 1);
    if (avatarFront) avatarFront.textContent = levelEmojis[levelIndex];
    
    // Меняем заднюю сторону
    const backEmojis = ['🌟', '💫', '✨', '⭐', '🌠', '☄️', '🌌', '⚡', '👾', '👽'];
    if (avatarBack) avatarBack.textContent = backEmojis[levelIndex];
    
    // Обновляем уровень мышц (чем выше уровень, тем больше мышц)
    if (muscleOverlay) {
        const muscleIntensity = Math.min(userLevel * 10, 100);
        muscleOverlay.style.setProperty('--muscle-intensity', muscleIntensity + '%');
        
        // Случайное положение мышц для эффекта "качания"
        const randomX = 30 + Math.random() * 40;
        const randomY = 30 + Math.random() * 40;
        muscleOverlay.style.setProperty('--muscle-x', randomX + '%');
        muscleOverlay.style.setProperty('--muscle-y', randomY + '%');
    }
    
    // Обновляем бейдж уровня
    if (levelBadge) {
        const levelNames = translations[currentLanguage].level_names || translations.ru.level_names;
        levelBadge.textContent = levelNames[userLevel] || `Уровень ${userLevel}`;
    }
    
    // Анимируем при повышении уровня
    avatar.classList.add('level-up');
    setTimeout(() => {
        avatar.classList.remove('level-up');
    }, 1000);
}

// ========== ФУНКЦИИ СОХРАНЕНИЯ ==========
function saveState() {
    localStorage.setItem(STORAGE_KEYS.CURRENT_DAY, currentDay);
    localStorage.setItem(STORAGE_KEYS.DAY_STARTED, dayStarted);
    localStorage.setItem(STORAGE_KEYS.DAY_START_TIME, dayStartTime || '');
    localStorage.setItem(STORAGE_KEYS.DAY_COMPLETED_TIME, dayCompletedTime || '');
    localStorage.setItem(STORAGE_KEYS.COMPLETED_STEPS, JSON.stringify(completedSteps));
    localStorage.setItem(STORAGE_KEYS.ADDITIONAL_TASKS, JSON.stringify(additionalTasks));
    localStorage.setItem(STORAGE_KEYS.ADDITIONAL_COMPLETED, JSON.stringify(additionalCompleted));
    localStorage.setItem(STORAGE_KEYS.WORKOUT_HISTORY, JSON.stringify(workoutHistory));
    localStorage.setItem(STORAGE_KEYS.TOTAL_DISTANCE, totalDistance);
    localStorage.setItem(STORAGE_KEYS.TOTAL_WORKOUTS, totalWorkouts);
    localStorage.setItem(STORAGE_KEYS.TOTAL_TIME, totalTime);
    localStorage.setItem(STORAGE_KEYS.TOTAL_CALORIES, totalCalories);
    localStorage.setItem(STORAGE_KEYS.DIARY_ENTRIES, JSON.stringify(diaryEntries));
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, currentLanguage);
    localStorage.setItem(STORAGE_KEYS.FRIENDS, JSON.stringify(friends));
    localStorage.setItem(STORAGE_KEYS.FRIEND_REQUESTS, JSON.stringify(friendRequests));
    localStorage.setItem(STORAGE_KEYS.SENT_REQUESTS, JSON.stringify(sentRequests));
    localStorage.setItem(STORAGE_KEYS.SAVED_WORKOUTS, JSON.stringify(savedWorkouts));
    localStorage.setItem(STORAGE_KEYS.ACTIVE_WORKOUT, JSON.stringify(activeWorkout));
    localStorage.setItem(STORAGE_KEYS.INVITED_FRIENDS, JSON.stringify(invitedFriends));
    localStorage.setItem(STORAGE_KEYS.BONUS_POINTS, bonusPoints);
    localStorage.setItem(STORAGE_KEYS.STRENGTH_HISTORY, JSON.stringify(strengthHistory));
    localStorage.setItem(STORAGE_KEYS.STRENGTH_TOTAL_PULLUPS, totalPullups);
    localStorage.setItem(STORAGE_KEYS.STRENGTH_TOTAL_PUSHUPS, totalPushups);
    localStorage.setItem(STORAGE_KEYS.STRENGTH_TOTAL_DAYS, strengthDays);
    localStorage.setItem(STORAGE_KEYS.STRENGTH_BEST_PULLUPS, bestPullups);
    localStorage.setItem(STORAGE_KEYS.STRENGTH_TODAY, JSON.stringify(strengthToday));
    localStorage.setItem(STORAGE_KEYS.USER_LEVEL, userLevel);
    localStorage.setItem(STORAGE_KEYS.USER_XP, userXP);
}

// ========== ФУНКЦИИ ПЕРЕВОДА ==========
function t(key, ...args) {
    if (!translations[currentLanguage] || !translations[currentLanguage][key]) {
        console.warn(`Translation missing: ${key}`);
        return key;
    }
    let text = translations[currentLanguage][key];
    if (typeof text === 'function') {
        return text(...args);
    }
    return text;
}

// ========== ОБНОВЛЕНИЕ UI ==========
function updateUI() {
    const startDayNumber = document.getElementById('start-day-number');
    const currentDayEl = document.getElementById('current-day');
    if (startDayNumber) startDayNumber.textContent = currentDay;
    if (currentDayEl) currentDayEl.textContent = currentDay;

    if (dayStarted && dayStartTime) {
        const now = getCurrentTime();
        const start = parseInt(dayStartTime);
        const hoursPassed = (now - start) / (1000 * 60 * 60);
        
        const completedDay = new Date(parseInt(dayStartTime));
        const nextDay4am = new Date(completedDay);
        nextDay4am.setDate(nextDay4am.getDate() + 1);
        nextDay4am.setHours(4, 0, 0, 0);

        if (hoursPassed >= 24 || now >= nextDay4am.getTime()) {
            dayStarted = false;
            dayStartTime = null;
            dayCompletedTime = now.toString();
            completedSteps = [];
            additionalCompleted = [];
            saveState();
            tg.showAlert(t('dayExpiredMsg'));
        }
    }

    const startScreen = document.getElementById('start-screen');
    const marathonScreen = document.getElementById('marathon-screen');
    const congratsScreen = document.getElementById('congrats');

    if (!startScreen || !marathonScreen || !congratsScreen) return;

    if (dayStarted) {
        startScreen.style.display = 'none';
        marathonScreen.style.display = 'block';
        congratsScreen.style.display = 'none';
        renderWorkout();
        updateDeadlineInfo();
    } else {
        startScreen.style.display = 'block';
        marathonScreen.style.display = 'none';
        congratsScreen.style.display = 'none';

        const canStart = canStartNewDay();
        const canStartByTime = canStartDay();
        const timeInfo = document.getElementById('time-info');
        const startBtn = document.getElementById('start-day-btn');

        if (!canStart) {
            const remaining = getTimeUntilNextDay4am();
            if (timeInfo && remaining) {
                timeInfo.textContent = t('waitUntilNextDay', remaining.hours, remaining.minutes);
                timeInfo.style.color = 'var(--warning)';
            }
            if (startBtn) {
                startBtn.disabled = true;
                startBtn.textContent = t('waitUntilNextDay', remaining?.hours || 0, remaining?.minutes || 0);
            }
        } else if (!canStartByTime) {
            if (timeInfo) {
                timeInfo.textContent = t('startAt4am');
                timeInfo.style.color = 'var(--warning)';
            }
            if (startBtn) {
                startBtn.disabled = true;
                startBtn.textContent = t('startAt4am');
            }
        } else {
            if (timeInfo) {
                timeInfo.textContent = t('canStart');
                timeInfo.style.color = 'var(--success)';
            }
            if (startBtn) {
                startBtn.disabled = false;
                startBtn.textContent = t('startBtn');
            }
        }
    }
}

function renderWorkout() {
    const workout = BASE_WORKOUTS[currentDay] || BASE_WORKOUTS[((currentDay - 1) % 30) + 1];
    const workoutName = document.getElementById('workout-name');
    const workoutDifficulty = document.getElementById('workout-difficulty');
    
    if (workoutName) {
        workoutName.textContent = currentLanguage === 'ru' ? workout.name : (workout.name_en || workout.name);
    }
    
    if (workoutDifficulty) {
        let difficultyText = '';
        if (workout.difficulty === 'easy') difficultyText = 'Легкая';
        else if (workout.difficulty === 'medium') difficultyText = 'Средняя';
        else difficultyText = 'Сложная';
        workoutDifficulty.textContent = difficultyText;
        workoutDifficulty.className = `workout-difficulty difficulty-${workout.difficulty}`;
    }
    
    const stepsContainer = document.getElementById('workout-steps');
    if (!stepsContainer) return;
    
    stepsContainer.innerHTML = '';
    workout.steps.forEach((step, index) => {
        const stepText = currentLanguage === 'ru' ? step.text : (step.text_en || step.text);
        const stepDiv = document.createElement('div');
        stepDiv.className = `workout-step ${completedSteps[index] ? 'step-completed' : ''}`;
        stepDiv.innerHTML = `
            <input type="checkbox" class="workout-checkbox" data-index="${index}" data-type="main" ${completedSteps[index] ? 'checked' : ''}>
            <span class="step-text">${stepText}</span>
            ${step.distance > 0 ? `<span class="step-distance">+${step.distance} ${t('distance')}</span>` : ''}
        `;
        stepsContainer.appendChild(stepDiv);
    });
    
    const additionalSection = document.getElementById('additional-tasks-section');
    const additionalContainer = document.getElementById('additional-steps');
    
    if (additionalTasks.length > 0) {
        if (additionalSection) additionalSection.style.display = 'block';
        if (additionalContainer) {
            additionalContainer.innerHTML = '';
            additionalTasks.forEach((task, index) => {
                const stepDiv = document.createElement('div');
                stepDiv.className = `workout-step ${additionalCompleted[index] ? 'step-completed' : ''} extra-step`;
                stepDiv.innerHTML = `
                    <input type="checkbox" class="workout-checkbox" data-index="${index}" data-type="extra" ${additionalCompleted[index] ? 'checked' : ''}>
                    <span class="step-text">${task.text}</span>
                    ${task.distance > 0 ? `<span class="step-distance">+${task.distance} ${t('distance')}</span>` : ''}
                `;
                additionalContainer.appendChild(stepDiv);
            });
        }
    } else {
        if (additionalSection) additionalSection.style.display = 'none';
    }
    
    document.querySelectorAll('.workout-checkbox').forEach(cb => {
        cb.addEventListener('change', function() {
            const index = parseInt(this.dataset.index);
            const type = this.dataset.type;
            if (type === 'main') completedSteps[index] = this.checked;
            else additionalCompleted[index] = this.checked;
            saveState();
            updateProgress();
            const stepDiv = this.closest('.workout-step');
            if (this.checked) stepDiv.classList.add('step-completed');
            else stepDiv.classList.remove('step-completed');
        });
    });
    
    updateProgress();
}

function updateProgress() {
    const mainCompleted = completedSteps.filter(v => v).length;
    const mainTotal = completedSteps.length;
    const extraCompleted = additionalCompleted.filter(v => v).length;
    const extraTotal = additionalCompleted.length;
    const totalCompleted = mainCompleted + extraCompleted;
    const total = mainTotal + extraTotal;
    const progress = total > 0 ? (totalCompleted / total) * 100 : 0;
    
    const workoutFill = document.getElementById('workout-fill');
    const workoutPercent = document.getElementById('workout-percent');
    const completeBtn = document.getElementById('complete-day-btn');
    
    if (workoutFill) workoutFill.style.width = progress + '%';
    if (workoutPercent) workoutPercent.textContent = Math.round(progress) + '%';
    
    const allCompleted = totalCompleted === total;
    const canComplete = canCompleteDay();
    const expired = isDayExpired();
    
    if (expired) {
        if (completeBtn) { 
            completeBtn.disabled = true; 
            completeBtn.textContent = t('dayExpired'); 
        }
    } else if (!canComplete) {
        if (completeBtn) { 
            completeBtn.disabled = true; 
            completeBtn.textContent = '⏰ До 23:00'; 
        }
    } else {
        if (completeBtn) { 
            completeBtn.disabled = !allCompleted; 
            completeBtn.textContent = t('completeBtn'); 
        }
    }
}

function updateDeadlineInfo() {
    const deadlineInfo = document.getElementById('deadline-info');
    if (!deadlineInfo || !dayStarted) return;
    
    const hour = getCurrentHour();
    const minutes = getCurrentMinutes();
    const now = getCurrentTime();
    const completedDay = new Date(parseInt(dayStartTime));
    const nextDay4am = new Date(completedDay);
    nextDay4am.setDate(nextDay4am.getDate() + 1);
    nextDay4am.setHours(4, 0, 0, 0);

    if (now >= nextDay4am.getTime()) {
        deadlineInfo.textContent = t('dayExpiredMsg');
        deadlineInfo.style.color = 'var(--danger)';
        return;
    }
    
    if (hour >= 23) {
        deadlineInfo.textContent = t('dayExpired');
        deadlineInfo.style.color = 'var(--danger)';
        return;
    }
    
    const endOfDay = new Date();
    endOfDay.setHours(23, 0, 0, 0);
    const diffMs = endOfDay - now;
    const diffMins = Math.floor(diffMs / 60000);
    const hours = Math.floor(diffMins / 60);
    const mins = diffMins % 60;
    deadlineInfo.textContent = t('timeLeft', hours, mins);
    deadlineInfo.style.color = 'var(--text-secondary)';
}

function updateDate() {
    const now = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const dateEl = document.getElementById('current-date');
    if (dateEl) {
        dateEl.textContent = now.toLocaleDateString(currentLanguage === 'ru' ? 'ru-RU' : 'en-US', options);
    }
}

// ========== ФУНКЦИИ ДЛЯ ДРУЗЕЙ ==========
function updateUserProfile() {
    const nameEl = document.getElementById('my-name');
    const usernameEl = document.getElementById('my-username');
    const totalDistanceEl = document.getElementById('my-total-distance');
    const weekDistanceEl = document.getElementById('my-week-distance');
    const bestPaceEl = document.getElementById('my-best-pace');
    const levelEl = document.getElementById('my-level');
    
    if (nameEl) nameEl.textContent = userName;
    if (usernameEl) usernameEl.textContent = '@' + userUsername;
    if (totalDistanceEl) totalDistanceEl.textContent = totalDistance.toFixed(1);
    
    // Расчет за неделю
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const weekDistance = workoutHistory
        .filter(w => new Date(w.date) >= oneWeekAgo)
        .reduce((sum, w) => sum + w.distance, 0);
    if (weekDistanceEl) weekDistanceEl.textContent = weekDistance.toFixed(1);
    
    const avgPace = totalDistance > 0 ? (totalTime / totalDistance).toFixed(1) : 0;
    if (bestPaceEl) bestPaceEl.textContent = avgPace;
    if (levelEl) levelEl.textContent = userLevel;
    
    document.getElementById('my-friends-count').textContent = friends.length;
}

function renderFriends() {
    const container = document.getElementById('friends-container');
    const countEl = document.getElementById('friends-count');
    
    if (!container) return;
    
    if (countEl) countEl.textContent = friends.length;
    
    if (friends.length === 0) {
        container.innerHTML = `
            <div class="empty-friends">
                <span>👥</span>
                <p>${t('noFriends')}</p>
                <p class="empty-sub">${t('noFriendsDesc')}</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = '';
    friends.sort((a, b) => (b.distance || 0) - (a.distance || 0));
    
    friends.forEach(friend => {
        const myDistance = totalDistance;
        const friendDistance = friend.distance || 0;
        const diff = myDistance - friendDistance;
        const percent = myDistance > 0 ? (friendDistance / myDistance) * 100 : 0;
        
        const friendCard = document.createElement('div');
        friendCard.className = 'friend-card';
        friendCard.innerHTML = `
            <div class="friend-header">
                <div class="friend-avatar">${friend.avatar || '👤'}</div>
                <div class="friend-info">
                    <span class="friend-name">${friend.name}</span>
                    <span class="friend-username">@${friend.username}</span>
                </div>
            </div>
            <div class="friend-stats-grid">
                <div class="friend-stat-item">
                    <span class="friend-stat-value">${(friend.distance || 0).toFixed(1)}</span>
                    <span class="friend-stat-label">км</span>
                </div>
                <div class="friend-stat-item">
                    <span class="friend-stat-value">${friend.workouts || 0}</span>
                    <span class="friend-stat-label">тренировки</span>
                </div>
                <div class="friend-stat-item">
                    <span class="friend-stat-value">${friend.pullups || 0}</span>
                    <span class="friend-stat-label">подт.</span>
                </div>
            </div>
            <div class="comparison-row">
                <span class="comparison-label">vs</span>
                <div class="comparison-bar-container">
                    <div class="comparison-bar" style="width: ${percent}%"></div>
                </div>
                <span class="comparison-value ${diff > 0 ? 'ahead' : diff < 0 ? 'behind' : ''}">
                    ${diff > 0 ? '+' + diff.toFixed(1) : diff.toFixed(1)} км
                </span>
            </div>
            <div class="friend-actions">
                <button class="friend-action-btn message-btn" data-username="${friend.username}">
                    💬 Написать
                </button>
                <button class="friend-action-btn remove-btn" data-id="${friend.id}">
                    ✕
                </button>
            </div>
        `;
        container.appendChild(friendCard);
    });
    
    // Добавляем обработчики
    document.querySelectorAll('.message-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const username = this.dataset.username;
            tg.openTelegramLink(`https://t.me/${username}`);
        });
    });
    
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = this.dataset.id;
            friends = friends.filter(f => f.id != id);
            saveState();
            renderFriends();
            updateUserProfile();
        });
    });
}

function renderFriendRequests() {
    const requestsCard = document.getElementById('friend-requests-card');
    const requestsList = document.getElementById('friend-requests-list');
    const requestsCount = document.getElementById('requests-count');
    
    if (!requestsList) return;
    
    if (friendRequests.length === 0) {
        if (requestsCard) requestsCard.style.display = 'none';
        return;
    }
    
    if (requestsCard) requestsCard.style.display = 'block';
    if (requestsCount) requestsCount.textContent = friendRequests.length;
    
    requestsList.innerHTML = '';
    friendRequests.forEach((request, index) => {
        const requestItem = document.createElement('div');
        requestItem.className = 'friend-request-item';
        requestItem.innerHTML = `
            <div class="friend-request-avatar">${request.avatar || '👤'}</div>
            <div class="friend-request-info">
                <span class="friend-request-name">${request.name}</span>
                <span class="friend-request-username">@${request.username}</span>
            </div>
            <div class="friend-request-actions">
                <button class="friend-request-accept" data-index="${index}">✓</button>
                <button class="friend-request-decline" data-index="${index}">✗</button>
            </div>
        `;
        requestsList.appendChild(requestItem);
    });
    
    document.querySelectorAll('.friend-request-accept').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            const request = friendRequests[index];
            friends.push({
                id: request.id,
                name: request.name,
                username: request.username,
                avatar: request.avatar,
                distance: 0,
                workouts: 0
            });
            friendRequests.splice(index, 1);
            saveState();
            renderFriends();
            renderFriendRequests();
            updateUserProfile();
            addXP(50); // Бонус за нового друга
        });
    });
    
    document.querySelectorAll('.friend-request-decline').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            friendRequests.splice(index, 1);
            saveState();
            renderFriendRequests();
        });
    });
}

function renderInviteStats() {
    const invitedCount = document.getElementById('invited-count');
    const joinedCount = document.getElementById('joined-count');
    const bonusCount = document.getElementById('bonus-count');
    
    if (invitedCount) invitedCount.textContent = invitedFriends.length;
    if (joinedCount) joinedCount.textContent = invitedFriends.filter(f => f.joined).length;
    if (bonusCount) bonusCount.textContent = bonusPoints;
}

// ========== ФУНКЦИИ ПОИСКА ==========
function searchUsers(query) {
    // Имитация поиска
    const results = [];
    if (query.length > 0) {
        for (let i = 1; i <= 3; i++) {
            results.push({
                id: 'user_' + i,
                name: `Космонавт ${i}`,
                username: `cosmonaut_${i}`,
                avatar: '👤',
                distance: Math.random() * 100
            });
        }
    }
    return results;
}

// ========== ФУНКЦИИ ДНЕВНИКА ==========
function renderDiary() {
    const entriesList = document.getElementById('entries-list');
    if (!entriesList) return;
    
    entriesList.innerHTML = '';
    
    if (diaryEntries.length === 0) {
        entriesList.innerHTML = `<div class="empty-entries">${t('noEntries')}</div>`;
        return;
    }
    
    const sortedEntries = [...diaryEntries].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    sortedEntries.forEach(entry => {
        const entryDiv = document.createElement('div');
        entryDiv.className = 'entry-item';
        const date = new Date(entry.date);
        const formattedDate = date.toLocaleDateString(currentLanguage === 'ru' ? 'ru-RU' : 'en-US', {
            day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
        });
        entryDiv.innerHTML = `
            <div class="entry-date">${formattedDate}</div>
            <div class="entry-content">${entry.text}</div>
            <button class="entry-delete" data-id="${entry.id}">✕</button>
        `;
        entriesList.appendChild(entryDiv);
    });
    
    document.querySelectorAll('.entry-delete').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.dataset.id);
            diaryEntries = diaryEntries.filter(e => e.id !== id);
            saveState();
            renderDiary();
            tg.showAlert(t('entryDeleted'));
        });
    });
}

// ========== ФУНКЦИИ ПРИГЛАШЕНИЙ ==========
function inviteFriend() {
    const botUsername = (tg.initDataUnsafe?.bot?.username) || 'your_bot';
    const inviteLink = `https://t.me/${botUsername}?start=${inviteCode}`;
    
    const message = `🚀 Приглашаю тебя в КОСМИЧЕСКИЙ МАРАФОН!\n\n🏃 Будем тренироваться вместе и исследовать космос!\n\n👉 Присоединяйся: ${inviteLink}`;
    
    tg.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(message)}`);
    
    invitedFriends.push({
        username: 'friend',
        date: new Date().toISOString(),
        joined: false
    });
    
    saveState();
    renderInviteStats();
}

function copyInviteLink() {
    const botUsername = (tg.initDataUnsafe?.bot?.username) || 'your_bot';
    const inviteLink = `https://t.me/${botUsername}?start=${inviteCode}`;
    
    const input = document.createElement('input');
    input.value = inviteLink;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    
    tg.showPopup({
        title: '✅',
        message: t('inviteCopied'),
        buttons: [{ type: 'close' }]
    });
}

// ========== ФУНКЦИИ ДЛЯ ТОПА ==========
function getLeaderboard(period = 'all') {
    const users = [
        {
            id: userId,
            name: userName + ' (ты)',
            username: userUsername,
            avatar: '👤',
            distance: totalDistance,
            isYou: true
        },
        ...friends.map(f => ({
            ...f,
            distance: f.distance || 0
        }))
    ];
    
    // Добавляем случайных пользователей для демо
    for (let i = 1; i <= 5; i++) {
        users.push({
            id: 'demo_' + i,
            name: `Космонавт ${i}`,
            username: `cosmo_${i}`,
            avatar: ['👨‍🚀', '👩‍🚀', '🧑‍🚀'][i % 3],
            distance: Math.random() * 150 + 50,
            isYou: false
        });
    }
    
    return users.sort((a, b) => b.distance - a.distance).slice(0, 10);
}

function renderLeaderboard() {
    const list = document.getElementById('leaderboard-list');
    const myRankCard = document.getElementById('my-rank-card');
    
    if (!list) return;
    
    const leaderboard = getLeaderboard(resultsPeriod);
    
    list.innerHTML = '';
    
    leaderboard.forEach((user, index) => {
        const rankClass = index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : '';
        const youClass = user.isYou ? 'you' : '';
        
        const item = document.createElement('div');
        item.className = `leaderboard-item ${youClass}`;
        item.innerHTML = `
            <span class="rank ${rankClass}">${index + 1}</span>
            <div class="user-info">
                <span class="user-avatar">${user.avatar || '👤'}</span>
                <span class="user-name">${user.name}</span>
            </div>
            <span class="user-distance">${user.distance.toFixed(1)} км</span>
        `;
        list.appendChild(item);
    });
    
    // Моё место
    const myIndex = leaderboard.findIndex(u => u.isYou);
    if (myRankCard && myIndex !== -1) {
        myRankCard.innerHTML = `
            <h3>${t('yourRank')}</h3>
            <div class="my-rank-info">
                <span class="rank-badge">#${myIndex + 1}</span>
                <span class="rank-distance">${totalDistance.toFixed(1)} км</span>
            </div>
        `;
    }
}

// ========== ФУНКЦИИ ДЛЯ СИЛОВЫХ ==========
function switchStrengthType(type) {
    currentStrengthType = type;
    document.querySelectorAll('.type-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.getElementById(`type-${type}`);
    if (activeBtn) activeBtn.classList.add('active');
    
    const pullupsCard = document.getElementById('pullups-card');
    const pushupsCard = document.getElementById('pushups-card');
    const mixedCard = document.getElementById('mixed-card');
    
    if (pullupsCard) pullupsCard.style.display = type === 'pullups' ? 'block' : 'none';
    if (pushupsCard) pushupsCard.style.display = type === 'pushups' ? 'block' : 'none';
    if (mixedCard) mixedCard.style.display = type === 'mixed' ? 'block' : 'none';
    
    if (type === 'pullups') renderPullupsSets();
    else if (type === 'pushups') renderPushupsSets();
    else if (type === 'mixed') renderMixedSets();
    
    updateStrengthProgress();
}

function renderPullupsSets() {
    const container = document.getElementById('pullups-sets');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (!strengthToday.pullups.sets || strengthToday.pullups.sets.length === 0) {
        strengthToday.pullups.sets = [{ reps: 10, completed: false }];
    }
    
    strengthToday.pullups.sets.forEach((set, index) => {
        const setCard = document.createElement('div');
        setCard.className = `set-card ${set.completed ? 'completed' : ''}`;
        setCard.innerHTML = `
            <div class="set-header">
                <span class="set-number">Подход ${index + 1}</span>
                ${strengthToday.pullups.sets.length > 1 ? `<button class="set-remove" data-index="${index}">✕</button>` : ''}
            </div>
            <div class="set-inputs">
                <div class="set-reps">
                    <label>Повторения:</label>
                    <input type="number" class="set-reps-input" data-index="${index}" value="${set.reps}" min="1" max="50" ${set.completed ? 'disabled' : ''}>
                </div>
                <label class="set-complete">
                    <input type="checkbox" class="set-complete-check" data-index="${index}" ${set.completed ? 'checked' : ''}>
                    <span>Выполнено</span>
                </label>
            </div>
        `;
        container.appendChild(setCard);
    });
    
    // Обработчики
    document.querySelectorAll('#pullups-sets .set-remove').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            strengthToday.pullups.sets.splice(index, 1);
            renderPullupsSets();
            updatePullupsStats();
            saveState();
        });
    });
    
    document.querySelectorAll('#pullups-sets .set-reps-input').forEach(input => {
        input.addEventListener('change', function() {
            const index = parseInt(this.dataset.index);
            const value = parseInt(this.value) || 0;
            strengthToday.pullups.sets[index].reps = value;
            updatePullupsStats();
            saveState();
        });
    });
    
    document.querySelectorAll('#pullups-sets .set-complete-check').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const index = parseInt(this.dataset.index);
            strengthToday.pullups.sets[index].completed = this.checked;
            const setCard = this.closest('.set-card');
            if (this.checked) setCard.classList.add('completed');
            else setCard.classList.remove('completed');
            updatePullupsStats();
            saveState();
        });
    });
    
    updatePullupsStats();
}

function renderPushupsSets() {
    const container = document.getElementById('pushups-sets');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (!strengthToday.pushups.sets || strengthToday.pushups.sets.length === 0) {
        strengthToday.pushups.sets = [{ reps: 15, completed: false }];
    }
    
    strengthToday.pushups.sets.forEach((set, index) => {
        const setCard = document.createElement('div');
        setCard.className = `set-card ${set.completed ? 'completed' : ''}`;
        setCard.innerHTML = `
            <div class="set-header">
                <span class="set-number">Подход ${index + 1}</span>
                ${strengthToday.pushups.sets.length > 1 ? `<button class="set-remove" data-index="${index}">✕</button>` : ''}
            </div>
            <div class="set-inputs">
                <div class="set-reps">
                    <label>Повторения:</label>
                    <input type="number" class="set-reps-input" data-index="${index}" value="${set.reps}" min="1" max="100" ${set.completed ? 'disabled' : ''}>
                </div>
                <label class="set-complete">
                    <input type="checkbox" class="set-complete-check" data-index="${index}" ${set.completed ? 'checked' : ''}>
                    <span>Выполнено</span>
                </label>
            </div>
        `;
        container.appendChild(setCard);
    });
    
    document.querySelectorAll('#pushups-sets .set-remove').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            strengthToday.pushups.sets.splice(index, 1);
            renderPushupsSets();
            updatePushupsStats();
            saveState();
        });
    });
    
    document.querySelectorAll('#pushups-sets .set-reps-input').forEach(input => {
        input.addEventListener('change', function() {
            const index = parseInt(this.dataset.index);
            const value = parseInt(this.value) || 0;
            strengthToday.pushups.sets[index].reps = value;
            updatePushupsStats();
            saveState();
        });
    });
    
    document.querySelectorAll('#pushups-sets .set-complete-check').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const index = parseInt(this.dataset.index);
            strengthToday.pushups.sets[index].completed = this.checked;
            const setCard = this.closest('.set-card');
            if (this.checked) setCard.classList.add('completed');
            else setCard.classList.remove('completed');
            updatePushupsStats();
            saveState();
        });
    });
    
    updatePushupsStats();
}

function renderMixedSets() {
    const mixedWorkout = document.getElementById('mixed-workout');
    if (!mixedWorkout) return;
    
    mixedWorkout.innerHTML = '';
    
    strengthToday.mixed.rounds.forEach((round, index) => {
        const roundDiv = document.createElement('div');
        roundDiv.className = `mixed-exercise ${round.completed ? 'completed' : ''}`;
        roundDiv.innerHTML = `
            <div class="mixed-header">
                <span class="mixed-name">🔥 Круг ${index + 1}</span>
                <span class="mixed-check">✓</span>
            </div>
            <div class="mixed-items">
                <div class="mixed-item ${round.pullupsCompleted ? 'completed' : ''}">
                    <span class="item-name">Подтягивания</span>
                    <input type="number" class="item-input" data-round="${index}" data-exercise="pullups" value="${round.pullups}" min="1" max="30" ${round.completed ? 'disabled' : ''}>
                    <span class="item-unit">раз</span>
                    <input type="checkbox" class="item-check" data-round="${index}" data-exercise="pullups" ${round.pullupsCompleted ? 'checked' : ''}>
                </div>
                <div class="mixed-item ${round.pushupsCompleted ? 'completed' : ''}">
                    <span class="item-name">Отжимания</span>
                    <input type="number" class="item-input" data-round="${index}" data-exercise="pushups" value="${round.pushups}" min="1" max="50" ${round.completed ? 'disabled' : ''}>
                    <span class="item-unit">раз</span>
                    <input type="checkbox" class="item-check" data-round="${index}" data-exercise="pushups" ${round.pushupsCompleted ? 'checked' : ''}>
                </div>
            </div>
        `;
        mixedWorkout.appendChild(roundDiv);
    });
    
    document.querySelectorAll('.mixed-item .item-input').forEach(input => {
        input.addEventListener('change', function() {
            const round = parseInt(this.dataset.round);
            const exercise = this.dataset.exercise;
            const value = parseInt(this.value) || 0;
            if (exercise === 'pullups') strengthToday.mixed.rounds[round].pullups = value;
            else strengthToday.mixed.rounds[round].pushups = value;
            updateMixedStats();
            saveState();
        });
    });
    
    document.querySelectorAll('.mixed-item .item-check').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const round = parseInt(this.dataset.round);
            const exercise = this.dataset.exercise;
            const mixedItem = this.closest('.mixed-item');
            if (exercise === 'pullups') strengthToday.mixed.rounds[round].pullupsCompleted = this.checked;
            else strengthToday.mixed.rounds[round].pushupsCompleted = this.checked;
            if (this.checked) mixedItem.classList.add('completed');
            else mixedItem.classList.remove('completed');
            const roundData = strengthToday.mixed.rounds[round];
            const allCompleted = roundData.pullupsCompleted && roundData.pushupsCompleted;
            roundData.completed = allCompleted;
            const roundDiv = this.closest('.mixed-exercise');
            if (allCompleted) roundDiv.classList.add('completed');
            else roundDiv.classList.remove('completed');
            updateMixedStats();
            saveState();
        });
    });
    
    updateMixedStats();
}

function addSet(type) {
    if (type === 'pullups') {
        strengthToday.pullups.sets.push({ reps: 8, completed: false });
        renderPullupsSets();
    } else if (type === 'pushups') {
        strengthToday.pushups.sets.push({ reps: 12, completed: false });
        renderPushupsSets();
    }
    saveState();
}

function addMixedSet() {
    if (strengthToday.mixed.rounds.length >= 5) {
        tg.showAlert('Максимум 5 кругов');
        return;
    }
    strengthToday.mixed.rounds.push({ 
        pullups: 5, 
        pushups: 10, 
        pullupsCompleted: false, 
        pushupsCompleted: false, 
        completed: false 
    });
    renderMixedSets();
    saveState();
}

function updatePullupsStats() {
    const todaySpan = document.getElementById('pullups-today');
    const summaryPullups = document.getElementById('summary-pullups');
    const totalCompleted = strengthToday.pullups.sets
        .filter(set => set.completed)
        .reduce((sum, set) => sum + set.reps, 0);
    const goal = strengthToday.pullups.goal;
    
    if (todaySpan) todaySpan.innerHTML = `${totalCompleted}/${goal}`;
    if (summaryPullups) summaryPullups.textContent = totalCompleted;
    
    strengthToday.pullups.completed = totalCompleted >= goal;
    updateStrengthProgress();
}

function updatePushupsStats() {
    const todaySpan = document.getElementById('pushups-today');
    const summaryPushups = document.getElementById('summary-pushups');
    const totalCompleted = strengthToday.pushups.sets
        .filter(set => set.completed)
        .reduce((sum, set) => sum + set.reps, 0);
    const goal = strengthToday.pushups.goal;
    
    if (todaySpan) todaySpan.innerHTML = `${totalCompleted}/${goal}`;
    if (summaryPushups) summaryPushups.textContent = totalCompleted;
    
    strengthToday.pushups.completed = totalCompleted >= goal;
    updateStrengthProgress();
}

function updateMixedStats() {
    const summaryPullups = document.getElementById('summary-pullups');
    const summaryPushups = document.getElementById('summary-pushups');
    const mixedToday = document.getElementById('mixed-today');
    
    let totalPullupsCompleted = 0, totalPushupsCompleted = 0, completedRounds = 0;
    
    strengthToday.mixed.rounds.forEach(round => {
        if (round.pullupsCompleted) totalPullupsCompleted += round.pullups;
        if (round.pushupsCompleted) totalPushupsCompleted += round.pushups;
        if (round.completed) completedRounds++;
    });
    
    if (summaryPullups) summaryPullups.textContent = totalPullupsCompleted;
    if (summaryPushups) summaryPushups.textContent = totalPushupsCompleted;
    if (mixedToday) mixedToday.textContent = `${completedRounds}/${strengthToday.mixed.rounds.length} кругов`;
    
    strengthToday.mixed.completed = completedRounds === strengthToday.mixed.rounds.length;
    updateStrengthProgress();
}

function updateStrengthProgress() {
    const progressBar = document.getElementById('strength-progress');
    const percentSpan = document.getElementById('strength-percent');
    const completeBtn = document.getElementById('complete-strength-btn');
    
    let totalCompleted = 0, totalGoal = 0;
    
    if (currentStrengthType === 'pullups') {
        totalCompleted = strengthToday.pullups.sets
            .filter(set => set.completed)
            .reduce((sum, set) => sum + set.reps, 0);
        totalGoal = strengthToday.pullups.goal;
    } else if (currentStrengthType === 'pushups') {
        totalCompleted = strengthToday.pushups.sets
            .filter(set => set.completed)
            .reduce((sum, set) => sum + set.reps, 0);
        totalGoal = strengthToday.pushups.goal;
    } else if (currentStrengthType === 'mixed') {
        strengthToday.mixed.rounds.forEach(round => {
            if (round.pullupsCompleted) totalCompleted += round.pullups;
            if (round.pushupsCompleted) totalCompleted += round.pushups;
            totalGoal += round.pullups + round.pushups;
        });
    }
    
    const percent = totalGoal > 0 ? Math.min(100, (totalCompleted / totalGoal) * 100) : 0;
    if (progressBar) progressBar.style.width = percent + '%';
    if (percentSpan) percentSpan.textContent = Math.round(percent) + '%';
    
    let canComplete = false;
    if (currentStrengthType === 'pullups') canComplete = strengthToday.pullups.completed;
    else if (currentStrengthType === 'pushups') canComplete = strengthToday.pushups.completed;
    else if (currentStrengthType === 'mixed') canComplete = strengthToday.mixed.completed;
    
    if (completeBtn) completeBtn.disabled = !canComplete;
    
    const calories = Math.round(totalCompleted * 0.5);
    const summaryCalories = document.getElementById('summary-calories');
    if (summaryCalories) summaryCalories.textContent = calories;
}

function completeStrengthWorkout() {
    let totalPullupsToday = 0, totalPushupsToday = 0;
    
    if (currentStrengthType === 'pullups') {
        totalPullupsToday = strengthToday.pullups.sets
            .filter(set => set.completed)
            .reduce((sum, set) => sum + set.reps, 0);
    } else if (currentStrengthType === 'pushups') {
        totalPushupsToday = strengthToday.pushups.sets
            .filter(set => set.completed)
            .reduce((sum, set) => sum + set.reps, 0);
    } else if (currentStrengthType === 'mixed') {
        strengthToday.mixed.rounds.forEach(round => {
            if (round.pullupsCompleted) totalPullupsToday += round.pullups;
            if (round.pushupsCompleted) totalPushupsToday += round.pushups;
        });
    }
    
    totalPullups += totalPullupsToday;
    totalPushups += totalPushupsToday;
    strengthDays++;
    
    if (totalPullupsToday > bestPullups) bestPullups = totalPullupsToday;
    
    // Добавляем XP за силовую тренировку
    addXP(totalPullupsToday * 2 + totalPushupsToday * 1);
    
    strengthHistory.push({ 
        date: new Date().toISOString(), 
        pullups: totalPullupsToday, 
        pushups: totalPushupsToday, 
        type: currentStrengthType 
    });
    
    strengthToday = {
        pullups: { goal: 30, sets: [{ reps: 10, completed: false }], completed: false },
        pushups: { goal: 50, sets: [{ reps: 15, completed: false }], completed: false },
        mixed: { 
            completed: false, 
            rounds: [
                { pullups: 10, pushups: 20, pullupsCompleted: false, pushupsCompleted: false, completed: false },
                { pullups: 8, pushups: 15, pullupsCompleted: false, pushupsCompleted: false, completed: false },
                { pullups: 5, pushups: 10, pullupsCompleted: false, pushupsCompleted: false, completed: false }
            ] 
        }
    };
    
    saveState();
    
    renderPullupsSets();
    renderPushupsSets();
    renderMixedSets();
    updateStrengthProgress();
    updateStats();
    
    const quotes = [
        '"Сила притяжения не остановит космонавта"',
        '"Тренируйся как космонавт"',
        '"Каждое повторение приближает к звездам"',
        '"В космосе нет гравитации, только сила воли"'
    ];
    const quoteEl = document.getElementById('strength-quote');
    if (quoteEl) quoteEl.textContent = quotes[Math.floor(Math.random() * quotes.length)];
    
    tg.showPopup({
        title: '🎉',
        message: 'Силовая тренировка завершена! +XP',
        buttons: [{ type: 'close' }]
    });
}

// ========== ФУНКЦИИ СТАТИСТИКИ ==========
function updateStats() {
    const totalWorkoutsEl = document.getElementById('total-workouts');
    const totalDistanceEl = document.getElementById('total-distance');
    const totalTimeEl = document.getElementById('total-time');
    const totalCaloriesEl = document.getElementById('total-calories');
    const avgDistanceEl = document.getElementById('avg-distance');
    const bestDistanceEl = document.getElementById('best-distance');
    const avgPaceEl = document.getElementById('avg-pace');
    const avgCaloriesEl = document.getElementById('avg-calories');
    const weekCurrentEl = document.getElementById('week-current');
    const weekProgressEl = document.getElementById('week-progress');
    const totalPullupsEl = document.getElementById('total-pullups');
    const totalPushupsEl = document.getElementById('total-pushups');
    const strengthDaysEl = document.getElementById('total-strength-days');
    const bestPullupsEl = document.getElementById('best-pullups');
    
    if (totalWorkoutsEl) totalWorkoutsEl.textContent = totalWorkouts;
    if (totalDistanceEl) totalDistanceEl.textContent = totalDistance.toFixed(1) + ' км';
    
    const hours = Math.floor(totalTime / 60);
    const minutes = totalTime % 60;
    if (totalTimeEl) {
        totalTimeEl.textContent = hours > 0 ? `${hours}ч ${minutes}м` : `${minutes} мин`;
    }
    
    if (totalCaloriesEl) totalCaloriesEl.textContent = totalCalories;
    
    const avgDistance = totalWorkouts > 0 ? (totalDistance / totalWorkouts).toFixed(1) : 0;
    if (avgDistanceEl) avgDistanceEl.textContent = avgDistance + ' км';
    
    const bestDistance = workoutHistory.length > 0 
        ? Math.max(...workoutHistory.map(w => w.distance)).toFixed(1) 
        : 0;
    if (bestDistanceEl) bestDistanceEl.textContent = bestDistance + ' км';
    
    const avgPace = totalDistance > 0 ? (totalTime / totalDistance).toFixed(1) : 0;
    if (avgPaceEl) avgPaceEl.textContent = avgPace;
    
    const avgCalories = totalWorkouts > 0 ? Math.round(totalCalories / totalWorkouts) : 0;
    if (avgCaloriesEl) avgCaloriesEl.textContent = avgCalories;
    
    if (weekCurrentEl) weekCurrentEl.textContent = currentDay - 1;
    const weekProgress = ((currentDay - 1) / 30) * 100;
    if (weekProgressEl) weekProgressEl.style.width = `${weekProgress}%`;
    
    if (totalPullupsEl) totalPullupsEl.textContent = totalPullups;
    if (totalPushupsEl) totalPushupsEl.textContent = totalPushups;
    if (strengthDaysEl) strengthDaysEl.textContent = strengthDays;
    if (bestPullupsEl) bestPullupsEl.textContent = bestPullups;
    
    // История тренировок
    const historyList = document.getElementById('history-list');
    if (historyList) {
        historyList.innerHTML = '';
        if (workoutHistory.length === 0) {
            historyList.innerHTML = '<div class="empty-history">Пока нет тренировок</div>';
        } else {
            const recent = [...workoutHistory].reverse().slice(0, 10);
            recent.forEach(workout => {
                const date = new Date(workout.date);
                const formattedDate = date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
                const item = document.createElement('div');
                item.className = 'history-item';
                item.innerHTML = `
                    <div style="display: flex; justify-content: space-between;">
                        <span class="history-date">${formattedDate}</span>
                        <span class="history-workout">День ${workout.day}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; font-size: 12px; margin-top: 4px;">
                        <span>${workout.distance} км</span>
                        <span>${workout.time} мин</span>
                        <span>${workout.calories} ккал</span>
                    </div>
                `;
                historyList.appendChild(item);
            });
        }
    }
}

// ========== ФУНКЦИИ ДЛЯ СОЗДАНИЯ ТРЕНИРОВОК ==========
function renderCustomCreator() {
    const container = document.getElementById('custom-tasks-list');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (currentCustomTasks.length === 0) {
        container.innerHTML = '<div class="empty-tasks">➕ Добавь задания</div>';
        return;
    }
    
    currentCustomTasks.forEach((task, index) => {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'custom-task-item';
        taskDiv.innerHTML = `
            <span class="custom-task-text">${task.text}</span>
            <span class="custom-task-distance">${task.distance > 0 ? '+' + task.distance + ' км' : 'разминка'}</span>
            <button class="custom-task-delete" data-index="${index}">✕</button>
        `;
        container.appendChild(taskDiv);
    });
    
    document.querySelectorAll('.custom-task-delete').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            currentCustomTasks.splice(index, 1);
            renderCustomCreator();
            updateCreateButtonState();
        });
    });
    
    updateCreateButtonState();
}

function updateCreateButtonState() {
    const goalInput = document.getElementById('goal-distance');
    const goal = parseFloat(goalInput?.value) || 0;
    const createBtn = document.getElementById('create-plan-btn');
    if (createBtn) createBtn.disabled = !(goal > 0 && currentCustomTasks.length > 0);
}

function saveWorkout() {
    if (currentCustomTasks.length === 0) {
        tg.showAlert('Добавьте задания');
        return;
    }
    
    const goalInput = document.getElementById('goal-distance');
    const goal = parseFloat(goalInput.value);
    
    const newWorkout = {
        id: Date.now(),
        name: `Моя тренировка ${savedWorkouts.length + 1}`,
        goal: goal,
        tasks: [...currentCustomTasks],
        steps: currentCustomTasks.map((task, index) => ({
            id: index + 1,
            text: task.text,
            completed: false,
            distance: task.distance || 0
        })),
        date: new Date().toISOString(),
        completed: false
    };
    
    savedWorkouts.push(newWorkout);
    saveState();
    
    activeWorkout = {
        id: newWorkout.id,
        name: newWorkout.name,
        goal: newWorkout.goal,
        steps: newWorkout.steps.map(step => ({ ...step, completed: false }))
    };
    saveState();
    
    tg.showAlert('Тренировка сохранена!');
    
    currentCustomTasks = [];
    goalInput.value = 5;
    document.getElementById('new-task-text').value = '';
    document.getElementById('new-task-distance').value = 0;
    
    renderCustomCreator();
    renderSavedWorkouts();
    renderActiveWorkout();
}

function renderSavedWorkouts() {
    const container = document.getElementById('saved-workouts-list');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (savedWorkouts.length === 0) {
        container.innerHTML = '<div class="empty-workouts">У вас пока нет тренировок</div>';
        return;
    }
    
    const sortedWorkouts = [...savedWorkouts].reverse();
    
    sortedWorkouts.forEach(workout => {
        const isActive = activeWorkout && activeWorkout.id === workout.id;
        const workoutDiv = document.createElement('div');
        workoutDiv.className = `saved-workout-item ${isActive ? 'active' : ''}`;
        
        let completedCount = 0;
        if (activeWorkout && activeWorkout.id === workout.id) {
            completedCount = activeWorkout.steps.filter(s => s.completed).length;
        }
        const totalSteps = workout.tasks ? workout.tasks.length : workout.steps.length;
        const progressText = isActive ? ` (${completedCount}/${totalSteps})` : '';
        
        workoutDiv.innerHTML = `
            <div class="saved-workout-icon">🏋️</div>
            <div class="saved-workout-info">
                <span class="saved-workout-name">${workout.name}${progressText}</span>
                <span class="saved-workout-meta">${totalSteps} заданий • ${workout.goal} км</span>
            </div>
            <div class="saved-workout-actions">
                ${!isActive ? `<button class="workout-start-btn" data-id="${workout.id}">▶️</button>` : ''}
                <button class="workout-delete-btn" data-id="${workout.id}">✕</button>
            </div>
        `;
        container.appendChild(workoutDiv);
    });
    
    document.querySelectorAll('.workout-start-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.dataset.id);
            startWorkout(id);
        });
    });
    
    document.querySelectorAll('.workout-delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.dataset.id);
            deleteWorkout(id);
        });
    });
}

function startWorkout(id) {
    const workout = savedWorkouts.find(w => w.id === id);
    if (!workout) return;
    
    activeWorkout = {
        id: workout.id,
        name: workout.name,
        goal: workout.goal,
        steps: workout.steps ? workout.steps.map(s => ({ ...s, completed: false })) :
            workout.tasks.map((task, index) => ({
                id: index + 1,
                text: task.text,
                completed: false,
                distance: task.distance || 0
            }))
    };
    
    saveState();
    renderSavedWorkouts();
    renderActiveWorkout();
}

function deleteWorkout(id) {
    savedWorkouts = savedWorkouts.filter(w => w.id !== id);
    if (activeWorkout && activeWorkout.id === id) {
        activeWorkout = null;
    }
    saveState();
    renderSavedWorkouts();
    renderActiveWorkout();
}

function renderActiveWorkout() {
    const container = document.getElementById('active-workout');
    const stepsContainer = document.getElementById('active-workout-steps');
    const nameEl = document.getElementById('active-workout-name');
    const goalEl = document.getElementById('active-workout-goal');
    const progressFill = document.getElementById('active-workout-progress');
    const percentEl = document.getElementById('active-workout-percent');
    const completeBtn = document.getElementById('complete-workout-btn');
    
    if (!container || !activeWorkout) {
        if (container) container.style.display = 'none';
        return;
    }
    
    container.style.display = 'block';
    nameEl.textContent = activeWorkout.name;
    goalEl.textContent = activeWorkout.goal + ' км';
    
    stepsContainer.innerHTML = '';
    let completedCount = 0;
    
    activeWorkout.steps.forEach((step, index) => {
        if (step.completed) completedCount++;
        const stepDiv = document.createElement('div');
        stepDiv.className = `workout-step-compact ${step.completed ? 'step-completed' : ''}`;
        stepDiv.innerHTML = `
            <input type="checkbox" class="workout-checkbox" data-index="${index}" ${step.completed ? 'checked' : ''}>
            <span class="step-text">${step.text}</span>
            ${step.distance > 0 ? `<span class="step-distance">+${step.distance} км</span>` : ''}
        `;
        stepsContainer.appendChild(stepDiv);
    });
    
    const progress = (completedCount / activeWorkout.steps.length) * 100;
    progressFill.style.width = progress + '%';
    percentEl.textContent = Math.round(progress) + '%';
    completeBtn.disabled = completedCount !== activeWorkout.steps.length;
    
    document.querySelectorAll('#active-workout-steps .workout-checkbox').forEach(cb => {
        cb.addEventListener('change', function() {
            const index = parseInt(this.dataset.index);
            activeWorkout.steps[index].completed = this.checked;
            saveState();
            renderActiveWorkout();
            renderSavedWorkouts();
        });
    });
}

function completeWorkout() {
    if (!activeWorkout) return;
    
    let actualDistance = 0;
    activeWorkout.steps.forEach(step => {
        if (step.completed) actualDistance += step.distance || 0;
    });
    
    workoutHistory.push({
        day: currentDay,
        distance: actualDistance,
        time: Math.round(actualDistance * 6),
        calories: Math.round(actualDistance * 60),
        date: new Date().toISOString(),
        name: activeWorkout.name
    });
    
    totalWorkouts++;
    totalDistance += actualDistance;
    totalTime += Math.round(actualDistance * 6);
    totalCalories += Math.round(actualDistance * 60);
    
    // Добавляем XP за тренировку
    addXP(Math.round(actualDistance * 10));
    
    saveState();
    
    tg.showPopup({
        title: '🎉',
        message: 'Тренировка завершена! +XP',
        buttons: [{ type: 'close' }]
    });
    
    activeWorkout = null;
    saveState();
    renderActiveWorkout();
    renderSavedWorkouts();
    updateStats();
    updateUserProfile();
}

// ========== ПЕРЕКЛЮЧЕНИЕ СЛАЙДОВ ==========
let currentSlide = 0;

window.switchPage = function(pageIndex) {
    const slides = document.querySelectorAll('.slide');
    const navButtons = document.querySelectorAll('.nav-btn');
    const container = document.getElementById('slidesContainer');
    
    if (!container || slides.length === 0) return;
    
    container.scrollTo({ left: pageIndex * container.clientWidth, behavior: 'smooth' });
    navButtons.forEach((btn, index) => btn.classList.toggle('active', index === pageIndex));
    currentSlide = pageIndex;
    
    if (pageIndex === 1) updateStats();
    if (pageIndex === 2) {
        updateUserProfile();
        renderFriends();
        renderFriendRequests();
        renderInviteStats();
        renderDiary();
        renderLeaderboard();
    }
    if (pageIndex === 3) {
        renderCustomCreator();
        renderSavedWorkouts();
        renderActiveWorkout();
    }
    if (pageIndex === 4) {
        renderPullupsSets();
        renderPushupsSets();
        renderMixedSets();
        updateStrengthProgress();
    }
};

// ========== ПЕРЕКЛЮЧЕНИЕ ТЕМ ==========
window.setTheme = function(theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
    
    const themeCosmos = document.getElementById('theme-cosmos-menu');
    const themeDark = document.getElementById('theme-dark-menu');
    const themeLight = document.getElementById('theme-light-menu');
    
    if (themeCosmos) themeCosmos.classList.toggle('active', theme === 'cosmos');
    if (themeDark) themeDark.classList.toggle('active', theme === 'dark');
    if (themeLight) themeLight.classList.toggle('active', theme === 'light');
};

// ========== ПЕРЕКЛЮЧЕНИЕ ЯЗЫКА ==========
window.setLanguage = function(lang) {
    currentLanguage = lang;
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
    
    const langRu = document.getElementById('lang-ru-menu');
    const langEn = document.getElementById('lang-en-menu');
    if (langRu) langRu.classList.toggle('active', lang === 'ru');
    if (langEn) langEn.classList.toggle('active', lang === 'en');
    
    updateUI();
    updateDate();
    updateStats();
    updateAvatar();
    
    if (currentSlide === 0) {
        if (dayStarted) renderWorkout();
        else updateUI();
    }
    if (currentSlide === 2) {
        updateUserProfile();
        renderFriends();
        renderDiary();
    }
};

// ========== ПЕРЕКЛЮЧЕНИЕ ВКЛАДОК ==========
function switchTab(tabName) {
    currentTab = tabName;
    
    const tabs = {
        friends: document.getElementById('friends-tab'),
        diary: document.getElementById('diary-tab'),
        search: document.getElementById('search-tab'),
        leaderboard: document.getElementById('leaderboard-tab')
    };
    
    const buttons = {
        friends: document.getElementById('tab-friends'),
        diary: document.getElementById('tab-diary'),
        search: document.getElementById('tab-search'),
        leaderboard: document.getElementById('tab-leaderboard')
    };
    
    Object.values(tabs).forEach(tab => {
        if (tab) tab.classList.remove('active');
    });
    Object.values(buttons).forEach(btn => {
        if (btn) btn.classList.remove('active');
    });
    
    if (tabs[tabName]) tabs[tabName].classList.add('active');
    if (buttons[tabName]) buttons[tabName].classList.add('active');
    
    if (tabName === 'friends') {
        renderFriends();
        renderFriendRequests();
    }
    if (tabName === 'diary') renderDiary();
    if (tabName === 'leaderboard') renderLeaderboard();
}

// ========== ИНИЦИАЛИЗАЦИЯ ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('Космический марафон запущен');
    
    // Загружаем сохраненную тему
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) || 'cosmos';
    setTheme(savedTheme);
    
    // Загружаем язык
    const savedLang = localStorage.getItem(STORAGE_KEYS.LANGUAGE) || 'ru';
    currentLanguage = savedLang;
    
    // Обновляем интерфейс
    updateDate();
    updateUI();
    updateStats();
    updateAvatar();
    
    // Инициализируем друзей (демо-данные если пусто)
    if (friends.length === 0) {
        // Добавляем демо-друзей
        friends = [
            {
                id: 'friend_1',
                name: 'Алексей Космонавтов',
                username: 'cosmo_alex',
                avatar: '👨‍🚀',
                distance: 45.2,
                workouts: 12,
                pullups: 87
            },
            {
                id: 'friend_2',
                name: 'Мария Звездная',
                username: 'star_maria',
                avatar: '👩‍🚀',
                distance: 38.7,
                workouts: 9,
                pullups: 54
            }
        ];
        saveState();
    }
    
    // Инициализация слайда друзей
    updateUserProfile();
    renderFriends();
    renderFriendRequests();
    renderInviteStats();
    renderDiary();
    renderLeaderboard();
    
    // Инициализация создания тренировок
    renderCustomCreator();
    renderSavedWorkouts();
    renderActiveWorkout();
    
    // Инициализация силовых
    renderPullupsSets();
    renderPushupsSets();
    renderMixedSets();
    
    // Обновляем ползунки целей
    const pullupsSlider = document.getElementById('pullups-goal-slider');
    if (pullupsSlider) {
        pullupsSlider.value = strengthToday.pullups.goal;
        document.getElementById('pullups-goal-value').textContent = strengthToday.pullups.goal;
        document.getElementById('pullups-goal').textContent = strengthToday.pullups.goal;
        
        pullupsSlider.addEventListener('input', function() {
            const value = this.value;
            document.getElementById('pullups-goal-value').textContent = value;
            document.getElementById('pullups-goal').textContent = value;
            strengthToday.pullups.goal = parseInt(value);
            updatePullupsStats();
            saveState();
        });
    }
    
    const pushupsSlider = document.getElementById('pushups-goal-slider');
    if (pushupsSlider) {
        pushupsSlider.value = strengthToday.pushups.goal;
        document.getElementById('pushups-goal-value').textContent = strengthToday.pushups.goal;
        document.getElementById('pushups-goal').textContent = strengthToday.pushups.goal;
        
        pushupsSlider.addEventListener('input', function() {
            const value = this.value;
            document.getElementById('pushups-goal-value').textContent = value;
            document.getElementById('pushups-goal').textContent = value;
            strengthToday.pushups.goal = parseInt(value);
            updatePushupsStats();
            saveState();
        });
    }
    
    // ========== ОБРАБОТЧИКИ СОБЫТИЙ ==========
    
    // Меню
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
    
    // Закрытие меню при клике вне
    document.addEventListener('click', function(e) {
        const menu = document.getElementById('menu-dropdown');
        const btn = document.getElementById('menu-btn');
        if (btn && menu && !btn.contains(e.target) && !menu.contains(e.target)) {
            menu.style.display = 'none';
            btn.classList.remove('active');
        }
    });
    
    // Кнопки меню
    document.getElementById('reset-marathon')?.addEventListener('click', function(e) {
        e.preventDefault();
        if (confirm('Сбросить весь прогресс?')) {
            localStorage.clear();
            location.reload();
        }
        document.getElementById('menu-dropdown').style.display = 'none';
        document.getElementById('menu-btn').classList.remove('active');
    });
    
    document.getElementById('stats-menu')?.addEventListener('click', function(e) {
        e.preventDefault();
        switchPage(1);
        document.getElementById('menu-dropdown').style.display = 'none';
        document.getElementById('menu-btn').classList.remove('active');
    });
    
    document.getElementById('support')?.addEventListener('click', function(e) {
        e.preventDefault();
        tg.showAlert('Поддержка: @cosmos_support');
        document.getElementById('menu-dropdown').style.display = 'none';
        document.getElementById('menu-btn').classList.remove('active');
    });
    
    document.getElementById('telegram-support')?.addEventListener('click', function(e) {
        e.preventDefault();
        tg.openTelegramLink('https://t.me/cosmos_support');
        document.getElementById('menu-dropdown').style.display = 'none';
        document.getElementById('menu-btn').classList.remove('active');
    });
    
    document.getElementById('faq')?.addEventListener('click', function(e) {
        e.preventDefault();
        tg.showAlert('FAQ: Космический марафон - 30 дней тренировок, соревнования с друзьями, система уровней');
        document.getElementById('menu-dropdown').style.display = 'none';
        document.getElementById('menu-btn').classList.remove('active');
    });
    
    // Кнопки тем
    document.getElementById('theme-cosmos-menu')?.addEventListener('click', function() {
        setTheme('cosmos');
    });
    
    document.getElementById('theme-dark-menu')?.addEventListener('click', function() {
        setTheme('dark');
    });
    
    document.getElementById('theme-light-menu')?.addEventListener('click', function() {
        setTheme('light');
    });
    
    // Кнопки языка
    document.getElementById('lang-ru-menu')?.addEventListener('click', function() {
        setLanguage('ru');
    });
    
    document.getElementById('lang-en-menu')?.addEventListener('click', function() {
        setLanguage('en');
    });
    
    // Беговые тренировки
    document.getElementById('start-day-btn')?.addEventListener('click', function() {
        if (dayCompletedTime && !canStartNewDay()) {
            const remaining = getTimeUntilNextDay4am();
            if (remaining) tg.showAlert(`Подожди ${remaining.hours}ч ${remaining.minutes}м`);
            return;
        }
        if (!canStartDay()) {
            tg.showAlert('Тренировки доступны с 4:00 до 23:00');
            return;
        }
        dayStarted = true;
        dayStartTime = getCurrentTime().toString();
        dayCompletedTime = null;
        const workout = BASE_WORKOUTS[currentDay] || BASE_WORKOUTS[((currentDay - 1) % 30) + 1];
        completedSteps = new Array(workout.steps.length).fill(false);
        additionalCompleted = new Array(additionalTasks.length).fill(false);
        saveState();
        updateUI();
    });
    
    document.getElementById('complete-day-btn')?.addEventListener('click', function() {
        if (!canCompleteDay()) {
            tg.showAlert('Только до 23:00!');
            return;
        }
        if (isDayExpired()) {
            tg.showAlert('День истек');
            return;
        }
        
        const workout = BASE_WORKOUTS[currentDay] || BASE_WORKOUTS[((currentDay - 1) % 30) + 1];
        let actualDistance = 0, actualTime = 0, actualCalories = 0;
        
        workout.steps.forEach((step, index) => {
            if (completedSteps[index]) {
                actualDistance += step.distance || 0;
                actualTime += step.time || 0;
                actualCalories += step.calories || 0;
            }
        });
        
        additionalTasks.forEach((task, index) => {
            if (additionalCompleted[index]) {
                actualDistance += task.distance || 0;
                actualTime += 5;
                actualCalories += 30;
            }
        });
        
        workoutHistory.push({
            day: currentDay,
            distance: actualDistance,
            time: actualTime,
            calories: actualCalories,
            date: new Date().toISOString(),
            name: `День ${currentDay}`
        });
        
        totalDistance += actualDistance;
        totalWorkouts++;
        totalTime += actualTime;
        totalCalories += actualCalories;
        
        // Добавляем XP
        addXP(Math.round(actualDistance * 10 + actualTime));
        
        additionalTasks = [];
        additionalCompleted = [];
        
        const finalDistance = document.getElementById('final-distance');
        if (finalDistance) finalDistance.textContent = actualDistance.toFixed(1);
        
        const marathonScreen = document.getElementById('marathon-screen');
        const congratsScreen = document.getElementById('congrats');
        if (marathonScreen) marathonScreen.style.display = 'none';
        if (congratsScreen) congratsScreen.style.display = 'block';
        
        dayStarted = false;
        dayCompletedTime = getCurrentTime().toString();
        dayStartTime = null;
        currentDay++;
        completedSteps = [];
        
        saveState();
        updateStats();
        updateUserProfile();
    });
    
    document.getElementById('continue-btn')?.addEventListener('click', function() {
        const congratsScreen = document.getElementById('congrats');
        if (congratsScreen) congratsScreen.style.display = 'none';
        updateUI();
    });
    
    // Вкладки друзей
    document.getElementById('tab-friends')?.addEventListener('click', function() {
        switchTab('friends');
    });
    
    document.getElementById('tab-diary')?.addEventListener('click', function() {
        switchTab('diary');
    });
    
    document.getElementById('tab-search')?.addEventListener('click', function() {
        switchTab('search');
    });
    
    document.getElementById('tab-leaderboard')?.addEventListener('click', function() {
        switchTab('leaderboard');
    });
    
    // Периоды для топа
    document.querySelectorAll('.period-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.period-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            resultsPeriod = this.dataset.period;
            renderLeaderboard();
        });
    });
    
    // Обновление друзей
    document.getElementById('refresh-friends')?.addEventListener('click', function() {
        renderFriends();
        tg.showAlert('Список друзей обновлен');
    });
    
    // Поиск
    document.getElementById('search-btn')?.addEventListener('click', function() {
        const query = document.getElementById('search-input').value;
        const results = searchUsers(query);
        const resultsDiv = document.getElementById('search-results');
        const resultsList = document.getElementById('search-results-list');
        
        if (results.length > 0) {
            resultsDiv.style.display = 'block';
            resultsList.innerHTML = '';
            results.forEach(user => {
                const userDiv = document.createElement('div');
                userDiv.className = 'friend-card';
                userDiv.innerHTML = `
                    <div class="friend-header">
                        <div class="friend-avatar">${user.avatar}</div>
                        <div class="friend-info">
                            <span class="friend-name">${user.name}</span>
                            <span class="friend-username">@${user.username}</span>
                        </div>
                    </div>
                    <div class="friend-stats-grid">
                        <div class="friend-stat-item">
                            <span class="friend-stat-value">${user.distance.toFixed(1)}</span>
                            <span class="friend-stat-label">км</span>
                        </div>
                    </div>
                    <button class="add-friend-btn" data-username="${user.username}">📤 Добавить</button>
                `;
                resultsList.appendChild(userDiv);
            });
        } else {
            resultsDiv.style.display = 'none';
        }
    });
    
    // Приглашения
    document.getElementById('invite-friends-btn')?.addEventListener('click', inviteFriend);
    document.getElementById('copy-invite-link')?.addEventListener('click', copyInviteLink);
    
    // Дневник
    document.getElementById('add-entry-btn')?.addEventListener('click', function() {
        const form = document.getElementById('add-entry-form');
        const btn = document.getElementById('add-entry-btn');
        if (form) form.style.display = 'block';
        if (btn) btn.style.display = 'none';
    });
    
    document.getElementById('save-entry-btn')?.addEventListener('click', function() {
        const text = document.getElementById('entry-text')?.value.trim();
        if (text) {
            diaryEntries.push({
                id: Date.now(),
                text: text,
                date: new Date().toISOString()
            });
            saveState();
            renderDiary();
            tg.showAlert('Запись сохранена');
            
            document.getElementById('entry-text').value = '';
            document.getElementById('add-entry-form').style.display = 'none';
            document.getElementById('add-entry-btn').style.display = 'flex';
        }
    });
    
    document.getElementById('cancel-entry-btn')?.addEventListener('click', function() {
        document.getElementById('entry-text').value = '';
        document.getElementById('add-entry-form').style.display = 'none';
        document.getElementById('add-entry-btn').style.display = 'flex';
    });
    
    // Создание тренировки
    document.getElementById('add-task-btn')?.addEventListener('click', function() {
        const taskText = document.getElementById('new-task-text')?.value.trim();
        const taskDistance = parseFloat(document.getElementById('new-task-distance')?.value) || 0;
        
        if (!taskText) {
            tg.showAlert('Введите задание');
            return;
        }
        
        currentCustomTasks.push({ text: taskText, distance: taskDistance });
        
        document.getElementById('new-task-text').value = '';
        document.getElementById('new-task-distance').value = 0;
        
        renderCustomCreator();
    });
    
    document.getElementById('goal-distance')?.addEventListener('input', updateCreateButtonState);
    
    document.getElementById('create-plan-btn')?.addEventListener('click', saveWorkout);
    
    document.getElementById('complete-workout-btn')?.addEventListener('click', completeWorkout);
    
    // Силовые тренировки
    document.getElementById('type-pullups')?.addEventListener('click', function() {
        switchStrengthType('pullups');
    });
    
    document.getElementById('type-pushups')?.addEventListener('click', function() {
        switchStrengthType('pushups');
    });
    
    document.getElementById('type-mixed')?.addEventListener('click', function() {
        switchStrengthType('mixed');
    });
    
    document.getElementById('add-pullups-set')?.addEventListener('click', function() {
        addSet('pullups');
    });
    
    document.getElementById('add-pushups-set')?.addEventListener('click', function() {
        addSet('pushups');
    });
    
    document.getElementById('add-mixed-set')?.addEventListener('click', addMixedSet);
    
    document.getElementById('complete-strength-btn')?.addEventListener('click', function() {
        if (!this.disabled) completeStrengthWorkout();
    });
    
    // Обновление времени каждую минуту
    setInterval(function() {
        if (dayStarted) {
            updateProgress();
            updateDeadlineInfo();
        } else {
            updateUI();
        }
        updateDate();
    }, 60000);
    
    // Готово
    tg.ready();
    
    // Показываем приветствие при первом запуске
    if (!localStorage.getItem('welcome_shown')) {
        setTimeout(() => {
            tg.showPopup({
                title: '🚀 Добро пожаловать!',
                message: 'Ты в космическом марафоне! Тренируйся, повышай уровень и становись легендой!',
                buttons: [{ type: 'close' }]
            });
            localStorage.setItem('welcome_shown', 'true');
        }, 1000);
    }
});
