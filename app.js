let tg = window.Telegram.WebApp;
tg.expand();

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
    LANGUAGE: 'language'
};

// ========== AI-РЕКОМЕНДАЦИИ ==========
const recommendations = {
    beginner: [
        {
            icon: "🌅",
            text: "Начни с легкой пробежки 15-20 минут. Главное - регулярность, а не скорость!"
        },
        {
            icon: "🎯",
            text: "Поставь цель на неделю: 3 тренировки по 2 км. Это отличный старт!"
        },
        {
            icon: "💪",
            text: "Не забывай про разминку! 5-10 минут перед бегом снизят риск травм."
        },
        {
            icon: "👟",
            text: "Следи за техникой: приземляйся на среднюю часть стопы, держи корпус прямо."
        },
        {
            icon: "📱",
            text: "Используй приложение для отслеживания прогресса - это очень мотивирует!"
        }
    ],
    intermediate: [
        {
            icon: "⚡",
            text: "Попробуй интервальные тренировки: 1 мин быстро / 2 мин медленно x 6-8 раз."
        },
        {
            icon: "📈",
            text: "Увеличь дистанцию на 10% на этой неделе. Твой прогресс виден!"
        },
        {
            icon: "🦵",
            text: "Добавь специальные беговые упражнения после тренировки для укрепления мышц."
        },
        {
            icon: "🏃",
            text: "Работай над каденсом: 170-180 шагов в минуту - оптимальная частота."
        },
        {
            icon: "🎵",
            text: "Попробуй бегать под музыку с ритмом 170-180 BPM - это поможет держать темп."
        }
    ],
    advanced: [
        {
            icon: "🏔️",
            text: "Отличная форма! Попробуй бег в горку или по пересеченной местности."
        },
        {
            icon: "🎯",
            text: "Поставь новый рекорд! Сегодня отличный день для длительной тренировки."
        },
        {
            icon: "📊",
            text: "Проанализируй свой темп. Возможно, стоит поработать над ускорениями."
        },
        {
            icon: "🏆",
            text: "Подумай о полумарафоне! С твоим уровнем это вполне реально."
        },
        {
            icon: "⚙️",
            text: "Экспериментируй с разными типами тренировок: темповые, длинные, интервальные."
        }
    ],
    recovery: [
        {
            icon: "🧘",
            text: "Сегодня легкая тренировка. Сосредоточься на технике и дыхании."
        },
        {
            icon: "🔄",
            text: "День активного восстановления: растяжка и ходьба 30-40 минут."
        },
        {
            icon: "💧",
            text: "Не забывай пить воду! Гидратация важна даже в дни отдыха."
        },
        {
            icon: "😴",
            text: "Качественный сон - ключ к восстановлению. Постарайся спать 7-8 часов."
        },
        {
            icon: "🥗",
            text: "Обрати внимание на питание: белки для мышц, углеводы для энергии."
        }
    ],
    motivation: [
        {
            icon: "🔥",
            text: "Ты уже пробежал {total} км! Каждая тренировка делает тебя сильнее."
        },
        {
            icon: "⭐",
            text: "{streak} дней подряд! Ты настоящий чемпион!"
        },
        {
            icon: "🎉",
            text: "До следующей цели осталось всего {toNextLevel} км! Продолжай в том же духе!"
        },
        {
            icon: "💫",
            text: "Твой лучший результат - {best} км! Новый рекорд уже близко!"
        },
        {
            icon: "🌈",
            text: "Каждый километр приближает тебя к цели. Ты молодец!"
        }
    ],
    tips: [
        {
            icon: "👟",
            text: "Проверь свою обувь: беговые кроссовки служат около 500-800 км."
        },
        {
            icon: "🌙",
            text: "Качественный сон - ключ к хорошим тренировкам. Спи 7-8 часов."
        },
        {
            icon: "🥗",
            text: "Легкий перекус за час до тренировки: банан или тост с арахисовой пастой."
        },
        {
            icon: "☀️",
            text: "Утром бегать полезно для режима, вечером - для снятия стресса."
        },
        {
            icon: "📝",
            text: "Веди дневник тренировок - это помогает видеть прогресс и анализировать."
        }
    ]
};

// ========== ПЕРЕВОДЫ ==========
const translations = {
    ru: {
        // ... (все предыдущие переводы)
        // Добавляем новые переводы для рекомендаций
        aiRecommendations: "🤖 AI-РЕКОМЕНДАЦИИ",
        refreshRecommendation: "🔄 Обновить рекомендацию",
        recommendations: {
            beginner: "Начинающий",
            intermediate: "Средний уровень",
            advanced: "Продвинутый",
            recovery: "Восстановление",
            motivation: "Мотивация",
            tips: "Советы"
        }
    },
    en: {
        // ... (все предыдущие переводы)
        aiRecommendations: "🤖 AI RECOMMENDATIONS",
        refreshRecommendation: "🔄 Refresh recommendation",
        recommendations: {
            beginner: "Beginner",
            intermediate: "Intermediate",
            advanced: "Advanced",
            recovery: "Recovery",
            motivation: "Motivation",
            tips: "Tips"
        }
    }
};

