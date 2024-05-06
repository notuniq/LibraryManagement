// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { ipcRenderer } = require('electron');

// Функция для запроса данных с сервера
async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

// Функция для отображения прелоадера
function showLoader() {
    const preloader = document.getElementById('preloader');
    preloader.style.display = 'block';
}

// Функция для скрытия прелоадера
function hideLoader() {
    const preloader = document.getElementById('preloader');
    preloader.style.display = 'none';
}

// Функция для отображения книг или сообщения "Нет книг"
function displayBooks(books) {
    const booksList = document.getElementById('books-list');
    const noBooks = document.getElementById('no-books')
    if (books.length === 0) {
        // Если нет книг, добавляем сообщение "Нет книг"
        noBooks.style.opacity = '1';
    } else {
        noBooks.remove();
        // Если книги есть, отображаем каждую книгу
        books.forEach(book => {
            const bookLink = document.createElement('a');
            bookLink.classList.add('book');
            bookLink.href = `bookInfo.html?id=${book._id}`; // Ссылка на страницу книги

            const img = document.createElement('img');

            img.src = book.avatar ? book.avatar : 'https://api.bookmate.ru/assets/books-covers/59/52/FdBVjHXn-ipad.jpeg?image_hash=ce059c793a68f7bdbd64a5928e7f72a7';
            img.alt = book.title;
            img.width = 177;
            img.height = 247;

            const author = document.createElement('p');
            author.classList.add('book-author');
            author.textContent = book.author;

            const title = document.createElement('p');
            title.classList.add('book-title');
            title.textContent = book.title;

            bookLink.appendChild(img);
            bookLink.appendChild(author);
            bookLink.appendChild(title);

            booksList.appendChild(bookLink);
        });

    }

    // После отображения книг скрываем прелоадер
    hideLoader();
}

// Запрос данных с сервера и отображение книг или сообщения "Нет книг" при загрузке страницы
window.addEventListener('DOMContentLoaded', async () => {
    // Показываем прелоадер при начале загрузки данных
    showLoader();

    try {
        const books = await fetchData('http://localhost:3000/api/books');
        displayBooks(books);
    } catch (error) {
        console.error('Error fetching books:', error);
        // Скрываем прелоадер в случае ошибки
        const noBooksText = document.getElementById('no-books-text');
        noBooksText.textContent = error;
        hideLoader();
    }
});
