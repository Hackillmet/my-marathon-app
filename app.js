let tg = window.Telegram.WebApp;
tg.expand();

// Получаем ID пользователя из Telegram
const userId = tg.initDataUnsafe?.user?.id || 'local_user';
const userName = tg.initDataUnsafe?.user?.first_name || 'Пользователь';
const userUsername = tg.initDataUnsafe?.user?.username || 'user';

// ========== ДАТА СТАРТА МАРАФОНА ==========
const MARATHON_START_DATE = new Date(2025, 5, 1); // 1 июня 2025

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
    SAVED_WORKOUTS: 'saved_workouts',
    ACTIVE_WORKOUT: 'active_workout',
    STRENGTH_HISTORY: 'strength_history',
    STRENGTH_TOTAL_PULLUPS: 'strength_total_pullups',
    STRENGTH_TOTAL_PUSHUPS: 'strength_total_pushups',
    STRENGTH_TOTAL_DAYS: 'strength_total_days',
    STRENGTH_BEST_PULLUPS: 'strength_best_pullups',
    STRENGTH_BEST_PUSHUPS: 'strength_best_pushups',
    STRENGTH_TODAY: 'strength_today',
    PROGRESS_PHOTOS: 'progress_photos',
    START_WEIGHT: 'start_weight',
    CURRENT_WEIGHT: 'current_weight',
    
    // КЛЮЧИ ДЛЯ ПЕРСОНАЖЕЙ
    CURRENT_CHARACTER: 'current_character',
    WEEKLY_GOAL: 'weekly_goal',
    WEEKLY_PROGRESS: 'weekly_progress',
    WEEK_START_DATE: 'week_start_date',
    UNLOCKED_CHARACTERS: 'unlocked_characters'
};

// ========== ДАННЫЕ ПЕРСОНАЖЕЙ ==========
const CHARACTERS = {
    1: {
        id: 1,
        name: {
            ru: "🏃 Новичок",
            en: "🏃 Beginner"
        },
        description: {
            ru: "Твой первый шаг к здоровому образу жизни",
            en: "Your first step to a healthy lifestyle"
        },
        image: "👟",
        goal: 15, // км за неделю
        reward: {
            ru: "🔥 Разблокирован Бегун!",
            en: "🔥 Runner unlocked!"
        },
        nextCharacter: 2
    },
    2: {
        id: 2,
        name: {
            ru: "⚡ Бегун",
            en: "⚡ Runner"
        },
        description: {
            ru: "Ты уже чувствуешь силу в ногах",
            en: "You already feel the power in your legs"
        },
        image: "🏃",
        goal: 25, // км за неделю
        reward: {
            ru: "🌟 Разблокирован Спортсмен!",
            en: "🌟 Athlete unlocked!"
        },
        nextCharacter: 3
    },
    3: {
        id: 3,
        name: {
            ru: "🏆 Спортсмен",
            en: "🏆 Athlete"
        },
        description: {
            ru: "Тренировки вошли в привычку",
            en: "Workouts have become a habit"
        },
        image: "🎯",
        goal: 35, // км за неделю
        reward: {
            ru: "💫 Разблокирован Марафонец!",
            en: "💫 Marathoner unlocked!"
        },
        nextCharacter: 4
    },
    4: {
        id: 4,
        name: {
            ru: "🔥 Марафонец",
            en: "🔥 Marathoner"
        },
        description: {
            ru: "Длинные дистанции - твоя стихия",
            en: "Long distances are your element"
        },
        image: "🌟",
        goal: 50, // км за неделю
        reward: {
            ru: "👑 Разблокирован Легенда!",
            en: "👑 Legend unlocked!"
        },
        nextCharacter: 5
    },
    5: {
        id: 5,
        name: {
            ru: "👑 Легенда",
            en: "👑 Legend"
        },
        description: {
            ru: "Ты достиг высшего уровня!",
            en: "You've reached the highest level!"
        },
        image: "🏅",
        goal: 75, // км за неделю
        reward: {
            ru: "⭐ Максимальный уровень!",
            en: "⭐ Maximum level!"
        },
        nextCharacter: null
    }
};

