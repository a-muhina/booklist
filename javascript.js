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

    set title(title) {
        this._title = title;
    }

    set author(author) {
        this._author = author;
    }

    set isbn(isbn) {
        this._isbn = isbn;
    }
}

books = books.map(book => new Book(book._title, book._author, book._isbn));

/*Info*/
const titleInfo = document.getElementById('title-message');
const authorInfo = document.getElementById('author-message');
const isbnInfo = document.getElementById('isbn-message');
const titlePop = document.getElementById('title-pop');
const authorPop = document.getElementById('author-pop');
const isbnPop = document.getElementById('isbn-pop');

let visible = (f) => {
    f.style.visibility = 'visible';
}

let invisible = (f) => {
    f.style.visibility = 'hidden';
}

titleInfo.onmouseover = () => visible(titlePop);
titleInfo.onmouseleave = () => invisible(titlePop);
authorInfo.onmouseover = () => visible(authorPop);
authorInfo.onmouseleave = () => invisible(authorPop);
isbnInfo.onmouseover = () => visible(isbnPop);
isbnInfo.onmouseleave = () => invisible(isbnPop);

/*Deletion*/
let deletion = (newBook, book) => {
    let deleteTD = document.createElement('td');
    deleteTD.classList.add('button');

    let deleteButton = document.createElement('button');
    deleteButton.classList.add('delete');
    deleteButton.title = 'Delete';

    deleteTD.appendChild(deleteButton);
    newBook.appendChild(deleteTD);

    deleteButton.onclick = () => {
        books = books.filter(b => b.isbn !== book.isbn);
        localStorage.setItem('books', JSON.stringify(books));
        newBook.remove();
    }
}

/*Editing*/
let editing = (newBook, book) => {
    let editTD = document.createElement('td');
    editTD.classList.add('button');

    let editButton = document.createElement('button');
    editButton.classList.add('edit');
    editButton.title = 'Edit';

    editTD.appendChild(editButton);
    newBook.appendChild(editTD);
    
    editButton.onclick = () => {
        const row = editButton.parentNode.parentNode;
        let textFields = row.querySelectorAll('td.text');
        let editFields = row.querySelectorAll('input.editing');
        let isEditing = editButton.classList.contains('confirm');

        if (isEditing) {
            let index = books.findIndex(i => i.isbn === book.isbn);
            editFields.forEach((field, idx) => {
                    const input = field.value;
                    field.replaceWith(input);
                    
                    switch (idx) {
                        case 0:
                            books[index].title = input;
                            localStorage.setItem('books', JSON.stringify(books));
                            break;
                        case 1:
                            books[index].author = input;
                            localStorage.setItem('books', JSON.stringify(books));
                            break;
                        case 2: 
                            books[index].isbn = input;
                            localStorage.setItem('books', JSON.stringify(books));
                            break;
                    }     
            });

            localStorage.setItem('books', JSON.stringify(books));
            
            editButton.classList.remove('confirm');
            editButton.classList.add('edit');
            editButton.title = 'Edit';

        } else {
            textFields.forEach(field => {
                const text = field.innerHTML;
                let wrapper = document.createElement('td');
                wrapper.classList.add('text');
                let editing = document.createElement('input');
                editing.type = 'text';
                editing.classList.add('editing');
                editing.value = `${text}`;
                wrapper.appendChild(editing);
                field.replaceWith(wrapper);
            });
            editButton.classList.remove('edit');
            editButton.classList.add('confirm');
            editButton.title = 'Confirm';
        }
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

    deletion(newBook, book);
    editing(newBook, book);

    booklist.appendChild(newBook);
}

books.forEach(book => addBookToList(book));


/*Adding an entry*/
const submit = document.getElementById('submit');
const isbnRegEx = /\d{10}|\d{13}/;

const validateISBN = isbn => isbnRegEx.test(isbn) && !books.some(book => book.isbn === isbn);

let entry = event => {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;
    
    if (title !== '' && author !== '' && isbn !== '' && title.length < 255 && author.length < 255) {
            if(validateISBN(isbn)) {
                event.preventDefault();
    
                let book = new Book(title, author, isbn);
                books.push(book);
                localStorage.setItem('books', JSON.stringify(books));
                addBookToList(book);
            
                document.getElementById('title').value = '';
                document.getElementById('author').value = '';
                document.getElementById('isbn').value = '';
            }
    }
}

submit.onclick = entry;
submit.addEventListener("keydown", event => {
    if (event.key === 'Enter') {
        entry(event);
    }
} )

/*Search*/
const search = document.getElementById('search');
const submitSearch = document.getElementById('submitsearch');


let aSearch = event => {
    let keyword = search.value.toLowerCase();
    const nonе = document.getElementById('none');

    if(keyword !== ''){
        let allBooks = document.querySelectorAll('tr.book');
        allBooks.forEach(book => booklist.removeChild(book));
        const cancelButton = document.getElementById('cancel');

        if (!cancelButton){
            const cancel = document.createElement('input');
            cancel.id = 'cancel';
            cancel.type = 'submit';
            cancel.value = '';
            cancel.title = 'Cancel search';
            const wrapperS = submitSearch.parentNode;
            wrapperS.prepend(cancel);
    
            cancel.onclick = () => {
                window.location.reload();
                if(nonе){
                    booklist.removeChild(nonе);
                }  
            }
        }
        
        let result = books.filter(book => {
            let title = book.title.toLowerCase();
            let author = book.author.toLowerCase();
            let isbn = book.isbn.toLowerCase();
            if (title.includes(keyword) || author.includes(keyword) || isbn.includes(keyword)) {
                return book;
            }
        });

        if (result.length > 0) {
            result.forEach(book => addBookToList(book));
            
            if(nonе){
                booklist.removeChild(nonе);
            }
        } else {
            if(!nonе){
                const none = document.createElement('tr');
                none.id = 'none';
                        
                const noResult = document.createElement('td');
                noResult.classList.add('noresult');
                noResult.colSpan = '5';
                noResult.innerHTML = 'No results were found.';

                none.appendChild(noResult);
                booklist.appendChild(none);
            }
        }
    }
}

submitSearch.onclick = aSearch;
search.addEventListener("keydown", event => {
    if (event.key === 'Enter') {
       aSearch(event);
    }
} )
    
    


