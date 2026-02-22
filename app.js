let tg = window.Telegram.WebApp;
tg.expand();

// Получаем ID пользователя из Telegram
const userId = tg.initDataUnsafe?.user?.id || 'local_user';
const userName = tg.initDataUnsafe?.user?.first_name || 'Пользователь';
const userUsername = tg.initDataUnsafe?.user?.username || 'user';

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
    USER_STATS: 'user_stats',
    TEAM_GOAL: 'team_goal',
    TEAM_PROGRESS: 'team_progress',
    SAVED_WORKOUTS: 'saved_workouts',
    ACTIVE_WORKOUT: 'active_workout'
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
        waitUntil4am: "⏰ Жди 4 утра",
        waitHours: (h, m) => `⏳ Следующий день через ${h}ч ${m}м`,
        canStart: "✅ Можно начинать",
        dayExpired: "⏰ День истек",
        until23: "⏳ До 23:00",
        timeLeft: (h, m) => `⏳ Осталось: ${h}ч ${m}м`,
        dayExpiredMsg: "⏰ Время тренировки истекло! Новый день начнется через 24 часа.",
        newDayAvailable: "🌟 Новый день доступен!",
        
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
        
        // Социальные функции
        friends: "👥 Друзья",
        diary: "📔 Дневник",
        myProfile: "Мой профиль",
        workouts_: "тренировок",
        km: "км",
        shareProfile: "📤",
        addFriend: "➕ Добавить друга",
        friendPlaceholder: "@username",
        sendRequest: "➕",
        requests: "📨 ЗАЯВКИ",
        myFriends: "👥 МОИ ДРУЗЬЯ",
        noFriends: "У вас пока нет друзей",
        online: "🟢",
        offline: "⚪",
        pending: "⏳",
        accept: "✓",
        decline: "✗",
        teamChallenge: "🏆 КОМАНДНЫЙ ЗАЧЕТ",
        teamGoal: "км",
        
        // Сообщения для друзей
        enterUsername: "Введите username друга",
        cantAddSelf: "Нельзя добавить самого себя",
        requestSent: "Заявка уже отправлена",
        alreadyFriend: "Этот пользователь уже у вас в друзьях",
        requestSentSuccess: (name) => `✅ Заявка отправлена ${name}`,
        requestAccepted: (name) => `✅ Вы приняли заявку от ${name}`,
        requestDeclined: (name) => `❌ Заявка от ${name} отклонена`,
        requestCancelled: (name) => `✕ Заявка ${name} отменена`,
        friendRemoved: (name) => `✕ Друг ${name} удален`,
        friendAdded: (name) => `✅ Пользователь ${name} добавлен!`,
        writeToTelegram: "💬 Написать",
        newRequest: "🔔 Новая заявка",
        
        // Создание заданий
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
        
        // Дневник
        newEntry: "Новая запись",
        save: "Сохранить",
        cancel: "Отмена",
        noEntries: "📝 Пока нет записей",
        entryPlaceholder: "Как прошла тренировка?",
        
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
        
        // Сообщения
        confirmReset: "Сбросить весь прогресс?",
        enterTask: "Введите задание",
        tasksAdded: (count) => `✅ Добавлено заданий: ${count}`,
        waitMessage: (h, m) => `⏳ Подожди ${h}ч ${m}м`,
        onlyFrom4am: "⏰ Только с 4 утра!",
        onlyUntil23: "⏰ Только до 23:00!",
        completeSteps: "⚠️ Выполни все шаги!",
        faqText: "❓ FAQ:\n\n• Начать день с 4 утра\n• Завершить до 23:00\n• 24ч таймер\n• 30 готовых тренировок\n• Свои задания\n• Друзья и команда\n• AI рекомендации"
    },
    en: {
        // Common
        ready: "Ready for workout?",
        startBtn: "🏃 Start Run",
        completeBtn: "✅ Complete Day",
        progress: "Progress",
        
        // Time
        waitUntil4am: "⏰ Wait 4 AM",
        waitHours: (h, m) => `⏳ Next day in ${h}h ${m}m`,
        canStart: "✅ You can start",
        dayExpired: "⏰ Day expired",
        until23: "⏳ Until 11 PM",
        timeLeft: (h, m) => `⏳ Time left: ${h}h ${m}m`,
        dayExpiredMsg: "⏰ Workout expired! Next day in 24h.",
        newDayAvailable: "🌟 New day available!",
        
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
        
        // Social features
        friends: "👥 Friends",
        diary: "📔 Diary",
        myProfile: "My Profile",
        workouts_: "workouts",
        km: "km",
        shareProfile: "📤",
        addFriend: "➕ Add friend",
        friendPlaceholder: "@username",
        sendRequest: "➕",
        requests: "📨 REQUESTS",
        myFriends: "👥 MY FRIENDS",
        noFriends: "No friends yet",
        online: "🟢",
        offline: "⚪",
        pending: "⏳",
        accept: "✓",
        decline: "✗",
        teamChallenge: "🏆 TEAM CHALLENGE",
        teamGoal: "km",
        
        // Messages for friends
        enterUsername: "Enter username",
        cantAddSelf: "Cannot add yourself",
        requestSent: "Request already sent",
        alreadyFriend: "Already your friend",
        requestSentSuccess: (name) => `✅ Request sent to ${name}`,
        requestAccepted: (name) => `✅ Accepted from ${name}`,
        requestDeclined: (name) => `❌ Declined from ${name}`,
        requestCancelled: (name) => `✕ Cancelled to ${name}`,
        friendRemoved: (name) => `✕ Friend ${name} removed`,
        friendAdded: (name) => `✅ User ${name} added!`,
        writeToTelegram: "💬 Write",
        newRequest: "🔔 New request",
        
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
        
        // Diary
        newEntry: "New entry",
        save: "Save",
        cancel: "Cancel",
        noEntries: "📝 No entries yet",
        entryPlaceholder: "How was your workout?",
        
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
        
        // Messages
        confirmReset: "Reset all progress?",
        enterTask: "Enter task",
        tasksAdded: (count) => `✅ Added: ${count} tasks`,
        waitMessage: (h, m) => `⏳ Wait ${h}h ${m}m`,
        onlyFrom4am: "⏰ Only from 4 AM!",
        onlyUntil23: "⏰ Only until 11 PM!",
        completeSteps: "⚠️ Complete all steps!",
        faqText: "❓ FAQ:\n\n• Start at 4 AM\n• Complete before 11 PM\n• 24h timer\n• 30 workouts\n• Custom tasks\n• Friends & team\n• AI recommendations"
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
    }
};

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

