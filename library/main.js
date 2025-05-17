const books = document.querySelector(".cards")
const newButton = document.querySelector("#new-btn")
const modal = document.querySelector(".modal")
const closeButton = document.querySelector(".close")
const submitButton = document.querySelector(".submit-button")
const form = document.querySelector(".user-input")



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
    if(book.read === "read"){
        bookCard.style.borderLeft = "10px solid green";
        bookCheckBox.checked = true;


    } else{
        bookCard.style.borderLeft = "10px solid #fa8f04";
        bookCheckBox.checked = false;
    }

    bookRead.appendChild(bookCheckBox)
    bookInfo.appendChild(bookRead)

    //create delete button//
    const deleteIcon = document.createElement("img")
    deleteIcon.src = '../icons/delete.svg'
    deleteIcon.classList.add("delete-icon", book.id) 
    bookInfo.appendChild(deleteIcon);

    books.appendChild(bookCard)



    //add functionality to delete icon//
    deleteIcon.addEventListener('click', ()=>{

        //remove bookCard from the DOM//
        books.removeChild(bookCard);

        //need to also remove from the lirary//
        const index = myLibrary.findIndex(deletedBook => deletedBook.id ===book.id)

        if(index !== -1){

            myLibrary.splice(index, 1)
        }

    })

    //dynamically change read status//
    bookCheckBox.addEventListener("change", () => {
        if (bookCheckBox.checked) {
            bookCard.style.borderLeft = "10px solid green";
            book.read = "read"; // update book object
        } else {
            bookCard.style.borderLeft = "10px solid #fa8f04";
            book.read = "unread";
        }
    });
    

}


//loop through myLibrary and render books//

function renderBooks(myLibrary){

    myLibrary.map(createBookCard);
}


//dialog, modal and retrieve FormData//

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


submitButton.addEventListener('click', (e)=>{

    //prevent form from submitting to server//
    e.preventDefault();

    //retreive formdata as key value pair objects//
    const formData = new FormData(form);

    //define newBook the user adds from the form as an object//
    let newBook = {}
    for (let [name, value] of formData){
        newBook[name] = value;   
    }
    
    //check if newBook added matches existing in myLibrary//
    isDuplicate = myLibrary.some(libraryBook=>
        libraryBook.title == newBook["book-title"] 
    )

    //run check and add to library if not duplicate//
    if(!isDuplicate){

        if(newBook["book-read"] == "on"){
            addBook(newBook["book-title"], newBook["book-author"], newBook["book-pages"], "read");
        } else{
            addBook(newBook["book-title"], newBook["book-author"], newBook["book-pages"], "unread");
        }
                
    } 
    
    books.innerHTML = "";
    renderBooks(myLibrary);
    form.reset();
    modal.close();
    console.log(newBook["book-read"])
})


// deleteIcon.addEventListener('click', ()=>{


// })


//test data//
// let bookOne = addBook("Fight Club", "Chuck Palanuick", "236", "read")
// let bookTwo = addBook("Harry Potter", "JK Rowling", "635", "read")
// let bookThree = addBook("Man's Search For Meaning", "Viktor Frankl", "236", "read")
// let bookFour = addBook("The Knowledge Project", "Shane Parrish", "285", "read")
// let bookFive = addBook("Rational Optimist", "Matt Riddley", "390", "read")
// let bookSix = addBook("The Black Swan", "Nassim Taleb", "285", "read")
// let bookSeven = addBook("The Black Swan", "Nassim Taleb", "285", "read")

console.log(myLibrary)





