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
    ACTIVE_WORKOUT: 'active_workout',
    FRIEND_RESULTS: 'friend_results',
    LEADERBOARD: 'leaderboard',
    INVITE_CODE: 'invite_code',
    INVITED_FRIENDS: 'invited_friends',
    BONUS_POINTS: 'bonus_points',
    STRENGTH_HISTORY: 'strength_history',
    STRENGTH_TOTAL_PULLUPS: 'strength_total_pullups',
    STRENGTH_TOTAL_PUSHUPS: 'strength_total_pushups',
    STRENGTH_TOTAL_DAYS: 'strength_total_days',
    STRENGTH_BEST_PULLUPS: 'strength_best_pullups',
    STRENGTH_BEST_PUSHUPS: 'strength_best_pushups',
    STRENGTH_TODAY: 'strength_today'
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
        online: "🟢 Онлайн",
        offline: "⚪ Офлайн",
        accept: "✓ Принять",
        decline: "✗ Отклонить",
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
        friendRemoved: (name) => `✕ Друг ${name} удален`,
        writeToTelegram: "💬 Написать",
        newRequest: "🔔 Новая заявка",
        
        // Приглашения
        inviteFriends: "🔗 Пригласить друзей",
        inviteText: (name) => `🏃 Привет! ${name} приглашает тебя в беговой марафон! Будем соревноваться и мотивировать друг друга 💪`,
        copyInvite: "📋 Копировать ссылку",
        inviteCopied: "✅ Ссылка скопирована! Отправь другу",
        bonusPoints: "🎁 Бонусные очки",
        invitedCount: "приглашено",
        joinedCount: "присоединились",
        bonusEarned: "бонусов",
        sendInvite: "📤 Отправить приглашение",
        enterFriendUsername: "Введите username друга для приглашения",
        inviteSuccess: (name) => `✅ Приглашение отправлено пользователю @${name}`,
        
        // Таблица лидеров
        leaderboard: "🏆 ТАБЛИЦА ЛИДЕРОВ",
        myResults: "📊 МОИ РЕЗУЛЬТАТЫ",
        friendResults: "👥 РЕЗУЛЬТАТЫ ДРУЗЕЙ",
        rank: "Место",
        name: "Имя",
        distance: "Дистанция",
        workouts: "Тренировки",
        time: "Время",
        calories: "Калории",
        pace: "Темп",
        thisWeek: "Эта неделя",
        thisMonth: "Этот месяц",
        allTime: "За все время",
        noFriendsResults: "Пока нет результатов друзей. Пригласи их!",
        you: "Вы",
        vs: "vs",
        ahead: "впереди",
        behind: "позади",
        shareProgress: "📤 Поделиться прогрессом",
        shared: "✅ Отправлено!",
        
        // Дневник
        newEntry: "➕ Новая запись",
        save: "Сохранить",
        cancel: "Отмена",
        noEntries: "📝 Пока нет записей",
        entryPlaceholder: "Как прошла тренировка? Напиши свои мысли...",
        entryDeleted: "Запись удалена",
        entrySaved: "Запись сохранена",
        
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
        faqText: "❓ FAQ:\n\n• Начать день с 4 утра\n• Завершить до 23:00\n• 24ч таймер\n• 30 готовых тренировок\n• Свои задания\n• Друзья и команда\n• AI рекомендации\n• Силовые тренировки"
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
        online: "🟢 Online",
        offline: "⚪ Offline",
        accept: "✓ Accept",
        decline: "✗ Decline",
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
        friendRemoved: (name) => `✕ Friend ${name} removed`,
        writeToTelegram: "💬 Write",
        newRequest: "🔔 New request",
        
        // Invites
        inviteFriends: "🔗 Invite Friends",
        inviteText: (name) => `🏃 Hi! ${name} invites you to the running marathon! Let's compete and motivate each other 💪`,
        copyInvite: "📋 Copy link",
        inviteCopied: "✅ Link copied! Send to friend",
        bonusPoints: "🎁 Bonus points",
        invitedCount: "invited",
        joinedCount: "joined",
        bonusEarned: "bonus",
        sendInvite: "📤 Send invite",
        enterFriendUsername: "Enter friend's username to invite",
        inviteSuccess: (name) => `✅ Invitation sent to @${name}`,
        
        // Leaderboard
        leaderboard: "🏆 LEADERBOARD",
        myResults: "📊 MY RESULTS",
        friendResults: "👥 FRIENDS RESULTS",
        rank: "Rank",
        name: "Name",
        distance: "Distance",
        workouts: "Workouts",
        time: "Time",
        calories: "Calories",
        pace: "Pace",
        thisWeek: "This week",
        thisMonth: "This month",
        allTime: "All time",
        noFriendsResults: "No friends results yet. Invite them!",
        you: "You",
        vs: "vs",
        ahead: "ahead",
        behind: "behind",
        shareProgress: "📤 Share progress",
        shared: "✅ Shared!",
        
        // Diary
        newEntry: "➕ New entry",
        save: "Save",
        cancel: "Cancel",
        noEntries: "📝 No entries yet",
        entryPlaceholder: "How was your workout? Write your thoughts...",
        entryDeleted: "Entry deleted",
        entrySaved: "Entry saved",
        
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
        faqText: "❓ FAQ:\n\n• Start at 4 AM\n• Complete before 11 PM\n• 24h timer\n• 30 workouts\n• Custom tasks\n• Friends & team\n• AI recommendations\n• Strength workouts"
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

// Приглашения и бонусы
let invitedFriends = JSON.parse(localStorage.getItem(STORAGE_KEYS.INVITED_FRIENDS)) || [];
let bonusPoints = parseInt(localStorage.getItem(STORAGE_KEYS.BONUS_POINTS)) || 0;

