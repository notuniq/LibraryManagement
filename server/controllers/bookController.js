// Подключаем модель книги
const Book = require('../models/Book');
// Подключаем mongoose для проверки валидности ObjectId
const mongoose = require('mongoose');

// Контроллер для управления книгами
const bookController = {
    // Добавление новой книги
    addBook: async (req, res) => {
        try {
            // Получаем данные о книге из запроса
            const { title, author, description, genre, avatar } = req.body;
            // Создаем новый экземпляр книги
            const newBook = new Book({
                title,
                author,
                description,
                genre,
                avatar
            });
            // Сохраняем книгу в базе данных
            await newBook.save();
            // Отправляем успешный ответ с информацией о добавленной книге
            res.status(201).json({ message: 'Book added successfully', book: newBook });
        } catch (err) {
            // Если произошла ошибка, отправляем статус 500 и сообщение об ошибке
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // Получение всех книг
    getAllBooks: async (req, res) => {
        try {
            // Получаем все книги из базы данных
            const books = await Book.find();
            // Отправляем список книг в ответ
            res.json(books);
        } catch (err) {
            // Если произошла ошибка, отправляем статус 500 и сообщение об ошибке
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // Удаление книги по ID
    deleteBook: async (req, res) => {
        try {
            // Получаем ID книги из параметров запроса
            const { id } = req.params;

            // Проверяем, является ли ID корректным ObjectId
            if (!mongoose.Types.ObjectId.isValid(id)) {
                // Возвращаем статус 404, если ID некорректный
                return res.status(404).json({ message: 'Invalid book ID' });
            }

            // Удаляем книгу по ID
            const deletedBook = await Book.findByIdAndDelete(id);

            // Проверяем, была ли удалена книга
            if (!deletedBook) {
                return res.status(404).json({ message: 'Book not found' });
            }

            // Отправляем сообщение об успешном удалении книги
            res.json({ message: 'Book deleted successfully' });
        } catch (err) {
            // Если произошла ошибка, отправляем статус 500 и сообщение об ошибке
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // Поиск книги по ID
    findBook: async (req, res) => {
        try {
            // Получаем ID книги из параметров запроса
            const { id } = req.params;

            // Проверяем, является ли ID корректным ObjectId
            if (!mongoose.Types.ObjectId.isValid(id)) {
                // Возвращаем статус 404, если ID некорректный
                return res.status(404).json({ message: 'Invalid book ID' });
            }

            // Ищем книгу по ID в базе данных
            const bookInfo = await Book.findById(id);

            // Проверяем, была ли найдена книга
            if (!bookInfo) {
                return res.status(404).json({ message: 'Book not found' });
            }

            // Отправляем информацию о найденной книге в ответ
            res.json(bookInfo);
        } catch (err) {
            // Если произошла ошибка, отправляем статус 500 и сообщение об ошибке
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
};

// Экспортируем контроллер
module.exports = bookController;