// ========== БАЗОВЫЕ ТРЕНИРОВКИ (30 ДНЕЙ) ==========
const BASE_WORKOUTS = {
    1: {
        name: "🔥 Day 1: Easy Start",
        name_ru: "🔥 День 1: Легкий старт",
        difficulty: "easy",
        steps: [
            { id: 1, text: "🏋️ Warm-up 10 min", text_ru: "🏋️ Разминка 10 минут", distance: 0, time: 10, calories: 30 },
            { id: 2, text: "🏃 Easy run 15 min", text_ru: "🏃 Бег 15 минут в легком темпе", distance: 2.0, time: 15, calories: 150 },
            { id: 3, text: "🦵 Leg swings", text_ru: "🦵 Спец беговые: махи ногами", distance: 0, time: 5, calories: 20 },
            { id: 4, text: "⚡ 4x200m acceleration", text_ru: "⚡ Ускорение 4х200 метров", distance: 0.8, time: 8, calories: 80 }
        ],
        totalDistance: 2.8,
        totalTime: 38,
        totalCalories: 280
    },
    2: {
        name: "⚡ Day 2: Intervals",
        name_ru: "⚡ День 2: Интервалы",
        difficulty: "medium",
        steps: [
            { id: 1, text: "🏋️ Warm-up 15 min", text_ru: "🏋️ Разминка 15 минут", distance: 0, time: 15, calories: 45 },
            { id: 2, text: "🏃 Run 20 min", text_ru: "🏃 Бег 20 минут", distance: 3.0, time: 20, calories: 200 },
            { id: 3, text: "🦵 Jumping", text_ru: "🦵 Спец беговые: прыжки", distance: 0, time: 8, calories: 40 },
            { id: 4, text: "⚡ 6x200m acceleration", text_ru: "⚡ Ускорение 6х200 метров", distance: 1.2, time: 12, calories: 120 }
        ],
        totalDistance: 4.2,
        totalTime: 55,
        totalCalories: 405
    },
    3: {
        name: "🏔️ Day 3: Strength",
        name_ru: "🏔️ День 3: Силовая",
        difficulty: "hard",
        steps: [
            { id: 1, text: "🏋️ Warm-up 20 min", text_ru: "🏋️ Разминка 20 минут", distance: 0, time: 20, calories: 60 },
            { id: 2, text: "🏃 Run 25 min", text_ru: "🏃 Бег 25 минут", distance: 4.0, time: 25, calories: 250 },
            { id: 3, text: "🦵 Multiple jumps", text_ru: "🦵 Спец беговые: многоскоки", distance: 0, time: 10, calories: 50 },
            { id: 4, text: "⚡ 8x200m acceleration", text_ru: "⚡ Ускорение 8х200 метров", distance: 1.6, time: 16, calories: 160 }
        ],
        totalDistance: 5.6,
        totalTime: 71,
        totalCalories: 520
    },
    4: {
        name: "🌅 Day 4: Recovery",
        name_ru: "🌅 День 4: Восстановление",
        difficulty: "easy",
        steps: [
            { id: 1, text: "🏋️ Warm-up 10 min", text_ru: "🏋️ Разминка 10 минут", distance: 0, time: 10, calories: 30 },
            { id: 2, text: "🏃 Easy run 15 min", text_ru: "🏃 Бег 15 минут легкий", distance: 2.0, time: 15, calories: 130 },
            { id: 3, text: "🦵 Stretching", text_ru: "🦵 Спец беговые: растяжка", distance: 0, time: 10, calories: 25 },
            { id: 4, text: "⚡ 4x100m acceleration", text_ru: "⚡ Ускорение 4х100 метров", distance: 0.4, time: 5, calories: 40 }
        ],
        totalDistance: 2.4,
        totalTime: 40,
        totalCalories: 225
    },
    5: {
        name: "🔥 Day 5: Speed",
        name_ru: "🔥 День 5: Скорость",
        difficulty: "hard",
        steps: [
            { id: 1, text: "🏋️ Warm-up 15 min", text_ru: "🏋️ Разминка 15 минут", distance: 0, time: 15, calories: 45 },
            { id: 2, text: "🏃 Run 20 min", text_ru: "🏃 Бег 20 минут", distance: 3.0, time: 20, calories: 210 },
            { id: 3, text: "🦵 High knees", text_ru: "🦵 Спец беговые: семенящий", distance: 0, time: 8, calories: 35 },
            { id: 4, text: "⚡ 10x100m acceleration", text_ru: "⚡ Ускорение 10х100 метров", distance: 1.0, time: 12, calories: 110 }
        ],
        totalDistance: 4.0,
        totalTime: 55,
        totalCalories: 400
    }
};

// Добавляем тренировки с 6 по 30
for (let i = 6; i <= 30; i++) {
    const sourceDay = ((i - 1) % 5) + 1;
    BASE_WORKOUTS[i] = {
        ...BASE_WORKOUTS[sourceDay],
        name: BASE_WORKOUTS[sourceDay].name.replace(`Day ${sourceDay}`, `Day ${i}`),
        name_ru: BASE_WORKOUTS[sourceDay].name_ru.replace(`День ${sourceDay}`, `День ${i}`),
        steps: BASE_WORKOUTS[sourceDay].steps.map(step => ({
            ...step,
            id: step.id + (i * 10)
        }))
    };
}

