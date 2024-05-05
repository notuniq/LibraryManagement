const axios = require('axios');

document.getElementById('addBookForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const description = document.getElementById('description').value;
    const genre = document.getElementById('genre').value;
    const avatar = document.getElementById('avatar').value;

    try {
        await axios.post('http://localhost:3000/books', {
            title,
            author,
            description,
            genre,
            avatar
        });
        alert('Book added successfully');
        document.getElementById('addBookForm').reset();
        fetchBooks();
    } catch (error) {
        console.error('Error adding book:', error);
        alert('Error adding book');
    }
});

async function fetchBooks() {
    try {
        const response = await axios.get('http://localhost:3000/books');
        displayBooks(response.data);
    } catch (error) {
        console.error('Error fetching books:', error);
        alert('Error fetching books');
    }
}

function displayBooks(books) {
    const booksList = document.getElementById('booksList');
    booksList.innerHTML = '';
    books.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.innerHTML = `
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Description:</strong> ${book.description}</p>
            <p><strong>Genre:</strong> ${book.genre}</p>
            ${book.avatar ? `<img src="${book.avatar}" alt="Book Avatar" style="max-width: 100px;">` : ''}
            <button onclick="deleteBook('${book._id}')">Delete</button>
        `;
        booksList.appendChild(bookElement);
    });
}

async function deleteBook(id) {
    try {
        await axios.delete(`http://localhost:3000/books/${id}`);
        alert('Book deleted successfully');
        fetchBooks();
    } catch (error) {
        console.error('Error deleting book:', error);
        alert('Error deleting book');
    }
}

fetchBooks();
