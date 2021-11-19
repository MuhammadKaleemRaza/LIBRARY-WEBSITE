const $libraryform = document.getElementById('libraryForm');

//Making the book construtor

function Book($bookName, $author, $genre) {
    this.$bookName = $bookName
    this.$author = $author
    this.$genre = $genre
}


// Display Constructor 

function Display() {

}


//Add methods to display prototype

//Implementing the add function to add book in the UI

Display.prototype.add= function(bookObj) {
    console.log('i am the kaleem raza');
    let $tableBody = document.getElementById('tablebody');
    let uiString = ` <tr>
                        <td>${bookObj.$bookName}</td>
                        <td>${bookObj.$author}</td>
                        <td>${bookObj.$genre}</td>
                    </tr> `
    $tableBody.innerHTML += uiString;
}

//Implementing the clear function to clear the form after submission

Display.prototype.clear = function() {
    $libraryform.reset();
}

//Implementing the validate function to know whether the form has been filled correctly

Display.prototype.validate = function(bookObj) {
    if  (bookObj.$bookName.length > 3 || bookObj.$author.length > 3) {
        return true
    }
    else {
        return false
    }
} 


//Implementing the function to show the success or the error on the UI

Display.prototype.show = function(type, displayMessage) {
    let $message = document.getElementById('message');
    $message.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            <strong>Message!</strong> ${displayMessage}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `
    setTimeout(() => {
        $message.innerHTML = ""
    }, 2000);
}

//Add Submit event listner to libraryForm

$libraryform.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    
    e.preventDefault()
    
    let $author = document.getElementById('author').value;
    
    let $bookName = document.getElementById('bookName').value;
    
    let $fiction = document.getElementById('fiction');
    
    let $programming = document.getElementById('programming');
    
    let $physcological = document.getElementById('physcological');
    
    let $genre;
    
    if ($fiction.checked) {
        $genre = $fiction.value;
    }
    
    else if ($programming.checked) {
        $genre = $programming.value;
    }
    
    else if ($physcological.checked) {
        $genre = $physcological.value;
    }
    
    let bookObj = new Book($bookName, $author, $genre) //made the book object
    
    let displayObj = new Display(); // made the display obj

    if  (displayObj.validate(bookObj))

    {
        displayObj.add(bookObj);
        displayObj.clear();
        displayObj.show('success', 'your book has been added!')

    }

    else  {
        //if form is not validate show error
        displayObj.show('danger', "sorry you cannot add this book")
    }

    console.log(bookObj);
}