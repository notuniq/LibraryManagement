// Подключаем express для создания приложения
const express = require('express');
// Подключаем mongoose для работы с MongoDB
const mongoose = require('mongoose');
// Подключаем роутеры для маршрутизации запросов
const bookRoutes = require('./routes/bookRoutes');
const path = require('path');

// Создаем экземпляр приложения Express
const app = express();
// Используем middleware для разбора JSON-тел запросов
app.use(express.json());

// Подключаемся к базе данных
require('./config/db');
// Регистрируем роутеры для обработки запросов, начинающихся с '/api'
app.use('/api', bookRoutes);

app.use('/api/nofound', express.static(path.join(__dirname, 'assets/noFound.jpg')));

// Определяем порт, на котором будет работать сервер
const PORT = process.env.PORT || 3000;
// Слушаем указанный порт и выводим сообщение о запуске сервера
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