// ========== СОСТОЯНИЕ ==========
let currentDay = parseInt(localStorage.getItem(STORAGE_KEYS.CURRENT_DAY)) || 1;
let dayStarted = localStorage.getItem(STORAGE_KEYS.DAY_STARTED) === 'true' || false;
let dayStartTime = localStorage.getItem(STORAGE_KEYS.DAY_START_TIME);
let dayCompletedTime = localStorage.getItem(STORAGE_KEYS.DAY_COMPLETED_TIME);
let completedSteps = JSON.parse(localStorage.getItem(STORAGE_KEYS.COMPLETED_STEPS)) || [];

// Дополнительные задания
let additionalTasks = JSON.parse(localStorage.getItem(STORAGE_KEYS.ADDITIONAL_TASKS)) || [];
let additionalCompleted = JSON.parse(localStorage.getItem(STORAGE_KEYS.ADDITIONAL_COMPLETED)) || [];

// Статистика
let workoutHistory = JSON.parse(localStorage.getItem(STORAGE_KEYS.WORKOUT_HISTORY)) || [];
let totalDistance = parseFloat(localStorage.getItem(STORAGE_KEYS.TOTAL_DISTANCE)) || 0;
let totalWorkouts = parseInt(localStorage.getItem(STORAGE_KEYS.TOTAL_WORKOUTS)) || 0;
let totalTime = parseInt(localStorage.getItem(STORAGE_KEYS.TOTAL_TIME)) || 0;
let totalCalories = parseInt(localStorage.getItem(STORAGE_KEYS.TOTAL_CALORIES)) || 0;

// Дневник
let diaryEntries = JSON.parse(localStorage.getItem(STORAGE_KEYS.DIARY_ENTRIES)) || [];

// Текущие данные для создания тренировки
let currentCustomTasks = [];

// Язык
let currentLanguage = localStorage.getItem(STORAGE_KEYS.LANGUAGE) || 'ru';

// ========== ФУНКЦИЯ ПЕРЕВОДА ==========
function t(key, ...args) {
    let text = translations[currentLanguage]?.[key] || key;
    if (typeof text === 'function') {
        return text(...args);
    }
    return text;
}

// ========== ФУНКЦИИ ДЛЯ AI-РЕКОМЕНДАЦИЙ ==========
function calculateStreak() {
    if (workoutHistory.length === 0) return 0;
    
    let streak = 1;
    const sorted = [...workoutHistory].sort((a, b) => new Date(b.date) - new Date(a.date));
    const today = new Date().toDateString();
    const lastWorkout = new Date(sorted[0].date).toDateString();
    
    if (lastWorkout !== today) return 0;
    
    for (let i = 1; i < sorted.length; i++) {
        const prevDate = new Date(sorted[i-1].date);
        const currDate = new Date(sorted[i].date);
        const diffDays = Math.floor((prevDate - currDate) / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
            streak++;
        } else {
            break;
        }
    }
    
    return streak;
}

function getUserLevel() {
    if (totalWorkouts < 5) return 'beginner';
    if (totalWorkouts < 20) return 'intermediate';
    return 'advanced';
}

function needsRecovery() {
    if (workoutHistory.length < 3) return false;
    
    const lastThree = workoutHistory.slice(-3);
    const avgDistance = lastThree.reduce((sum, w) => sum + w.distance, 0) / 3;
    const hadHardWorkouts = lastThree.some(w => w.distance > 5);
    
    return hadHardWorkouts && avgDistance > 4;
}

function getPersonalizedRecommendation() {
    const level = getUserLevel();
    const needRecovery = needsRecovery();
    const streak = calculateStreak();
    
    // 20% шанс на мотивационное сообщение
    if (Math.random() < 0.2 && totalWorkouts > 0) {
        const motiIndex = Math.floor(Math.random() * recommendations.motivation.length);
        let motiText = recommendations.motivation[motiIndex].text;
        
        motiText = motiText.replace('{total}', totalDistance.toFixed(1));
        motiText = motiText.replace('{streak}', streak);
        
        const bestDistance = workoutHistory.length > 0 
            ? Math.max(...workoutHistory.map(w => w.distance)).toFixed(1)
            : 0;
        motiText = motiText.replace('{best}', bestDistance);
        
        const nextLevel = level === 'beginner' ? 5 - totalWorkouts : 
                         level === 'intermediate' ? 20 - totalWorkouts : 0;
        motiText = motiText.replace('{toNextLevel}', nextLevel);
        
        return {
            icon: recommendations.motivation[motiIndex].icon,
            text: motiText
        };
    }
    
    // 20% шанс на общий совет
    if (Math.random() < 0.2) {
        const tipIndex = Math.floor(Math.random() * recommendations.tips.length);
        return recommendations.tips[tipIndex];
    }
    
    // Если нужен день восстановления
    if (needRecovery) {
        const recIndex = Math.floor(Math.random() * recommendations.recovery.length);
        return recommendations.recovery[recIndex];
    }
    
    // Иначе рекомендация по уровню
    const levelRecs = recommendations[level];
    const recIndex = Math.floor(Math.random() * levelRecs.length);
    return levelRecs[recIndex];
}