// ========== ПЕРЕВОДЫ ==========
const translations = {
    ru: {
        // Общие
        ready: "Готов к тренировке?",
        startBtn: "🏃 Начать бег",
        completeBtn: "✅ Завершить день",
        progress: "Прогресс",
        
        // Время
        waitUntil4am: "⏰ Старт в 4:00",
        waitHours: (h, m) => `⏳ Новый день через ${h}ч ${m}м`,
        waitUntilNextDay: (h, m) => `⏳ Следующий день в 4:00 (осталось ${h}ч ${m}м)`,
        canStart: "✅ Можно начинать",
        dayExpired: "⏰ День истек",
        until23: "⏳ До 23:00",
        timeLeft: (h, m) => `⏳ Осталось: ${h}ч ${m}м`,
        dayExpiredMsg: "⏰ Время тренировки истекло! Новый день начнется в 4:00 утра.",
        newDayAvailable: "🌟 Новый день доступен!",
        startAt4am: "⏰ Старт в 4:00 утра",
        
        // Тренировка
        mainWorkout: "ОСНОВНАЯ ТРЕНИРОВКА",
        addedTasks: "➕ ДОБАВЛЕННЫЕ ЗАДАНИЯ",
        easy: "Легкая",
        medium: "Средняя",
        hard: "Сложная",
        my: "Моя",
        
        // Завершение
        congrats: "🎉 ТРЕНИРОВКА ЗАВЕРШЕНА!",
        youRan: "Ты пробежал(а):",
        home: "🏠 На главную",
        
        // Статистика
        stats: "📊 РАСШИРЕННАЯ СТАТИСТИКА",
        workouts: "Тренировок",
        totalKm: "Всего км",
        totalTime: "Всего времени",
        totalCalories: "Всего калорий",
        avg: "Средняя",
        best: "Лучшая",
        avgPace: "Средний темп",
        caloriesPerWorkout: "Ср. калорий",
        progress_: "ПРОГРЕСС ЗА МЕСЯЦ",
        days: "дней",
        history: "ИСТОРИЯ ТРЕНИРОВОК",
        noWorkouts: "Пока нет тренировок",
        
        // Детали тренировки
        distance: "км",
        minutes: "мин",
        kcal: "ккал",
        pace: "мин/км",
        
        // Сравнение
        vsLastMonth: "vs прошлый месяц",
        better: "лучше",
        worse: "хуже",
        same: "так же",
        
        // AI рекомендации
        aiRecommendations: "🤖 AI-РЕКОМЕНДАЦИИ",
        refreshRecommendation: "🔄 Обновить",
        
        // Дневник
        newEntry: "➕ Новая запись",
        save: "Сохранить",
        cancel: "Отмена",
        noEntries: "📝 Пока нет записей",
        entryPlaceholder: "Как прошла тренировка? Напиши свои мысли...",
        entryDeleted: "Запись удалена",
        entrySaved: "Запись сохранена",
        
        // Персонажи
        weeklyGoal: "🏆 Недельная цель",
        currentCharacter: "Текущий персонаж",
        nextLevel: "Следующий уровень",
        unlocked: "Разблокировано",
        level: "Уровень",
        characters: "ПЕРСОНАЖИ",
        newCharacterUnlocked: "🎉 Новый персонаж разблокирован!",
        goalCompleted: "🌟 Цель достигнута!",
        
        // Создание тренировки
        createTitle: "🎯 СОЗДАТЬ ТРЕНИРОВКУ",
        goal: "ЦЕЛЬ",
        goalPlaceholder: "км",
        addTask: "ДОБАВИТЬ ЗАДАНИЕ",
        taskPlaceholder: "Например: Разминка",
        addTaskBtn: "+ Добавить",
        saveWorkoutBtn: "💾 Сохранить тренировку",
        myWorkouts: "📋 МОИ ТРЕНИРОВКИ",
        noWorkouts: "У вас пока нет тренировок",
        startWorkout: "▶️ Начать",
        completeWorkout: "✅ Завершить тренировку",
        workoutCompleted: "🎉 Тренировка завершена!",
        deleteWorkout: "✕",
        noTasks: "➕ Добавьте задания",
        
        // Силовые тренировки
        strengthTitle: "💪 СИЛОВАЯ ТРЕНИРОВКА",
        pullups: "ПОДТЯГИВАНИЯ",
        pushups: "ОТЖИМАНИЯ",
        mixed: "КОМПЛЕКС",
        pullupsSub: "Pull-ups",
        pushupsSub: "Push-ups",
        mixedSub: "Mixed",
        goal_: "Цель на сегодня:",
        addSet: "Добавить подход",
        addRound: "Добавить круг",
        set: "Подход",
        reps: "Количество:",
        completed: "Выполнено",
        round: "Круг",
        summaryPullups: "Подтягивания",
        summaryPushups: "Отжимания",
        summaryCalories: "Калории",
        completeStrength: "✅ Завершить силовую тренировку",
        strengthCompleted: "🎉 Силовая тренировка завершена!",
        maxRounds: "Максимум 5 кругов",
        
        // Прогресс-фото
        progressTitle: "📸 ПРОГРЕСС-ФОТО",
        startWeight: "Стартовый вес",
        currentWeight: "Текущий вес",
        weightChange: "Изменение",
        totalPhotos: "Всего фото",
        addPhoto: "➕ ДОБАВИТЬ ФОТО",
        weight: "Вес (кг):",
        date: "Дата:",
        selectPhoto: "📷 Выбрать фото",
        save: "💾 Сохранить",
        photoHistory: "📚 ИСТОРИЯ ФОТО",
        noPhotos: "📸 Пока нет фото. Добавьте первое!",
        delete: "Удалить",
        weightChart: "📈 ДИНАМИКА ВЕСА",
        chartPlaceholder: "Добавьте фото с весом, чтобы увидеть график",
        
        // Меню
        marathon: "🏃 МАРАФОН",
        reset: "🔄 Сбросить",
        statsMenu: "📊 Статистика",
        settings: "⚙️ НАСТРОЙКИ",
        theme: "🎨 Тема",
        dark: "🌑 Темная",
        light: "☀️ Светлая",
        language: "🌍 Язык",
        help: "🆘 ПОМОЩЬ",
        support: "💬 Поддержка",
        contact: "Связаться:",
        faq: "❓ FAQ",
        contacts: "📞 КОНТАКТЫ",
        author: "👤 Автор:",
        version: "Версия:",
        
        // FAQ текст
        faqText: "❓ FAQ:\n\n• Начать день с 4:00 утра\n• Завершить до 23:00\n• Новый день в 4:00 утра\n• 30 готовых тренировок\n• Свои задания\n• Система персонажей\n• AI рекомендации\n• Силовые тренировки\n• Прогресс-фото",
        
        // Сообщения
        confirmReset: "Сбросить весь прогресс?",
        enterTask: "Введите задание",
        tasksAdded: (count) => `✅ Добавлено заданий: ${count}`,
        waitMessage: (h, m) => `⏳ Подожди ${h}ч ${m}м`,
        onlyFrom4am: "⏰ Тренировки доступны с 4:00 до 23:00",
        onlyUntil23: "⏰ Только до 23:00!",
        completeSteps: "⚠️ Выполни все шаги!"
    },
    en: {
        // Common
        ready: "Ready for workout?",
        startBtn: "🏃 Start Run",
        completeBtn: "✅ Complete Day",
        progress: "Progress",
        
        // Time
        waitUntil4am: "⏰ Start at 4:00 AM",
        waitHours: (h, m) => `⏳ Next day in ${h}h ${m}m`,
        waitUntilNextDay: (h, m) => `⏳ Next day at 4:00 AM (${h}h ${m}m left)`,
        canStart: "✅ You can start",
        dayExpired: "⏰ Day expired",
        until23: "⏳ Until 11:00 PM",
        timeLeft: (h, m) => `⏳ Time left: ${h}h ${m}m`,
        dayExpiredMsg: "⏰ Workout expired! Next day starts at 4:00 AM.",
        newDayAvailable: "🌟 New day available!",
        startAt4am: "⏰ Start at 4:00 AM",
        
        // Workout
        mainWorkout: "MAIN WORKOUT",
        addedTasks: "➕ ADDED TASKS",
        easy: "Easy",
        medium: "Medium",
        hard: "Hard",
        my: "My",
        
        // Completion
        congrats: "🎉 WORKOUT COMPLETED!",
        youRan: "You ran:",
        home: "🏠 Home",
        
        // Statistics
        stats: "📊 EXTENDED STATISTICS",
        workouts: "Workouts",
        totalKm: "Total km",
        totalTime: "Total time",
        totalCalories: "Total calories",
        avg: "Average",
        best: "Best",
        avgPace: "Avg pace",
        caloriesPerWorkout: "Avg cal",
        progress_: "MONTHLY PROGRESS",
        days: "days",
        history: "WORKOUT HISTORY",
        noWorkouts: "No workouts yet",
        
        // Workout details
        distance: "km",
        minutes: "min",
        kcal: "kcal",
        pace: "min/km",
        
        // Comparison
        vsLastMonth: "vs last month",
        better: "better",
        worse: "worse",
        same: "same",
        
        // AI recommendations
        aiRecommendations: "🤖 AI RECOMMENDATIONS",
        refreshRecommendation: "🔄 Refresh",
        
        // Diary
        newEntry: "➕ New entry",
        save: "Save",
        cancel: "Cancel",
        noEntries: "📝 No entries yet",
        entryPlaceholder: "How was your workout? Write your thoughts...",
        entryDeleted: "Entry deleted",
        entrySaved: "Entry saved",
        
        // Characters
        weeklyGoal: "🏆 Weekly Goal",
        currentCharacter: "Current Character",
        nextLevel: "Next Level",
        unlocked: "Unlocked",
        level: "Level",
        characters: "CHARACTERS",
        newCharacterUnlocked: "🎉 New character unlocked!",
        goalCompleted: "🌟 Goal completed!",
        
        // Create tasks
        createTitle: "🎯 CREATE WORKOUT",
        goal: "GOAL",
        goalPlaceholder: "km",
        addTask: "ADD TASK",
        taskPlaceholder: "Example: Warm-up",
        addTaskBtn: "+ Add",
        saveWorkoutBtn: "💾 Save Workout",
        myWorkouts: "📋 MY WORKOUTS",
        noWorkouts: "No workouts yet",
        startWorkout: "▶️ Start",
        completeWorkout: "✅ Complete Workout",
        workoutCompleted: "🎉 Workout completed!",
        deleteWorkout: "✕",
        noTasks: "➕ Add tasks",
        
        // Strength workouts
        strengthTitle: "💪 STRENGTH TRAINING",
        pullups: "PULL-UPS",
        pushups: "PUSH-UPS",
        mixed: "MIXED",
        pullupsSub: "Pull-ups",
        pushupsSub: "Push-ups",
        mixedSub: "Mixed",
        goal_: "Today's goal:",
        addSet: "Add set",
        addRound: "Add round",
        set: "Set",
        reps: "Reps:",
        completed: "Completed",
        round: "Round",
        summaryPullups: "Pull-ups",
        summaryPushups: "Push-ups",
        summaryCalories: "Calories",
        completeStrength: "✅ Complete strength workout",
        strengthCompleted: "🎉 Strength workout completed!",
        maxRounds: "Maximum 5 rounds",
        
        // Progress photos
        progressTitle: "📸 PROGRESS PHOTOS",
        startWeight: "Start weight",
        currentWeight: "Current weight",
        weightChange: "Change",
        totalPhotos: "Total photos",
        addPhoto: "➕ ADD PHOTO",
        weight: "Weight (kg):",
        date: "Date:",
        selectPhoto: "📷 Select photo",
        save: "💾 Save",
        photoHistory: "📚 PHOTO HISTORY",
        noPhotos: "📸 No photos yet. Add your first!",
        delete: "Delete",
        weightChart: "📈 WEIGHT CHART",
        chartPlaceholder: "Add photos with weight to see chart",
        
        // Menu
        marathon: "🏃 MARATHON",
        reset: "🔄 Reset",
        statsMenu: "📊 Statistics",
        settings: "⚙️ SETTINGS",
        theme: "🎨 Theme",
        dark: "🌑 Dark",
        light: "☀️ Light",
        language: "🌍 Language",
        help: "🆘 HELP",
        support: "💬 Support",
        contact: "Contact:",
        faq: "❓ FAQ",
        contacts: "📞 CONTACTS",
        author: "👤 Author:",
        version: "Version:",
        
        // FAQ text
        faqText: "❓ FAQ:\n\n• Start day at 4:00 AM\n• Complete before 11:00 PM\n• New day at 4:00 AM\n• 30 ready workouts\n• Custom tasks\n• Character system\n• AI recommendations\n• Strength workouts\n• Progress photos",
        
        // Messages
        confirmReset: "Reset all progress?",
        enterTask: "Enter task",
        tasksAdded: (count) => `✅ Added: ${count} tasks`,
        waitMessage: (h, m) => `⏳ Wait ${h}h ${m}m`,
        onlyFrom4am: "⏰ Workouts available from 4:00 AM to 11:00 PM",
        onlyUntil23: "⏰ Only until 11:00 PM!",
        completeSteps: "⚠️ Complete all steps!"
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

// ========== AI-РЕКОМЕНДАЦИИ ==========
const recommendations = {
    beginner: {
        ru: [
            { icon: "🌅", text: "Начни с легкой пробежки 15-20 минут. Главное - регулярность, а не скорость!" },
            { icon: "🎯", text: "Поставь цель на неделю: 3 тренировки по 2 км. Это отличный старт!" },
            { icon: "💪", text: "Не забывай про разминку! 5-10 минут перед бегом снизят риск травм." },
            { icon: "👟", text: "Следи за техникой: приземляйся на среднюю часть стопы, держи корпус прямо." },
            { icon: "📱", text: "Используй приложение для отслеживания прогресса - это очень мотивирует!" }
        ],
        en: [
            { icon: "🌅", text: "Start with an easy 15-20 minute run. Consistency is key, not speed!" },
            { icon: "🎯", text: "Set a weekly goal: 3 workouts of 2 km each. Great start!" },
            { icon: "💪", text: "Don't forget to warm up! 5-10 minutes before running reduces injury risk." },
            { icon: "👟", text: "Watch your technique: land on mid-foot, keep your body straight." },
            { icon: "📱", text: "Use the app to track progress - it's very motivating!" }
        ]
    },
    intermediate: {
        ru: [
            { icon: "⚡", text: "Попробуй интервальные тренировки: 1 мин быстро / 2 мин медленно x 6-8 раз." },
            { icon: "📈", text: "Увеличь дистанцию на 10% на этой неделе. Твой прогресс виден!" },
            { icon: "🦵", text: "Добавь специальные беговые упражнения после тренировки для укрепления мышц." },
            { icon: "🏃", text: "Работай над каденсом: 170-180 шагов в минуту - оптимальная частота." },
            { icon: "🎵", text: "Попробуй бегать под музыку с ритмом 170-180 BPM - это поможет держать темп." }
        ],
        en: [
            { icon: "⚡", text: "Try interval training: 1 min fast / 2 min slow x 6-8 times." },
            { icon: "📈", text: "Increase distance by 10% this week. Your progress is visible!" },
            { icon: "🦵", text: "Add special running exercises after workout to strengthen muscles." },
            { icon: "🏃", text: "Work on cadence: 170-180 steps per minute is optimal." },
            { icon: "🎵", text: "Try running to music with 170-180 BPM - it helps maintain pace." }
        ]
    },
    advanced: {
        ru: [
            { icon: "🏔️", text: "Отличная форма! Попробуй бег в горку или по пересеченной местности." },
            { icon: "🎯", text: "Поставь новый рекорд! Сегодня отличный день для длительной тренировки." },
            { icon: "📊", text: "Проанализируй свой темп. Возможно, стоит поработать над ускорениями." },
            { icon: "🏆", text: "Подумай о полумарафоне! С твоим уровнем это вполне реально." },
            { icon: "⚙️", text: "Экспериментируй с разными типами тренировок: темповые, длинные, интервальные." }
        ],
        en: [
            { icon: "🏔️", text: "Great shape! Try hill running or cross-country running." },
            { icon: "🎯", text: "Set a new record! Today is perfect for a long workout." },
            { icon: "📊", text: "Analyze your pace. Maybe work on accelerations." },
            { icon: "🏆", text: "Consider a half marathon! With your level, it's totally achievable." },
            { icon: "⚙️", text: "Experiment with different workout types: tempo, long, intervals." }
        ]
    },
    recovery: {
        ru: [
            { icon: "🧘", text: "Сегодня легкая тренировка. Сосредоточься на технике и дыхании." },
            { icon: "🔄", text: "День активного восстановления: растяжка и ходьба 30-40 минут." },
            { icon: "💧", text: "Не забывай пить воду! Гидратация важна даже в дни отдыха." },
            { icon: "😴", text: "Качественный сон - ключ к восстановлению. Постарайся спать 7-8 часов." },
            { icon: "🥗", text: "Обрати внимание на питание: белки для мышц, углеводы для энергии." }
        ],
        en: [
            { icon: "🧘", text: "Easy workout today. Focus on technique and breathing." },
            { icon: "🔄", text: "Active recovery day: stretching and walking 30-40 minutes." },
            { icon: "💧", text: "Don't forget to drink water! Hydration is important even on rest days." },
            { icon: "😴", text: "Quality sleep is key to recovery. Try to sleep 7-8 hours." },
            { icon: "🥗", text: "Pay attention to nutrition: proteins for muscles, carbs for energy." }
        ]
    },
    motivation: {
        ru: [
            { icon: "🔥", text: "Ты уже пробежал {total} км! Каждая тренировка делает тебя сильнее." },
            { icon: "⭐", text: "{streak} дней подряд! Ты настоящий чемпион!" },
            { icon: "🎉", text: "До следующей цели осталось всего {toNextLevel} тренировок! Продолжай в том же духе!" },
            { icon: "💫", text: "Твой лучший результат - {best} км! Новый рекорд уже близко!" },
            { icon: "🌈", text: "Каждый километр приближает тебя к цели. Ты молодец!" }
        ],
        en: [
            { icon: "🔥", text: "You've already run {total} km! Every workout makes you stronger." },
            { icon: "⭐", text: "{streak} days in a row! You're a true champion!" },
            { icon: "🎉", text: "Only {toNextLevel} workouts left to next level! Keep it up!" },
            { icon: "💫", text: "Your best result is {best} km! A new record is close!" },
            { icon: "🌈", text: "Every kilometer brings you closer to your goal. You're doing great!" }
        ]
    },
    tips: {
        ru: [
            { icon: "👟", text: "Проверь свою обувь: беговые кроссовки служат около 500-800 км." },
            { icon: "🌙", text: "Качественный сон - ключ к хорошим тренировкам. Спи 7-8 часов." },
            { icon: "🥗", text: "Легкий перекус за час до тренировки: банан или тост с арахисовой пастой." },
            { icon: "☀️", text: "Утром бегать полезно для режима, вечером - для снятия стресса." },
            { icon: "📝", text: "Веди дневник тренировок - это помогает видеть прогресс и анализировать." }
        ],
        en: [
            { icon: "👟", text: "Check your shoes: running shoes last about 500-800 km." },
            { icon: "🌙", text: "Quality sleep is key to good workouts. Sleep 7-8 hours." },
            { icon: "🥗", text: "Light snack an hour before workout: banana or toast with peanut butter." },
            { icon: "☀️", text: "Morning running is good for routine, evening running for stress relief." },
            { icon: "📝", text: "Keep a workout diary - it helps track progress and analyze." }
        ]
    },
    strength: {
        ru: [
            { icon: "💪", text: "Для роста мышц делай 3-4 подхода по 8-12 повторений." },
            { icon: "🏋️", text: "Не забывай про отдых между подходами: 60-90 секунд." },
            { icon: "📈", text: "Увеличивай количество повторений каждую неделю." },
            { icon: "🧘", text: "Растяжка после тренировки ускорит восстановление." },
            { icon: "🥩", text: "Белок после тренировки поможет мышцам восстановиться." }
        ],
        en: [
            { icon: "💪", text: "For muscle growth, do 3-4 sets of 8-12 reps." },
            { icon: "🏋️", text: "Don't forget rest between sets: 60-90 seconds." },
            { icon: "📈", text: "Increase reps every week." },
            { icon: "🧘", text: "Stretching after workout speeds up recovery." },
            { icon: "🥩", text: "Protein after workout helps muscle recovery." }
        ]
    }
};

// ========== ФУНКЦИЯ ДЛЯ РАСЧЁТА ДНЯ МАРАФОНА ПО КАЛЕНДАРЮ ==========
function getCurrentMarathonDay() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const start = new Date(MARATHON_START_DATE);
    start.setHours(0, 0, 0, 0);

    const diffTime = today - start;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 1;
    return diffDays + 1;
}

// ========== СОСТОЯНИЕ ==========
let currentDay = (function() {
    const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_DAY);
    if (saved) {
        return parseInt(saved);
    } else {
        return getCurrentMarathonDay();
    }
})();

