const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

app.get('/api', (req, res) => {
    res.json({ status: "online", message: "Бэкенд CS2 успешно запущен 24/7!" });
});

module.exports = app;