function updateRecommendation() {
    const rec = getPersonalizedRecommendation();
    const container = document.getElementById('recommendation-content');
    if (!container) return;
    
    container.innerHTML = `
        <div class="recommendation-icon">${rec.icon}</div>
        <div class="recommendation-text">${rec.text}</div>
    `;
}

// ========== ОСТАЛЬНЫЕ ФУНКЦИИ (сохраняем все предыдущие) ==========

// Функции времени
function getCurrentHour() {
    return new Date().getHours();
}

function canStartDay() {
    const hour = getCurrentHour();
    return hour >= 4 && hour < 23;
}

function canCompleteDay() {
    const hour = getCurrentHour();
    return hour < 23;
}

function canStartNewDay() {
    if (!dayCompletedTime) return true;
    
    const now = Date.now();
    const completed = parseInt(dayCompletedTime);
    const hoursPassed = (now - completed) / (1000 * 60 * 60);
    
    return hoursPassed >= 24;
}

function getTimeRemaining() {
    if (!dayCompletedTime) return null;
    
    const now = Date.now();
    const completed = parseInt(dayCompletedTime);
    const hoursPassed = (now - completed) / (1000 * 60 * 60);
    
    if (hoursPassed >= 24) return null;
    
    const remaining = 24 - hoursPassed;
    const hours = Math.floor(remaining);
    const minutes = Math.ceil((remaining - hours) * 60);
    
    return { hours, minutes };
}

function isDayExpired() {
    if (!dayStartTime) return false;
    const now = Date.now();
    const start = parseInt(dayStartTime);
    return (now - start) / (1000 * 60 * 60) >= 24;
}

// Сохранение
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
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, currentLanguage);
}

// Статистика
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
    const comparisonEl = document.getElementById('month-comparison');
    
    if (totalWorkoutsEl) totalWorkoutsEl.textContent = totalWorkouts;
    if (totalDistanceEl) totalDistanceEl.textContent = totalDistance.toFixed(1) + ' км';
    if (totalTimeEl) {
        const hours = Math.floor(totalTime / 60);
        const minutes = totalTime % 60;
        totalTimeEl.textContent = hours > 0 ? `${hours}ч ${minutes}м` : `${minutes} мин`;
    }
    if (totalCaloriesEl) totalCaloriesEl.textContent = totalCalories + ' ккал';
    
    const avgDistance = totalWorkouts > 0 ? (totalDistance / totalWorkouts).toFixed(1) : 0;
    if (avgDistanceEl) avgDistanceEl.textContent = avgDistance + ' км';
    
    const bestDistance = workoutHistory.length > 0 
        ? Math.max(...workoutHistory.map(w => w.distance)).toFixed(1)
        : 0;
    if (bestDistanceEl) bestDistanceEl.textContent = bestDistance + ' км';
    
    let avgPace = 0;
    if (totalDistance > 0) {
        avgPace = (totalTime / totalDistance).toFixed(1);
    }
    if (avgPaceEl) avgPaceEl.textContent = avgPace + ' мин/км';
    
    const avgCalories = totalWorkouts > 0 ? Math.round(totalCalories / totalWorkouts) : 0;
    if (avgCaloriesEl) avgCaloriesEl.textContent = avgCalories + ' ккал';
    
    if (weekCurrentEl) weekCurrentEl.textContent = currentDay - 1;
    const weekProgress = ((currentDay - 1) / 30) * 100;
    if (weekProgressEl) weekProgressEl.style.width = `${weekProgress}%`;
    
    // Сравнение с прошлым месяцем
    if (comparisonEl) {
        const now = new Date();
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const firstDayOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        
        const thisMonth = workoutHistory.filter(w => new Date(w.date) >= firstDayOfMonth);
        const lastMonth = workoutHistory.filter(w => {
            const date = new Date(w.date);
            return date >= firstDayOfLastMonth && date < firstDayOfMonth;
        });
        
        const thisMonthDistance = thisMonth.reduce((sum, w) => sum + w.distance, 0);
        const lastMonthDistance = lastMonth.reduce((sum, w) => sum + w.distance, 0);
        
        let comparisonText = '';
        if (lastMonthDistance === 0) {
            comparisonText = `📊 vs прошлый месяц: —`;
        } else {
            const diff = ((thisMonthDistance - lastMonthDistance) / lastMonthDistance * 100).toFixed(0);
            if (diff > 0) {
                comparisonText = `📈 vs прошлый месяц: +${diff}% лучше`;
            } else if (diff < 0) {
                comparisonText = `📉 vs прошлый месяц: ${diff}% хуже`;
            } else {
                comparisonText = `📊 vs прошлый месяц: так же`;
            }
        }
        comparisonEl.textContent = comparisonText;
    }
    
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
                const formattedDate = date.toLocaleDateString('ru-RU', {
                    day: 'numeric',
                    month: 'short'
                });
                
                const pace = (workout.time / workout.distance).toFixed(1);
                
                const item = document.createElement('div');
                item.className = 'history-item';
                item.innerHTML = `
                    <div style="display: flex; flex-direction: column; gap: 4px; width: 100%;">
                        <div style="display: flex; justify-content: space-between;">
                            <span class="history-date">${formattedDate}</span>
                            <span class="history-workout">${workout.name || `День ${workout.day}`}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; font-size: 12px; color: var(--text-secondary);">
                            <span>${workout.distance} км</span>
                            <span>${workout.time} мин</span>
                            <span>${workout.calories} ккал</span>
                            <span>${pace} мин/км</span>
                        </div>
                    </div>
                `;
                historyList.appendChild(item);
            });
        }
    }
    
    // Обновляем рекомендацию при обновлении статистики
    updateRecommendation();
}

