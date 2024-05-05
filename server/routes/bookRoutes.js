// Подключаем express и создаем экземпляр роутера
const express = require('express');
const router = express.Router();
// Подключаем контроллер книг
const bookController = require('../controllers/bookController');

// Маршруты для добавления, получения всех книг и удаления книги
router.post('/books', bookController.addBook); // POST запрос для добавления книги
router.get('/books', bookController.getAllBooks); // GET запрос для получения всех книг
router.delete('/books/:id', bookController.deleteBook); // DELETE запрос для удаления книги
// Маршрут для поиска книги по идентификатору
router.get('/books/:id', bookController.findBook); // GET запрос для поиска книги по ID

// Экспортируем роутер
module.exports = router;