let dayStarted = localStorage.getItem(STORAGE_KEYS.DAY_STARTED) === 'true' || false;
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

let strengthHistory = JSON.parse(localStorage.getItem(STORAGE_KEYS.STRENGTH_HISTORY)) || [];
let totalPullups = parseInt(localStorage.getItem(STORAGE_KEYS.STRENGTH_TOTAL_PULLUPS)) || 0;
let totalPushups = parseInt(localStorage.getItem(STORAGE_KEYS.STRENGTH_TOTAL_PUSHUPS)) || 0;
let strengthDays = parseInt(localStorage.getItem(STORAGE_KEYS.STRENGTH_TOTAL_DAYS)) || 0;
let bestPullups = parseInt(localStorage.getItem(STORAGE_KEYS.STRENGTH_BEST_PULLUPS)) || 0;
let bestPushups = parseInt(localStorage.getItem(STORAGE_KEYS.STRENGTH_BEST_PUSHUPS)) || 0;

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

// ========== СОСТОЯНИЕ ДЛЯ ПРОГРЕСС-ФОТО ==========
let progressPhotos = JSON.parse(localStorage.getItem(STORAGE_KEYS.PROGRESS_PHOTOS)) || [];
let startWeight = parseFloat(localStorage.getItem(STORAGE_KEYS.START_WEIGHT)) || 0;
let currentWeight = parseFloat(localStorage.getItem(STORAGE_KEYS.CURRENT_WEIGHT)) || 0;

let selectedPhotoFile = null;
let selectedPhotoBase64 = null;

let currentStrengthType = 'pullups';

const strengthQuotes = [
    { ru: '"Сила не приходит от побед. Силу рождает борьба."', en: '"Strength does not come from winning. Your struggles develop your strengths."' },
    { ru: '"Ты сильнее, чем думаешь."', en: '"You are stronger than you think."' },
    { ru: '"Каждое повторение делает тебя сильнее."', en: '"Every rep makes you stronger."' },
    { ru: '"Боль временна, гордость вечна."', en: '"Pain is temporary, pride is forever."' },
    { ru: '"Невозможное - это просто вызов."', en: '"Impossible is just a challenge."' },
    { ru: '"Сила - это не только мышцы, это характер."', en: '"Strength is not just muscles, it\'s character."' },
    { ru: '"Сегодня больно, завтра - чемпион."', en: '"Today hurts, tomorrow champion."' },
    { ru: '"Твои руки могут больше, чем ты думаешь."', en: '"Your arms can do more than you think."' },
    { ru: '"Подтянись к своей мечте!"', en: '"Pull up to your dream!"' },
    { ru: '"Отжимайся от проблем!"', en: '"Push up from problems!"' }
];

// ========== СОСТОЯНИЕ ДЛЯ ПЕРСОНАЖЕЙ ==========
let currentCharacter = parseInt(localStorage.getItem(STORAGE_KEYS.CURRENT_CHARACTER)) || 1;
let weeklyGoal = CHARACTERS[currentCharacter].goal;
let weeklyProgress = parseFloat(localStorage.getItem(STORAGE_KEYS.WEEKLY_PROGRESS)) || 0;
let weekStartDate = localStorage.getItem(STORAGE_KEYS.WEEK_START_DATE) || new Date().toISOString();
let unlockedCharacters = JSON.parse(localStorage.getItem(STORAGE_KEYS.UNLOCKED_CHARACTERS)) || [1]; // Первый персонаж разблокирован по умолчанию

let currentLanguage = localStorage.getItem(STORAGE_KEYS.LANGUAGE) || 'ru';
let currentTab = 'diary';

function t(key, ...args) {
    if (!translations[currentLanguage] || !translations[currentLanguage][key]) {
        console.warn(`Translation missing for key: ${key} in language: ${currentLanguage}`);
        return key;
    }
    let text = translations[currentLanguage][key];
    if (typeof text === 'function') {
        return text(...args);
    }
    return text;
}

// ========== ФУНКЦИИ ДЛЯ ПЕРСОНАЖЕЙ ==========

function checkAndResetWeek() {
    const now = new Date();
    const weekStart = new Date(weekStartDate);
    const diffDays = Math.floor((now - weekStart) / (1000 * 60 * 60 * 24));
    
    if (diffDays >= 7) {
        // Новая неделя
        weeklyProgress = 0;
        weekStartDate = now.toISOString();
        localStorage.setItem(STORAGE_KEYS.WEEK_START_DATE, weekStartDate);
        localStorage.setItem(STORAGE_KEYS.WEEKLY_PROGRESS, weeklyProgress);
    }
}

function updateCharacterProgress(distance) {
    checkAndResetWeek();
    
    weeklyProgress += distance;
    localStorage.setItem(STORAGE_KEYS.WEEKLY_PROGRESS, weeklyProgress);
    
    // Проверяем, достигнута ли цель
    if (weeklyProgress >= weeklyGoal) {
        const nextCharacterId = CHARACTERS[currentCharacter].nextCharacter;
        if (nextCharacterId && !unlockedCharacters.includes(nextCharacterId)) {
            // Разблокируем нового персонажа
            unlockedCharacters.push(nextCharacterId);
            localStorage.setItem(STORAGE_KEYS.UNLOCKED_CHARACTERS, JSON.stringify(unlockedCharacters));
            
            // Показываем уведомление
            tg.showPopup({
                title: '🎉',
                message: CHARACTERS[nextCharacterId].reward[currentLanguage],
                buttons: [{ type: 'close' }]
            });
        }
        
        // Сбрасываем прогресс для новой недели
        weeklyProgress = weeklyProgress - weeklyGoal;
        weeklyGoal = CHARACTERS[nextCharacterId || currentCharacter].goal;
        currentCharacter = nextCharacterId || currentCharacter;
        
        localStorage.setItem(STORAGE_KEYS.CURRENT_CHARACTER, currentCharacter);
        localStorage.setItem(STORAGE_KEYS.WEEKLY_GOAL, weeklyGoal);
        localStorage.setItem(STORAGE_KEYS.WEEKLY_PROGRESS, weeklyProgress);
    }
    
    renderCharacter();
}

function renderCharacter() {
    const characterAvatar = document.getElementById('character-avatar');
    const characterName = document.getElementById('character-name');
    const characterDescription = document.getElementById('character-description');
    const weeklyGoalText = document.getElementById('weekly-goal-text');
    const characterProgress = document.getElementById('character-progress');
    const characterLevel = document.getElementById('character-level');
    const nextCharacterName = document.getElementById('next-character-name');
    
    if (!characterAvatar) return;
    
    const currentChar = CHARACTERS[currentCharacter];
    const nextChar = CHARACTERS[currentChar.nextCharacter];
    
    characterAvatar.textContent = currentChar.image;
    characterName.textContent = currentChar.name[currentLanguage];
    characterDescription.textContent = currentChar.description[currentLanguage];
    
    const percent = Math.min(100, (weeklyProgress / weeklyGoal) * 100);
    characterProgress.style.width = percent + '%';
    weeklyGoalText.textContent = `${weeklyProgress.toFixed(1)}/${weeklyGoal} ${t('distance')}`;
    
    characterLevel.textContent = `${t('level')} ${unlockedCharacters.length}`;
    
    if (nextChar) {
        nextCharacterName.textContent = `${nextChar.image} ${nextChar.name[currentLanguage]} (${nextChar.goal} ${t('distance')})`;
    } else {
        nextCharacterName.textContent = currentLanguage === 'ru' ? 'Максимальный уровень' : 'Maximum level';
    }
    
    renderCharactersCollection();
}

function renderCharactersCollection() {
    const grid = document.getElementById('characters-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    for (let i = 1; i <= 5; i++) {
        const char = CHARACTERS[i];
        const isUnlocked = unlockedCharacters.includes(i);
        const isCurrent = i === currentCharacter;
        
        const item = document.createElement('div');
        item.className = `character-collection-item ${isUnlocked ? 'unlocked' : ''} ${isCurrent ? 'current' : ''}`;
        item.innerHTML = `
            <div class="collection-avatar">${char.image}</div>
            <div class="collection-name">${char.name[currentLanguage].split(' ')[1] || char.name[currentLanguage]}</div>
        `;
        
        grid.appendChild(item);
    }
}

// ========== ФУНКЦИИ ВРЕМЕНИ ==========
function getCurrentHour() {
    return new Date().getHours();
}

function getCurrentMinutes() {
    return new Date().getMinutes();
}

function getCurrentTime() {
    return new Date().getTime();
}

function getToday4am() {
    const today = new Date();
    today.setHours(4, 0, 0, 0);
    return today.getTime();
}

function getTomorrow4am() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(4, 0, 0, 0);
    return tomorrow.getTime();
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
    const minutes = getCurrentMinutes();

    if (hour > 4 && hour < 23) return true;
    if (hour === 4) return true;
    if (hour === 23 && minutes === 0) return true;

    return false;
}

function canCompleteDay() {
    const hour = getCurrentHour();
    const minutes = getCurrentMinutes();

    if (hour < 23) return true;
    if (hour === 23 && minutes === 0) return true;

    return false;
}

function isDayExpired() {
    const hour = getCurrentHour();
    return hour >= 23;
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

    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return { hours, minutes };
}