// Функции для создания заданий
function renderCustomCreator() {
    const container = document.getElementById('custom-tasks-list');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (currentCustomTasks.length === 0) {
        container.innerHTML = '<div class="empty-tasks">➕ Добавь задания для тренировки</div>';
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
    
    if (goal > 0 && currentCustomTasks.length > 0) {
        createBtn.disabled = false;
    } else {
        createBtn.disabled = true;
    }
}

function createCustomWorkout() {
    currentCustomTasks.forEach(task => {
        additionalTasks.push({
            id: Date.now() + Math.random(),
            text: task.text,
            distance: task.distance || 0
        });
    });
    
    additionalCompleted = new Array(additionalTasks.length).fill(false);
    
    tg.showPopup({
        title: '✅',
        message: `Задания добавлены! Добавлено заданий: ${currentCustomTasks.length}. Они появились в разделе "Добавленные" на главном экране.`,
        buttons: [{ type: 'close' }]
    });
    
    currentCustomTasks = [];
    const goalInput = document.getElementById('goal-distance');
    const taskText = document.getElementById('new-task-text');
    const taskDistance = document.getElementById('new-task-distance');
    
    if (goalInput) goalInput.value = 5;
    if (taskText) taskText.value = '';
    if (taskDistance) taskDistance.value = 0;
    
    saveState();
    renderCustomCreator();
    
    if (currentSlide === 0) {
        renderWorkout();
    }
}

// Обновление интерфейса бега
function updateUI() {
    const startDayNumber = document.getElementById('start-day-number');
    const currentDayEl = document.getElementById('current-day');
    if (startDayNumber) startDayNumber.textContent = currentDay;
    if (currentDayEl) currentDayEl.textContent = currentDay;
    
    if (dayStarted && dayStartTime) {
        const now = Date.now();
        const start = parseInt(dayStartTime);
        const hoursPassed = (now - start) / (1000 * 60 * 60);
        
        if (hoursPassed >= 24) {
            dayStarted = false;
            dayStartTime = null;
            dayCompletedTime = now.toString();
            completedSteps = [];
            additionalCompleted = [];
            saveState();
            tg.showAlert('⏰ Время тренировки истекло! Новый день начнется через 24 часа.');
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
    } else if (dayCompletedTime && !canStartNewDay()) {
        startScreen.style.display = 'block';
        marathonScreen.style.display = 'none';
        congratsScreen.style.display = 'none';
        
        const remaining = getTimeRemaining();
        const timeInfo = document.getElementById('time-info');
        const startBtn = document.getElementById('start-day-btn');
        
        if (timeInfo && remaining) {
            timeInfo.textContent = `⏳ Следующий день через ${remaining.hours}ч ${remaining.minutes}м`;
            timeInfo.style.color = 'var(--warning)';
        }
        if (startBtn) {
            startBtn.disabled = true;
            startBtn.textContent = `⏳ ${remaining.hours}ч ${remaining.minutes}м`;
        }
    } else {
        startScreen.style.display = 'block';
        marathonScreen.style.display = 'none';
        congratsScreen.style.display = 'none';
        
        const timeInfo = document.getElementById('time-info');
        const startBtn = document.getElementById('start-day-btn');
        
        if (!canStartDay()) {
            if (timeInfo) {
                timeInfo.textContent = '⏰ Жди 4 утра';
                timeInfo.style.color = 'var(--warning)';
            }
            if (startBtn) {
                startBtn.disabled = true;
                startBtn.textContent = '⏰ Жди 4 утра';
            }
        } else {
            if (timeInfo) {
                timeInfo.textContent = '✅ Можно начинать';
                timeInfo.style.color = 'var(--success)';
            }
            if (startBtn) {
                startBtn.disabled = false;
                startBtn.textContent = '🏃 Начать бег';
            }
        }
    }
}

function renderWorkout() {
    const workout = BASE_WORKOUTS[currentDay] || BASE_WORKOUTS[((currentDay - 1) % 30) + 1];
    
    const workoutName = document.getElementById('workout-name');
    const workoutDifficulty = document.getElementById('workout-difficulty');
    
    if (workoutName) {
        workoutName.textContent = workout.name_ru;
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
        const stepText = step.text_ru;
        
        const stepDiv = document.createElement('div');
        stepDiv.className = `workout-step ${completedSteps[index] ? 'step-completed' : ''}`;
        stepDiv.innerHTML = `
            <input type="checkbox" class="workout-checkbox" data-index="${index}" data-type="main" ${completedSteps[index] ? 'checked' : ''}>
            <span class="step-text">${stepText}</span>
            ${step.distance > 0 ? `<span class="step-distance">+${step.distance} км</span>` : ''}
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
                    ${task.distance > 0 ? `<span class="step-distance">+${task.distance} км</span>` : ''}
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
            
            if (type === 'main') {
                completedSteps[index] = this.checked;
            } else {
                additionalCompleted[index] = this.checked;
            }
            
            saveState();
            updateProgress();
            
            const stepDiv = this.closest('.workout-step');
            if (this.checked) {
                stepDiv.classList.add('step-completed');
            } else {
                stepDiv.classList.remove('step-completed');
            }
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
    
    if (allCompleted && canCompleteDay()) {
        if (completeBtn) {
            completeBtn.disabled = false;
            completeBtn.textContent = '✅ Завершить день';
        }
    } else {
        if (completeBtn) {
            completeBtn.disabled = true;
            if (!canCompleteDay()) {
                completeBtn.textContent = '⏳ До 23:00';
            } else if (isDayExpired()) {
                completeBtn.textContent = '⏰ День истек';
            } else {
                completeBtn.textContent = '✅ Завершить день';
            }
        }
    }
}

function updateDeadlineInfo() {
    const deadlineInfo = document.getElementById('deadline-info');
    if (!deadlineInfo) return;
    
    const hour = getCurrentHour();
    
    if (hour >= 23) {
        deadlineInfo.textContent = '⏰ День истек';
        deadlineInfo.style.color = 'var(--danger)';
    } else {
        const timeLeft = (22 - hour) * 60 + (60 - new Date().getMinutes());
        const hours = Math.floor(timeLeft / 60);
        const minutes = timeLeft % 60;
        deadlineInfo.textContent = `⏳ Осталось: ${hours}ч ${minutes}м`;
        deadlineInfo.style.color = 'var(--text-secondary)';
    }
}

// Дневник
function renderDiary() {
    const entriesList = document.getElementById('entries-list');
    if (!entriesList) return;
    
    entriesList.innerHTML = '';
    
    if (diaryEntries.length === 0) {
        entriesList.innerHTML = '<div class="empty-entries">📝 Пока нет записей</div>';
        return;
    }
    
    [...diaryEntries].reverse().forEach(entry => {
        const entryDiv = document.createElement('div');
        entryDiv.className = 'entry-item';
        
        const date = new Date(entry.date);
        const formattedDate = date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
        
        entryDiv.innerHTML = `
            <div class="entry-header">
                <span class="entry-date">${formattedDate}</span>
                <button class="entry-delete" data-id="${entry.id}">✕</button>
            </div>
            <div class="entry-content">${entry.text}</div>
        `;
        entriesList.appendChild(entryDiv);
    });
    
    document.querySelectorAll('.entry-delete').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.dataset.id);
            diaryEntries = diaryEntries.filter(e => e.id !== id);
            localStorage.setItem(STORAGE_KEYS.DIARY_ENTRIES, JSON.stringify(diaryEntries));
            renderDiary();
        });
    });
}

// Дата
function updateDate() {
    const now = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const dateEl = document.getElementById('current-date');
    if (dateEl) {
        dateEl.textContent = now.toLocaleDateString('ru-RU', options);
    }
}

// Навигация
let currentSlide = 0;
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
    
    currentSlide = pageIndex;
    
    if (pageIndex === 1) {
        updateStats();
        updateRecommendation();
    }
    if (pageIndex === 2) {
        renderCustomCreator();
    }
    if (pageIndex === 3) renderDiary();
};

// Темы
window.setTheme = function(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
    
    const themeDark = document.getElementById('theme-dark');
    const themeLight = document.getElementById('theme-light');
    
    if (themeDark) themeDark.classList.toggle('active', theme === 'dark');
    if (themeLight) themeLight.classList.toggle('active', theme === 'light');
};

// Язык (упрощенно)
window.setLanguage = function(lang) {
    currentLanguage = lang;
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
    
    const langRu = document.getElementById('lang-ru');
    const langEn = document.getElementById('lang-en');
    
    if (langRu) langRu.classList.toggle('active', lang === 'ru');
    if (langEn) langEn.classList.toggle('active', lang === 'en');
    
    // Здесь можно добавить обновление текста
    alert('Смена языка на ' + (lang === 'ru' ? 'русский' : 'английский'));
};

// ========== ИНИЦИАЛИЗАЦИЯ ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('Страница загружена');
    
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) || 'dark';
    setTheme(savedTheme);
    
    const savedLang = localStorage.getItem(STORAGE_KEYS.LANGUAGE) || 'ru';
    currentLanguage = savedLang;
    
    const langRu = document.getElementById('lang-ru');
    const langEn = document.getElementById('lang-en');
    if (langRu) langRu.classList.toggle('active', savedLang === 'ru');
    if (langEn) langEn.classList.toggle('active', savedLang === 'en');
    
    updateDate();
    updateStats();
    renderDiary();
    updateUI();
    
    // Кнопка обновления рекомендации
    const refreshBtn = document.getElementById('refresh-recommendation');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function() {
            updateRecommendation();
        });
    }
    
    // Кнопка "Начать бег"
    const startBtn = document.getElementById('start-day-btn');
    if (startBtn) {
        startBtn.addEventListener('click', function() {
            if (dayCompletedTime && !canStartNewDay()) {
                const remaining = getTimeRemaining();
                if (remaining) {
                    tg.showAlert(`⏳ Подожди ${remaining.hours}ч ${remaining.minutes}м`);
                }
                return;
            }
            
            if (!canStartDay()) {
                tg.showAlert('⏰ Новый день можно начать только с 4 утра!');
                return;
            }
            
            dayStarted = true;
            dayStartTime = Date.now().toString();
            dayCompletedTime = null;
            
            const workout = BASE_WORKOUTS[currentDay] || BASE_WORKOUTS[((currentDay - 1) % 30) + 1];
            completedSteps = new Array(workout.steps.length).fill(false);
            additionalCompleted = new Array(additionalTasks.length).fill(false);
            
            saveState();
            updateUI();
        });
    }
    
    // Кнопка "Завершить день"
    const completeBtn = document.getElementById('complete-day-btn');
    if (completeBtn) {
        completeBtn.addEventListener('click', function() {
            if (!canCompleteDay()) {
                tg.showAlert('⏰ Завершить день можно только до 23:00!');
                return;
            }
            
            const workout = BASE_WORKOUTS[currentDay] || BASE_WORKOUTS[((currentDay - 1) % 30) + 1];
            
            let actualDistance = 0;
            let actualTime = 0;
            let actualCalories = 0;
            
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
                name: workout.name_ru + (additionalTasks.length > 0 ? ' + доп.' : '')
            });
            
            totalDistance += actualDistance;
            totalWorkouts++;
            totalTime += actualTime;
            totalCalories += actualCalories;
            
            additionalTasks = [];
            additionalCompleted = [];
            
            const finalDistance = document.getElementById('final-distance');
            if (finalDistance) finalDistance.textContent = actualDistance.toFixed(1);
            
            const marathonScreen = document.getElementById('marathon-screen');
            const congratsScreen = document.getElementById('congrats');
            
            if (marathonScreen) marathonScreen.style.display = 'none';
            if (congratsScreen) congratsScreen.style.display = 'block';
            
            dayStarted = false;
            dayCompletedTime = Date.now().toString();
            dayStartTime = null;
            currentDay++;
            completedSteps = [];
            
            saveState();
            updateStats();
        });
    }
    
    // Кнопка "Продолжить"
    const continueBtn = document.getElementById('continue-btn');
    if (continueBtn) {
        continueBtn.addEventListener('click', function() {
            const congratsScreen = document.getElementById('congrats');
            if (congratsScreen) congratsScreen.style.display = 'none';
            updateUI();
        });
    }
    
    // Создание заданий
    const addTaskBtn = document.getElementById('add-task-btn');
    if (addTaskBtn) {
        addTaskBtn.addEventListener('click', function() {
            const taskText = document.getElementById('new-task-text')?.value.trim();
            const taskDistance = parseFloat(document.getElementById('new-task-distance')?.value) || 0;
            
            if (!taskText) {
                tg.showAlert('Введите название задания');
                return;
            }
            
            currentCustomTasks.push({
                text: taskText,
                distance: taskDistance
            });
            
            const taskTextInput = document.getElementById('new-task-text');
            const taskDistanceInput = document.getElementById('new-task-distance');
            if (taskTextInput) taskTextInput.value = '';
            if (taskDistanceInput) taskDistanceInput.value = 0;
            
            renderCustomCreator();
        });
    }
    
    const goalInput = document.getElementById('goal-distance');
    if (goalInput) {
        goalInput.addEventListener('input', updateCreateButtonState);
    }
    
    const createPlanBtn = document.getElementById('create-plan-btn');
    if (createPlanBtn) {
        createPlanBtn.addEventListener('click', function() {
            createCustomWorkout();
        });
    }
    
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
    
    document.addEventListener('click', function(e) {
        const menu = document.getElementById('menu-dropdown');
        const btn = document.getElementById('menu-btn');
        if (btn && menu && !btn.contains(e.target) && !menu.contains(e.target)) {
            menu.style.display = 'none';
            btn.classList.remove('active');
        }
    });
    
    // Пункты меню
    const resetBtn = document.getElementById('reset-marathon');
    if (resetBtn) {
        resetBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('Сбросить весь марафон? Весь прогресс будет потерян.')) {
                currentDay = 1;
                dayStarted = false;
                dayStartTime = null;
                dayCompletedTime = null;
                completedSteps = [];
                additionalTasks = [];
                additionalCompleted = [];
                workoutHistory = [];
                totalDistance = 0;
                totalWorkouts = 0;
                totalTime = 0;
                totalCalories = 0;
                diaryEntries = [];
                localStorage.clear();
                updateUI();
                updateStats();
                renderDiary();
                renderCustomCreator();
                
                const menu = document.getElementById('menu-dropdown');
                const menuBtn = document.getElementById('menu-btn');
                if (menu) menu.style.display = 'none';
                if (menuBtn) menuBtn.classList.remove('active');
            }
        });
    }
    
    const statsMenu = document.getElementById('stats-menu');
    if (statsMenu) {
        statsMenu.addEventListener('click', function(e) {
            e.preventDefault();
            switchPage(1);
            const menu = document.getElementById('menu-dropdown');
            const menuBtn = document.getElementById('menu-btn');
            if (menu) menu.style.display = 'none';
            if (menuBtn) menuBtn.classList.remove('active');
        });
    }
    
    const supportBtn = document.getElementById('support');
    if (supportBtn) {
        supportBtn.addEventListener('click', function(e) {
            e.preventDefault();
            tg.showAlert('💬 Поддержка: @frontendchikk');
            const menu = document.getElementById('menu-dropdown');
            const menuBtn = document.getElementById('menu-btn');
            if (menu) menu.style.display = 'none';
            if (menuBtn) menuBtn.classList.remove('active');
        });
    }
    
    const telegramBtn = document.getElementById('telegram-support');
    if (telegramBtn) {
        telegramBtn.addEventListener('click', function(e) {
            e.preventDefault();
            tg.openTelegramLink('https://t.me/frontendchikk');
            const menu = document.getElementById('menu-dropdown');
            const menuBtn = document.getElementById('menu-btn');
            if (menu) menu.style.display = 'none';
            if (menuBtn) menuBtn.classList.remove('active');
        });
    }
    
    const faqBtn = document.getElementById('faq');
    if (faqBtn) {
        faqBtn.addEventListener('click', function(e) {
            e.preventDefault();
            tg.showAlert('❓ FAQ:\n\n• Начать день можно с 4 утра\n• Завершить день до 23:00\n• После завершения - 24ч таймер\n• Есть готовые тренировки на 30 дней\n• Можно создавать свои задания\n• Свои задания появляются в разделе "Добавленные"\n• Статистика сохраняется\n• AI дает персональные рекомендации');
            const menu = document.getElementById('menu-dropdown');
            const menuBtn = document.getElementById('menu-btn');
            if (menu) menu.style.display = 'none';
            if (menuBtn) menuBtn.classList.remove('active');
        });
    }
    
    // Дневник
    const addEntryBtn = document.getElementById('add-entry-btn');
    if (addEntryBtn) {
        addEntryBtn.addEventListener('click', function() {
            const form = document.getElementById('add-entry-form');
            const btn = document.getElementById('add-entry-btn');
            if (form) form.style.display = 'block';
            if (btn) btn.style.display = 'none';
        });
    }
    
    const saveEntryBtn = document.getElementById('save-entry-btn');
    if (saveEntryBtn) {
        saveEntryBtn.addEventListener('click', function() {
            const text = document.getElementById('entry-text')?.value.trim();
            if (text) {
                diaryEntries.push({
                    id: Date.now(),
                    text: text,
                    date: new Date().toISOString()
                });
                localStorage.setItem(STORAGE_KEYS.DIARY_ENTRIES, JSON.stringify(diaryEntries));
                renderDiary();
                
                const textarea = document.getElementById('entry-text');
                const form = document.getElementById('add-entry-form');
                const btn = document.getElementById('add-entry-btn');
                
                if (textarea) textarea.value = '';
                if (form) form.style.display = 'none';
                if (btn) btn.style.display = 'flex';
            }
        });
    }
    
    const cancelEntryBtn = document.getElementById('cancel-entry-btn');
    if (cancelEntryBtn) {
        cancelEntryBtn.addEventListener('click', function() {
            const textarea = document.getElementById('entry-text');
            const form = document.getElementById('add-entry-form');
            const btn = document.getElementById('add-entry-btn');
            
            if (textarea) textarea.value = '';
            if (form) form.style.display = 'none';
            if (btn) btn.style.display = 'flex';
        });
    }
    
    // Следим за скроллом
    const slidesContainer = document.getElementById('slidesContainer');
    if (slidesContainer) {
        slidesContainer.addEventListener('scroll', function(e) {
            const container = e.target;
            const pageIndex = Math.round(container.scrollLeft / container.clientWidth);
            const navButtons = document.querySelectorAll('.nav-btn');
            
            if (pageIndex >= 0 && pageIndex < navButtons.length) {
                navButtons.forEach((btn, index) => {
                    btn.classList.toggle('active', index === pageIndex);
                });
                
                currentSlide = pageIndex;
                
                if (pageIndex === 1) {
                    updateStats();
                    updateRecommendation();
                }
                if (pageIndex === 2) renderCustomCreator();
                if (pageIndex === 3) renderDiary();
            }
        });
    }
    
    // Интервал обновления
    setInterval(function() {
        if (dayStarted) {
            updateProgress();
            updateDeadlineInfo();
        } else {
            updateUI();
        }
        updateDate();
    }, 60000);
    
    // Первая рекомендация
    updateRecommendation();
    
    tg.ready();
});