// Сохраненные тренировки
let savedWorkouts = JSON.parse(localStorage.getItem(STORAGE_KEYS.SAVED_WORKOUTS)) || [];

// Активная тренировка для выполнения
let activeWorkout = JSON.parse(localStorage.getItem(STORAGE_KEYS.ACTIVE_WORKOUT)) || null;

// Друзья и заявки
let friends = JSON.parse(localStorage.getItem(STORAGE_KEYS.FRIENDS)) || [];
let friendRequests = JSON.parse(localStorage.getItem(STORAGE_KEYS.FRIEND_REQUESTS)) || [];
let sentRequests = JSON.parse(localStorage.getItem(STORAGE_KEYS.SENT_REQUESTS)) || [];
let teamGoal = parseInt(localStorage.getItem(STORAGE_KEYS.TEAM_GOAL)) || 100;
let teamProgress = parseFloat(localStorage.getItem(STORAGE_KEYS.TEAM_PROGRESS)) || 0;

// Язык
let currentLanguage = localStorage.getItem(STORAGE_KEYS.LANGUAGE) || 'ru';

// Текущая вкладка
let currentTab = 'friends';

// ========== ФУНКЦИЯ ПЕРЕВОДА ==========
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

// ========== ФУНКЦИИ ВРЕМЕНИ ==========
function getCurrentHour() {
    return new Date().getHours();
}

function getCurrentTime() {
    return new Date().getTime();
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
    
    const now = getCurrentTime();
    const completed = parseInt(dayCompletedTime);
    const hoursPassed = (now - completed) / (1000 * 60 * 60);
    
    return hoursPassed >= 24;
}

function getTimeRemaining() {
    if (!dayCompletedTime) return null;
    
    const now = getCurrentTime();
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
    const now = getCurrentTime();
    const start = parseInt(dayStartTime);
    const hoursPassed = (now - start) / (1000 * 60 * 60);
    
    return hoursPassed >= 24;
}

