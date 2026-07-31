<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CYBERX AI - Профессиональная Тренировочная Платформа</title>
    <style>
        :root {
            --bg-dark: #04060a;
            --bg-sidebar: #080b12;
            --bg-card: rgba(15, 20, 31, 0.7);
            --bg-input: #121824;
            --border: rgba(40, 52, 74, 0.4);
            --text-main: #ffffff;
            --text-muted: #5e6573;
            --success: #00ff66;
            --accent: #00a3ff; /* Динамический неон из меню 30 цветов */
            --accent-glow: rgba(0, 163, 255, 0.35);
        }

        html, body {
            margin: 0; padding: 0; width: 100%; height: 100%;
            background: radial-gradient(circle at center, #0a101f 0%, #04060a 100%);
            color: var(--text-main); font-family: 'Segoe UI', Arial, sans-serif; overflow-x: hidden;
        }

        /* ПОЛНОЭКРАННАЯ ТРЁХКОЛОНОЧНАЯ СЕТКА CYBERX */
        .app-wrapper {
            display: grid;
            grid-template-columns: 260px 1fr 320px;
            min-height: 100vh;
            width: 100%;
        }
        @media(max-width: 1250px) { .app-wrapper { grid-template-columns: 240px 1fr; } .tiktok-sidebar { display: none; } }
        @media(max-width: 950px) { .app-wrapper { grid-template-columns: 1fr; } .sidebar { display: none; } }

        /* ЛЕВОЕ МЕНЮ САЙДБАРА */
        .sidebar { background-color: var(--bg-sidebar); border-right: 1px solid var(--border); padding: 25px 20px; display: flex; flex-direction: column; justify-content: space-between; }
        .sidebar-top { display: flex; flex-direction: column; gap: 30px; }
        .sidebar-logo-box { display: flex; align-items: center; gap: 12px; }
        .sidebar-logo { width: 40px; height: 40px; border-radius: 8px; background: linear-gradient(135deg, #ff5500, var(--accent)); display: flex; justify-content: center; align-items: center; font-weight: 900; font-size: 18px; box-shadow: 0 0 15px var(--accent-glow); transition: box-shadow 0.3s; }
        .sidebar-logo-text { font-size: 22px; font-weight: 900; letter-spacing: 1px; color: white; }
        .menu-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 25px; }
        .menu-label { font-size: 11px; font-weight: bold; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 5px; margin-left: 10px; }
        .menu-item { display: flex; align-items: center; gap: 12px; padding: 12px 15px; border-radius: 6px; color: #ced4da; text-decoration: none; font-weight: bold; font-size: 14px; transition: all 0.2s; cursor: pointer; border: none; background: none; width: 100%; text-align: left; }
        .menu-item:hover, .menu-item.active { background: var(--bg-card); color: white; border-left: 3px solid var(--accent); }
        .menu-premium { color: #ffd700 !important; background: rgba(255,215,0,0.02); border: 1px solid rgba(255,215,0,0.08); }

        /* ЦЕНТРАЛЬНАЯ РАБОЧАЯ ОБЛАСТЬ */
        .main-content { display: flex; flex-direction: column; padding: 30px; box-sizing: border-box; width: 100%; position: relative; }
        /* ВЕРХНЯЯ НАВИГАЦИЯ (ШАПКА) */
        .top-navbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 35px; background: var(--bg-sidebar); padding: 15px 30px; border-radius: 8px; border: 1px solid var(--border); width: 100%; box-sizing: border-box; }
        .navbar-actions { display: flex; align-items: center; gap: 15px; position: relative; }
        .btn-auth { padding: 12px 24px; border-radius: 4px; font-weight: bold; font-size: 13px; text-transform: uppercase; cursor: pointer; border: none; text-decoration: none; color: white; }
        .btn-steam { background-color: #1a9fff; box-shadow: 0 4px 15px rgba(26,159,255,0.2); }
        .btn-faceit { background-color: #ff5500; box-shadow: 0 4px 15px rgba(255,85,0,0.2); }
        .btn-donate { background: linear-gradient(90deg, #ffaa00, #ff5500); color: white; display: none; }
        .user-profile-tag { display: none; align-items: center; gap: 12px; background: var(--bg-input); padding: 8px 18px; border-radius: 4px; border: 1px solid var(--border); cursor: pointer; }
        .user-avatar-frame { width: 26px; height: 26px; border-radius: 50%; background: #161c28; border: 2px solid var(--accent); box-shadow: 0 0 8px var(--accent-glow); }
        .dropdown-menu { display: none; position: absolute; top: 55px; right: 280px; background: var(--bg-sidebar); border: 1px solid var(--border); border-radius: 6px; width: 220px; box-shadow: 0 10px 25px rgba(0,0,0,0.5); z-index: 100; padding: 10px 0; }
        .dropdown-item { padding: 12px 20px; font-size: 14px; font-weight: bold; color: #ced4da; cursor: pointer; }
        .dropdown-item:hover { background: var(--bg-card); color: white; }
        .custom-select { background: rgba(26, 31, 41, 0.95); color: white; border: 1px solid #333; padding: 11px 15px; border-radius: 5px; cursor: pointer; font-weight: bold; outline: none; font-size: 13px; }

        /* ИНТЕРАКТИВНАЯ СЕТКА РЕЖИМОВ */
        .modes-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(210px, 1fr)); gap: 20px; margin-bottom: 40px; width: 100%; }
        .mode-tile { background-color: var(--bg-card); border: 1px solid var(--border); backdrop-filter: blur(5px); border-radius: 8px; height: 150px; display: flex; flex-direction: column; justify-content: flex-end; padding: 20px; box-sizing: border-box; cursor: pointer; position: relative; transition: all 0.25s ease; background-size: cover; background-position: center; }
        .mode-tile:hover { transform: translateY(-4px); border-color: var(--accent); box-shadow: 0 8px 25px var(--accent-glow); }
        .mode-tile::before { content: ''; position: absolute; top:0; left:0; width:100%; height:100%; background: linear-gradient(0deg, rgba(4,6,10,0.95) 0%, rgba(4,6,10,0.1) 100%); border-radius: 7px; z-index: 1; }
        .mode-name { font-size: 17px; font-weight: 900; text-transform: uppercase; z-index: 2; letter-spacing: 0.5px; }
        .mode-online { font-size: 12px; color: #8a909d; z-index: 2; margin-top: 5px; display: flex; align-items: center; gap: 6px; }
        .online-dot { width: 6px; height: 6px; background-color: var(--success); border-radius: 50%; display: inline-block; box-shadow: 0 0 8px var(--success); }

        /* ИИ-ЭКРАН ВО ВЕСЬ ЭКРАН И ПАРЯЩИЕ БЛОКИ */
        .ai-fullscreen-container { display: none; flex-direction: column; align-items: center; justify-content: center; min-height: 60vh; width: 100%; position: relative; padding-top: 40px; }
        .top-tools-island { position: absolute; top: 0; right: 0; background: var(--bg-sidebar); border: 1px solid var(--border); padding: 10px 20px; border-radius: 8px; display: flex; gap: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.3); }
        .tool-icon-btn { font-size: 18px; color: white; cursor: pointer; user-select: none; opacity: 0.8; transition: opacity 0.2s; }
        .tool-icon-btn:hover { opacity: 1; text-shadow: 0 0 8px var(--accent); }

        /* ПАРЯЩИЕ ПОДСКАЗКИ */
        .ai-phrases-row { display: flex; gap: 12px; margin-bottom: 18px; flex-wrap: wrap; justify-content: center; }
        .phrase-badge { background: var(--bg-sidebar); border: 1px solid var(--border); padding: 10px 20px; border-radius: 20px; font-size: 13px; font-weight: bold; color: #ced4da; cursor: pointer; transition: all 0.2s; }
        .phrase-badge:hover { border-color: var(--accent); color: white; background: var(--bg-card); transform: translateY(-2px); }

        /* ЦЕНТРАЛЬНЫЙ ОСТРОВОК ВВОДА */
        .ai-center-island { background: var(--bg-sidebar); border: 2px solid var(--border); border-radius: 30px; width: 100%; max-width: 680px; display: flex; align-items: center; padding: 6px 15px; box-sizing: border-box; box-shadow: 0 8px 32px rgba(0,0,0,0.5); transition: border-color 0.2s; }
        .ai-center-island:focus-within { border-color: var(--accent); box-shadow: 0 0 20px var(--accent-glow); }
        .island-plus-btn { font-size: 22px; color: white; cursor: pointer; display: flex; align-items: center; justify-content: center; width: 35px; height: 35px; border-radius: 50%; background: rgba(255,255,255,0.05); transition: background 0.2s; margin-right: 10px; }
        .island-plus-btn:hover { background: var(--accent); }
        .island-input { flex: 1; background: none; border: none; outline: none; color: white; font-size: 15px; font-weight: 500; padding: 10px 5px; }
        .island-mic-btn { font-size: 18px; color: var(--text-muted); cursor: pointer; margin-right: 15px; transition: color 0.2s; }
        .island-mic-btn:hover { color: #ff5500; }
        .island-send-btn { background: var(--accent); border: none; outline: none; width: 38px; height: 35px; border-radius: 50%; color: white; font-size: 16px; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px var(--accent-glow); }

        /* ОКНО ИИ-ОТВЕТОВ И КАРТОЧКИ FACEIT */
        .ai-output-terminal { display: none; background: var(--bg-card); border: 1px solid var(--border); border-radius: 10px; width: 100%; max-width: 780px; padding: 25px; margin-top: 30px; box-sizing: border-box; box-shadow: 0 10px 30px rgba(0,0,0,0.4); }
        .stats-display-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 15px; margin-top: 20px; }
        .stat-param-box { background: var(--bg-input); border: 1px solid var(--border); border-radius: 6px; padding: 15px; display: flex; flex-direction: column; gap: 8px; position: relative; }
        .faceit-badge-tag { font-size: 11px; font-weight: 900; letter-spacing: 0.5px; padding: 3px 8px; border-radius: 4px; background: rgba(255,85,0,0.15); color: #ff5500; border: 1px solid rgba(255,85,0,0.3); align-self: flex-start; }

        .cabinet-box { background: var(--bg-input); border: 1px solid var(--border); border-radius: 8px; padding: 25px; margin-bottom: 20px; }
        .demo-item-row { display: flex; justify-content: space-between; align-items: center; background: var(--bg-dark); padding: 15px 20px; border-radius: 6px; margin-bottom: 12px; border: 1px solid var(--border); }
        .btn-delete-demo { background: rgba(255,68,68,0.1); color: #ff4444; border: 1px solid rgba(255,68,68,0.2); padding: 6px 12px; border-radius: 4px; cursor: pointer; font-weight: bold; }
        .btn-delete-demo:hover { background: #ff4444; color: white; }
        .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(5, 7, 10, 0.95); display: none; justify-content: center; align-items: center; z-index: 99999; }
        .modal-card { background: var(--bg-card); border: 2px solid var(--border); box-shadow: 0 0 40px rgba(0, 163, 255, 0.2); border-radius: 10px; padding: 40px; width: 100%; max-width: 420px; text-align: center; position: relative; }
        .modal-card-title { font-size: 22px; font-weight: bold; margin-bottom: 25px; text-transform: uppercase; }
        .bottom-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 25px; margin-top: 40px; width: 100%; box-sizing: border-box; }
        .bottom-card { background: var(--bg-sidebar); border: 1px solid var(--border); border-radius: 8px; padding: 25px; }
        .bottom-card h4 { margin-top: 0; margin-bottom: 12px; text-transform: uppercase; font-size: 15px; color: var(--accent); }
        .bottom-card p { font-size: 13px; color: #8a909d; line-height: 1.5; margin: 0; }
        .input-field { width: 100%; background: var(--bg-input); border: 1px solid #333; padding: 12px; border-radius: 5px; color: white; font-size: 15px; box-sizing: border-box; margin-bottom: 15px; outline: none; }
    </style>
</head>
<body>
    <div class="app-wrapper">
        <!-- ЛЕВОЕ ВЕРТИКАЛЬНОЕ МЕНЮ CYBERX -->
        <div class="sidebar">
            <div class="sidebar-top">
                <div class="sidebar-logo-box">
                    <div class="sidebar-logo">CX</div>
                    <div class="sidebar-logo-text">CYBERX AI</div>
                </div>
                <div class="menu-group">
                    <div class="menu-label" id="lbl_play">Режимы и Карты</div>
                    <button class="menu-item active" id="m_modes" onclick="showSection('modes')">🎮 Игровые режимы</button>
                    <button class="menu-item" id="m_matches" onclick="showSection('matches')">⚔️ Разбор демок / Архив</button>
                </div>
                <div class="menu-group">
                    <div class="menu-label" id="lbl_services">ИИ Сервисы</div>
                    <button class="menu-item" id="m_ai" onclick="showSection('trainer')">🤖 ИИ Чат-Хаб</button>
                    <button class="menu-item menu-premium" onclick="alert('👑 PREMIUM активирует 40 параметров оценки и убирает лимиты!')">👑 Спец. Развитие</button>
                </div>
            </div>
            <div style="font-size: 11px; color: var(--text-muted); text-align: center;">© 2026 CYBERX Ecosystem</div>
        </div>

        <!-- ЦЕНТРАЛЬНЫЙ БЛОК КОНТЕНТА -->
        <div class="main-content">
            <!-- НАВБАР, СЕЛЕКТОРЫ ПАЛИТРЫ И ЦВЕТОВ -->
            <div class="top-navbar">
                <div style="font-weight: 900; font-size: 20px; text-transform: uppercase; letter-spacing: 0.5px;" id="nav_title">Профессиональная тренировка</div>
                <div class="navbar-actions">
                    <button class="btn-auth btn-donate" id="btnDonate" onclick="alert('Окно пополнения баланса: Введите сумму для покупки PREMIUM статуса на сервере CYBERX...')">Задонатить 💎</button>
                    <div class="user-profile-tag" id="userTag" onclick="toggleUserDropdown()">
                        <div class="user-avatar-frame"></div>
                        <b id="userNick">Gamer</b>
                    </div>
                    <div class="dropdown-menu" id="userDropdownMenu">
                        <div class="dropdown-item" id="opt_set" onclick="alert('⚙️ Настройки аккаунта: Смена рамки, привязка Discord и Steam API.')">⚙️ Настройки</div>
                        <div class="dropdown-item" id="opt_hist" onclick="showSection('matches')">📊 История матчей</div>
                        <div class="dropdown-item" id="opt_don" onclick="alert('💳 История донатов пуста. Баланс: 0 💎')">💳 История донатов</div>
                        <div class="dropdown-item" style="color:#ff4444;" onclick="logout()">Выйти</div>
                    </div>
                    <button class="btn-auth btn-steam" id="b_steam" onclick="openRegister()">Войти через STEAM</button>
                    <button class="btn-auth btn-faceit" id="b_faceit" onclick="openRegister()">Войти через FACEIT</button>
                    
                    <select class="custom-select" id="colorSelect" onchange="changeWebsiteColor()">
                        <option value="#00a3ff">🔵 Голубой Неон</option><option value="#ff5500">🟠 Оранжевый Матовый</option><option value="#00ff66">🟢 Изумрудный</option><option value="#ff0055">🔴 Рубиновый</option><option value="#ae00ff">🟣 Фиолетовый</option><option value="#ffea00">🟡 Кислотно-Желтый</option><option value="#00ffff">💎 Бирюзовый</option><option value="#ff00aa">🌸 Розовый фуксия</option><option value="#ffffff">⚪ Белый Матовый</option><option value="#777777">⚫ Темно-Серый</option><option value="#55ff00">🍏 Салатовый</option><option value="#0022ff">🐳 Ультрамарин</option><option value="#ff8800">🥭 Манго</option><option value="#bfff00">🌟 Лайм</option><option value="#9900ff">🔮 Аметист</option><option value="#00ffaa">🧪 Мятный неон</option><option value="#ff3300">🔥 Огненный красный</option><option value="#00e5ff">🌊 Морская волна</option><option value="#d4af37">🔱 Золотой металлик</option><option value="#c0c0c0">🥈 Серебряный</option><option value="#ff00ff">🍇 Маджента</option><option value="#44ee44">🌲 Лесной зеленый</option><option value="#ff6600">💥 Оранжевый взрыв</option><option value="#0088ff">🌌 Глубокий космос</option><option value="#ccff00">🥎 Флуоресцентный</option><option value="#ff00cc">⚡ Пурпурная искра</option><option value="#33ff99">⛳ Светло-зеленый</option><option value="#99ccff">❄️ Ледяной синий</option><option value="#ff9999">🎈 Нежно-розовый</option><option value="#66fffa">🛸 Электрик</option>
                    </select>
                    <select class="custom-select" id="langSelect" onchange="changeLanguage()">
                        <option value="ru">🇷🇺 Русский</option><option value="en">🇺🇸 English</option><option value="de">🇩🇪 Deutsch</option><option value="zh">🇨🇳 中文</option><option value="pl">🇵🇱 Polski</option>
                    </select>
                </div>
            </div>
            <!-- ИГРОВЫЕ ПЛИТКИ CS2 -->
            <div id="sec_modes"><div class="modes-grid" id="modesGrid"></div></div>

            <!-- УЛЬТИМАТИВНЫЙ ИИ-ЭКРАН С ОСТРОВКАМИ ВО ВЕСЬ ЭКРАН -->
            <div class="ai-fullscreen-container" id="sec_trainer">
                <!-- ПРАВЫЙ ВЕРХНИЙ ИНСТРУМЕНТАЛЬНЫЙ ОСТРОВОК -->
                <div class="top-tools-island">
                    <div class="tool-icon-btn" title="Переделать / Перестроить" onclick="alert('🔄 ИИ-Пересборка: Нейросеть сбросила текущие веса и адаптирует тактики под новые изменения в патче CS2!')">📝</div>
                    <div class="tool-icon-btn" title="Все оценки и параметры" onclick="triggerReadyPhrase('📈 Статистика всех игр')">☰</div>
                </div>

                <!-- ПАРЯЩИЕ ГОТОВЫЕ ФРАЗЫ-ПОДСКАЗКИ -->
                <div class="ai-phrases-row">
                    <div class="phrase-badge" onclick="triggerReadyPhrase('📊 Статистика последней игры')">📊 Статистика последней игры</div>
                    <div class="phrase-badge" onclick="triggerReadyPhrase('📈 Статистика всех игр')">📈 Статистика всех игр</div>
                    <div class="phrase-badge" onclick="triggerReadyPhrase('🏋️‍♂️ Персональная тренировка')">🏋️‍♂️ Персональная тренировка</div>
                </div>

                <!-- ЦЕНТРАЛЬНЫЙ ИНТЕРАКТИВНЫЙ ОСТРОВОК ВВОДА -->
                <div class="ai-center-island">
                    <label class="island-plus-btn" title="Загрузить .dem демку матча (Лимит 50)">
                        ⊕ <input type="file" id="demoFileInput" style="display:none;" onchange="handleDemoUpload(this)">
                    </label>
                    <input type="text" class="island-input" id="islandInputField" placeholder="Задай любой вопрос ИИ или нажми на готовую фразу выше...">
                    <div class="island-mic-btn" title="Голосовой ввод" onclick="alert('🎤 Микрофон активирован. ИИ-хаб CYBERX слушает твой голос и анализирует произношение...')">🎤</div>
                    <button class="island-send-btn" title="Отправить" onclick="sendIslandQuery()">➔</button>
                </div>

                <!-- ОКНО ВЫВОДА ТЕРМИНАЛА ИИ С ОЦЕНКАМИ FACEIT -->
                <div class="ai-output-terminal" id="aiTerminal">
                    <div id="aiTextReply" style="font-size:15px; line-height:1.6; border-bottom:1px solid var(--border); padding-bottom:15px; margin-bottom:15px;"></div>
                    <div class="stats-display-grid" id="terminalStatsGrid"></div>
                </div>
            </div>

            <!-- ОКНО АРХИВА ДЕМОК -->
            <div class="ai-window" id="sec_matches">
                <div class="window-header"><h3 class="window-title" id="t_m_h">⚔️ АРХИВ РАЗБОРОВ МАТЧЕЙ (ЛИМИТ 50)</h3><b style="color:var(--accent)" id="demoCounterLabel">Загружено разборов: 2 / 50</b></div>
                <div class="cabinet-box" style="border: 2px dashed var(--border); text-align:center; padding:30px 20px;">
                    <p style="font-size:15px; font-weight:bold; margin-bottom:15px;" id="t_m_upload">Загрузить файл игры .dem для разбора ИИ</p>
                    <input type="file" id="demoFile" style="margin-bottom:15px;"><br>
                    <button class="btn-auth btn-steam" onclick="startDemoAnalysis()" id="t_m_btn">Запустить ИИ-Анализ демки</button>
                </div>
                <div id="analysisProgress" style="display:none; text-align:center; padding:15px; background:var(--bg-input); border-radius:6px; font-weight:bold; color:var(--accent); margin-bottom:20px;"></div>
                <div id="demoArchiveList">
                    <div class="demo-item-row" id="demo_1"><div><b>📅 de_mirage (13:9 Победа)</b> — <span style="color:var(--success)">11 Уровень ИИ (2450 ELO)</span><br><small style="color:var(--text-muted)">Глобальный совет: Отыграл плохо, пик на 1 минуте 41 секунде был не так хорош.</small></div><button class="btn-delete-demo" onclick="deleteDemoRecord('demo_1')">Удалить разбор</button></div>
                </div>
            </div>

            <!-- ИНФО-ПОДВАЛ БЕЗОПАСНОСТИ И ФОРМА ТЕЛЕГРАМА -->
            <div class="bottom-row" style="margin-top:auto;">
                <div class="bottom-card"><h4>🔒 Конфиденциальность</h4><p>Ваши личные данные и API-токены защищены шифрованием AES-256.</p></div>
                <div class="bottom-card"><h4>🛡️ Безопасность сайта</h4><p>Авторизация через защищенный протокол Steam OpenID.</p></div>
                <div class="bottom-card">
                    <h4>✉️ Пожелания и идеи</h4>
                    <input type="text" class="input-field" style="margin:0 0 10px 0; padding:10px;" id="wishTextInput" placeholder="Какую фишку добавить на сервер?">
                    <button class="btn-auth btn-faceit" style="padding:10px; font-size:12px; width:100%;" onclick="sendWishToBackend()" id="wishSubmitBtn">Отправить</button>
                </div>
            </div>
        </div>

        <!-- ПРАВАЯ ИНТЕРАКТИВНАЯ ЛЕНТА TIKTOK С ОБЛОЖКАМИ И ТУРНИРАМИ -->
        <div class="tiktok-sidebar">
            <div class="tiktok-title">🔥 ТИКТОК МИНИ-ЭДИТЫ И ТУРНИРЫ</div>
            
            <div class="tiktok-video-card" style="background-image: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(4,6,10,0.9) 100%), url('https://unsplash.com'); background-size: cover; background-position: center;" onclick="playTiktokVideo('Турнирный эдит: Сумасшедший Ace-хайлайт с гранд-финала PGL Major от m0NESY!')">
                <div style="position:absolute; top:12px; left:12px; background:#ff5500; padding:4px 8px; border-radius:4px; font-size:11px; font-weight:900; color:white; box-shadow:0 0 10px rgba(255,85,0,0.4);">🏆 IEM LAN TOUR</div>
                <div style="font-size:26px; z-index:2; text-shadow:0 0 12px #000; color:white;">▶️</div>
                <div class="tiktok-overlay-info">@cyberx_tournaments<br>📈 142.5K • s1mple vs G2 Clutch</div>
            </div>

            <div class="tiktok-video-card" style="background-image: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(4,6,10,0.9) 100%), url('https://unsplash.com'); background-size: cover; background-position: center;" onclick="playTiktokVideo('Платформенный эдит: Ультра-скоростные стрейфы и флики с AWP на серверах CYBERX от Hillemoon!')">
                <div style="position:absolute; top:12px; left:12px; background:var(--accent); padding:4px 8px; border-radius:4px; font-size:11px; font-weight:900; color:white; box-shadow:0 0 10px var(--accent-glow);">⚡ CYBERX HIGH ACE</div>
                <div style="font-size:26px; z-index:2; text-shadow:0 0 12px #000; color:white;">▶️</div>
                <div class="tiktok-overlay-info">@cyberx_platform<br>👁️ 89.2K • Разбор контроля спрея</div>
            </div>
        </div>
    </div>
    <!-- МОДАЛКА СОЗДАНИЯ ПРОФИЛЯ ПОД ЛЮБЫМ НИКОМ -->
    <div class="modal-overlay" id="regModal">
        <div class="modal-card">
            <div class="close-modal" onclick="closeRegister()">&times;</div>
            <div class="modal-card-title" id="modal_reg_t">Создание игрового аккаунта</div>
            <input type="text" class="input-field" id="usernameInput" placeholder="Введи любой никнейм">
            <button class="btn-auth btn-faceit" style="width:100%" onclick="submitRegister()" id="modal_reg_btn">Создать профиль</button>
        </div>
    </div>

    <script>
        // Дефолтные тренировочные плитки серверов CYBERX
        const modesData = [
            { name: "Шарики DM", url: "https://cybershok.net", online: "742 онлайн" },
            { name: "Matches 5v5", url: "https://cybershok.net", online: "142 онлайн" },
            { name: "Duels 1v1", url: "https://cybershok.net", online: "311 онлайн" },
            { name: "Retake Сервер", url: "https://cybershok.net", online: "281 онлайн" }
        ];
        
        let totalDemosCount = 1;
        let isLoggedIn = false;

        // ИНТЕРАКТИВНЫЙ ПЛЕЕР ТУРНИРНЫХ И ПЛАТФОРМЕННЫХ ЭДИТОВ TIKTOK
        function playTiktokVideo(titleInfo) {
            alert(`🎬 CYBERX HD-Плеер: Запуск видео...\n\n${titleInfo}\n\n[Турнирный эдит успешно воспроизводится в фоновом режиме]`);
        }

        // ПЕРЕКЛЮЧАТЕЛЬ 30 НЕОНОВЫХ ЦВЕТОВ ОФОРМЛЕНИЯ ПЛАТФОРМЫ
        function changeWebsiteColor() {
            const selectedColor = document.getElementById('colorSelect').value;
            document.documentElement.style.setProperty('--accent', selectedColor);
            document.documentElement.style.setProperty('--accent-glow', selectedColor + '44');
            document.querySelector('.sidebar-logo').style.boxShadow = `0 0 15px ${selectedColor}`;
        }
        // ОТПРАВКА СВОБОДНЫХ ВОПРОСОВ ИЗ ЦЕНТРАЛЬНОГО ОСТРОВКА К БЭКЕНДУ
        async function sendIslandQuery(customText = null) {
            const inputField = document.getElementById('islandInputField');
            const queryText = customText || inputField.value.trim();
            const terminal = document.getElementById('aiTerminal');
            const textReply = document.getElementById('aiTextReply');
            const grid = document.getElementById('terminalStatsGrid');

            if(!queryText) { alert('Введите ваш тактический вопрос к ИИ или выберите парящую подсказку выше!'); return; }

            textReply.innerHTML = "<b>🤖 CYBERX ИИ сканирует логи и высчитывает 40 параметров оценки... Пожалуйста, подождите.</b>";
            terminal.style.display = 'block';
            if(!customText) inputField.value = '';

            try {
                const response = await fetch('/api/island-query', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ query: queryText })
                });
                const data = await response.json();

                if(response.ok && data.success) {
                    textReply.innerHTML = data.response;
                    grid.innerHTML = '';

                    if(data.showStats && data.statsData) {
                        const params = data.statsData.params;
                        for(let name in params) {
                            const box = document.createElement('div');
                            box.className = 'stat-param-box';
                            box.innerHTML = `
                                <b style="font-size:14px; color:#fff;">${name}</b>
                                <span style="font-size:18px; font-weight:900; color:var(--accent); margin:5px 0;">${params[name].elo} ELO</span>
                                <div class="faceit-badge-tag">${params[name].badge}</div>
                            `;
                            grid.appendChild(box);
                        }
                    }
                } else {
                    textReply.innerHTML = `<span style="color:#ff4444;">Ошибка: ${data.error || 'Не удалось обработать запрос.'}</span>`;
                }
            } catch (e) {
                textReply.innerHTML = "<span style='color:#ff4444;'>Ошибка связи: Сервер бэкенда проверяет логи. Убедитесь, что вы авторизованы и Vercel обновил api/server.js.</span>";
            }
        }

        function triggerReadyPhrase(text) {
            if(!isLoggedIn) { openRegister(); return; }
            document.getElementById('islandInputField').value = text;
            sendIslandQuery(text);
        }

        function handleDemoUpload(input) {
            if(!isLoggedIn) { openRegister(); return; }
            if(!input.files.length) return;
            const filename = input.files[0].name;
            document.getElementById('islandInputField').value = `Анализ файла: ${filename}`;
            alert(`⊕ Файл ${filename} успешно загружен в буфер CYBERX! Нажмите кнопку отправки (➔), чтобы запустить 12 уровней ИИ-оценки по 40 параметрам.`);
        }

        // ЖЕЛЕЗНАЯ СВЯЗЬ ФОРМЫ ПОЖЕЛАНИЙ С ТЕЛЕГРАМОМ КИРИЛЛА
        async function sendWishToBackend() {
            const inputField = document.getElementById('wishTextInput');
            const wishText = inputField.value.trim();
            const submitBtn = document.getElementById('wishSubmitBtn');
            const userNickName = isLoggedIn ? document.getElementById('userNick').innerText : 'Анонимный Геймер';

            if(!wishText) { alert('Пожалуйста, напишите ваше пожелание перед отправкой!'); return; }
            submitBtn.disabled = true; submitBtn.innerText = 'Отправка...';

            try {
                const response = await fetch('/api/wish', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nickname: userNickName, text: wishText })
                });
                const data = await response.json();
                if(response.ok && data.success) {
                    alert('🔥 Пожелание успешно улетело Кириллу в Telegram!');
                    inputField.value = '';
                } else {
                    alert('Анти-спам лимит сервера. Подождите 15 секунд.');
                }
            } catch (error) {
                alert('Ошибка соединения с сервером бэкенда.');
            } finally {
                submitBtn.disabled = false; submitBtn.innerText = 'Отправить';
            }
        }

        // ОСТАЛЬНЫЕ СИСТЕМНЫЕ ФУНКЦИИ ИНТЕРФЕЙСА
        function changeLanguage() {
            const lang = document.getElementById('langSelect').value;
            const t = trans[lang] || trans['ru'];
            document.getElementById('nav_title').innerText = t.title;
            document.getElementById('lbl_play').innerText = t.play;
            document.getElementById('lbl_services').innerText = t.serv;
            document.getElementById('m_modes').innerText = t.m1;
            document.getElementById('m_matches').innerText = t.m2;
            document.getElementById('m_ai').innerText = t.m4;
            drawGrid(t.circles);
        }
        function drawGrid(titles) {
            const grid = document.getElementById('modesGrid'); grid.innerHTML = '';
            modesData.forEach((m, i) => {
                const el = document.createElement('div'); el.className = 'mode-tile'; el.style.backgroundImage = `url('${m.url}')`;
                el.onclick = () => { if(!isLoggedIn) { openRegister(); } else { alert('Подключение к тренировочному серверу CYBERX... connect 185.189.15.42:27015'); } };
                el.innerHTML = `<div class="mode-name">${titles[i] || m.name}</div><div class="mode-online"><span class="online-dot"></span>${m.online}</div>`;
                grid.appendChild(el);
            });
        }
        function openRegister() { document.getElementById('regModal').style.display = 'flex'; }
        function closeRegister() { document.getElementById('regModal').style.display = 'none'; }
        function toggleUserDropdown() { const m = document.getElementById('userDropdownMenu'); m.style.display = m.style.display === 'block' ? 'none' : 'block'; }
        
        function showSection(id) {
            document.getElementById('sec_trainer').style.display = 'none'; 
            document.getElementById('sec_modes').style.display = 'none'; 
            document.getElementById('sec_matches').style.display = 'none';
            document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
            
            if(id === 'modes') { 
                document.getElementById('sec_modes').style.display = 'block'; 
                document.getElementById('m_modes').classList.add('active'); 
            } else if(id === 'matches') {
                document.getElementById('sec_matches').style.display = 'block';
                document.getElementById('m_matches').classList.add('active');
            } else { 
                document.getElementById('sec_trainer').style.display = 'flex'; 
                document.getElementById('m_ai').classList.add('active'); 
            }
        }
        
        function submitRegister() {
            const nick = document.getElementById('usernameInput').value || "Hillemoongg";
            document.getElementById('userNick').innerText = nick; document.getElementById('b_steam').style.display = 'none'; document.getElementById('b_faceit').style.display = 'none'; document.getElementById('btnDonate').style.display = 'inline-block'; document.getElementById('userTag').style.display = 'flex'; isLoggedIn = true; closeRegister(); showSection('trainer');
        }
        function logout() { isLoggedIn = false; document.getElementById('userTag').style.display = 'none'; document.getElementById('userDropdownMenu').style.display = 'none'; document.getElementById('btnDonate').style.display = 'none'; document.getElementById('b_steam').style.display = 'block'; document.getElementById('b_faceit').style.display = 'block'; showSection('modes'); }

        function startDemoAnalysis() {
            const file = document.getElementById('demoFile').value; if(!file) { alert('Выберите .dem файл!'); return; }
            const prog = document.getElementById('analysisProgress'); prog.style.display = 'block'; let pct = 0;
            const interval = setInterval(() => {
                pct += 25; prog.innerText = `ИИ считывает 40 параметров оценки и тики матча... Прогресс: ${pct}%`;
                if(pct >= 100) { clearInterval(interval); prog.innerText = "ИИ-Анализ завершен! Новый отчет добавлен в твой личный архив ниже."; addNewDemoToArchive(); }
            }, 500);
        }
        function addNewDemoToArchive() {
            if(totalDemosCount >= 50) { alert('Лимит архива 50 демок исчерпан! Удалите старые разборы.'); return; }
            totalDemosCount++; document.getElementById('demoCounterLabel').innerText = `Загружено разборов: ${totalDemosCount} / 50`;
            const list = document.getElementById('demoArchiveList'); const row = document.createElement('div'); row.className = 'demo-item-row'; row.id = `demo_${totalDemosCount}`;
            row.innerHTML = `<div><b>📅 Загруженный матч #${totalDemosCount}</b> — <span style="color:var(--accent)">12 Уровень ИИ (2600 ELO)</span><br><small style="color:var(--text-muted)">Глобальный совет за неделю: Точность хедшотов идеальна. Пик на 3-й минуте был не так хорош, контролируй углы.</small></div><button class="btn-delete-demo" onclick="deleteDemoRecord('demo_${totalDemosCount}')">Удалить разбор</button>`;
            list.insertBefore(row, list.firstChild);
        }
        function deleteDemoRecord(id) {
        function deleteDemoRecord(id) {
            const el = document.getElementById(id);
            if (el) {
                el.remove();
                totalDemosCount--;
                document.getElementById('demoCounterLabel').innerText = `Загружено разборов: ${totalDemosCount} / 50`;
                alert('Разбор матча успешно удален из памяти архива.');
            }
        }

        const trans = {
            ru: { 
                title: "Выбор режима игры", 
                play: "Режимы и Карты", 
                serv: "ИИ Сервисы", 
                m1: "🎮 Игровые режимы", 
                m2: "⚔️ Разбор демок / Архив", 
                m4: "🤖 ИИ Чат-Хаб", 
                circles: ["Шарики DM", "Matches 5v5", "Duels 1v1", "Retake Сервер"] 
            },
            en: { 
                title: "Select Training Mode", 
                play: "Modes & Maps", 
                serv: "AI Services", 
                m1: "🎮 Game Modes", 
                m2: "⚔️ Demos / Archive", 
                m4: "🤖 AI Chat-Hub", 
                circles: ["Balls DM", "Matches 5v5", "Duels 1v1", "Retake Server"] 
            }
        };

        const extraCodes = ["de","zh","pl","fr","es","it","tr","uk","pt","nl","sv","fi","no","da","cs","hu","ro","bg","el","ar","he","hi","ja","ko","th","vi","id","ms"];
        
        extraCodes.forEach(c => { 
            if (!trans[c]) { 
                trans[c] = JSON.parse(JSON.stringify(trans["en"])); 
                trans[c].title += ` (${c.toUpperCase()})`; 
            } 
        });

        changeLanguage();
    </script>
</body>
</html>
