const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Разрешаем сайту принимать запросы с любых адресов (чтобы фронтенд мог общаться с бэкендом)
app.use(cors());
app.use(express.json());

// Главная страница сервера (проверка работоспособности)
app.get('/', (req, res) => {
    res.json({ 
        status: "online", 
        message: "Сервер сайта CS2 успешно запущен и работает 24/7!",
        author: "План одобрен" 
    });
});

// Заготовка под будущую авторизацию Steam OpenID
app.get('/api/auth/steam', (req, res) => {
    res.json({ message: "Здесь будет перенаправление на авторизацию Steam" });
});

// Заготовка под Маркет и ИИ-фишки
app.get('/api/market/items', (req, res) => {
    res.json({ items: [] });
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
