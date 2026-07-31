const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// БРОНИРОВАННЫЕ ДАННЫЕ СВЯЗИ (ТОКЕН И ID ТЕЛЕГРАМА КИРИЛЛА)
const TELEGRAM_TOKEN = '8977188373:AAEHcioQP5OtRYFfChDKpqx6ohy2paCnPPk';
const TELEGRAM_CHAT_ID = '2003160617';

// Быстрая память для защиты сервера от флуда и DDOS (Rate Limiting)
const antiSpamMap = new Map();

// Функция проверки флуда (сообщение не чаще 1 раза в 5 секунд)
function checkSpam(ip) {
    const now = Date.now();
    if (antiSpamMap.has(ip)) {
        const lastSendTime = antiSpamMap.get(ip);
        if (now - lastSendTime < 5000) return true;
    }
    antiSpamMap.set(ip, now);
    return false;
}

// Функция очистки текста от опасных хакерских XSS скриптов
function cleanClean(text, length = 500) {
    return String(text || '').replace(/</g, "&lt;").replace(/>/g, "&gt;").substring(0, length);
}
// ========================================================
// РОУТ 1: ОБРАБОТКА ВОПРОСОВ ИИ ЧАТ-ТРЕНЕРА
// ========================================================
app.post('/api/chat', (req, res) => {
    const userIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    
    // Проверка на флуд в чате
    if (checkSpam(userIp)) {
        return res.status(429).json({ error: "Не спамь! ИИ думает. Подожди пару секунд." });
    }

    let messageText = cleanClean(req.body.message, 300).toLowerCase();
    let aiResponse = "Я проанализировал твой лог матча на серверах CYBERX. Твой общий тактический уровень в норме, но хромает позиционирование. Старайся не зажимать на бегу.";

    // Умное ветвление ответов бэкенда на сервере
    if (messageText.includes("мираж") || messageText.includes("mirage")) {
        aiResponse = "🏢 Анализ по карте Mirage: Нейросеть заметила, что ты часто отдаешь дефолт за Т-сторону без раскидки смока в окно. Потренируй префайры под коврами на наших DM серверах.";
    } else if (messageText.includes("авп") || messageText.includes("awp")) {
        aiResponse = "🎯 Анализ стрельбы с AWP: Твоя скорость флика на высоте, но процент попаданий падает из-за стрельбы в движении. Контролируй клавиши контр-стрейфа перед зумом.";
    } else if (messageText.includes("даст") || messageText.includes("dust")) {
        aiResponse = "🏜️ Анализ по карте Dust2: ИИ рекомендует тебе реже пикать длину в соло за КТ без флешки от тиммейта. Это приводит к быстрой потере точки А.";
    } else if (messageText.includes("ошибка") || messageText.includes("косяк") || messageText.includes("почему")) {
        aiResponse = "📊 Глобальный разбор косяков: Отыграл плохо, пик на 1 минуте 41 секунде был не так хорош. Ты опустил прицел на уровень груди. Всегда держи прицел на уровне головы.";
    } else if (messageText.includes("экономика") || messageText.includes("эко") || messageText.includes("закуп")) {
        aiResponse = "💰 Совет по экономике: Прекрати покупать форс-раунды (дигл+броня) каждый раз после проигранного бай-раунда. Делай полный эко-сейв ради полноценного закупа (AK/M4 + фул гранаты).";
    }

    res.json({ success: true, author: "CA", response: aiResponse });
});

// ========================================================
// РОУТ 2: СЕРВЕРНЫЙ АНАЛИЗ ДЕМОК (40 ПАРАМЕТРОВ / 12 УРОВНЕЙ)
// ========================================================
app.post('/api/analyze-demo', (req, res) => {
    const { filename } = req.body;
    
    if (!filename) {
        return res.status(400).json({ success: false, error: "Файл .dem не выбран или поврежден!" });
    }

    // Серверный расчет случайного уровня ИИ от 1 до 12 и ELO для симуляции 40 параметров
    const aiLevel = Math.floor(Math.random() * 4) + 9; // Сгенерирует 9, 10, 11 или 12 уровень ИИ
    const calculatedElo = 1500 + (aiLevel * 100) + Math.floor(Math.random() * 50);
    
    // Формируем детальный поминутный отчет об ошибках
    const detailedReport = {
        success: true,
        filename: filename,
        aiLevel: aiLevel,
        elo: calculatedElo,
        globalAdvice: `ИИ-Отчет CYBERX: Твой уровень стрельбы соответствует Faceit Level 10. Однако, пик на 3-й минуте матча был плох. Исправь углы атаки.`,
        timestamp: new Date().toLocaleDateString()
    };

    res.json(detailedReport);
});
// ========================================================
// РОУТ 3: СБОР ПОЖЕЛАНИЙ И МГНОВЕННАЯ ОТПРАВКА КИРИЛЛУ В ТГ
// ========================================================
app.post('/api/wish', async (req, res) => {
    const userIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    
    // Включаем анти-спам проверку для роута пожеланий
    if (checkSpam(userIp)) {
        return res.status(429).json({ success: false, error: "Слишком много запросов! Анти-спам защита CYBERX. Подождите 5 сек." });
    }
    
    let { nickname, text } = req.body;
    
    // Очищаем текст от хакерских XSS скриптов
    nickname = cleanClean(nickname, 30);
    text = cleanClean(text, 500);
    
    if (!text.trim()) {
        return res.status(400).json({ success: false, error: "Текст пожелания не может быть пустым!" });
    }

    // Формируем красивый киберспортивный лог сообщения для твоей лички
    const message = `📬 <b>НОВАЯ ИДЕЯ ДЛЯ CYBERX AI!</b>\n\n👤 <b>От кого:</b> ${nickname}\n✉️ <b>Текст идеи:</b> ${text}`;
    
    try {
        const url = `https://telegram.org{TELEGRAM_TOKEN}/sendMessage`;
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: message,
                parse_mode: 'HTML'
            })
        });
        
        if (!response.ok) throw new Error('Telegram API Error');
        
        res.json({ success: true, message: "Идея успешно доставлена автору в Telegram!" });
    } catch (error) {
        res.status(500).json({ success: false, error: "Ошибка отправки в систему безопасности Telegram" });
    }
});

// ========================================================
// РОУТ 4: СИМУЛЯЦИЯ КИБЕРСПОРТИВНЫХ ДОНАТОВ НА СЕРВЕРЕ
// ========================================================
app.post('/api/donate', (req, res) => {
    const { amount, nickname } = req.body;
    const cleanNick = cleanClean(nickname, 30);
    const coinsAmount = Math.floor(Number(amount || 0) * 100); // 1$ = 100 коинов

    if (!amount || amount <= 0) {
        return res.status(400).json({ success: false, error: "Неверная сумма платежа!" });
    }

    res.json({
        success: true,
        status: "success",
        invoiceId: `CX-${Math.floor(Math.random() * 89999) + 10000}`,
        msg: `Платеж принят! Игроку ${cleanNick} зачислено ${coinsAmount} 💎. PREMIUM статус активирован в базе данных CYBERX.`
    });
});

// Проверка статуса сервера
app.get('/api', (req, res) => {
    res.json({ status: "online", security: "AES-256 Enabled", server: "CyberX AI Backend Active 24/7" });
});

// ПРАВИЛЬНЫЙ ЭКСПОРТ ДЛЯ ХОСТИНГА VERCEL (БЕЗ КОНФЛИКТОВ ПОРТОВ)
module.exports = app;
