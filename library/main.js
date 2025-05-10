const books = document.querySelector(".cards")
const newButton = document.querySelector("#new-btn")
const modal = document.querySelector(".modal")
const closeButton = document.querySelector(".close")


//create empty array for library//
const myLibrary = [];


//object constructor for book//
function Book(title, author, pages, read){
    if (!new.target){
        throw Error("You must use new operator for the object construction")
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read
    this.id = crypto.randomUUID();
}


//add book object constructor to library array//
function addBook(title, author, pages, read){

    myLibrary.push(new Book(title, author, pages, read));
    return myLibrary;
}

//helper function to create elements in the book cards//

// function createBookCardElements(elm, content, className){
//     const element = document.createElement(elm);
//     element.textContent = content
//     element.classList.add(className)

//     return element
// }

//create book card element//

function createBookCard(book){
    //create book card//
    let bookCard = document.createElement("div")
    bookCard.classList.add("card")

    //add Title to book card//
    const bookTitle  = document.createElement("h5");
    bookTitle.textContent = book.title;
    bookCard.appendChild(bookTitle);

    //add Book Author and Pages//
    const bookInfo = document.createElement("div");
    bookInfo.classList.add("card-text");
    bookCard.appendChild(bookInfo)

    const bookAuthor = document.createElement("p");
    bookAuthor.textContent= `Author : ${book.author}`
    bookInfo.appendChild(bookAuthor)

    const bookPages = document.createElement("p");
    bookPages.textContent= `Pages : ${book.pages}`
    bookInfo.appendChild(bookPages)

    //add read checkbox//
    const bookRead= document.createElement("div");
    bookRead.classList.add("book-read")
    bookRead.textContent = "Read"
    const bookCheckBox = document.createElement("input");
    bookCheckBox.type = 'checkbox';
    bookRead.appendChild(bookCheckBox)
    bookInfo.appendChild(bookRead)


    books.appendChild(bookCard)
}


//loop through myLibrary and render books//

function renderBooks(myLibrary){

    myLibrary.map(createBookCard);
}


//dialog and modal//

newButton.addEventListener('click', ()=> {
    modal.showModal();
    
})

// window.onclick = function(e){
//     if(e.target == modal){
//         modal.close();
//     }
// }

closeButton.addEventListener('click', ()=>{
    modal.close();
})

//test data//
let bookOne = addBook("Fight Club", "Chuck Palanuick", "236", "read")
let bookTwo = addBook("Harry Potter", "JK Rowling", "635", "read")
let bookThree = addBook("Man's Search For Meaning", "Viktor Frankl", "236", "read")
let bookFour = addBook("The Knowledge Project", "Shane Parrish", "285", "read")
let bookFive = addBook("Rational Optimist", "Matt Riddley", "390", "read")
let bookSix = addBook("The Black Swan", "Nassim Taleb", "285", "read")
let bookSeven = addBook("The Black Swan", "Nassim Taleb", "285", "read")

console.log(myLibrary)

renderBooks(myLibrary);



