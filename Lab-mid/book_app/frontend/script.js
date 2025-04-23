const bookList = document.getElementById('bookList');
const searchInput = document.getElementById('searchInput');

async function fetchBooks(author = '') {
    const res = await fetch(`http://localhost:5000/api/books?author=${author}`);
    const books = await res.json();
    displayBooks(books);
}

function displayBooks(books) {
    bookList.innerHTML = '';
    books.forEach(book => {
        const card = document.createElement('div');
        card.className = 'col-md-4 mb-3';
        card.innerHTML = `
            <div class="card p-3">
                <h5>${book.title}</h5>
                <p><strong>Author:</strong> ${book.author}</p>
                <p><strong>Price:</strong> $${book.price}</p>
            </div>`;
        bookList.appendChild(card);
    });
}

searchInput.addEventListener('input', () => {
    const value = searchInput.value.trim();
    fetchBooks(value);
});

fetchBooks();