function checkNewDayAvailability() {
    if (dayCompletedTime && canStartNewDay()) {
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

// ========== СОХРАНЕНИЕ ==========
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
    localStorage.setItem(STORAGE_KEYS.FRIENDS, JSON.stringify(friends));
    localStorage.setItem(STORAGE_KEYS.FRIEND_REQUESTS, JSON.stringify(friendRequests));
    localStorage.setItem(STORAGE_KEYS.SENT_REQUESTS, JSON.stringify(sentRequests));
    localStorage.setItem(STORAGE_KEYS.SAVED_WORKOUTS, JSON.stringify(savedWorkouts));
    localStorage.setItem(STORAGE_KEYS.ACTIVE_WORKOUT, JSON.stringify(activeWorkout));
    
    teamProgress = totalDistance + friends.reduce((sum, f) => sum + (f.distance || 0), 0);
    localStorage.setItem(STORAGE_KEYS.TEAM_PROGRESS, teamProgress);
}

// ========== ПЕРЕКЛЮЧЕНИЕ ТАБОВ ==========
function switchTab(tabName) {
    console.log('Переключение на вкладку:', tabName);
    currentTab = tabName;
    
    const friendsTab = document.getElementById('friends-tab');
    const diaryTab = document.getElementById('diary-tab');
    const friendsBtn = document.getElementById('tab-friends');
    const diaryBtn = document.getElementById('tab-diary');
    
    if (!friendsTab || !diaryTab || !friendsBtn || !diaryBtn) {
        console.error('Элементы табов не найдены');
        return;
    }
    
    if (tabName === 'friends') {
        friendsTab.classList.add('active');
        diaryTab.classList.remove('active');
        friendsBtn.classList.add('active');
        diaryBtn.classList.remove('active');
        renderFriendRequests();
        renderFriends();
        updateTeamProgress();
    } else {
        friendsTab.classList.remove('active');
        diaryTab.classList.add('active');
        friendsBtn.classList.remove('active');
        diaryBtn.classList.add('active');
        renderDiary();
    }
}

// ========== ФУНКЦИИ ДЛЯ СОЗДАНИЯ И ВЫПОЛНЕНИЯ ТРЕНИРОВОК ==========

// Рендеринг списка задач при создании
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

// Обновление состояния кнопки сохранения
function updateCreateButtonState() {
    const goalInput = document.getElementById('goal-distance');
    const goal = parseFloat(goalInput?.value) || 0;
    const createBtn = document.getElementById('create-plan-btn');
    
    createBtn.disabled = !(goal > 0 && currentCustomTasks.length > 0);
}

// Сохранение тренировки
function saveWorkout() {
    if (currentCustomTasks.length === 0) {
        tg.showAlert('Добавьте хотя бы одно задание');
        return;
    }
    
    const goalInput = document.getElementById('goal-distance');
    const goal = parseFloat(goalInput.value);
    
    // Создаем новую тренировку
    const newWorkout = {
        id: Date.now(),
        name: `🏋️ Тренировка ${savedWorkouts.length + 1}`,
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
    
    // Автоматически активируем созданную тренировку
    activeWorkout = {
        id: newWorkout.id,
        name: newWorkout.name,
        goal: newWorkout.goal,
        steps: newWorkout.steps.map(step => ({...step, completed: false}))
    };
    localStorage.setItem(STORAGE_KEYS.ACTIVE_WORKOUT, JSON.stringify(activeWorkout));
    
    tg.showAlert('Тренировка создана! Теперь можно выполнить её ниже');
    
    // Очищаем форму создания
    currentCustomTasks = [];
    goalInput.value = 5;
    document.getElementById('new-task-text').value = '';
    document.getElementById('new-task-distance').value = 0;
    
    // Обновляем отображение
    renderCustomCreator();
    renderSavedWorkouts();
    renderActiveWorkout();
}

// Рендеринг списка сохраненных тренировок
function renderSavedWorkouts() {
    const container = document.getElementById('saved-workouts-list');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (savedWorkouts.length === 0) {
        container.innerHTML = `<div class="empty-workouts">${t('noWorkouts')}</div>`;
        return;
    }
    
    // Сортируем по дате (сначала новые)
    const sortedWorkouts = [...savedWorkouts].reverse();
    
    sortedWorkouts.forEach((workout, index) => {
        const isActive = activeWorkout && activeWorkout.id === workout.id;
        
        const workoutDiv = document.createElement('div');
        workoutDiv.className = `saved-workout-item ${isActive ? 'active' : ''}`;
        workoutDiv.setAttribute('data-id', workout.id);
        
        // Считаем прогресс
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
    
    // Обработчики для кнопок
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

// Начать тренировку
function startWorkout(id) {
    const workout = savedWorkouts.find(w => w.id === id);
    if (!workout) return;
    
    activeWorkout = {
        id: workout.id,
        name: workout.name,
        goal: workout.goal,
        steps: workout.steps ? workout.steps.map(s => ({...s, completed: false})) : 
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

// Удалить тренировку
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

// Рендеринг активной тренировки
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
    
    // Обработчики для чекбоксов
    document.querySelectorAll('#active-workout-steps .workout-checkbox').forEach(cb => {
        cb.addEventListener('change', function() {
            const index = parseInt(this.dataset.index);
            activeWorkout.steps[index].completed = this.checked;
            localStorage.setItem(STORAGE_KEYS.ACTIVE_WORKOUT, JSON.stringify(activeWorkout));
            renderActiveWorkout();
            renderSavedWorkouts(); // Обновляем прогресс в списке
        });
    });
}

// Завершить тренировку
function completeWorkout() {
    if (!activeWorkout) return;
    
    // Считаем дистанцию
    let actualDistance = 0;
    activeWorkout.steps.forEach(step => {
        if (step.completed) {
            actualDistance += step.distance || 0;
        }
    });
    
    // Добавляем в историю
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
    
    saveState();
    
    tg.showPopup({
        title: '🎉',
        message: t('workoutCompleted'),
        buttons: [{ type: 'close' }]
    });
    
    // Очищаем активную тренировку
    activeWorkout = null;
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_WORKOUT);
    
    renderActiveWorkout();
    renderSavedWorkouts();
}

// ========== ФУНКЦИИ ДЛЯ ДРУЗЕЙ ==========
function updateUserProfile() {
    const userNameEl = document.getElementById('user-name');
    const userStatsEl = document.getElementById('user-stats');
    
    if (userNameEl) userNameEl.textContent = userName;
    if (userStatsEl) {
        userStatsEl.textContent = `${totalWorkouts} ${t('workouts_')} • ${totalDistance.toFixed(1)} ${t('km')}`;
    }
}

function renderFriendRequests() {
    const requestsCard = document.getElementById('friend-requests-card');
    const requestsList = document.getElementById('friend-requests-list');
    
    if (!requestsList) return;
    
    if (friendRequests.length === 0) {
        if (requestsCard) requestsCard.style.display = 'none';
        return;
    }
    
    if (requestsCard) requestsCard.style.display = 'block';
    requestsList.innerHTML = '';
    
    friendRequests.forEach((request, index) => {
        const requestItem = document.createElement('div');
        requestItem.className = 'friend-request-item';
        requestItem.innerHTML = `
            <div class="friend-request-avatar">${request.avatar || '👤'}</div>
            <div class="friend-request-info">
                <span class="friend-request-name">${request.fromUserName || request.name}</span>
                <span class="friend-request-username">${request.fromUserUsername || request.username}</span>
            </div>
            <div class="friend-request-actions">
                <button class="friend-request-accept" data-index="${index}">${t('accept')}</button>
                <button class="friend-request-decline" data-index="${index}">${t('decline')}</button>
            </div>
        `;
        requestsList.appendChild(requestItem);
    });
    
    document.querySelectorAll('.friend-request-accept').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            acceptFriendRequest(index);
        });
    });
    
    document.querySelectorAll('.friend-request-decline').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            declineFriendRequest(index);
        });
    });
}

