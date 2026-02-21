let tg = window.Telegram.WebApp;
tg.expand();

// ========== ПРОСТЕЙШАЯ ЛОГИКА ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('Страница загружена');
    
    // ===== КНОПКА "НАЧАТЬ БЕГ" =====
    const startBtn = document.getElementById('start-day-btn');
    console.log('Кнопка найдена?', startBtn);
    
    if (startBtn) {
        startBtn.addEventListener('click', function() {
            console.log('КНОПКА НАЖАТА!');
            
            // Прячем стартовый экран
            document.getElementById('start-screen').style.display = 'none';
            
            // Показываем экран тренировки
            document.getElementById('marathon-screen').style.display = 'block';
            
            // Создаем тестовую тренировку
            const stepsContainer = document.getElementById('workout-steps');
            stepsContainer.innerHTML = `
                <div class="workout-step">
                    <input type="checkbox" class="workout-checkbox" id="step1">
                    <span class="step-text">🏋️ Разминка 10 минут</span>
                </div>
                <div class="workout-step">
                    <input type="checkbox" class="workout-checkbox" id="step2">
                    <span class="step-text">🏃 Бег 15 минут</span>
                </div>
                <div class="workout-step">
                    <input type="checkbox" class="workout-checkbox" id="step3">
                    <span class="step-text">🦵 Спец беговые упражнения</span>
                </div>
                <div class="workout-step">
                    <input type="checkbox" class="workout-checkbox" id="step4">
                    <span class="step-text">⚡ Ускорение 4х400 метров</span>
                </div>
            `;
            
            // Название тренировки
            document.getElementById('workout-name').textContent = "🔥 Сегодняшняя тренировка";
            
            // Сброс прогресса
            document.getElementById('workout-fill').style.width = '0%';
            document.getElementById('workout-percent').textContent = '0%';
            document.getElementById('complete-day-btn').disabled = true;
            
            // Добавляем обработчики на чекбоксы
            const checkboxes = document.querySelectorAll('.workout-checkbox');
            checkboxes.forEach(cb => {
                cb.addEventListener('change', function() {
                    // Считаем сколько отмечено
                    const checked = document.querySelectorAll('.workout-checkbox:checked').length;
                    const total = document.querySelectorAll('.workout-checkbox').length;
                    const progress = (checked / total) * 100;
                    
                    // Обновляем прогресс
                    document.getElementById('workout-fill').style.width = progress + '%';
                    document.getElementById('workout-percent').textContent = Math.round(progress) + '%';
                    
                    // Если все отмечены - активируем кнопку
                    if (checked === total) {
                        document.getElementById('complete-day-btn').disabled = false;
                    } else {
                        document.getElementById('complete-day-btn').disabled = true;
                    }
                });
            });
        });
    } else {
        console.error('Кнопка НЕ найдена! Проверь ID="start-day-btn"');
    }
    
    // ===== КНОПКА "ЗАВЕРШИТЬ ДЕНЬ" =====
    const completeBtn = document.getElementById('complete-day-btn');
    if (completeBtn) {
        completeBtn.addEventListener('click', function() {
            console.log('Завершение дня');
            
            // Получаем дистанцию (примерно)
            const distance = 3.6; // можно посчитать по шагам
            
            // Показываем экран завершения
            document.getElementById('marathon-screen').style.display = 'none';
            document.getElementById('congrats').style.display = 'block';
            document.getElementById('final-distance').textContent = distance.toFixed(1);
            
            // Таймер 24 часа (упрощенно)
            localStorage.setItem('day_completed', Date.now().toString());
        });
    }
    
    // ===== КНОПКА "НА ГЛАВНУЮ" =====
    const continueBtn = document.getElementById('continue-btn');
    if (continueBtn) {
        continueBtn.addEventListener('click', function() {
            console.log('Возврат на главную');
            
            // Прячем экран завершения
            document.getElementById('congrats').style.display = 'none';
            
            // Показываем стартовый экран
            document.getElementById('start-screen').style.display = 'block';
        });
    }
    
    // ===== МЕНЮ (ПРОСТОЕ) =====
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
    
    // Закрытие меню при клике вне
    document.addEventListener('click', function(e) {
        const menu = document.getElementById('menu-dropdown');
        const btn = document.getElementById('menu-btn');
        if (btn && menu && !btn.contains(e.target) && !menu.contains(e.target)) {
            menu.style.display = 'none';
            btn.classList.remove('active');
        }
    });
    
    // ===== НАВИГАЦИЯ =====
    window.switchPage = function(pageIndex) {
        const slides = document.querySelectorAll('.slide');
        const navButtons = document.querySelectorAll('.nav-btn');
        const container = document.getElementById('slidesContainer');
        
        container.scrollTo({
            left: pageIndex * container.clientWidth,
            behavior: 'smooth'
        });
        
        navButtons.forEach((btn, index) => {
            btn.classList.toggle('active', index === pageIndex);
        });
    };
    
    // ===== ТЕМЫ (ЗАГЛУШКИ) =====
    window.setTheme = function(theme) {
        console.log('Тема:', theme);
        document.documentElement.setAttribute('data-theme', theme);
    };
    
    window.setLanguage = function(lang) {
        console.log('Язык:', lang);
    };
    
    // ===== ДАТА =====
    function updateDate() {
        const now = new Date();
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        document.getElementById('current-date').textContent = now.toLocaleDateString('ru-RU', options);
    }
    updateDate();
    
    // Проверяем, не завершен ли был день
    const lastCompleted = localStorage.getItem('day_completed');
    if (lastCompleted) {
        const hoursPassed = (Date.now() - parseInt(lastCompleted)) / (1000 * 60 * 60);
        if (hoursPassed < 24) {
            const remaining = 24 - hoursPassed;
            const hours = Math.floor(remaining);
            const minutes = Math.ceil((remaining - hours) * 60);
            document.getElementById('time-info').textContent = `⏳ Следующий день через ${hours}ч ${minutes}м`;
            document.getElementById('start-day-btn').disabled = true;
        } else {
            localStorage.removeItem('day_completed');
        }
    }
    
    tg.ready();
});
