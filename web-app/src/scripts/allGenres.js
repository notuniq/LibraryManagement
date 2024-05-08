// Получаем кнопку "Все жанры"
const allGenresButton = document.getElementById('all-genres-button');

// Добавляем обработчик события клика на кнопку "Все жанры"
allGenresButton.addEventListener('click', () => {
    // Отображаем все книги
    showAllBooks();
});

// Функция для отображения всех книг
function showAllBooks() {
    // Получаем список всех книг
    const allBooks = [...document.querySelectorAll('.book')];

    // Отображаем все книги
    allBooks.forEach(book => {
        book.style.display = 'block';
    });
}