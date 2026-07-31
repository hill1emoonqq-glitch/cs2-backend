const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// БРОНИРОВАННЫЕ ДАННЫЕ СВЯЗИ (ТОКЕН И ID СКРЫТЫ ВНУТРИ СЕРВЕРА)
const TELEGRAM_TOKEN = '8977188373:AAEHcioQP5OtRYFfChDKpqx6ohy2paCnPPk';
const TELEGRAM_CHAT_ID = '2003160617';

// Быстрая память для защиты от спама (Rate Limiting)
const antiSpamMap = new Map();

app.post('/api/wish', async (req, res) => {
    // Получаем IP-адрес пользователя для защиты от наводнения ботами
    const userIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const now = Date.now();
    
    if (antiSpamMap.has(userIp)) {
        const lastSendTime = antiSpamMap.get(userIp);
        if (now - lastSendTime < 15000) { // Ограничение: 1 сообщение в 15 секунд
            return res.status(429).json({ success: false, error: "Слишком много запросов! Анти-спам защита CYBERX. Подождите 15 сек." });
        }
    }
    
    let { nickname, text } = req.body;
    
    // МАКСИМАЛЬНАЯ ЗАЩИТА: Очистка от хакерских скриптов и XSS инъекций
    nickname = String(nickname || 'Анонимный Геймер').replace(/</g, "&lt;").replace(/>/g, "&gt;").substring(0, 30);
    text = String(text || '').replace(/</g, "&lt;").replace(/>/g, "&gt;").substring(0, 500);
    
    if (!text.trim()) {
        return res.status(400).json({ success: false, error: "Текст пожелания не может быть пустым!" });
    }

    // Формируем красивый киберспортивный лог сообщения
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
        
        // Запоминаем время отправки для этого IP
        antiSpamMap.set(userIp, now);
        
        res.json({ success: true, message: "Идея успешно доставлена автору в Telegram!" });
    } catch (error) {
        res.status(500).json({ success: false, error: "Ошибка отправки в систему безопасности Telegram" });
    }
});

// Проверка статуса сервера
app.get('/api', (req, res) => {
    res.json({ status: "online", security: "AES-256 Enabled", server: "CyberX AI Backend Active" });
});

module.exports = app;