function renderFriends() {
    const friendsList = document.getElementById('friends-list');
    if (!friendsList) return;
    
    friendsList.innerHTML = '';
    
    if (friends.length === 0) {
        friendsList.innerHTML = `<div class="empty-friends">${t('noFriends')}</div>`;
        return;
    }
    
    friends.forEach((friend, index) => {
        const isOnline = Math.random() > 0.5;
        
        const friendItem = document.createElement('div');
        friendItem.className = 'friend-item';
        
        friendItem.innerHTML = `
            <div class="friend-avatar">${friend.avatar || '👤'}</div>
            <div class="friend-info">
                <span class="friend-name">${friend.name}</span>
                <span class="friend-stats">${friend.workouts || 0} • ${(friend.distance || 0).toFixed(1)} км</span>
            </div>
            <span class="friend-status ${isOnline ? 'online' : 'offline'}">${isOnline ? t('online') : t('offline')}</span>
            <button class="friend-remove" data-index="${index}">✕</button>
        `;
        friendsList.appendChild(friendItem);
    });
    
    document.querySelectorAll('.friend-remove').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            removeFriend(index);
        });
    });
}

function sendFriendRequest() {
    const input = document.getElementById('friend-username');
    const username = input?.value.trim();
    
    if (!username) {
        tg.showAlert(t('enterUsername'));
        return;
    }
    
    const cleanUsername = username.replace('@', '');
    
    if (cleanUsername === userUsername) {
        tg.showAlert(t('cantAddSelf'));
        return;
    }
    
    const alreadySent = sentRequests.some(r => r.username === cleanUsername);
    if (alreadySent) {
        tg.showAlert(t('requestSent'));
        return;
    }
    
    const alreadyFriend = friends.some(f => f.username === cleanUsername);
    if (alreadyFriend) {
        tg.showAlert(t('alreadyFriend'));
        return;
    }
    
    const incomingRequestIndex = friendRequests.findIndex(r => r.fromUserUsername === cleanUsername);
    if (incomingRequestIndex !== -1) {
        acceptFriendRequest(incomingRequestIndex);
        input.value = '';
        return;
    }
    
    const newRequest = {
        id: Date.now(),
        name: cleanUsername,
        username: cleanUsername,
        avatar: '👤',
        fromUserId: userId,
        fromUserName: userName,
        fromUserUsername: userUsername,
        fromUserWorkouts: totalWorkouts,
        fromUserDistance: totalDistance,
        fromUserTime: totalTime,
        fromUserCalories: totalCalories,
        date: new Date().toISOString()
    };
    
    sentRequests.push(newRequest);
    localStorage.setItem(STORAGE_KEYS.SENT_REQUESTS, JSON.stringify(sentRequests));
    
    const friendRequestKey = `friend_request_${cleanUsername}`;
    const existingRequests = JSON.parse(localStorage.getItem(friendRequestKey)) || [];
    existingRequests.push(newRequest);
    localStorage.setItem(friendRequestKey, JSON.stringify(existingRequests));
    
    friendRequests.push(newRequest);
    localStorage.setItem(STORAGE_KEYS.FRIEND_REQUESTS, JSON.stringify(friendRequests));
    
    input.value = '';
    
    renderFriendRequests();
    
    tg.showAlert(t('requestSentSuccess', cleanUsername));
}

