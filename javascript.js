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


/*Deletion*/
let deletion = (newBook, book) => {
    let deleteTD = document.createElement('td');
    deleteTD.classList.add('button');

    let deleteButton = document.createElement('button');
    deleteButton.classList.add('delete');

    deleteTD.appendChild(deleteButton);
    newBook.appendChild(deleteTD);

    deleteButton.onclick = () => {
        books = books.filter(b => b.isbn !== book.isbn);
        localStorage.setItem('books', JSON.stringify(books));
        newBook.remove();
    }
}

/*Visualization*/
const addBookToList = book => {
    let newBook = document.createElement('tr');
    newBook.classList.add('book');

    let newTitle = document.createElement('td');
    newTitle.classList.add('text');
    newTitle.innerHTML = book.title;
    newBook.appendChild(newTitle);

    let newAuthor = document.createElement('td');
    newAuthor.classList.add('text');
    newAuthor.innerHTML = book.author;
    newBook.appendChild(newAuthor);

    let newISBN = document.createElement('td');
    newISBN.classList.add('text');
    newISBN.innerHTML = book.isbn;
    newBook.appendChild(newISBN);

    /*let editTD = document.createElement('td');
    editTD.classList.add('button');

    let editButton = document.createElement('button');
    editButton.classList.add('edit');

    editTD.appendChild(editButton);
    newBook.appendChild(editTD);*/

    deletion(newBook, book);

    booklist.appendChild(newBook);
}

books.forEach(book => addBookToList(book));


/*Adding an entry*/
let entry = event => {
    event.preventDefault();
    const remove = document.getElementById('toremove');
    if (remove) {
        booklist.removeChild(remove);
    }

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    let book = new Book(title, author, isbn);

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));

    addBookToList(book);

    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

submit.onclick = entry;


