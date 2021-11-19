let $libraryform = document.getElementById('libraryForm');
localStorage.clear()

class Book {
    constructor($bookName, $author, $genre) {
        this.$bookName = $bookName
        this.$author = $author
        this.$genre = $genre
    }
}

class Display {
    
    add(bookObj) {

        let booksArr = []

        let booksFromLocalStorage = localStorage.getItem('books')

        if (booksFromLocalStorage === null) {
            booksArr = []
        } else {
            booksArr = JSON.parse(booksFromLocalStorage)
        }

        let $tableBody = document.getElementById('tablebody');

        booksArr.forEach(function (bookObj) {
            let uiString = ` <tr>
                                <td>${bookObj.$bookName}</td>
                                <td>${bookObj.$author}</td>
                                <td>${bookObj.$genre}</td>
                            </tr> `
            $tableBody.innerHTML += uiString;

        })

    }

    clear() {
        $libraryform.reset();
    }

    validate(bookObj) {
        if (bookObj.$bookName.length > 3 || bookObj.$author.length > 3) {
            return true
        }
        else {
            return false
        }
    }

    show(type, displayMessage) {
        let $message = document.getElementById('message');
        $message.innerHTML = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                <strong>Message!</strong> ${displayMessage}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `
        setTimeout(() => {
            $message.innerHTML = ""
        }, 5000);
    }
}

$libraryform.addEventListener('submit', function libraryFormSubmit(e) {

    e.preventDefault();

    let $author = document.getElementById('author').value;

    let $bookName = document.getElementById('bookName').value;

    let $fiction = document.getElementById('fiction');

    let $programming = document.getElementById('programming');

    let $physcological = document.getElementById('physcological');

    let $genre;

    let booksArr = []

        // let booksFromLocalStorage = localStorage.getItem('books')

        // if (booksFromLocalStorage === null) {
        //     booksArr = []
        // } else {
        //     booksArr = JSON.parse(booksFromLocalStorage)
        // }

    if ($fiction.checked) {
        $genre = $fiction.value;
    }

    else if ($programming.checked) {
        $genre = $programming.value;
    }

    else if ($physcological.checked) {
        $genre = $physcological.value;
    }

    let bookObj = new Book($bookName, $author, $genre); //made the book object

    booksArr.push(bookObj)

    localStorage.setItem('books', JSON.stringify(booksArr))

    let displayObj = new Display(); // made the display obj

    if (displayObj.validate(bookObj)) {
        displayObj.add(bookObj);
        displayObj.clear();
        displayObj.show('success', 'your book has been added!');

    }

    else {
        //if form is not validate show error
        displayObj.show('danger', "sorry you cannot add this book");
    }

})