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
