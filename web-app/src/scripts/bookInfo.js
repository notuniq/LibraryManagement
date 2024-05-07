document.addEventListener('DOMContentLoaded', async function () {
    const container = document.querySelector('.container');
    const preloader = document.getElementById('preloader2');
    const bookCover = document.querySelector('.book-cover img');
    const bookTitle = document.querySelector('.book-details h1');
    const bookAuthor = document.querySelector('.book-details p:nth-child(2)');
    const bookDescription = document.querySelector('.book-details p:nth-child(3)');
    const bookGenres = document.querySelector('.book-details p:nth-child(4)');

    // Получаем id книги из URL
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('id');

    try {
        // Отправляем запрос на сервер для получения информации о книге
        const response = await fetch(`http://localhost:3000/api/books/info/${bookId}`);

        if (!response.ok) {
            alert('Ошибка!')
            const delBtn = document.getElementById('delBook');
            delBtn.style.display = 'none';
            window.location.href('index.html')
        }
        const bookData = await response.json();

        bookCover.src = bookData.avatar ? bookData.avatar : 'http://localhost:3000/api/nofound';
        bookTitle.textContent = bookData.title;
        bookAuthor.textContent = `Автор: ${bookData.author}`;
        bookDescription.textContent = `Описание: ${bookData.description}`;
        bookGenres.textContent = `Жанры: ${bookData.genre.join(', ')}`;

    } catch (error) {
        console.error('Error fetching book data:', error);
    } finally {
        // Скрытие прелоадера после загрузки информации о книге или в случае ошибки
        preloader.style.display = 'none';
    }
});

function delBook() {
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('id');

    fetch(`http://localhost:3000/api/books/info/${bookId}`, { method: 'DELETE' })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка сети');
            }
            return response.json();
        })
        .then(data => {
            alert('Книга успешно удалена!');
            window.location.href = 'index.html';
        })
        .catch(error => {
            alert('Ошибка при удалении книги: ' + error.message);
            window.location.href = 'index.html';
        });

}

const delBtn = document.getElementById('delBook');
delBtn.addEventListener('click', () => {
    delBook()
});