// Получаем модальное окно
const modal = document.getElementById('modal');

// Получаем кнопку закрытия модального окна
const closeButton = modal.querySelector('.close');

// Добавляем обработчик события клика на кнопку "Добавить книгу"
const addButton = document.getElementById('add-book-btn');
addButton.addEventListener('click', () => {
    // Открываем модальное окно

    modal.style.display = 'block';
});

// Добавляем обработчик события клика на кнопку закрытия модального окна
closeButton.addEventListener('click', () => {
    // Закрываем модальное окно
    modal.style.display = 'none';
});
