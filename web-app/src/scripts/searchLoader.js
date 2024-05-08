document.addEventListener('DOMContentLoaded', function () {
    const booksList = document.getElementById('books-list2');
    const noBooks = document.getElementById('no-books2');
    const preloader = document.getElementById('preloader2');

    // Получаем параметры запроса из URL
    const urlParams = new URLSearchParams(window.location.search);
    const booksDataString = urlParams.get('books');

    console.log(booksDataString)

    // Проверяем, есть ли данные книг в URL
    if (booksDataString) {
        // Преобразуем строку JSON обратно в объект
        const booksData = JSON.parse(booksDataString);

        // Отображаем книги
        displayBooks(booksData);
    } else {
        // Если данных нет, показываем сообщение "Нет книг"
        noBooks.style.opacity = '1';
        // Скрываем прелоадер, так как данных нет
        hideLoader();
    }
});

function hideLoader() {
    const preloader = document.getElementById('preloader2');
    preloader.style.display = 'none';
}

function displayBooks(books) {
    const booksList = document.getElementById('books-list2');
    const noBooks = document.getElementById('no-books2')
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

            bookLink.appendChild(img);
            bookLink.appendChild(author);
            bookLink.appendChild(title);

            booksList.appendChild(bookLink);
        });
    }

    // После отображения книг скрываем прелоадер
    hideLoader();
}
