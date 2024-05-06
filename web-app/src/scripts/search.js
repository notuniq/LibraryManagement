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

document.addEventListener('DOMContentLoaded', function () {
    // Получаем элементы DOM
    const findButton = document.getElementById('findBook');
    const nameInput2 = document.getElementById('name2');
    const authorInput2 = document.getElementById('author2');

    // Добавляем обработчик события клика на кнопку закрытия модального окна
    closeButton2.addEventListener('click', () => {
        modal2.style.display = 'none';
    });

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
                    // Обрабатываем ответ от сервера
                    console.log(data);
                }
            })
            .catch(error => {
                console.error('Ошибка:', error);
            });
    });
});
