// Получаем кнопку "Поиск"
const searchButton = document.getElementById('FindBtn');

// Получаем модальное окно
const modal2 = document.getElementById('modal2');
const closeButton2 = modal2.querySelector('.close2');

// Добавляем обработчик события клика на кнопку "Поиск"
searchButton.addEventListener('click', () => {
    // Открываем модальное окно

    modal2.style.display = 'block';
});

closeButton2.addEventListener('click', () => {
    modal2.style.display = 'none';
});


document.addEventListener('DOMContentLoaded', function () {
    // Получаем элементы DOM
    const findButton = document.getElementById('findBook');
    const nameInput2 = document.getElementById('name2');
    const authorInput2 = document.getElementById('author2');

    // Добавляем обработчик события клика на кнопку "Добавить"
    findButton.addEventListener('click', () => {
        const title = nameInput2.value.trim();
        const author = authorInput2.value.trim();

        // Проверяем, что хотя бы одно из полей заполнено
        if (!title && !author) {
            alert('Пожалуйста, укажите название или автора книги.');
            return;
        }

        // Формируем URL для запроса
        let url = 'http://localhost:3000/api/books/search?';
        if (title) {
            url += `title=${encodeURIComponent(title)}`;
            if (author) {
                url += `&author=${encodeURIComponent(author)}`;
            }
        } else {
            url += `author=${encodeURIComponent(author)}`;
        }

        // Отправляем запрос на сервер
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    if (response.status == '404') {
                        alert('Ничего не найдено.');
                    } else {
                        throw new Error('Ошибка сети');
                    }
                }
                return response.json();
            })
            .then(data => {
                if (data.length === 0) {
                    alert('Ничего не найдено.');
                } else {
                    const queryParams = new URLSearchParams();
                    queryParams.append('books', JSON.stringify(data)); // Преобразуем объект data в строку JSON и добавляем его к параметрам запроса
                    window.location.href = `searchPage.html?${queryParams.toString()}`; // Перенаправляем на страницу с параметрами запроса
                }
            })
            .catch(error => {
                console.error('Ошибка:', error);
            });
    });
});


function hideLoader() {
    const preloader = document.getElementById('preloader2');
    preloader.style.display = 'none';
}

// Функция для отображения книг или сообщения "Нет книг"
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
