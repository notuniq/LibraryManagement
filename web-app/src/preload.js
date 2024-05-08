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

function generateGenreButtons(genres) {
    const genreButtonsContainer = document.getElementById('genre-buttons');

    // Очищаем контейнер перед добавлением новых кнопок
    genreButtonsContainer.innerHTML = '';

    const allGenresButton = document.createElement('button');
    allGenresButton.textContent = 'Все жанры';
    allGenresButton.classList.add('genre-button');
    genreButtonsContainer.appendChild(allGenresButton);

    // Проходим по каждому жанру и создаем кнопку для него
    genres.forEach(genre => {
        const genreButton = document.createElement('button');
        genreButton.textContent = genre;
        genreButton.classList.add('genre-button');
        genreButton.addEventListener('click', () => {
            filterBooksByGenre(genre);
        });
        genreButtonsContainer.appendChild(genreButton);
    });
}

function filterBooksByGenre(genre) {
    // Получаем список всех книг
    const allBooks = [...document.querySelectorAll('.book')];

    // Фильтруем книги по выбранному жанру
    allBooks.forEach(book => {
        // Проверяем, есть ли выбранный жанр в списке жанров книги
        const genres = book.getAttribute('data-genres').split(',');
        const isVisible = genres.includes(genre);

        // Изменяем стиль видимости книги
        book.style.display = isVisible ? 'block' : 'none';
    });
}



// Функция для скрытия прелоадера
function hideLoader() {
    const preloader = document.getElementById('preloader');
    preloader.style.display = 'none';
}

// Функция для отображения книг или сообщения "Нет книг"
function displayBooks(books) {
    const booksList = document.getElementById('books-list');
    const noBooks = document.getElementById('no-books');

    // Создаем пустой Set для хранения уникальных жанров
    const uniqueGenres = new Set();

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
            img.src = book.avatar ? book.avatar : 'http://localhost:3000/api/nofound';
            img.alt = book.title;
            img.width = 177;
            img.height = 247;

            const author = document.createElement('p');
            author.classList.add('book-author');
            author.textContent = book.author;

            const title = document.createElement('p');
            title.classList.add('book-title');
            title.textContent = book.title;

            // Добавляем каждый жанр книги в Set уникальных жанров
            book.genre.forEach(genre => {
                uniqueGenres.add(genre);
            });

            // Создаем строку с жанрами для атрибута data-genres
            const genresString = book.genre.join(',');

            // Добавляем атрибут data-genres к элементу книги
            bookLink.setAttribute('data-genres', genresString);

            bookLink.appendChild(img);
            bookLink.appendChild(author);
            bookLink.appendChild(title);

            booksList.appendChild(bookLink);
        });

    }

    // После отображения книг скрываем прелоадер

    generateGenreButtons(uniqueGenres);

    hideLoader();

    // Выводим уникальные жанры в консоль
    console.log('Уникальные жанры:', Array.from(uniqueGenres));
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