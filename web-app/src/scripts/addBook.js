document.addEventListener('DOMContentLoaded', function () {
    const addItemButton = document.getElementById('addItem');

    // Добавляем обработчик события на кнопку "Добавить книгу"
    addItemButton.addEventListener('click', async function () {
        try {
            // Получаем данные из полей формы
            const title = document.getElementById('name').value;
            const author = document.getElementById('author').value;
            const avatar = document.getElementById('avatar').value;
            const genresInput = document.getElementById('genre');
            const selectedGenres = Array.from(genresInput.selectedOptions).map(option => option.value);
            const genresInput2 = document.getElementById('genre2');
            const genre2Value = genresInput2 ? genresInput2.value : '';
            const allGenres = selectedGenres.join(',') + (genre2Value ? ',' + genre2Value : '');
            const genres = allGenres.split(',').map(genre => genre.trim());
            const description = document.getElementById('description').value;

            // Проверяем, заполнены ли обязательные поля
            if (!title || !author || !genresInput) {
                throw new Error('Не все обязательные поля заполнены');
            }

            // Формируем объект с данными книги
            const bookData = {
                title: title,
                author: author,
                avatar: avatar,
                genre: genres,
                description: description
            };

            // Отправляем POST-запрос на сервер
            const response = await fetch('http://localhost:3000/api/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bookData)
            });

            const modal = document.getElementById('modal');

            // Проверяем статус ответа
            if (response.ok) {
                alert('Книга успешно добавлена!');
                location.reload();
            } else {
                throw new Error('Ошибка при добавлении книги');
            }

            modal.style.display = 'none';
        } catch (error) {
            console.error('Ошибка:', error);
            alert(error.message || 'Произошла ошибка при добавлении книги');
        }
    });
});
