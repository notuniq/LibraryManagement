// Подключаем mongoose для создания схемы и модели
const mongoose = require('mongoose');

// Создаем схему книги
const bookSchema = new mongoose.Schema({
    // Название книги, обязательное поле
    title: { type: String, required: true },
    // Автор книги, обязательное поле
    author: { type: String, required: true },
    // Описание книги, обязательное поле
    description: { type: String, required: true },
    // Жанры книги, массив строк, обязательное поле
    genre: { type: [String], required: true },
    // Аватар книги, необязательное поле
    avatar: { type: String }
});

// Создаем модель книги на основе схемы
const Book = mongoose.model('Book', bookSchema);

// Экспортируем модель книги
module.exports = Book;
