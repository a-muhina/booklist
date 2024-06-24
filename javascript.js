const submit = document.getElementById('submit');

const search = document.getElementById('search');
const submitsearch = document.getElementById('submitsearch');

const booklist = document.getElementById('booklist');

let books = JSON.parse(localStorage.getItem('books')) || [];

class Book {
    constructor(title, author, isbn) {
        this._title = title;
        this._author = author;
        this._isbn = isbn;
    }

    get title() {
        return this._title;
    }

    get author() {
        return this._author;
    }

    get isbn() {
        return this._isbn;
    }
}
let handler = (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    let book = new Book(title, author, isbn);

    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));

    let newBook = document.createElement('tr');
    newBook.class = 'book';

    let newTitle = document.createElement('td');
    newTitle.class = 'title';
    newTitle.innerHTML = book.title;
    newBook.appendChild(newTitle);

    let newAuthor = document.createElement('td');
    newAuthor.class = 'author';
    newAuthor.innerHTML = book.author;
    newBook.appendChild(newAuthor);

    let newISBN = document.createElement('td');
    newISBN.class = 'isbn';
    newISBN.innerHTML = book.isbn;
    newBook.appendChild(newISBN);

    booklist.appendChild(newBook);

    title.value = '';
    author.value = '';
    isbn.value = '';
}

submit.onclick = handler;