function checkNewDayAvailability() {
    if (!dayCompletedTime) return false;

    const now = getCurrentTime();
    const completedDay = new Date(parseInt(dayCompletedTime));
    
    const nextDay4am = new Date(completedDay);
    nextDay4am.setDate(nextDay4am.getDate() + 1);
    nextDay4am.setHours(4, 0, 0, 0);

    if (now >= nextDay4am.getTime()) {
        dayCompletedTime = null;
        saveState();

        tg.showPopup({
            title: '🌟',
            message: t('newDayAvailable'),
            buttons: [{ type: 'close' }]
        });

        return true;
    }
    return false;
}

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
    localStorage.setItem(STORAGE_KEYS.SAVED_WORKOUTS, JSON.stringify(savedWorkouts));
    localStorage.setItem(STORAGE_KEYS.ACTIVE_WORKOUT, JSON.stringify(activeWorkout));
    localStorage.setItem(STORAGE_KEYS.STRENGTH_HISTORY, JSON.stringify(strengthHistory));
    localStorage.setItem(STORAGE_KEYS.STRENGTH_TOTAL_PULLUPS, totalPullups);
    localStorage.setItem(STORAGE_KEYS.STRENGTH_TOTAL_PUSHUPS, totalPushups);
    localStorage.setItem(STORAGE_KEYS.STRENGTH_TOTAL_DAYS, strengthDays);
    localStorage.setItem(STORAGE_KEYS.STRENGTH_BEST_PULLUPS, bestPullups);
    localStorage.setItem(STORAGE_KEYS.STRENGTH_BEST_PUSHUPS, bestPushups);
    localStorage.setItem(STORAGE_KEYS.STRENGTH_TODAY, JSON.stringify(strengthToday));
    
    // Сохраняем прогресс-фото
    localStorage.setItem(STORAGE_KEYS.PROGRESS_PHOTOS, JSON.stringify(progressPhotos));
    localStorage.setItem(STORAGE_KEYS.START_WEIGHT, startWeight);
    localStorage.setItem(STORAGE_KEYS.CURRENT_WEIGHT, currentWeight);
    
    // Сохраняем персонажей
    localStorage.setItem(STORAGE_KEYS.CURRENT_CHARACTER, currentCharacter);
    localStorage.setItem(STORAGE_KEYS.WEEKLY_GOAL, weeklyGoal);
    localStorage.setItem(STORAGE_KEYS.WEEKLY_PROGRESS, weeklyProgress);
    localStorage.setItem(STORAGE_KEYS.WEEK_START_DATE, weekStartDate);
    localStorage.setItem(STORAGE_KEYS.UNLOCKED_CHARACTERS, JSON.stringify(unlockedCharacters));
}

// ========== ФУНКЦИИ ДЛЯ ДНЕВНИКА ==========
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
            localStorage.setItem(STORAGE_KEYS.DIARY_ENTRIES, JSON.stringify(diaryEntries));
            renderDiary();
            tg.showAlert(t('entryDeleted'));
        });
    });
}

function calculateStreak() {
    if (workoutHistory.length === 0) return 0;
    
    let streak = 1;
    const sorted = [...workoutHistory].sort((a, b) => new Date(b.date) - new Date(a.date));
    const today = new Date().toDateString();
    const lastWorkout = new Date(sorted[0].date).toDateString();
    
    if (lastWorkout !== today) return 0;
    
    for (let i = 1; i < sorted.length; i++) {
        const prevDate = new Date(sorted[i - 1].date);
        const currDate = new Date(sorted[i].date);
        const diffDays = Math.floor((prevDate - currDate) / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) streak++;
        else break;
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
    const lang = currentLanguage;
    
    // Советы по весу и фото
    if (progressPhotos.length > 0 && Math.random() < 0.2) {
        const change = (currentWeight - startWeight).toFixed(1);
        if (change < 0) {
            return {
                icon: "🎉",
                text: lang === 'ru' 
                    ? `Ты сбросил ${Math.abs(change)} кг! Отличный результат!`
                    : `You lost ${Math.abs(change)} kg! Great result!`
            };
        } else if (change > 0) {
            return {
                icon: "💪",
                text: lang === 'ru'
                    ? `Набор массы +${change} кг. Так держать!`
                    : `Mass gain +${change} kg. Keep it up!`
            };
        }
    }
    
    // Советы по персонажам
    if (Math.random() < 0.15) {
        const nextChar = CHARACTERS[currentCharacter].nextCharacter;
        if (nextChar) {
            const nextGoal = CHARACTERS[nextChar].goal;
            const remaining = (nextGoal - weeklyProgress).toFixed(1);
            return {
                icon: "🎯",
                text: lang === 'ru'
                    ? `До следующего персонажа осталось ${remaining} км!`
                    : `Remaining to next character: ${remaining} km!`
            };
        }
    }
    
    if (Math.random() < 0.3 && totalPullups + totalPushups > 0) {
        const strengthIndex = Math.floor(Math.random() * recommendations.strength[lang].length);
        return recommendations.strength[lang][strengthIndex];
    }
    
    if (Math.random() < 0.2 && totalWorkouts > 0) {
        const motiIndex = Math.floor(Math.random() * recommendations.motivation[lang].length);
        let motiText = recommendations.motivation[lang][motiIndex].text;
        motiText = motiText.replace('{total}', totalDistance.toFixed(1));
        motiText = motiText.replace('{streak}', streak);
        const bestDistance = workoutHistory.length > 0 ? Math.max(...workoutHistory.map(w => w.distance)).toFixed(1) : 0;
        motiText = motiText.replace('{best}', bestDistance);
        const nextLevel = level === 'beginner' ? 5 - totalWorkouts : level === 'intermediate' ? 20 - totalWorkouts : 0;
        motiText = motiText.replace('{toNextLevel}', nextLevel);
        return { icon: recommendations.motivation[lang][motiIndex].icon, text: motiText };
    }
    
    if (Math.random() < 0.2) {
        const tipIndex = Math.floor(Math.random() * recommendations.tips[lang].length);
        return recommendations.tips[lang][tipIndex];
    }
    
    if (needRecovery) {
        const recIndex = Math.floor(Math.random() * recommendations.recovery[lang].length);
        return recommendations.recovery[lang][recIndex];
    }
    
    const levelRecs = recommendations[level][lang];
    const recIndex = Math.floor(Math.random() * levelRecs.length);
    return levelRecs[recIndex];
}

function updateRecommendation() {
    const rec = getPersonalizedRecommendation();
    const container = document.getElementById('recommendation-content');
    if (!container) return;
    container.innerHTML = `<div class="recommendation-icon">${rec.icon}</div><div class="recommendation-text">${rec.text}</div>`;
}

// ========== ФУНКЦИИ ДЛЯ СОЗДАНИЯ ТРЕНИРОВОК ==========

function renderCustomCreator() {
    const container = document.getElementById('custom-tasks-list');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (currentCustomTasks.length === 0) {
        container.innerHTML = `<div class="empty-tasks">${t('noTasks')}</div>`;
        return;
    }
    
    currentCustomTasks.forEach((task, index) => {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'custom-task-item';
        taskDiv.innerHTML = `
            <span class="custom-task-text">${task.text}</span>
            <span class="custom-task-distance">${task.distance > 0 ? '+' + task.distance + ' ' + t('distance') : 'warm-up'}</span>
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
        tg.showAlert(t('enterTask'));
        return;
    }
    
    const goalInput = document.getElementById('goal-distance');
    const goal = parseFloat(goalInput.value);
    
    const newWorkout = {
        id: Date.now(),
        name: `🏋️ ${t('myWorkouts')} ${savedWorkouts.length + 1}`,
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
    localStorage.setItem(STORAGE_KEYS.SAVED_WORKOUTS, JSON.stringify(savedWorkouts));
    
    activeWorkout = {
        id: newWorkout.id,
        name: newWorkout.name,
        goal: newWorkout.goal,
        steps: newWorkout.steps.map(step => ({ ...step, completed: false }))
    };
    localStorage.setItem(STORAGE_KEYS.ACTIVE_WORKOUT, JSON.stringify(activeWorkout));
    
    tg.showAlert(t('workoutCompleted'));
    
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
        container.innerHTML = `<div class="empty-workouts">${t('noWorkouts')}</div>`;
        return;
    }
    
    const sortedWorkouts = [...savedWorkouts].reverse();
    
    sortedWorkouts.forEach(workout => {
        const isActive = activeWorkout && activeWorkout.id === workout.id;
        
        const workoutDiv = document.createElement('div');
        workoutDiv.className = `saved-workout-item ${isActive ? 'active' : ''}`;
        workoutDiv.setAttribute('data-id', workout.id);
        
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
                <span class="saved-workout-meta">${totalSteps} ${t('addTask')} • ${workout.goal} ${t('distance')}</span>
            </div>
            <div class="saved-workout-actions">
                ${!isActive ? `<button class="workout-start-btn" data-id="${workout.id}">▶️</button>` : ''}
                <button class="workout-delete-btn" data-id="${workout.id}">✕</button>
            </div>
        `;
        
        container.appendChild(workoutDiv);
    });
    
    document.querySelectorAll('.workout-start-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const id = parseInt(this.dataset.id);
            startWorkout(id);
        });
    });
    
    document.querySelectorAll('.workout-delete-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
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
    
    localStorage.setItem(STORAGE_KEYS.ACTIVE_WORKOUT, JSON.stringify(activeWorkout));
    renderSavedWorkouts();
    renderActiveWorkout();
}

