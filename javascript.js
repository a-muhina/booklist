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

books = books.map(book => new Book(book._title, book._author, book._isbn));

const addBookToList = book => {
    let newBook = document.createElement('tr');
    newBook.classList.add('book');

    let newTitle = document.createElement('td');
    newTitle.classList.add('title');
    newTitle.innerHTML = book.title;
    newBook.appendChild(newTitle);

    let newAuthor = document.createElement('td');
    newAuthor.classList.add('author');
    newAuthor.innerHTML = book.author;
    newBook.appendChild(newAuthor);

    let newISBN = document.createElement('td');
    newISBN.classList.add('isbn');
    newISBN.innerHTML = book.isbn;
    newBook.appendChild(newISBN);

    booklist.appendChild(newBook);
}

books.forEach(book => addBookToList(book));

let handler = (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    let book = new Book(title, author, isbn);

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));

    addBookToList(book);

    title.value = '';
    author.value = '';
    isbn.value = '';
}

submit.onclick = handler;