// Код приглашения
let inviteCode = localStorage.getItem(STORAGE_KEYS.INVITE_CODE);
if (!inviteCode) {
    inviteCode = 'user_' + userId + '_' + Date.now();
    localStorage.setItem(STORAGE_KEYS.INVITE_CODE, inviteCode);
}

// ========== НОВОЕ СОСТОЯНИЕ ДЛЯ СИЛОВЫХ ==========
let strengthHistory = JSON.parse(localStorage.getItem(STORAGE_KEYS.STRENGTH_HISTORY)) || [];
let totalPullups = parseInt(localStorage.getItem(STORAGE_KEYS.STRENGTH_TOTAL_PULLUPS)) || 0;
let totalPushups = parseInt(localStorage.getItem(STORAGE_KEYS.STRENGTH_TOTAL_PUSHUPS)) || 0;
let strengthDays = parseInt(localStorage.getItem(STORAGE_KEYS.STRENGTH_TOTAL_DAYS)) || 0;
let bestPullups = parseInt(localStorage.getItem(STORAGE_KEYS.STRENGTH_BEST_PULLUPS)) || 0;
let bestPushups = parseInt(localStorage.getItem(STORAGE_KEYS.STRENGTH_BEST_PUSHUPS)) || 0;

// Текущая силовая тренировка
let strengthToday = JSON.parse(localStorage.getItem(STORAGE_KEYS.STRENGTH_TODAY)) || {
    pullups: {
        goal: 30,
        sets: [{ reps: 10, completed: false }],
        completed: false
    },
    pushups: {
        goal: 50,
        sets: [{ reps: 15, completed: false }],
        completed: false
    },
    mixed: {
        completed: false,
        rounds: [
            { pullups: 10, pushups: 20, pullupsCompleted: false, pushupsCompleted: false, completed: false },
            { pullups: 8, pushups: 15, pullupsCompleted: false, pushupsCompleted: false, completed: false },
            { pullups: 5, pushups: 10, pullupsCompleted: false, pushupsCompleted: false, completed: false }
        ]
    }
};

// Текущий тип тренировки
let currentStrengthType = 'pullups';

// Мотивационные цитаты для силы
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

// Язык
let currentLanguage = localStorage.getItem(STORAGE_KEYS.LANGUAGE) || 'ru';