function deleteWorkout(id) {
    savedWorkouts = savedWorkouts.filter(w => w.id !== id);
    localStorage.setItem(STORAGE_KEYS.SAVED_WORKOUTS, JSON.stringify(savedWorkouts));
    
    if (activeWorkout && activeWorkout.id === id) {
        activeWorkout = null;
        localStorage.removeItem(STORAGE_KEYS.ACTIVE_WORKOUT);
    }
    
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
    goalEl.textContent = activeWorkout.goal + ' ' + t('distance');
    
    stepsContainer.innerHTML = '';
    let completedCount = 0;
    
    activeWorkout.steps.forEach((step, index) => {
        if (step.completed) completedCount++;
        
        const stepDiv = document.createElement('div');
        stepDiv.className = `workout-step-compact ${step.completed ? 'step-completed' : ''}`;
        stepDiv.innerHTML = `
            <input type="checkbox" class="workout-checkbox" data-index="${index}" ${step.completed ? 'checked' : ''}>
            <span class="step-text">${step.text}</span>
            ${step.distance > 0 ? `<span class="step-distance">+${step.distance} ${t('distance')}</span>` : ''}
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
            localStorage.setItem(STORAGE_KEYS.ACTIVE_WORKOUT, JSON.stringify(activeWorkout));
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
    
    // Обновляем прогресс персонажа
    updateCharacterProgress(actualDistance);
    
    saveState();
    
    tg.showPopup({ title: '🎉', message: t('workoutCompleted'), buttons: [{ type: 'close' }] });
    
    activeWorkout = null;
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_WORKOUT);
    renderActiveWorkout();
    renderSavedWorkouts();
}

// ========== ФУНКЦИИ ДЛЯ СИЛОВЫХ ТРЕНИРОВОК ==========

function switchStrengthType(type) {
    console.log('Switching to type:', type);
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
                <span class="set-number">${t('set')} ${index + 1}</span>
                ${strengthToday.pullups.sets.length > 1 ? `<button class="set-remove" data-index="${index}">✕</button>` : ''}
            </div>
            <div class="set-inputs">
                <div class="set-reps">
                    <label>${t('reps')}</label>
                    <input type="number" class="set-reps-input" data-index="${index}" value="${set.reps}" min="1" max="50" ${set.completed ? 'disabled' : ''}>
                </div>
                <label class="set-complete">
                    <input type="checkbox" class="set-complete-check" data-index="${index}" ${set.completed ? 'checked' : ''}>
                    <span>${t('completed')}</span>
                </label>
            </div>
        `;
        
        container.appendChild(setCard);
    });
    
    document.querySelectorAll('#pullups-sets .set-remove').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault(); e.stopPropagation();
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
                <span class="set-number">${t('set')} ${index + 1}</span>
                ${strengthToday.pushups.sets.length > 1 ? `<button class="set-remove" data-index="${index}">✕</button>` : ''}
            </div>
            <div class="set-inputs">
                <div class="set-reps">
                    <label>${t('reps')}</label>
                    <input type="number" class="set-reps-input" data-index="${index}" value="${set.reps}" min="1" max="100" ${set.completed ? 'disabled' : ''}>
                </div>
                <label class="set-complete">
                    <input type="checkbox" class="set-complete-check" data-index="${index}" ${set.completed ? 'checked' : ''}>
                    <span>${t('completed')}</span>
                </label>
            </div>
        `;
        
        container.appendChild(setCard);
    });
    
    document.querySelectorAll('#pushups-sets .set-remove').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault(); e.stopPropagation();
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
                <span class="mixed-name">🔥 ${t('round')} ${index + 1}</span>
                <span class="mixed-check">✓</span>
            </div>
            <div class="mixed-items">
                <div class="mixed-item ${round.pullupsCompleted ? 'completed' : ''}">
                    <span class="item-name">${t('pullups')}</span>
                    <input type="number" class="item-input" data-round="${index}" data-exercise="pullups" value="${round.pullups}" min="1" max="30" ${round.completed ? 'disabled' : ''}>
                    <span class="item-unit">${t('reps')}</span>
                    <input type="checkbox" class="item-check" data-round="${index}" data-exercise="pullups" ${round.pullupsCompleted ? 'checked' : ''}>
                </div>
                <div class="mixed-item ${round.pushupsCompleted ? 'completed' : ''}">
                    <span class="item-name">${t('pushups')}</span>
                    <input type="number" class="item-input" data-round="${index}" data-exercise="pushups" value="${round.pushups}" min="1" max="50" ${round.completed ? 'disabled' : ''}>
                    <span class="item-unit">${t('reps')}</span>
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
        tg.showAlert(t('maxRounds'));
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

function updatePullupsGoal() {
    const slider = document.getElementById('pullups-goal-slider');
    const valueSpan = document.getElementById('pullups-goal-value');
    const goalSpan = document.getElementById('pullups-goal');
    
    if (slider && valueSpan && goalSpan) {
        slider.value = strengthToday.pullups.goal;
        valueSpan.textContent = strengthToday.pullups.goal;
        goalSpan.textContent = strengthToday.pullups.goal;
        
        slider.addEventListener('input', function() {
            const value = this.value;
            valueSpan.textContent = value;
            goalSpan.textContent = value;
            strengthToday.pullups.goal = parseInt(value);
            updatePullupsStats();
            saveState();
        });
    }
}

function updatePushupsGoal() {
    const slider = document.getElementById('pushups-goal-slider');
    const valueSpan = document.getElementById('pushups-goal-value');
    const goalSpan = document.getElementById('pushups-goal');
    
    if (slider && valueSpan && goalSpan) {
        slider.value = strengthToday.pushups.goal;
        valueSpan.textContent = strengthToday.pushups.goal;
        goalSpan.textContent = strengthToday.pushups.goal;
        
        slider.addEventListener('input', function() {
            const value = this.value;
            valueSpan.textContent = value;
            goalSpan.textContent = value;
            strengthToday.pushups.goal = parseInt(value);
            updatePushupsStats();
            saveState();
        });
    }
}

function updatePullupsStats() {
    const todaySpan = document.getElementById('pullups-today');
    const summaryPullups = document.getElementById('summary-pullups');
    
    const totalCompleted = strengthToday.pullups.sets.filter(set => set.completed).reduce((sum, set) => sum + set.reps, 0);
    const goal = strengthToday.pullups.goal;
    
    if (todaySpan) todaySpan.innerHTML = `${totalCompleted}/${goal}`;
    if (summaryPullups) summaryPullups.textContent = totalCompleted;
    
    strengthToday.pullups.completed = totalCompleted >= goal;
    updateStrengthProgress();
}

function updatePushupsStats() {
    const todaySpan = document.getElementById('pushups-today');
    const summaryPushups = document.getElementById('summary-pushups');
    
    const totalCompleted = strengthToday.pushups.sets.filter(set => set.completed).reduce((sum, set) => sum + set.reps, 0);
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
    if (mixedToday) mixedToday.textContent = `${completedRounds}/${strengthToday.mixed.rounds.length} ${t('round')}`;
    
    strengthToday.mixed.completed = completedRounds === strengthToday.mixed.rounds.length;
    updateStrengthProgress();
}

function updateStrengthProgress() {
    const progressBar = document.getElementById('strength-progress');
    const percentSpan = document.getElementById('strength-percent');
    const completeBtn = document.getElementById('complete-strength-btn');
    
    let totalCompleted = 0, totalGoal = 0;
    
    if (currentStrengthType === 'pullups') {
        totalCompleted = strengthToday.pullups.sets.filter(set => set.completed).reduce((sum, set) => sum + set.reps, 0);
        totalGoal = strengthToday.pullups.goal;
    } else if (currentStrengthType === 'pushups') {
        totalCompleted = strengthToday.pushups.sets.filter(set => set.completed).reduce((sum, set) => sum + set.reps, 0);
        totalGoal = strengthToday.pushups.goal;
    } else if (currentStrengthType === 'mixed') {
        strengthToday.mixed.rounds.forEach(round => {
            if (round.pullupsCompleted) totalCompleted += round.pullups;
            if (round.pushupsCompleted) totalCompleted += round.pushups;
        });
        strengthToday.mixed.rounds.forEach(round => totalGoal += round.pullups + round.pushups);
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
        totalPullupsToday = strengthToday.pullups.sets.filter(set => set.completed).reduce((sum, set) => sum + set.reps, 0);
    } else if (currentStrengthType === 'pushups') {
        totalPushupsToday = strengthToday.pushups.sets.filter(set => set.completed).reduce((sum, set) => sum + set.reps, 0);
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
    if (totalPushupsToday > bestPushups) bestPushups = totalPushupsToday;
    
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
    updateStrengthStats();
    
    const randomQuote = strengthQuotes[Math.floor(Math.random() * strengthQuotes.length)];
    const quoteEl = document.getElementById('strength-quote');
    if (quoteEl) quoteEl.textContent = randomQuote[currentLanguage];
    
    tg.showPopup({ title: '🎉', message: t('strengthCompleted'), buttons: [{ type: 'close' }] });
}

function updateStrengthStats() {
    const totalPullupsEl = document.getElementById('total-pullups');
    const totalPushupsEl = document.getElementById('total-pushups');
    const strengthDaysEl = document.getElementById('total-strength-days');
    const bestPullupsEl = document.getElementById('best-pullups');
    
    if (totalPullupsEl) totalPullupsEl.textContent = totalPullups;
    if (totalPushupsEl) totalPushupsEl.textContent = totalPushups;
    if (strengthDaysEl) strengthDaysEl.textContent = strengthDays;
    if (bestPullupsEl) bestPullupsEl.textContent = bestPullups;
}

// ========== ФУНКЦИИ ДЛЯ ПРОГРЕСС-ФОТО ==========

function initPhotoDate() {
    const dateInput = document.getElementById('photo-date');
    if (dateInput) {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        dateInput.value = `${yyyy}-${mm}-${dd}`;
    }
}

function selectPhoto() {
    tg.showPopup({
        title: '📸 ' + (currentLanguage === 'ru' ? 'Выберите фото' : 'Select photo'),
        message: currentLanguage === 'ru' ? 'Выберите фото из галереи' : 'Select photo from gallery',
        buttons: [
            { id: 'gallery', type: 'default', text: currentLanguage === 'ru' ? '📁 Галерея' : '📁 Gallery' },
            { type: 'cancel', text: currentLanguage === 'ru' ? 'Отмена' : 'Cancel' }
        ]
    }, (buttonId) => {
        if (buttonId === 'gallery') {
            simulatePhotoSelection();
        }
    });
}

function simulatePhotoSelection() {
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');
    
    const gradient = ctx.createLinearGradient(0, 0, 200, 200);
    gradient.addColorStop(0, '#0066ff');
    gradient.addColorStop(1, '#8a2be2');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 200, 200);
    
    ctx.font = 'bold 80px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('📸', 100, 100);
    
    ctx.font = '20px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText(currentLanguage === 'ru' ? 'Демо-фото' : 'Demo photo', 100, 170);
    
    selectedPhotoBase64 = canvas.toDataURL('image/png');
    selectedPhotoFile = { name: 'photo.png' };
    
    const preview = document.getElementById('photo-preview');
    const previewImg = document.getElementById('preview-img');
    if (preview && previewImg) {
        previewImg.src = selectedPhotoBase64;
        preview.style.display = 'block';
    }
    
    const saveBtn = document.getElementById('save-photo-btn');
    if (saveBtn) saveBtn.disabled = false;
    
    tg.showAlert(currentLanguage === 'ru' ? '📸 Демо-фото создано' : '📸 Demo photo created');
}

function saveProgressPhoto() {
    const weightInput = document.getElementById('photo-weight');
    const dateInput = document.getElementById('photo-date');
    
    const weight = parseFloat(weightInput.value);
    const date = dateInput.value;
    
    if (!selectedPhotoBase64) {
        tg.showAlert(currentLanguage === 'ru' ? 'Сначала выберите фото' : 'Select photo first');
        return;
    }
    
    if (isNaN(weight) || weight <= 0) {
        tg.showAlert(currentLanguage === 'ru' ? 'Введите корректный вес' : 'Enter valid weight');
        return;
    }
    
    if (!date) {
        tg.showAlert(currentLanguage === 'ru' ? 'Выберите дату' : 'Select date');
        return;
    }
    
    const newPhoto = {
        id: Date.now(),
        weight: weight,
        date: date,
        photo: selectedPhotoBase64,
        timestamp: new Date(date).getTime()
    };
    
    progressPhotos.push(newPhoto);
    
    progressPhotos.sort((a, b) => a.timestamp - b.timestamp);
    
    if (progressPhotos.length > 0) {
        startWeight = progressPhotos[0].weight;
        currentWeight = progressPhotos[progressPhotos.length - 1].weight;
    }
    
    saveProgressState();
    
    selectedPhotoBase64 = null;
    selectedPhotoFile = null;
    weightInput.value = currentWeight || 70;
    initPhotoDate();
    
    const preview = document.getElementById('photo-preview');
    const saveBtn = document.getElementById('save-photo-btn');
    if (preview) preview.style.display = 'none';
    if (saveBtn) saveBtn.disabled = true;
    
    renderProgressPhotos();
    updateWeightStats();
    renderWeightChart();
    
    tg.showAlert(currentLanguage === 'ru' ? '✅ Фото сохранено' : '✅ Photo saved');
}

function saveProgressState() {
    localStorage.setItem(STORAGE_KEYS.PROGRESS_PHOTOS, JSON.stringify(progressPhotos));
    localStorage.setItem(STORAGE_KEYS.START_WEIGHT, startWeight);
    localStorage.setItem(STORAGE_KEYS.CURRENT_WEIGHT, currentWeight);
}

function updateWeightStats() {
    const startWeightEl = document.getElementById('start-weight');
    const currentWeightEl = document.getElementById('current-weight');
    const weightChangeEl = document.getElementById('weight-change');
    const totalPhotosEl = document.getElementById('total-photos');
    
    if (startWeightEl) startWeightEl.textContent = startWeight.toFixed(1);
    if (currentWeightEl) currentWeightEl.textContent = currentWeight.toFixed(1);
    
    const change = (currentWeight - startWeight).toFixed(1);
    if (weightChangeEl) {
        weightChangeEl.textContent = (change > 0 ? '+' : '') + change;
        weightChangeEl.style.color = change < 0 ? 'var(--success)' : change > 0 ? 'var(--danger)' : 'var(--text-secondary)';
    }
    
    if (totalPhotosEl) totalPhotosEl.textContent = progressPhotos.length;
    
    const progressStartWeight = document.getElementById('progress-start-weight');
    const progressCurrentWeight = document.getElementById('progress-current-weight');
    const progressWeightChange = document.getElementById('progress-weight-change');
    const photoCount = document.getElementById('photo-count');
    
    if (progressStartWeight) progressStartWeight.textContent = startWeight.toFixed(1) + ' kg';
    if (progressCurrentWeight) progressCurrentWeight.textContent = currentWeight.toFixed(1) + ' kg';
    
    const changeText = (change > 0 ? '+' : '') + change + ' kg';
    if (progressWeightChange) {
        progressWeightChange.textContent = changeText;
        progressWeightChange.style.color = change < 0 ? 'var(--success)' : change > 0 ? 'var(--danger)' : 'var(--text-secondary)';
    }
    
    if (photoCount) photoCount.textContent = progressPhotos.length;
}

function renderProgressPhotos() {
    const container = document.getElementById('photo-list');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (progressPhotos.length === 0) {
        container.innerHTML = `<div class="empty-photos">${t('noPhotos')}</div>`;
        return;
    }
    
    const sortedPhotos = [...progressPhotos].reverse();
    
    sortedPhotos.forEach(photo => {
        const photoDate = new Date(photo.date);
        const formattedDate = photoDate.toLocaleDateString(currentLanguage === 'ru' ? 'ru-RU' : 'en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
        
        const photoItem = document.createElement('div');
        photoItem.className = 'photo-item';
        photoItem.innerHTML = `
            <div class="photo-item-header">
                <span class="photo-date">${formattedDate}</span>
                <span class="photo-weight">${photo.weight} kg</span>
            </div>
            <img src="${photo.photo}" class="photo-item-img" alt="Progress photo" data-id="${photo.id}">
            <div class="photo-item-actions">
                <button class="photo-delete-btn" data-id="${photo.id}">
                    <span>🗑️</span> ${t('delete')}
                </button>
            </div>
        `;
        container.appendChild(photoItem);
    });
    
    document.querySelectorAll('.photo-item-img').forEach(img => {
        img.addEventListener('click', function() {
            const src = this.src;
            showPhotoModal(src);
        });
    });
    
    document.querySelectorAll('.photo-delete-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const id = parseInt(this.dataset.id);
            deleteProgressPhoto(id);
        });
    });
}

function showPhotoModal(src) {
    const modal = document.createElement('div');
    modal.className = 'photo-modal';
    modal.innerHTML = `
        <img src="${src}" alt="Full size">
        <button class="photo-modal-close">✕</button>
    `;
    
    document.body.appendChild(modal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal || e.target.classList.contains('photo-modal-close')) {
            modal.remove();
        }
    });
}

function deleteProgressPhoto(id) {
    if (!confirm(currentLanguage === 'ru' ? 'Удалить это фото?' : 'Delete this photo?')) return;
    
    progressPhotos = progressPhotos.filter(p => p.id !== id);
    
    if (progressPhotos.length > 0) {
        progressPhotos.sort((a, b) => a.timestamp - b.timestamp);
        startWeight = progressPhotos[0].weight;
        currentWeight = progressPhotos[progressPhotos.length - 1].weight;
    } else {
        startWeight = 0;
        currentWeight = 0;
    }
    
    saveProgressState();
    renderProgressPhotos();
    updateWeightStats();
    renderWeightChart();
    
    tg.showAlert(currentLanguage === 'ru' ? '🗑️ Фото удалено' : '🗑️ Photo deleted');
}

function renderWeightChart() {
    const chartContainer = document.getElementById('weight-chart');
    const placeholder = document.getElementById('chart-placeholder');
    
    if (!chartContainer) return;
    
    if (progressPhotos.length < 2) {
        if (placeholder) placeholder.style.display = 'block';
        if (placeholder) placeholder.innerHTML = t('chartPlaceholder');
        chartContainer.innerHTML = '';
        return;
    }
    
    if (placeholder) placeholder.style.display = 'none';
    
    const sorted = [...progressPhotos].sort((a, b) => a.timestamp - b.timestamp);
    
    const weights = sorted.map(p => p.weight);
    const minWeight = Math.min(...weights) - 2;
    const maxWeight = Math.max(...weights) + 2;
    const range = maxWeight - minWeight;
    
    let chartHtml = '<div class="simple-chart">';
    
    const chartWidth = 100;
    const pointSpacing = chartWidth / (sorted.length - 1);
    
    sorted.forEach((photo, index) => {
        const y = ((photo.weight - minWeight) / range) * 100;
        const x = index * pointSpacing;
        
        chartHtml += `<div class="chart-point" style="left: ${x}%; bottom: ${y}%;" data-weight="${photo.weight}" data-date="${new Date(photo.date).toLocaleDateString(currentLanguage === 'ru' ? 'ru-RU' : 'en-US')}">●</div>`;
    });
    
    chartHtml += '<div class="chart-line"></div>';
    chartHtml += '</div>';
    
    chartContainer.innerHTML = chartHtml;
}

function resetProgressPhotos() {
    progressPhotos = [];
    startWeight = 0;
    currentWeight = 0;
    selectedPhotoBase64 = null;
    selectedPhotoFile = null;
    saveProgressState();
}

// ========== СТАТИСТИКА ==========
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
    if (totalDistanceEl) totalDistanceEl.textContent = totalDistance.toFixed(1) + ' ' + t('distance');
    if (totalTimeEl) {
        const hours = Math.floor(totalTime / 60);
        const minutes = totalTime % 60;
        totalTimeEl.textContent = hours > 0 ? `${hours}h ${minutes}m` : `${minutes} ${t('minutes')}`;
    }
    if (totalCaloriesEl) totalCaloriesEl.textContent = totalCalories + ' ' + t('kcal');
    
    const avgDistance = totalWorkouts > 0 ? (totalDistance / totalWorkouts).toFixed(1) : 0;
    if (avgDistanceEl) avgDistanceEl.textContent = avgDistance + ' ' + t('distance');
    
    const bestDistance = workoutHistory.length > 0 ? Math.max(...workoutHistory.map(w => w.distance)).toFixed(1) : 0;
    if (bestDistanceEl) bestDistanceEl.textContent = bestDistance + ' ' + t('distance');
    
    let avgPace = 0;
    if (totalDistance > 0) avgPace = (totalTime / totalDistance).toFixed(1);
    if (avgPaceEl) avgPaceEl.textContent = avgPace + ' ' + t('pace');
    
    const avgCalories = totalWorkouts > 0 ? Math.round(totalCalories / totalWorkouts) : 0;
    if (avgCaloriesEl) avgCaloriesEl.textContent = avgCalories + ' ' + t('kcal');
    
    if (weekCurrentEl) weekCurrentEl.textContent = currentDay - 1;
    const weekProgress = ((currentDay - 1) / 30) * 100;
    if (weekProgressEl) weekProgressEl.style.width = `${weekProgress}%`;
    
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
        if (lastMonthDistance === 0) comparisonText = `📊 ${t('vsLastMonth')}: —`;
        else {
            const diff = ((thisMonthDistance - lastMonthDistance) / lastMonthDistance * 100).toFixed(0);
            if (diff > 0) comparisonText = `📈 ${t('vsLastMonth')}: +${diff}% ${t('better')}`;
            else if (diff < 0) comparisonText = `📉 ${t('vsLastMonth')}: ${diff}% ${t('worse')}`;
            else comparisonText = `📊 ${t('vsLastMonth')}: ${t('same')}`;
        }
        comparisonEl.textContent = comparisonText;
    }
    
    const historyList = document.getElementById('history-list');
    if (historyList) {
        historyList.innerHTML = '';
        
        if (workoutHistory.length === 0) {
            historyList.innerHTML = `<div class="empty-history">${t('noWorkouts')}</div>`;
        } else {
            const recent = [...workoutHistory].reverse().slice(0, 10);
            
            recent.forEach(workout => {
                const date = new Date(workout.date);
                const formattedDate = date.toLocaleDateString(currentLanguage === 'ru' ? 'ru-RU' : 'en-US', { day: 'numeric', month: 'short' });
                const pace = (workout.time / workout.distance).toFixed(1);
                
                const item = document.createElement('div');
                item.className = 'history-item';
                item.innerHTML = `
                    <div style="display: flex; flex-direction: column; gap: 4px;">
                        <div style="display: flex; justify-content: space-between;">
                            <span class="history-date">${formattedDate}</span>
                            <span class="history-workout">${workout.name || `Day ${workout.day}`}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; font-size: 12px;">
                            <span>${workout.distance} ${t('distance')}</span>
                            <span>${workout.time} ${t('minutes')}</span>
                            <span>${workout.calories} ${t('kcal')}</span>
                            <span>${pace} ${t('pace')}</span>
                        </div>
                    </div>
                `;
                
                historyList.appendChild(item);
            });
        }
    }
    
    updateStrengthStats();
    updateWeightStats();
}

// ========== ОБНОВЛЕНИЕ ИНТЕРФЕЙСА БЕГА ==========
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

    checkNewDayAvailability();

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
    
    if (workoutName) workoutName.textContent = currentLanguage === 'ru' ? workout.name_ru : workout.name;
    
    if (workoutDifficulty) {
        let difficultyText = '';
        if (workout.difficulty === 'easy') difficultyText = t('easy');
        else if (workout.difficulty === 'medium') difficultyText = t('medium');
        else difficultyText = t('hard');
        
        workoutDifficulty.textContent = difficultyText;
        workoutDifficulty.className = `workout-difficulty difficulty-${workout.difficulty}`;
    }
    
    const stepsContainer = document.getElementById('workout-steps');
    if (!stepsContainer) return;
    
    stepsContainer.innerHTML = '';
    
    workout.steps.forEach((step, index) => {
        const stepText = currentLanguage === 'ru' ? step.text_ru : step.text;
        
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
            completeBtn.textContent = t('until23'); 
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
        if (hour === 23 && minutes === 0) {
            deadlineInfo.textContent = t('until23') + (currentLanguage === 'ru' ? ' (последняя минута!)' : ' (last minute!)');
            deadlineInfo.style.color = 'var(--warning)';
        } else {
            deadlineInfo.textContent = t('dayExpired');
            deadlineInfo.style.color = 'var(--danger)';
        }
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

function updateAllText() {
    // Стартовый экран
    const startMessage = document.getElementById('start-message');
    if (startMessage) startMessage.textContent = t('ready');
    
    const startBtn = document.getElementById('start-day-btn');
    if (startBtn && !dayStarted && !dayCompletedTime) {
        startBtn.textContent = t('startBtn');
    }
    
    const completeBtn = document.getElementById('complete-day-btn');
    if (completeBtn && !completeBtn.disabled) {
        completeBtn.textContent = t('completeBtn');
    }
    
    // Заголовки
    const balanceTitle = document.querySelector('.balance-title');
    if (balanceTitle) {
        const daySpan = balanceTitle.querySelector('span');
        if (daySpan) {
            balanceTitle.innerHTML = `🏃 ${t('mainWorkout')} `;
            balanceTitle.appendChild(daySpan);
        }
    }
    
    const additionalHeader = document.querySelector('.additional-header h3');
    if (additionalHeader) additionalHeader.textContent = t('addedTasks');
    
    // Экран завершения
    const congratsH2 = document.querySelector('#congrats h2');
    if (congratsH2) congratsH2.textContent = t('congrats');
    
    const congratsP = document.querySelector('#congrats p');
    if (congratsP) congratsP.textContent = t('youRan');
    
    const continueBtn = document.getElementById('continue-btn');
    if (continueBtn) continueBtn.textContent = t('home');
    
    // Статистика
    const statsTitle = document.querySelector('.stats-title');
    if (statsTitle) statsTitle.textContent = t('stats');
    
    const weeklyCardH3 = document.querySelector('.weekly-card h3');
    if (weeklyCardH3) weeklyCardH3.textContent = t('progress_');
    
    const recentCardH3 = document.querySelector('.recent-card h3');
    if (recentCardH3) recentCardH3.textContent = t('history');
    
    // AI рекомендации
    const recommendationsTitle = document.querySelector('.recommendations-card h3');
    if (recommendationsTitle) recommendationsTitle.textContent = t('aiRecommendations');
    
    const refreshBtn = document.getElementById('refresh-recommendation');
    if (refreshBtn) refreshBtn.textContent = t('refreshRecommendation');
    
    // Персонажи
    const weeklyGoalEl = document.querySelector('.progress-label span:first-child');
    if (weeklyGoalEl) weeklyGoalEl.textContent = t('weeklyGoal');
    
    const nextRewardLabel = document.querySelector('.next-reward span:first-child');
    if (nextRewardLabel) nextRewardLabel.textContent = `🔓 ${t('nextLevel')}:`;
    
    const collectionTitle = document.querySelector('.collection-title');
    if (collectionTitle) collectionTitle.textContent = `🌟 ${t('characters')}`;
    
    // Дневник
    const diaryTitle = document.querySelector('.diary-title');
    if (diaryTitle) diaryTitle.textContent = `📔 ${t('characters') ? 'ДНЕВНИК ТРЕНИРОВОК' : 'WORKOUT DIARY'}`;
    
    const addEntryBtn = document.getElementById('add-entry-btn');
    if (addEntryBtn) addEntryBtn.innerHTML = `<span class="plus-icon">+</span> ${t('newEntry')}`;
    
    const saveEntryBtn = document.getElementById('save-entry-btn');
    if (saveEntryBtn) saveEntryBtn.textContent = t('save');
    
    const cancelEntryBtn = document.getElementById('cancel-entry-btn');
    if (cancelEntryBtn) cancelEntryBtn.textContent = t('cancel');
    
    const entryText = document.getElementById('entry-text');
    if (entryText) entryText.placeholder = t('entryPlaceholder');
    
    // Создание тренировки
    const customTitle = document.querySelector('.custom-title');
    if (customTitle) customTitle.textContent = t('createTitle');
    
    const goalCardH3 = document.querySelector('.goal-card h3');
    if (goalCardH3) goalCardH3.textContent = t('goal');
    
    const goalInput = document.getElementById('goal-distance');
    if (goalInput) goalInput.placeholder = t('goalPlaceholder');
    
    const tasksCreatorH3 = document.querySelector('.tasks-creator h3');
    if (tasksCreatorH3) tasksCreatorH3.textContent = t('addTask');
    
    const taskTextInput = document.getElementById('new-task-text');
    if (taskTextInput) taskTextInput.placeholder = t('taskPlaceholder');
    
    const addTaskBtn = document.getElementById('add-task-btn');
    if (addTaskBtn) addTaskBtn.textContent = t('addTaskBtn');
    
    const saveWorkoutBtn = document.getElementById('create-plan-btn');
    if (saveWorkoutBtn) saveWorkoutBtn.textContent = t('saveWorkoutBtn');
    
    const savedWorkoutsTitle = document.querySelector('.saved-workouts-title');
    if (savedWorkoutsTitle) savedWorkoutsTitle.textContent = t('myWorkouts');
    
    const completeWorkoutBtn = document.getElementById('complete-workout-btn');
    if (completeWorkoutBtn) completeWorkoutBtn.textContent = t('completeWorkout');
    
    // Силовые тренировки
    const strengthTitle = document.querySelector('.strength-title');
    if (strengthTitle) strengthTitle.textContent = t('strengthTitle');
    
    const pullupsCard = document.getElementById('pullups-card');
    if (pullupsCard) {
        const title = pullupsCard.querySelector('.exercise-title h3');
        const subtitle = pullupsCard.querySelector('.exercise-subtitle');
        if (title) title.textContent = t('pullups');
        if (subtitle) subtitle.textContent = t('pullupsSub');
    }
    
    const pushupsCard = document.getElementById('pushups-card');
    if (pushupsCard) {
        const title = pushupsCard.querySelector('.exercise-title h3');
        const subtitle = pushupsCard.querySelector('.exercise-subtitle');
        if (title) title.textContent = t('pushups');
        if (subtitle) subtitle.textContent = t('pushupsSub');
    }
    
    const mixedCard = document.getElementById('mixed-card');
    if (mixedCard) {
        const title = mixedCard.querySelector('.exercise-title h3');
        const subtitle = mixedCard.querySelector('.exercise-subtitle');
        if (title) title.textContent = t('mixed');
        if (subtitle) subtitle.textContent = t('mixedSub');
    }
    
    const goalSliders = document.querySelectorAll('.goal-slider label');
    goalSliders.forEach(label => label.textContent = t('goal_'));
    
    const addSetBtns = document.querySelectorAll('.add-set-btn');
    addSetBtns.forEach(btn => btn.innerHTML = `<span class="btn-icon">➕</span><span class="btn-text">${t('addSet')}</span>`);
    
    const addMixedBtn = document.getElementById('add-mixed-set');
    if (addMixedBtn) addMixedBtn.innerHTML = `<span class="btn-icon">➕</span><span class="btn-text">${t('addRound')}</span>`;
    
    const completeStrengthBtn = document.getElementById('complete-strength-btn');
    if (completeStrengthBtn) completeStrengthBtn.textContent = t('completeStrength');
    
    const summaryLabels = document.querySelectorAll('.summary-label');
    if (summaryLabels[0]) summaryLabels[0].textContent = t('summaryPullups');
    if (summaryLabels[1]) summaryLabels[1].textContent = t('summaryPushups');
    if (summaryLabels[2]) summaryLabels[2].textContent = t('summaryCalories');
    
    // Прогресс-фото
    const progressTitle = document.querySelector('.progress-photo-title');
    if (progressTitle) progressTitle.textContent = t('progressTitle');
    
    const addPhotoCardH3 = document.querySelector('.add-photo-card h3');
    if (addPhotoCardH3) addPhotoCardH3.textContent = t('addPhoto');
    
    const weightLabel = document.querySelector('.weight-input-group label');
    if (weightLabel) weightLabel.textContent = t('weight');
    
    const dateLabel = document.querySelector('.date-input-group label');
    if (dateLabel) dateLabel.textContent = t('date');
    
    const selectPhotoBtn = document.getElementById('select-photo-btn');
    if (selectPhotoBtn) {
        selectPhotoBtn.innerHTML = `<span class="btn-icon">📷</span><span class="btn-text">${t('selectPhoto')}</span>`;
    }
    
    const savePhotoBtn = document.getElementById('save-photo-btn');
    if (savePhotoBtn) savePhotoBtn.textContent = t('save');
    
    const photoHistoryH3 = document.querySelector('.photo-history-header h3');
    if (photoHistoryH3) photoHistoryH3.textContent = t('photoHistory');
    
    const weightChartH3 = document.querySelector('.weight-chart-card h3');
    if (weightChartH3) weightChartH3.textContent = t('weightChart');
    
    const chartPlaceholder = document.getElementById('chart-placeholder');
    if (chartPlaceholder) chartPlaceholder.innerHTML = t('chartPlaceholder');
    
    // Меню
    const menuTitles = document.querySelectorAll('.menu-title');
    if (menuTitles[0]) menuTitles[0].textContent = t('marathon');
    if (menuTitles[1]) menuTitles[1].textContent = t('settings');
    if (menuTitles[2]) menuTitles[2].textContent = t('help');
    if (menuTitles[3]) menuTitles[3].textContent = t('contacts');
    
    const resetMenuItem = document.getElementById('reset-marathon');
    if (resetMenuItem) resetMenuItem.innerHTML = `🔄 ${t('reset')} ${t('marathon').toLowerCase()}`;
    
    const statsMenuItem = document.getElementById('stats-menu');
    if (statsMenuItem) statsMenuItem.innerHTML = `📊 ${t('statsMenu')}`;
    
    const supportMenuItem = document.getElementById('support');
    if (supportMenuItem) supportMenuItem.innerHTML = `💬 ${t('support')}`;
    
    const telegramMenuItem = document.getElementById('telegram-support');
    if (telegramMenuItem) telegramMenuItem.innerHTML = `📱 ${t('contact')} @frontendchikk`;
    
    const faqMenuItem = document.getElementById('faq');
    if (faqMenuItem) faqMenuItem.innerHTML = `❓ ${t('faq')}`;
    
    // Настройки в меню
    const themeLabel = document.querySelector('.theme-selector span');
    if (themeLabel) themeLabel.textContent = `${t('theme')}:`;
    
    const themeDark = document.getElementById('theme-dark-menu');
    const themeLight = document.getElementById('theme-light-menu');
    if (themeDark) themeDark.textContent = t('dark');
    if (themeLight) themeLight.textContent = t('light');
    
    const langLabel = document.querySelector('.language-selector span');
    if (langLabel) langLabel.textContent = `${t('language')}:`;
    
    const langRu = document.getElementById('lang-ru-menu');
    const langEn = document.getElementById('lang-en-menu');
    if (langRu) langRu.textContent = '🇷🇺 Русский';
    if (langEn) langEn.textContent = '🇬🇧 English';

    if (dayStarted) renderWorkout();
    updateRecommendation();
    renderCharacter();
    renderDiary();
    renderSavedWorkouts();
    renderActiveWorkout();
    renderPullupsSets();
    renderPushupsSets();
    renderMixedSets();
    updateStrengthProgress();
    renderProgressPhotos();
    updateWeightStats();
    renderWeightChart();
    
    const randomQuote = strengthQuotes[Math.floor(Math.random() * strengthQuotes.length)];
    const quoteEl = document.getElementById('strength-quote');
    if (quoteEl) quoteEl.textContent = randomQuote[currentLanguage];
}

let currentSlide = 0;

window.switchPage = function(pageIndex) {
    const slides = document.querySelectorAll('.slide');
    const navButtons = document.querySelectorAll('.nav-btn');
    const container = document.getElementById('slidesContainer');
    
    if (!container || slides.length === 0) return;
    
    container.scrollTo({ left: pageIndex * container.clientWidth, behavior: 'smooth' });
    
    navButtons.forEach((btn, index) => btn.classList.toggle('active', index === pageIndex));
    
    currentSlide = pageIndex;
    
    if (pageIndex === 1) { updateStats(); updateRecommendation(); }
    if (pageIndex === 2) { renderCharacter(); renderDiary(); }
    if (pageIndex === 3) { renderCustomCreator(); renderSavedWorkouts(); renderActiveWorkout(); }
    if (pageIndex === 4) { renderPullupsSets(); renderPushupsSets(); renderMixedSets(); updateStrengthProgress(); }
    if (pageIndex === 5) { renderProgressPhotos(); updateWeightStats(); renderWeightChart(); }
};

window.setTheme = function(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
    
    const themeDark = document.getElementById('theme-dark-menu');
    const themeLight = document.getElementById('theme-light-menu');
    
    if (themeDark) themeDark.classList.toggle('active', theme === 'dark');
    if (themeLight) themeLight.classList.toggle('active', theme === 'light');
};

window.setLanguage = function(lang) {
    currentLanguage = lang;
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
    
    // Обновляем активные кнопки в меню
    const langRu = document.getElementById('lang-ru-menu');
    const langEn = document.getElementById('lang-en-menu');
    if (langRu) langRu.classList.toggle('active', lang === 'ru');
    if (langEn) langEn.classList.toggle('active', lang === 'en');
    
    // Обновляем весь текст
    updateAllText();
    updateDate();
    updateStats();
    
    // Обновляем текущий слайд
    if (currentSlide === 0) {
        if (dayStarted) {
            renderWorkout();
        } else {
            updateUI();
        }
    } else if (currentSlide === 1) {
        updateStats();
        updateRecommendation();
    } else if (currentSlide === 2) {
        renderCharacter();
        renderDiary();
    } else if (currentSlide === 3) {
        renderCustomCreator();
        renderSavedWorkouts();
        renderActiveWorkout();
    } else if (currentSlide === 4) {
        renderPullupsSets();
        renderPushupsSets();
        renderMixedSets();
        updateStrengthProgress();
    } else if (currentSlide === 5) {
        renderProgressPhotos();
        updateWeightStats();
        renderWeightChart();
    }
};

document.addEventListener('DOMContentLoaded', function() {
    console.log('Страница загружена');
    
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) || 'dark';
    setTheme(savedTheme);
    
    const savedLang = localStorage.getItem(STORAGE_KEYS.LANGUAGE) || 'ru';
    currentLanguage = savedLang;
    
    const langRu = document.getElementById('lang-ru-menu');
    const langEn = document.getElementById('lang-en-menu');
    if (langRu) langRu.classList.toggle('active', savedLang === 'ru');
    if (langEn) langEn.classList.toggle('active', savedLang === 'en');
    
    updateDate();
    updateStats();
    updateAllText();
    updateUI();
    renderSavedWorkouts();
    renderActiveWorkout();

    renderPullupsSets();
    renderPushupsSets();
    renderMixedSets();
    updatePullupsGoal();
    updatePushupsGoal();
    updateStrengthProgress();
    
    // Инициализация прогресс-фото
    initPhotoDate();
    renderProgressPhotos();
    updateWeightStats();
    renderWeightChart();

    document.querySelectorAll('.type-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            switchStrengthType(this.dataset.type);
        });
    });

    const addPullupsBtn = document.getElementById('add-pullups-set');
    if (addPullupsBtn) addPullupsBtn.addEventListener('click', function(e) { e.preventDefault(); e.stopPropagation(); addSet('pullups'); });

    const addPushupsBtn = document.getElementById('add-pushups-set');
    if (addPushupsBtn) addPushupsBtn.addEventListener('click', function(e) { e.preventDefault(); e.stopPropagation(); addSet('pushups'); });

    const addMixedBtn = document.getElementById('add-mixed-set');
    if (addMixedBtn) addMixedBtn.addEventListener('click', function(e) { e.preventDefault(); e.stopPropagation(); addMixedSet(); });

    const completeStrengthBtn = document.getElementById('complete-strength-btn');
    if (completeStrengthBtn) completeStrengthBtn.addEventListener('click', function(e) { e.preventDefault(); if (!this.disabled) completeStrengthWorkout(); });

    const pullupsSlider = document.getElementById('pullups-goal-slider');
    if (pullupsSlider) pullupsSlider.addEventListener('input', function() {
        const value = this.value;
        document.getElementById('pullups-goal-value').textContent = value;
        document.getElementById('pullups-goal').textContent = value;
        strengthToday.pullups.goal = parseInt(value);
        updatePullupsStats();
        saveState();
    });

    const pushupsSlider = document.getElementById('pushups-goal-slider');
    if (pushupsSlider) pushupsSlider.addEventListener('input', function() {
        const value = this.value;
        document.getElementById('pushups-goal-value').textContent = value;
        document.getElementById('pushups-goal').textContent = value;
        strengthToday.pushups.goal = parseInt(value);
        updatePushupsStats();
        saveState();
    });

    const refreshBtn = document.getElementById('refresh-recommendation');
    if (refreshBtn) refreshBtn.addEventListener('click', updateRecommendation);

    const startBtn = document.getElementById('start-day-btn');
    if (startBtn) {
        startBtn.addEventListener('click', function() {
            if (dayCompletedTime && !canStartNewDay()) {
                const remaining = getTimeUntilNextDay4am();
                if (remaining) tg.showAlert(t('waitMessage', remaining.hours, remaining.minutes));
                return;
            }
            
            if (!canStartDay()) {
                tg.showAlert(t('onlyFrom4am'));
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
    }

    const completeBtn = document.getElementById('complete-day-btn');
    if (completeBtn) {
        completeBtn.addEventListener('click', function() {
            if (!canCompleteDay()) { 
                tg.showAlert(t('onlyUntil23')); 
                return; 
            }
            
            if (isDayExpired()) { 
                tg.showAlert(t('dayExpiredMsg')); 
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
                name: (currentLanguage === 'ru' ? workout.name_ru : workout.name) + (additionalTasks.length > 0 ? (currentLanguage === 'ru' ? ' + доп.' : ' + add') : '')
            });
            
            totalDistance += actualDistance;
            totalWorkouts++;
            totalTime += actualTime;
            totalCalories += actualCalories;
            
            // Обновляем прогресс персонажа
            updateCharacterProgress(actualDistance);
            
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
        });
    }

    const continueBtn = document.getElementById('continue-btn');
    if (continueBtn) continueBtn.addEventListener('click', function() {
        const congratsScreen = document.getElementById('congrats');
        if (congratsScreen) congratsScreen.style.display = 'none';
        updateUI();
    });

    const addTaskBtn = document.getElementById('add-task-btn');
    if (addTaskBtn) {
        addTaskBtn.addEventListener('click', function() {
            const taskText = document.getElementById('new-task-text')?.value.trim();
            const taskDistance = parseFloat(document.getElementById('new-task-distance')?.value) || 0;
            
            if (!taskText) { 
                tg.showAlert(t('enterTask')); 
                return; 
            }
            
            currentCustomTasks.push({ text: taskText, distance: taskDistance });
            
            const taskTextInput = document.getElementById('new-task-text');
            const taskDistanceInput = document.getElementById('new-task-distance');
            
            if (taskTextInput) taskTextInput.value = '';
            if (taskDistanceInput) taskDistanceInput.value = 0;
            
            renderCustomCreator();
        });
    }

    const goalInput = document.getElementById('goal-distance');
    if (goalInput) goalInput.addEventListener('input', updateCreateButtonState);

    const saveWorkoutBtn = document.getElementById('create-plan-btn');
    if (saveWorkoutBtn) saveWorkoutBtn.addEventListener('click', saveWorkout);

    const completeWorkoutBtn = document.getElementById('complete-workout-btn');
    if (completeWorkoutBtn) completeWorkoutBtn.addEventListener('click', completeWorkout);
    
    // Обработчики для прогресс-фото
    const selectPhotoBtn = document.getElementById('select-photo-btn');
    if (selectPhotoBtn) selectPhotoBtn.addEventListener('click', selectPhoto);
    
    const savePhotoBtn = document.getElementById('save-photo-btn');
    if (savePhotoBtn) savePhotoBtn.addEventListener('click', saveProgressPhoto);
    
    const removePhotoBtn = document.getElementById('remove-photo-btn');
    if (removePhotoBtn) {
        removePhotoBtn.addEventListener('click', function() {
            selectedPhotoBase64 = null;
            selectedPhotoFile = null;
            document.getElementById('photo-preview').style.display = 'none';
            document.getElementById('save-photo-btn').disabled = true;
        });
    }

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

    const resetBtn = document.getElementById('reset-marathon');
    if (resetBtn) {
        resetBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (confirm(t('confirmReset'))) {
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
                savedWorkouts = [];
                activeWorkout = null;
                totalPullups = 0;
                totalPushups = 0;
                strengthDays = 0;
                bestPullups = 0;
                bestPushups = 0;
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
                
                // Сброс персонажей
                currentCharacter = 1;
                weeklyGoal = CHARACTERS[1].goal;
                weeklyProgress = 0;
                weekStartDate = new Date().toISOString();
                unlockedCharacters = [1];
                
                resetProgressPhotos();
                localStorage.clear();
                
                updateUI();
                updateStats();
                renderCharacter();
                renderDiary();
                renderCustomCreator();
                renderSavedWorkouts();
                renderActiveWorkout();
                renderPullupsSets();
                renderPushupsSets();
                renderMixedSets();
                updateStrengthProgress();
                renderProgressPhotos();
                updateWeightStats();
                renderWeightChart();
                
                const menu = document.getElementById('menu-dropdown');
                const menuBtn = document.getElementById('menu-btn');
                if (menu) menu.style.display = 'none';
                if (menuBtn) menuBtn.classList.remove('active');
            }
        });
    }

    const statsMenu = document.getElementById('stats-menu');
    if (statsMenu) statsMenu.addEventListener('click', function(e) { e.preventDefault(); switchPage(1); const menu = document.getElementById('menu-dropdown'); const menuBtn = document.getElementById('menu-btn'); if (menu) menu.style.display = 'none'; if (menuBtn) menuBtn.classList.remove('active'); });

    const supportBtn = document.getElementById('support');
    if (supportBtn) supportBtn.addEventListener('click', function(e) { e.preventDefault(); tg.showAlert(`💬 ${t('support')}: @frontendchikk`); const menu = document.getElementById('menu-dropdown'); const menuBtn = document.getElementById('menu-btn'); if (menu) menu.style.display = 'none'; if (menuBtn) menuBtn.classList.remove('active'); });

    const telegramBtn = document.getElementById('telegram-support');
    if (telegramBtn) telegramBtn.addEventListener('click', function(e) { e.preventDefault(); tg.openTelegramLink('https://t.me/frontendchikk'); const menu = document.getElementById('menu-dropdown'); const menuBtn = document.getElementById('menu-btn'); if (menu) menu.style.display = 'none'; if (menuBtn) menuBtn.classList.remove('active'); });

    const faqBtn = document.getElementById('faq');
    if (faqBtn) faqBtn.addEventListener('click', function(e) { e.preventDefault(); tg.showAlert(t('faqText')); const menu = document.getElementById('menu-dropdown'); const menuBtn = document.getElementById('menu-btn'); if (menu) menu.style.display = 'none'; if (menuBtn) menuBtn.classList.remove('active'); });

    const addEntryBtn = document.getElementById('add-entry-btn');
    if (addEntryBtn) addEntryBtn.addEventListener('click', function() {
        const form = document.getElementById('add-entry-form');
        const btn = document.getElementById('add-entry-btn');
        if (form) form.style.display = 'block';
        if (btn) btn.style.display = 'none';
    });

    const saveEntryBtn = document.getElementById('save-entry-btn');
    if (saveEntryBtn) saveEntryBtn.addEventListener('click', function() {
        const text = document.getElementById('entry-text')?.value.trim();
        
        if (text) {
            diaryEntries.push({ id: Date.now(), text: text, date: new Date().toISOString() });
            localStorage.setItem(STORAGE_KEYS.DIARY_ENTRIES, JSON.stringify(diaryEntries));
            renderDiary();
            tg.showAlert(t('entrySaved'));
            
            const textarea = document.getElementById('entry-text');
            const form = document.getElementById('add-entry-form');
            const btn = document.getElementById('add-entry-btn');
            
            if (textarea) textarea.value = '';
            if (form) form.style.display = 'none';
            if (btn) btn.style.display = 'flex';
        }
    });

    const cancelEntryBtn = document.getElementById('cancel-entry-btn');
    if (cancelEntryBtn) cancelEntryBtn.addEventListener('click', function() {
        const textarea = document.getElementById('entry-text');
        const form = document.getElementById('add-entry-form');
        const btn = document.getElementById('add-entry-btn');
        
        if (textarea) textarea.value = '';
        if (form) form.style.display = 'none';
        if (btn) btn.style.display = 'flex';
    });

    setInterval(function() {
        if (dayStarted) { 
            updateProgress(); 
            updateDeadlineInfo(); 
        } else {
            updateUI();
        }
        updateDate();
    }, 60000);

    tg.ready();
});