function acceptFriendRequest(index) {
    const request = friendRequests[index];
    
    const newFriend = {
        id: request.id,
        name: request.fromUserName || request.name,
        username: request.fromUserUsername || request.username,
        avatar: request.avatar || '👤',
        workouts: request.fromUserWorkouts || 0,
        distance: request.fromUserDistance || 0,
        time: request.fromUserTime || 0,
        calories: request.fromUserCalories || 0,
        addedDate: new Date().toISOString()
    };
    
    friends.push(newFriend);
    friendRequests.splice(index, 1);
    
    localStorage.setItem(STORAGE_KEYS.FRIENDS, JSON.stringify(friends));
    localStorage.setItem(STORAGE_KEYS.FRIEND_REQUESTS, JSON.stringify(friendRequests));
    
    renderFriendRequests();
    renderFriends();
    updateTeamProgress();
    
    tg.showAlert(t('requestAccepted', newFriend.name));
}

function declineFriendRequest(index) {
    const request = friendRequests[index];
    friendRequests.splice(index, 1);
    localStorage.setItem(STORAGE_KEYS.FRIEND_REQUESTS, JSON.stringify(friendRequests));
    renderFriendRequests();
    tg.showAlert(t('requestDeclined', request.fromUserName || request.name));
}

function removeFriend(index) {
    const friend = friends[index];
    friends.splice(index, 1);
    localStorage.setItem(STORAGE_KEYS.FRIENDS, JSON.stringify(friends));
    renderFriends();
    updateTeamProgress();
    tg.showAlert(t('friendRemoved', friend.name));
}

function updateTeamProgress() {
    const teamCurrent = document.getElementById('team-current');
    const teamProgressFill = document.getElementById('team-progress');
    
    teamProgress = totalDistance + friends.reduce((sum, f) => sum + (f.distance || 0), 0);
    
    if (teamCurrent) teamCurrent.textContent = teamProgress.toFixed(1);
    if (teamProgressFill) teamProgressFill.style.width = `${(teamProgress / teamGoal) * 100}%`;
    
    localStorage.setItem(STORAGE_KEYS.TEAM_PROGRESS, teamProgress);
}