// Текущая вкладка
let currentTab = 'friends';
let resultsPeriod = 'allTime'; // allTime, thisWeek, thisMonth

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
    localStorage.setItem(STORAGE_KEYS.DIARY_ENTRIES, JSON.stringify(diaryEntries));
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, currentLanguage);
    localStorage.setItem(STORAGE_KEYS.FRIENDS, JSON.stringify(friends));
    localStorage.setItem(STORAGE_KEYS.FRIEND_REQUESTS, JSON.stringify(friendRequests));
    localStorage.setItem(STORAGE_KEYS.SENT_REQUESTS, JSON.stringify(sentRequests));
    localStorage.setItem(STORAGE_KEYS.SAVED_WORKOUTS, JSON.stringify(savedWorkouts));
    localStorage.setItem(STORAGE_KEYS.ACTIVE_WORKOUT, JSON.stringify(activeWorkout));
    localStorage.setItem(STORAGE_KEYS.INVITED_FRIENDS, JSON.stringify(invitedFriends));
    localStorage.setItem(STORAGE_KEYS.BONUS_POINTS, bonusPoints);
    
    // Сохраняем силовые данные
    localStorage.setItem(STORAGE_KEYS.STRENGTH_HISTORY, JSON.stringify(strengthHistory));
    localStorage.setItem(STORAGE_KEYS.STRENGTH_TOTAL_PULLUPS, totalPullups);
    localStorage.setItem(STORAGE_KEYS.STRENGTH_TOTAL_PUSHUPS, totalPushups);
    localStorage.setItem(STORAGE_KEYS.STRENGTH_TOTAL_DAYS, strengthDays);
    localStorage.setItem(STORAGE_KEYS.STRENGTH_BEST_PULLUPS, bestPullups);
    localStorage.setItem(STORAGE_KEYS.STRENGTH_BEST_PUSHUPS, bestPushups);
    localStorage.setItem(STORAGE_KEYS.STRENGTH_TODAY, JSON.stringify(strengthToday));
    
    teamProgress = totalDistance + friends.reduce((sum, f) => sum + (f.distance || 0), 0);
    localStorage.setItem(STORAGE_KEYS.TEAM_PROGRESS, teamProgress);
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
    
    // Сортируем от новых к старым
    const sortedEntries = [...diaryEntries].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    sortedEntries.forEach(entry => {
        const entryDiv = document.createElement('div');
        entryDiv.className = 'entry-item';
        
        const date = new Date(entry.date);
        const formattedDate = date.toLocaleDateString(currentLanguage === 'ru' ? 'ru-RU' : 'en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        entryDiv.innerHTML = `
            <div class="entry-date">${formattedDate}</div>
            <div class="entry-content">${entry.text}</div>
            <button class="entry-delete" data-id="${entry.id}">✕</button>
        `;
        entriesList.appendChild(entryDiv);
    });
    
    // Добавляем обработчики для кнопок удаления
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

// ========== ФУНКЦИИ ДЛЯ ПРИГЛАШЕНИЙ ==========

// Отправка приглашения другу через Telegram
function inviteFriend() {
    const friendUsername = prompt(t('enterFriendUsername'), '@');
    
    if (!friendUsername) return;
    
    const cleanUsername = friendUsername.replace('@', '').trim();
    
    if (!cleanUsername) {
        tg.showAlert(t('enterFriendUsername'));
        return;
    }
    
    if (cleanUsername === userUsername) {
        tg.showAlert(t('cantAddSelf'));
        return;
    }
    
    // Проверяем, не является ли уже другом
    const alreadyFriend = friends.some(f => f.username === cleanUsername);
    if (alreadyFriend) {
        tg.showAlert(t('alreadyFriend'));
        return;
    }
    
    // Создаем сообщение с приглашением
    const inviteMessage = `${t('inviteText', userName)}\n\n` +
                         `👤 От: ${userName} (@${userUsername})\n` +
                         `🏃 Мой прогресс: ${totalDistance.toFixed(1)} км, ${totalWorkouts} тренировок\n` +
                         `💪 Сила: ${totalPullups} подтягиваний, ${totalPushups} отжиманий\n\n` +
                         `👉 Нажми, чтобы открыть приложение: https://t.me/your_bot_name?start=${inviteCode}`;
    
    // Открываем диалог с другом в Telegram
    tg.openTelegramLink(`https://t.me/${cleanUsername}?text=${encodeURIComponent(inviteMessage)}`);
    
    // Добавляем в список приглашенных
    invitedFriends.push({
        username: cleanUsername,
        date: new Date().toISOString(),
        joined: false
    });
    
    // Добавляем бонусные очки
    bonusPoints += 10;
    saveState();
    
    renderInviteStats();
    
    tg.showAlert(t('inviteSuccess', cleanUsername));
}

// Копирование реферальной ссылки
function copyInviteLink() {
    const link = `https://t.me/your_bot_name?start=${inviteCode}`;
    
    // Копируем в буфер обмена
    const input = document.createElement('input');
    input.value = link;
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

// Поделиться прогрессом
function shareProgress() {
    const message = `🏃 Мой прогресс в беговом марафоне:\n\n` +
                   `📊 Бег: ${totalDistance.toFixed(1)} км, ${totalWorkouts} тренировок\n` +
                   `💪 Сила: ${totalPullups} подтягиваний, ${totalPushups} отжиманий\n` +
                   `🔥 Калорий: ${totalCalories}\n\n` +
                   `👥 Присоединяйся! https://t.me/your_bot_name?start=${inviteCode}`;
    
    tg.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(message)}`);
    
    tg.showPopup({
        title: '✅',
        message: t('shared'),
        buttons: [{ type: 'close' }]
    });
}

// Рендеринг статистики приглашений
function renderInviteStats() {
    const invitedCountEl = document.getElementById('invited-count');
    const joinedCountEl = document.getElementById('joined-count');
    const bonusCountEl = document.getElementById('bonus-count');
    
    if (invitedCountEl) invitedCountEl.textContent = invitedFriends.length;
    if (joinedCountEl) joinedCountEl.textContent = invitedFriends.filter(f => f.joined).length;
    if (bonusCountEl) bonusCountEl.textContent = bonusPoints;
}

// ========== ФУНКЦИИ ДЛЯ ДРУЗЕЙ ==========
function updateUserProfile() {
    const userNameEl = document.getElementById('friends-user-name');
    const userStatsEl = document.getElementById('friends-total-distance');
    const userWorkoutsEl = document.getElementById('friends-total-workouts');
    const userPaceEl = document.getElementById('friends-best-pace');
    const profileNameEl = document.getElementById('profile-mini-name');
    const profileStatsEl = document.getElementById('profile-mini-stats');
    
    if (userNameEl) userNameEl.textContent = userName;
    if (userStatsEl) userStatsEl.textContent = totalDistance.toFixed(1);
    if (userWorkoutsEl) userWorkoutsEl.textContent = totalWorkouts;
    
    const avgPace = totalDistance > 0 ? (totalTime / totalDistance).toFixed(1) : 0;
    if (userPaceEl) userPaceEl.textContent = avgPace;
    
    if (profileNameEl) profileNameEl.textContent = userName;
    if (profileStatsEl) profileStatsEl.textContent = `${totalDistance.toFixed(1)} км • ${totalWorkouts} тренировок • 💪 ${totalPullups}`;
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
                <span class="friend-request-name">${request.fromUserName || request.name}</span>
                <span class="friend-request-username">@${request.fromUserUsername || request.username}</span>
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
    
    // Проверяем, не отправлена ли уже заявка
    const alreadySent = sentRequests.some(r => r.username === cleanUsername);
    if (alreadySent) {
        tg.showAlert(t('requestSent'));
        return;
    }
    
    // Проверяем, не является ли уже другом
    const alreadyFriend = friends.some(f => f.username === cleanUsername);
    if (alreadyFriend) {
        tg.showAlert(t('alreadyFriend'));
        return;
    }
    
    // Проверяем, есть ли входящая заявка от этого пользователя
    const incomingRequestIndex = friendRequests.findIndex(r => r.fromUserUsername === cleanUsername);
    if (incomingRequestIndex !== -1) {
        acceptFriendRequest(incomingRequestIndex);
        input.value = '';
        return;
    }
    
    // Создаем сообщение с заявкой
    const requestMessage = `👋 ${userName} (@${userUsername}) хочет добавить тебя в друзья в беговом марафоне!\n\n` +
                          `📊 Его статистика:\n` +
                          `🏃 Бег: ${totalDistance.toFixed(1)} км, ${totalWorkouts} тренировок\n` +
                          `💪 Сила: ${totalPullups} подтягиваний, ${totalPushups} отжиманий\n` +
                          `🔥 Калорий: ${totalCalories}\n\n` +
                          `👉 Открой приложение, чтобы принять заявку: https://t.me/your_bot_name`;
    
    // Открываем диалог с пользователем
    tg.openTelegramLink(`https://t.me/${cleanUsername}?text=${encodeURIComponent(requestMessage)}`);
    
    // Добавляем в отправленные заявки
    const newRequest = {
        id: Date.now(),
        username: cleanUsername,
        name: cleanUsername,
        date: new Date().toISOString()
    };
    
    sentRequests.push(newRequest);
    localStorage.setItem(STORAGE_KEYS.SENT_REQUESTS, JSON.stringify(sentRequests));
    
    input.value = '';
    
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
    
    // Удаляем из отправленных заявок
    const sentIndex = sentRequests.findIndex(r => r.username === newFriend.username);
    if (sentIndex !== -1) {
        sentRequests.splice(sentIndex, 1);
    }
    
    localStorage.setItem(STORAGE_KEYS.FRIENDS, JSON.stringify(friends));
    localStorage.setItem(STORAGE_KEYS.FRIEND_REQUESTS, JSON.stringify(friendRequests));
    localStorage.setItem(STORAGE_KEYS.SENT_REQUESTS, JSON.stringify(sentRequests));
    
    renderFriendRequests();
    renderLeaderboard();
    renderFriendResults();
    updateTeamProgress();
    
    // Добавляем бонус за нового друга
    bonusPoints += 5;
    saveState();
    renderInviteStats();
    
    tg.showAlert(t('requestAccepted', newFriend.name));
}

function declineFriendRequest(index) {
    const request = friendRequests[index];
    friendRequests.splice(index, 1);
    localStorage.setItem(STORAGE_KEYS.FRIEND_REQUESTS, JSON.stringify(friendRequests));
    renderFriendRequests();
    tg.showAlert(t('requestDeclined', request.fromUserName || request.name));
}

// ========== ФУНКЦИИ ДЛЯ ТАБЛИЦЫ ЛИДЕРОВ ==========
function calculateStats(history, period) {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    
    const filtered = history.filter(workout => {
        const workoutDate = new Date(workout.date);
        
        if (period === 'thisWeek') {
            return workoutDate >= startOfWeek;
        } else if (period === 'thisMonth') {
            return workoutDate >= startOfMonth;
        }
        return true; // allTime
    });
    
    return {
        distance: filtered.reduce((sum, w) => sum + w.distance, 0),
        workouts: filtered.length,
        time: filtered.reduce((sum, w) => sum + w.time, 0),
        calories: filtered.reduce((sum, w) => sum + w.calories, 0),
        pace: filtered.reduce((sum, w) => sum + w.distance, 0) > 0 
            ? (filtered.reduce((sum, w) => sum + w.time, 0) / filtered.reduce((sum, w) => sum + w.distance, 0)).toFixed(1)
            : 0
    };
}

function getFriendResults() {
    const results = [];
    
    friends.forEach(friend => {
        // В реальном приложении здесь был бы запрос к серверу
        // Для демо используем случайные данные
        const mockHistory = [];
        const mockWorkouts = Math.floor(Math.random() * 20) + 1;
        for (let i = 0; i < mockWorkouts; i++) {
            mockHistory.push({
                distance: Math.random() * 5 + 1,
                time: Math.random() * 30 + 10,
                calories: Math.random() * 300 + 100,
                date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
            });
        }
        
        results.push({
            ...friend,
            history: mockHistory,
            pullups: Math.floor(Math.random() * 100),
            pushups: Math.floor(Math.random() * 200)
        });
    });
    
    return results;
}

function getLeaderboard() {
    const friendResults = getFriendResults();
    
    const allUsers = [
        // Текущий пользователь
        {
            userId: userId,
            name: userName + ` (${t('you')})`,
            username: userUsername,
            avatar: '👤',
            isYou: true,
            ...calculateStats(workoutHistory, resultsPeriod),
            pullups: totalPullups,
            pushups: totalPushups
        },
        // Друзья
        ...friendResults.map(friend => ({
            ...friend,
            ...calculateStats(friend.history || [], resultsPeriod),
            isYou: false
        }))
    ];
    
    // Сортируем по дистанции (убывание)
    return allUsers.sort((a, b) => b.distance - a.distance);
}

function renderLeaderboard() {
    const container = document.getElementById('leaderboard-container');
    if (!container) return;
    
    const leaderboard = getLeaderboard();
    
    if (leaderboard.length === 0) {
        container.innerHTML = `<div class="empty-leaderboard">${t('noFriendsResults')}</div>`;
        return;
    }
    
    let html = '';
    
    leaderboard.forEach((user, index) => {
        const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`;
        
        html += `
            <div class="leaderboard-row ${user.isYou ? 'you' : ''}">
                <span class="rank">${medal}</span>
                <span class="name">
                    ${user.avatar} ${user.name}
                </span>
                <span class="distance">${user.distance.toFixed(1)} км</span>
                <span class="workouts">${user.workouts}</span>
                <span class="pace">${user.pace} мин/км</span>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function renderFriendResults() {
    const container = document.getElementById('friend-results-container');
    if (!container) return;
    
    const friendResults = getFriendResults();
    const myStats = calculateStats(workoutHistory, resultsPeriod);
    
    if (friendResults.length === 0) {
        container.innerHTML = `<div class="empty-results">${t('noFriendsResults')}</div>`;
        return;
    }
    
    let html = '';
    
    // Сортируем друзей по дистанции
    friendResults.sort((a, b) => {
        const aStats = calculateStats(a.history || [], resultsPeriod);
        const bStats = calculateStats(b.history || [], resultsPeriod);
        return bStats.distance - aStats.distance;
    });
    
    friendResults.forEach(friend => {
        const stats = calculateStats(friend.history || [], resultsPeriod);
        const vsDiff = myStats.distance - stats.distance;
        
        let vsClass = 'equal';
        let vsText = '=';
        
        if (vsDiff > 0) {
            vsClass = 'ahead';
            vsText = `+${vsDiff.toFixed(1)} км`;
        } else if (vsDiff < 0) {
            vsClass = 'behind';
            vsText = `${vsDiff.toFixed(1)} км`;
        }
        
        html += `
            <div class="friend-stat-card">
                <div class="friend-info">
                    <div class="friend-avatar">${friend.avatar || '👤'}</div>
                    <span class="friend-name">${friend.name}</span>
                </div>
                <div class="friend-stats">
                    <div class="stat-row">
                        <span>${t('distance')}</span>
                        <span class="stat-value">${stats.distance.toFixed(1)} км</span>
                    </div>
                    <div class="stat-row">
                        <span>${t('workouts')}</span>
                        <span class="stat-value">${stats.workouts}</span>
                    </div>
                    <div class="stat-row">
                        <span>${t('pace')}</span>
                        <span class="stat-value">${stats.pace} мин/км</span>
                    </div>
                    <div class="stat-row">
                        <span>💪 Сила</span>
                        <span class="stat-value">${friend.pullups || 0}/${friend.pushups || 0}</span>
                    </div>
                </div>
                <div class="vs-row ${vsClass}">
                    ${t('vs')}: ${vsText}
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function updateTeamProgress() {
    const teamProgressBar = document.getElementById('team-progress-bar');
    const teamProgressText = document.getElementById('team-progress-text');
    
    teamProgress = totalDistance + friends.reduce((sum, f) => sum + (f.distance || 0), 0);
    
    if (teamProgressBar) {
        const percent = Math.min(100, (teamProgress / teamGoal) * 100);
        teamProgressBar.style.width = percent + '%';
    }
    
    if (teamProgressText) {
        teamProgressText.textContent = `${teamProgress.toFixed(1)}/${teamGoal} км`;
    }
    
    localStorage.setItem(STORAGE_KEYS.TEAM_PROGRESS, teamProgress);
}

function checkIncomingRequests() {
    // В реальном приложении здесь был бы запрос к серверу
    // Для демо просто проверяем локальное хранилище
    const pendingKey = `pending_request_${userUsername}`;
    const pending = JSON.parse(localStorage.getItem(pendingKey)) || [];
    
    if (pending.length > 0) {
        pending.forEach(req => {
            const exists = friendRequests.some(r => r.id === req.id);
            if (!exists) {
                friendRequests.push(req);
                tg.showPopup({
                    title: '🔔',
                    message: `${req.fromUserName} ${t('newRequest')}`,
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
        localStorage.removeItem(pendingKey);
    }
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
    
    // Иногда показываем советы по силовым
    if (Math.random() < 0.3 && totalPullups + totalPushups > 0) {
        const strengthIndex = Math.floor(Math.random() * recommendations.strength[lang].length);
        return recommendations.strength[lang][strengthIndex];
    }
    
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

// ========== ФУНКЦИИ ДЛЯ СОЗДАНИЯ И ВЫПОЛНЕНИЯ ТРЕНИРОВОК ==========
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

function updateCreateButtonState() {
    const goalInput = document.getElementById('goal-distance');
    const goal = parseFloat(goalInput?.value) || 0;
    const createBtn = document.getElementById('create-plan-btn');
    
    if (createBtn) {
        createBtn.disabled = !(goal > 0 && currentCustomTasks.length > 0);
    }
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
        steps: newWorkout.steps.map(step => ({...step, completed: false}))
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
        if (step.completed) {
            actualDistance += step.distance || 0;
        }
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
    
    saveState();
    
    tg.showPopup({
        title: '🎉',
        message: t('workoutCompleted'),
        buttons: [{ type: 'close' }]
    });
    
    activeWorkout = null;
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_WORKOUT);
    
    renderActiveWorkout();
    renderSavedWorkouts();
}

// ========== ФУНКЦИИ ДЛЯ СИЛОВЫХ УПРАЖНЕНИЙ ==========

// Переключение типа тренировки
function switchStrengthType(type) {
    console.log('Переключение на тип:', type);
    currentStrengthType = type;
    
    // Обновляем активные кнопки
    document.querySelectorAll('.type-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeBtn = document.getElementById(`type-${type}`);
    if (activeBtn) activeBtn.classList.add('active');
    
    // Показываем нужную карточку
    const pullupsCard = document.getElementById('pullups-card');
    const pushupsCard = document.getElementById('pushups-card');
    const mixedCard = document.getElementById('mixed-card');
    
    if (pullupsCard) pullupsCard.style.display = type === 'pullups' ? 'block' : 'none';
    if (pushupsCard) pushupsCard.style.display = type === 'pushups' ? 'block' : 'none';
    if (mixedCard) mixedCard.style.display = type === 'mixed' ? 'block' : 'none';
    
    // Обновляем интерфейс
    if (type === 'pullups') {
        renderPullupsSets();
    } else if (type === 'pushups') {
        renderPushupsSets();
    } else if (type === 'mixed') {
        renderMixedSets();
    }
    
    updateStrengthProgress();
}

// Рендеринг сетов для подтягиваний
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
    
    // Добавляем обработчики
    document.querySelectorAll('#pullups-sets .set-remove').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
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
            if (this.checked) {
                setCard.classList.add('completed');
            } else {
                setCard.classList.remove('completed');
            }
            
            updatePullupsStats();
            saveState();
        });
    });
    
    updatePullupsStats();
}

// Рендеринг сетов для отжиманий
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
    
    // Добавляем обработчики
    document.querySelectorAll('#pushups-sets .set-remove').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
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
            if (this.checked) {
                setCard.classList.add('completed');
            } else {
                setCard.classList.remove('completed');
            }
            
            updatePushupsStats();
            saveState();
        });
    });
    
    updatePushupsStats();
}

// Рендеринг комплексной тренировки
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
    
    // Добавляем обработчики
    document.querySelectorAll('.mixed-item .item-input').forEach(input => {
        input.addEventListener('change', function() {
            const round = parseInt(this.dataset.round);
            const exercise = this.dataset.exercise;
            const value = parseInt(this.value) || 0;
            
            if (exercise === 'pullups') {
                strengthToday.mixed.rounds[round].pullups = value;
            } else {
                strengthToday.mixed.rounds[round].pushups = value;
            }
            
            updateMixedStats();
            saveState();
        });
    });
    
    document.querySelectorAll('.mixed-item .item-check').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const round = parseInt(this.dataset.round);
            const exercise = this.dataset.exercise;
            const mixedItem = this.closest('.mixed-item');
            
            if (exercise === 'pullups') {
                strengthToday.mixed.rounds[round].pullupsCompleted = this.checked;
            } else {
                strengthToday.mixed.rounds[round].pushupsCompleted = this.checked;
            }
            
            if (this.checked) {
                mixedItem.classList.add('completed');
            } else {
                mixedItem.classList.remove('completed');
            }
            
            // Проверяем, завершен ли весь круг
            const roundData = strengthToday.mixed.rounds[round];
            const allCompleted = roundData.pullupsCompleted && roundData.pushupsCompleted;
            roundData.completed = allCompleted;
            
            const roundDiv = this.closest('.mixed-exercise');
            if (allCompleted) {
                roundDiv.classList.add('completed');
            } else {
                roundDiv.classList.remove('completed');
            }
            
            updateMixedStats();
            saveState();
        });
    });
    
    updateMixedStats();
}

// Добавление нового подхода
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

// Добавление нового круга в комплекс
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

// Обновление цели для подтягиваний
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

// Обновление цели для отжиманий
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

// Обновление статистики подтягиваний
function updatePullupsStats() {
    const todaySpan = document.getElementById('pullups-today');
    const summaryPullups = document.getElementById('summary-pullups');
    
    const totalCompleted = strengthToday.pullups.sets
        .filter(set => set.completed)
        .reduce((sum, set) => sum + set.reps, 0);
    
    const goal = strengthToday.pullups.goal;
    
    if (todaySpan) {
        todaySpan.innerHTML = `${totalCompleted}/${goal}`;
    }
    
    if (summaryPullups) {
        summaryPullups.textContent = totalCompleted;
    }
    
    strengthToday.pullups.completed = totalCompleted >= goal;
    
    updateStrengthProgress();
}

// Обновление статистики отжиманий
function updatePushupsStats() {
    const todaySpan = document.getElementById('pushups-today');
    const summaryPushups = document.getElementById('summary-pushups');
    
    const totalCompleted = strengthToday.pushups.sets
        .filter(set => set.completed)
        .reduce((sum, set) => sum + set.reps, 0);
    
    const goal = strengthToday.pushups.goal;
    
    if (todaySpan) {
        todaySpan.innerHTML = `${totalCompleted}/${goal}`;
    }
    
    if (summaryPushups) {
        summaryPushups.textContent = totalCompleted;
    }
    
    strengthToday.pushups.completed = totalCompleted >= goal;
    
    updateStrengthProgress();
}

// Обновление статистики комплексной тренировки
function updateMixedStats() {
    const summaryPullups = document.getElementById('summary-pullups');
    const summaryPushups = document.getElementById('summary-pushups');
    const mixedToday = document.getElementById('mixed-today');
    
    let totalPullupsCompleted = 0;
    let totalPushupsCompleted = 0;
    let completedRounds = 0;
    
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

// Обновление общего прогресса силы
function updateStrengthProgress() {
    const progressBar = document.getElementById('strength-progress');
    const percentSpan = document.getElementById('strength-percent');
    const completeBtn = document.getElementById('complete-strength-btn');
    
    let totalCompleted = 0;
    let totalGoal = 0;
    
    if (currentStrengthType === 'pullups') {
        const completed = strengthToday.pullups.sets
            .filter(set => set.completed)
            .reduce((sum, set) => sum + set.reps, 0);
        totalCompleted = completed;
        totalGoal = strengthToday.pullups.goal;
    } else if (currentStrengthType === 'pushups') {
        const completed = strengthToday.pushups.sets
            .filter(set => set.completed)
            .reduce((sum, set) => sum + set.reps, 0);
        totalCompleted = completed;
        totalGoal = strengthToday.pushups.goal;
    } else if (currentStrengthType === 'mixed') {
        strengthToday.mixed.rounds.forEach(round => {
            if (round.pullupsCompleted) totalCompleted += round.pullups;
            if (round.pushupsCompleted) totalCompleted += round.pushups;
        });
        strengthToday.mixed.rounds.forEach(round => {
            totalGoal += round.pullups + round.pushups;
        });
    }
    
    const percent = totalGoal > 0 ? Math.min(100, (totalCompleted / totalGoal) * 100) : 0;
    
    if (progressBar) progressBar.style.width = percent + '%';
    if (percentSpan) percentSpan.textContent = Math.round(percent) + '%';
    
    // Проверяем, можно ли завершить тренировку
    let canComplete = false;
    
    if (currentStrengthType === 'pullups') {
        canComplete = strengthToday.pullups.completed;
    } else if (currentStrengthType === 'pushups') {
        canComplete = strengthToday.pushups.completed;
    } else if (currentStrengthType === 'mixed') {
        canComplete = strengthToday.mixed.completed;
    }
    
    if (completeBtn) completeBtn.disabled = !canComplete;
    
    // Обновляем калории (примерно 1 калория на 2 повторения)
    const calories = Math.round(totalCompleted * 0.5);
    const summaryCalories = document.getElementById('summary-calories');
    if (summaryCalories) summaryCalories.textContent = calories;
}

// Завершение силовой тренировки
function completeStrengthWorkout() {
    let totalPullupsToday = 0;
    let totalPushupsToday = 0;
    
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
    
    // Обновляем общую статистику
    totalPullups += totalPullupsToday;
    totalPushups += totalPushupsToday;
    strengthDays++;
    
    if (totalPullupsToday > bestPullups) bestPullups = totalPullupsToday;
    if (totalPushupsToday > bestPushups) bestPushups = totalPushupsToday;
    
    // Добавляем в историю
    strengthHistory.push({
        date: new Date().toISOString(),
        pullups: totalPullupsToday,
        pushups: totalPushupsToday,
        type: currentStrengthType
    });
    
    // Сбрасываем сегодняшнюю тренировку
    strengthToday = {
        pullups: {
            goal: 30,
            sets: [{ reps: 10, completed: false }],
            completed: false
        },
        pushups: {
            goal: 50,
            sets: [{ reps: 15, completed: false }],
            completed: false
        },
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
    
    // Обновляем UI
    renderPullupsSets();
    renderPushupsSets();
    renderMixedSets();
    updateStrengthProgress();
    updateStrengthStats();
    
    // Показываем новую мотивационную цитату
    const randomQuote = strengthQuotes[Math.floor(Math.random() * strengthQuotes.length)];
    const quoteEl = document.getElementById('strength-quote');
    if (quoteEl) quoteEl.textContent = randomQuote[currentLanguage];
    
    tg.showPopup({
        title: '🎉',
        message: t('strengthCompleted'),
        buttons: [{ type: 'close' }]
    });
}

// Обновление статистики силы в общем разделе
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
    
    // Обновляем силовую статистику
    updateStrengthStats();
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
    const inviteBtn = document.getElementById('invite-friends-btn');
    if (inviteBtn) {
        inviteBtn.innerHTML = `<span class="btn-icon">📤</span><span class="btn-text">${t('sendInvite')}</span>`;
    }
    
    const copyBtn = document.getElementById('copy-invite-btn');
    if (copyBtn) {
        copyBtn.setAttribute('title', t('copyInvite'));
    }
    
    const shareBtn = document.getElementById('share-progress-btn');
    if (shareBtn) {
        shareBtn.setAttribute('title', t('shareProgress'));
    }
    
    const addFriendInput = document.getElementById('friend-username');
    if (addFriendInput) addFriendInput.placeholder = t('friendPlaceholder');
    
    const sendRequestBtn = document.getElementById('send-request-btn');
    if (sendRequestBtn) sendRequestBtn.setAttribute('title', t('addFriend'));
    
    const requestsTitle = document.querySelector('.requests-header h3');
    if (requestsTitle) requestsTitle.textContent = t('requests');
    
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
    goalSliders.forEach(label => {
        label.textContent = t('goal_');
    });
    
    const addSetBtns = document.querySelectorAll('.add-set-btn');
    addSetBtns.forEach(btn => {
        btn.innerHTML = `<span class="btn-icon">➕</span><span class="btn-text">${t('addSet')}</span>`;
    });
    
    const addMixedBtn = document.getElementById('add-mixed-set');
    if (addMixedBtn) {
        addMixedBtn.innerHTML = `<span class="btn-icon">➕</span><span class="btn-text">${t('addRound')}</span>`;
    }
    
    const completeStrengthBtn = document.getElementById('complete-strength-btn');
    if (completeStrengthBtn) {
        completeStrengthBtn.textContent = t('completeStrength');
    }
    
    const summaryLabels = document.querySelectorAll('.summary-label');
    if (summaryLabels[0]) summaryLabels[0].textContent = t('summaryPullups');
    if (summaryLabels[1]) summaryLabels[1].textContent = t('summaryPushups');
    if (summaryLabels[2]) summaryLabels[2].textContent = t('summaryCalories');
    
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
    
    if (dayStarted) {
        renderWorkout();
    }
    
    updateRecommendation();
    updateUserProfile();
    renderInviteStats();
    renderFriendRequests();
    renderLeaderboard();
    renderFriendResults();
    updateTeamProgress();
    renderSavedWorkouts();
    renderActiveWorkout();
    
    // Обновляем силовые
    renderPullupsSets();
    renderPushupsSets();
    renderMixedSets();
    updateStrengthProgress();
    
    // Мотивационная цитата
    const randomQuote = strengthQuotes[Math.floor(Math.random() * strengthQuotes.length)];
    const quoteEl = document.getElementById('strength-quote');
    if (quoteEl) quoteEl.textContent = randomQuote[currentLanguage];
}

// ========== ПЕРЕКЛЮЧЕНИЕ ТАБОВ ==========
function switchTab(tabName) {
    currentTab = tabName;
    
    const friendsTab = document.getElementById('friends-tab');
    const diaryTab = document.getElementById('diary-tab');
    const friendsBtn = document.getElementById('tab-friends');
    const diaryBtn = document.getElementById('tab-diary');
    
    if (!friendsTab || !diaryTab || !friendsBtn || !diaryBtn) return;
    
    if (tabName === 'friends') {
        friendsTab.classList.add('active');
        diaryTab.classList.remove('active');
        friendsBtn.classList.add('active');
        diaryBtn.classList.remove('active');
        renderFriendRequests();
        renderLeaderboard();
        renderFriendResults();
        updateTeamProgress();
    } else {
        friendsTab.classList.remove('active');
        diaryTab.classList.add('active');
        friendsBtn.classList.remove('active');
        diaryBtn.classList.add('active');
        renderDiary();
    }
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
        renderInviteStats();
        renderFriendRequests();
        renderLeaderboard();
        renderFriendResults();
        updateTeamProgress();
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
        renderInviteStats();
        renderFriendRequests();
        renderLeaderboard();
        renderFriendResults();
        updateTeamProgress();
        if (currentTab === 'diary') {
            renderDiary();
        }
    } else if (currentSlide === 3) {
        renderCustomCreator();
        renderSavedWorkouts();
        renderActiveWorkout();
    } else if (currentSlide === 4) {
        renderPullupsSets();
        renderPushupsSets();
        renderMixedSets();
        updateStrengthProgress();
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
    
    // Инициализация силовых
    renderPullupsSets();
    renderPushupsSets();
    renderMixedSets();
    updatePullupsGoal();
    updatePushupsGoal();
    updateStrengthProgress();
    
    // ===== ИСПРАВЛЕННЫЕ ОБРАБОТЧИКИ ДЛЯ КНОПОК =====
    
    // Кнопки переключения типа тренировки
    document.querySelectorAll('.type-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const type = this.dataset.type;
            switchStrengthType(type);
        });
    });
    
    // Кнопка добавления подхода для подтягиваний
    const addPullupsBtn = document.getElementById('add-pullups-set');
    if (addPullupsBtn) {
        addPullupsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            addSet('pullups');
        });
    }
    
    // Кнопка добавления подхода для отжиманий
    const addPushupsBtn = document.getElementById('add-pushups-set');
    if (addPushupsBtn) {
        addPushupsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            addSet('pushups');
        });
    }
    
    // Кнопка добавления круга для комплекса
    const addMixedBtn = document.getElementById('add-mixed-set');
    if (addMixedBtn) {
        addMixedBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            addMixedSet();
        });
    }
    
    // Кнопка завершения силовой тренировки
    const completeStrengthBtn = document.getElementById('complete-strength-btn');
    if (completeStrengthBtn) {
        completeStrengthBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (!this.disabled) {
                completeStrengthWorkout();
            }
        });
    }
    
    // Обработчики для слайдеров цели
    const pullupsSlider = document.getElementById('pullups-goal-slider');
    if (pullupsSlider) {
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
        pushupsSlider.addEventListener('input', function() {
            const value = this.value;
            document.getElementById('pushups-goal-value').textContent = value;
            document.getElementById('pushups-goal').textContent = value;
            strengthToday.pushups.goal = parseInt(value);
            updatePushupsStats();
            saveState();
        });
    }
    
    // ===== ОСТАЛЬНЫЕ ОБРАБОТЧИКИ =====
    
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
            updateUserProfile();
            updateTeamProgress();
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
    
    // Кнопки приглашений
    const inviteBtn = document.getElementById('invite-friends-btn');
    if (inviteBtn) {
        inviteBtn.addEventListener('click', inviteFriend);
    }
    
    const copyBtn = document.getElementById('copy-invite-btn');
    if (copyBtn) {
        copyBtn.addEventListener('click', copyInviteLink);
    }
    
    const shareBtn = document.getElementById('share-progress-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', shareProgress);
    }
    
    // Кнопка отправки заявки в друзья
    const sendRequestBtn = document.getElementById('send-request-btn');
    if (sendRequestBtn) {
        sendRequestBtn.addEventListener('click', sendFriendRequest);
    }
    
    // Добавление друга по Enter
    const friendInput = document.getElementById('friend-username');
    if (friendInput) {
        friendInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendFriendRequest();
            }
        });
    }
    
    // Кнопка создания задания
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
                invitedFriends = [];
                bonusPoints = 0;
                
                // Сброс силовых
                totalPullups = 0;
                totalPushups = 0;
                strengthDays = 0;
                bestPullups = 0;
                bestPushups = 0;
                strengthToday = {
                    pullups: {
                        goal: 30,
                        sets: [{ reps: 10, completed: false }],
                        completed: false
                    },
                    pushups: {
                        goal: 50,
                        sets: [{ reps: 15, completed: false }],
                        completed: false
                    },
                    mixed: {
                        completed: false,
                        rounds: [
                            { pullups: 10, pushups: 20, pullupsCompleted: false, pushupsCompleted: false, completed: false },
                            { pullups: 8, pushups: 15, pullupsCompleted: false, pushupsCompleted: false, completed: false },
                            { pullups: 5, pushups: 10, pullupsCompleted: false, pushupsCompleted: false, completed: false }
                        ]
                    }
                };
                
                localStorage.clear();
                updateUI();
                updateStats();
                renderDiary();
                renderCustomCreator();
                renderSavedWorkouts();
                renderActiveWorkout();
                updateUserProfile();
                renderInviteStats();
                renderFriendRequests();
                renderLeaderboard();
                renderFriendResults();
                updateTeamProgress();
                
                // Обновляем силовые
                renderPullupsSets();
                renderPushupsSets();
                renderMixedSets();
                updateStrengthProgress();
                
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
            tg.showAlert(`💬 ${t('support')}: @frontendchikk`);
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
                tg.showAlert(t('entrySaved'));
                
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
    
    // Обработчики для периода в таблице лидеров
    document.querySelectorAll('.period-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.period-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            resultsPeriod = this.dataset.period;
            renderLeaderboard();
            renderFriendResults();
        });
    });
    
    // Проверка заявок
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