function checkIncomingRequests() {
    const requestKey = `friend_request_${userUsername}`;
    const requests = JSON.parse(localStorage.getItem(requestKey)) || [];
    
    if (requests.length > 0) {
        requests.forEach(request => {
            const exists = friendRequests.some(r => r.id === request.id);
            if (!exists) {
                friendRequests.push(request);
                tg.showPopup({
                    title: t('newRequest'),
                    message: `${request.fromUserName} хочет добавить вас в друзья`,
                    buttons: [
                        { id: 'view', type: 'default', text: '👥 Перейти' },
                        { type: 'close', text: 'Закрыть' }
                    ]
                }, (buttonId) => {
                    if (buttonId === 'view') {
                        switchPage(2);
                        switchTab('friends');
                    }
                });
            }
        });
        
        localStorage.setItem(STORAGE_KEYS.FRIEND_REQUESTS, JSON.stringify(friendRequests));
        localStorage.removeItem(requestKey);
    }
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
    
    [...diaryEntries].reverse().forEach(entry => {
        const entryDiv = document.createElement('div');
        entryDiv.className = 'entry-item';
        
        const date = new Date(entry.date);
        const formattedDate = date.toLocaleDateString(currentLanguage === 'ru' ? 'ru-RU' : 'en-US', {
            day: 'numeric',
            month: 'long'
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
    const lang = currentLanguage;
    
    if (Math.random() < 0.2 && totalWorkouts > 0) {
        const motiIndex = Math.floor(Math.random() * recommendations.motivation[lang].length);
        let motiText = recommendations.motivation[lang][motiIndex].text;
        
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
            icon: recommendations.motivation[lang][motiIndex].icon,
            text: motiText
        };
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
    
    container.innerHTML = `
        <div class="recommendation-icon">${rec.icon}</div>
        <div class="recommendation-text">${rec.text}</div>
    `;
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
        totalTimeEl.textContent = hours > 0 ? `${hours}ч ${minutes}м` : `${minutes} ${t('minutes')}`;
    }
    if (totalCaloriesEl) totalCaloriesEl.textContent = totalCalories + ' ' + t('kcal');
    
    const avgDistance = totalWorkouts > 0 ? (totalDistance / totalWorkouts).toFixed(1) : 0;
    if (avgDistanceEl) avgDistanceEl.textContent = avgDistance + ' ' + t('distance');
    
    const bestDistance = workoutHistory.length > 0 
        ? Math.max(...workoutHistory.map(w => w.distance)).toFixed(1)
        : 0;
    if (bestDistanceEl) bestDistanceEl.textContent = bestDistance + ' ' + t('distance');
    
    let avgPace = 0;
    if (totalDistance > 0) {
        avgPace = (totalTime / totalDistance).toFixed(1);
    }
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
        if (lastMonthDistance === 0) {
            comparisonText = `📊 ${t('vsLastMonth')}: —`;
        } else {
            const diff = ((thisMonthDistance - lastMonthDistance) / lastMonthDistance * 100).toFixed(0);
            if (diff > 0) {
                comparisonText = `📈 ${t('vsLastMonth')}: +${diff}% ${t('better')}`;
            } else if (diff < 0) {
                comparisonText = `📉 ${t('vsLastMonth')}: ${diff}% ${t('worse')}`;
            } else {
                comparisonText = `📊 ${t('vsLastMonth')}: ${t('same')}`;
            }
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
                const formattedDate = date.toLocaleDateString(currentLanguage === 'ru' ? 'ru-RU' : 'en-US', {
                    day: 'numeric',
                    month: 'short'
                });
                
                const pace = (workout.time / workout.distance).toFixed(1);
                
                const item = document.createElement('div');
                item.className = 'history-item';
                item.innerHTML = `
                    <div style="display: flex; flex-direction: column; gap: 4px;">
                        <div style="display: flex; justify-content: space-between;">
                            <span class="history-date">${formattedDate}</span>
                            <span class="history-workout">${workout.name || `День ${workout.day}`}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; font-size: 12px;">
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
        
        if (hoursPassed >= 24) {
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
        
        if (dayCompletedTime && !canStart) {
            const remaining = getTimeRemaining();
            if (timeInfo && remaining) {
                timeInfo.textContent = t('waitHours', remaining.hours, remaining.minutes);
                timeInfo.style.color = 'var(--warning)';
            }
            if (startBtn) {
                startBtn.disabled = true;
                startBtn.textContent = t('waitHours', remaining.hours, remaining.minutes);
            }
        } else if (!canStartByTime) {
            if (timeInfo) {
                timeInfo.textContent = t('waitUntil4am');
                timeInfo.style.color = 'var(--warning)';
            }
            if (startBtn) {
                startBtn.disabled = true;
                startBtn.textContent = t('waitUntil4am');
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
        workoutName.textContent = currentLanguage === 'ru' ? workout.name_ru : workout.name;
    }
    
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
    const expired = isDayExpired();
    
    if (expired) {
        deadlineInfo.textContent = t('dayExpiredMsg');
        deadlineInfo.style.color = 'var(--danger)';
    } else if (hour >= 23) {
        deadlineInfo.textContent = t('dayExpired');
        deadlineInfo.style.color = 'var(--danger)';
    } else {
        const timeLeft = (22 - hour) * 60 + (60 - new Date().getMinutes());
        const hours = Math.floor(timeLeft / 60);
        const minutes = timeLeft % 60;
        deadlineInfo.textContent = t('timeLeft', hours, minutes);
        deadlineInfo.style.color = 'var(--text-secondary)';
    }
}

// ========== ОБНОВЛЕНИЕ ДАТЫ ==========
function updateDate() {
    const now = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const dateEl = document.getElementById('current-date');
    if (dateEl) {
        dateEl.textContent = now.toLocaleDateString(currentLanguage === 'ru' ? 'ru-RU' : 'en-US', options);
    }
}

// ========== ОБНОВЛЕНИЕ ТЕКСТА ==========
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
    if (additionalHeader) {
        additionalHeader.textContent = t('addedTasks');
    }
    
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
    
    const statLabels = document.querySelectorAll('.stat-card .stat-label');
    if (statLabels[0]) statLabels[0].textContent = t('workouts');
    if (statLabels[1]) statLabels[1].textContent = t('totalKm');
    if (statLabels[2]) statLabels[2].textContent = t('totalTime');
    if (statLabels[3]) statLabels[3].textContent = t('totalCalories');
    if (statLabels[4]) statLabels[4].textContent = t('avg');
    if (statLabels[5]) statLabels[5].textContent = t('best');
    if (statLabels[6]) statLabels[6].textContent = t('avgPace');
    if (statLabels[7]) statLabels[7].textContent = t('caloriesPerWorkout');
    
    const weeklyCardH3 = document.querySelector('.weekly-card h3');
    if (weeklyCardH3) weeklyCardH3.textContent = t('progress_');
    
    const recentCardH3 = document.querySelector('.recent-card h3');
    if (recentCardH3) recentCardH3.textContent = t('history');
    
    // AI рекомендации
    const recommendationsTitle = document.querySelector('.recommendations-card h3');
    if (recommendationsTitle) recommendationsTitle.textContent = t('aiRecommendations');
    
    const refreshBtn = document.getElementById('refresh-recommendation');
    if (refreshBtn) refreshBtn.textContent = t('refreshRecommendation');
    
    // Табы
    const tabFriends = document.getElementById('tab-friends');
    const tabDiary = document.getElementById('tab-diary');
    if (tabFriends) tabFriends.textContent = t('friends');
    if (tabDiary) tabDiary.textContent = t('diary');
    
    // Друзья
    const shareProfileBtn = document.getElementById('share-profile');
    if (shareProfileBtn) shareProfileBtn.textContent = t('shareProfile');
    
    const friendInput = document.getElementById('friend-username');
    if (friendInput) friendInput.placeholder = t('friendPlaceholder');
    
    const sendRequestBtn = document.getElementById('send-request-btn');
    if (sendRequestBtn) sendRequestBtn.textContent = t('sendRequest');
    
    const requestsTitle = document.querySelector('.friend-requests-card h3');
    if (requestsTitle) requestsTitle.textContent = t('requests');
    
    const friendsTitle = document.querySelector('.friends-list-card h3');
    if (friendsTitle) friendsTitle.textContent = t('myFriends');
    
    // Дневник
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
    
    // Меню
    const menuTitles = document.querySelectorAll('.menu-title');
    if (menuTitles[0]) menuTitles[0].textContent = t('marathon');
    if (menuTitles[1]) menuTitles[1].textContent = t('settings');
    if (menuTitles[2]) menuTitles[2].textContent = t('help');
    if (menuTitles[3]) menuTitles[3].textContent = t('contacts');
    
    const resetMenuItem = document.getElementById('reset-marathon');
    if (resetMenuItem) resetMenuItem.innerHTML = t('reset');
    
    const statsMenuItem = document.getElementById('stats-menu');
    if (statsMenuItem) statsMenuItem.innerHTML = `📊 ${t('statsMenu')}`;
    
    const supportMenuItem = document.getElementById('support');
    if (supportMenuItem) supportMenuItem.innerHTML = t('support');
    
    const telegramMenuItem = document.getElementById('telegram-support');
    if (telegramMenuItem) telegramMenuItem.innerHTML = `📱 ${t('contact')} @frontendchikk`;
    
    const faqMenuItem = document.getElementById('faq');
    if (faqMenuItem) faqMenuItem.innerHTML = t('faq');
    
    const contactItem = document.querySelector('.contact-item');
    if (contactItem) {
        contactItem.innerHTML = `<span>${t('author')}</span><span class="contact-highlight">@frontendchikk</span>`;
    }
    
    const versionItem = document.querySelectorAll('.contact-item')[1];
    if (versionItem) {
        versionItem.innerHTML = `<span>📱 ${t('version')}</span><span class="contact-highlight">10.0.0</span>`;
    }
    
    // Настройки в меню
    const themeLabel = document.querySelector('.theme-selector span');
    if (themeLabel) themeLabel.textContent = t('theme');
    
    const themeDark = document.getElementById('theme-dark-menu');
    const themeLight = document.getElementById('theme-light-menu');
    if (themeDark) themeDark.textContent = t('dark');
    if (themeLight) themeLight.textContent = t('light');
    
    const langLabel = document.querySelector('.language-selector span');
    if (langLabel) langLabel.textContent = t('language');
    
    const langRu = document.getElementById('lang-ru-menu');
    const langEn = document.getElementById('lang-en-menu');
    if (langRu) langRu.textContent = '🇷🇺 Русский';
    if (langEn) langEn.textContent = '🇬🇧 English';
    
    if (dayStarted) {
        renderWorkout();
    }
    
    updateRecommendation();
    updateUserProfile();
    renderFriendRequests();
    renderFriends();
    updateTeamProgress();
    renderSavedWorkouts();
    renderActiveWorkout();
}

// ========== НАВИГАЦИЯ ==========
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
        switchTab('friends');
        updateUserProfile();
        renderFriendRequests();
        renderFriends();
        updateTeamProgress();
    }
    if (pageIndex === 3) {
        renderCustomCreator();
        renderSavedWorkouts();
        renderActiveWorkout();
    }
};

// ========== ТЕМЫ ==========
window.setTheme = function(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
    
    const themeDark = document.getElementById('theme-dark-menu');
    const themeLight = document.getElementById('theme-light-menu');
    
    if (themeDark) themeDark.classList.toggle('active', theme === 'dark');
    if (themeLight) themeLight.classList.toggle('active', theme === 'light');
};

// ========== ЯЗЫК ==========
window.setLanguage = function(lang) {
    currentLanguage = lang;
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
    
    const langRu = document.getElementById('lang-ru-menu');
    const langEn = document.getElementById('lang-en-menu');
    
    if (langRu) langRu.classList.toggle('active', lang === 'ru');
    if (langEn) langEn.classList.toggle('active', lang === 'en');
    
    updateAllText();
    updateDate();
    updateStats();
    
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
        updateUserProfile();
        renderFriendRequests();
        renderFriends();
        updateTeamProgress();
        if (currentTab === 'diary') {
            renderDiary();
        }
    } else if (currentSlide === 3) {
        renderCustomCreator();
        renderSavedWorkouts();
        renderActiveWorkout();
    }
};

// ========== ИНИЦИАЛИЗАЦИЯ ==========
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
    renderDiary();
    updateAllText();
    updateUI();
    renderSavedWorkouts();
    renderActiveWorkout();
    
    // Табы
    const tabFriends = document.getElementById('tab-friends');
    const tabDiary = document.getElementById('tab-diary');
    
    if (tabFriends) {
        tabFriends.addEventListener('click', function(e) {
            e.preventDefault();
            switchTab('friends');
        });
    }
    
    if (tabDiary) {
        tabDiary.addEventListener('click', function(e) {
            e.preventDefault();
            switchTab('diary');
        });
    }
    
    // Кнопка обновления рекомендации
    const refreshBtn = document.getElementById('refresh-recommendation');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', updateRecommendation);
    }
    
    // Кнопка "Начать бег"
    const startBtn = document.getElementById('start-day-btn');
    if (startBtn) {
        startBtn.addEventListener('click', function() {
            if (dayCompletedTime && !canStartNewDay()) {
                const remaining = getTimeRemaining();
                if (remaining) {
                    tg.showAlert(t('waitMessage', remaining.hours, remaining.minutes));
                }
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
    
    // Кнопка "Завершить день"
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
                name: (currentLanguage === 'ru' ? workout.name_ru : workout.name) + (additionalTasks.length > 0 ? ' + доп.' : '')
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
            dayCompletedTime = getCurrentTime().toString();
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
    
    // Социальные функции
    const shareProfileBtn = document.getElementById('share-profile');
    if (shareProfileBtn) {
        shareProfileBtn.addEventListener('click', () => {
            tg.showAlert('Скопировано!');
        });
    }
    
    const sendRequestBtn = document.getElementById('send-request-btn');
    if (sendRequestBtn) {
        sendRequestBtn.addEventListener('click', sendFriendRequest);
    }
    
    // Создание заданий
    const addTaskBtn = document.getElementById('add-task-btn');
    if (addTaskBtn) {
        addTaskBtn.addEventListener('click', function() {
            const taskText = document.getElementById('new-task-text')?.value.trim();
            const taskDistance = parseFloat(document.getElementById('new-task-distance')?.value) || 0;
            
            if (!taskText) {
                tg.showAlert(t('enterTask'));
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
    
    const saveWorkoutBtn = document.getElementById('create-plan-btn');
    if (saveWorkoutBtn) {
        saveWorkoutBtn.addEventListener('click', saveWorkout);
    }
    
    const completeWorkoutBtn = document.getElementById('complete-workout-btn');
    if (completeWorkoutBtn) {
        completeWorkoutBtn.addEventListener('click', completeWorkout);
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
                friends = [];
                friendRequests = [];
                sentRequests = [];
                savedWorkouts = [];
                activeWorkout = null;
                localStorage.clear();
                updateUI();
                updateStats();
                renderDiary();
                renderCustomCreator();
                renderSavedWorkouts();
                renderActiveWorkout();
                updateUserProfile();
                renderFriendRequests();
                renderFriends();
                updateTeamProgress();
                
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
            tg.showAlert(t('faqText'));
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
    
    // Проверка заявок
    checkIncomingRequests();
    setInterval(checkIncomingRequests, 30000);
    
    // Интервал обновления времени
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
