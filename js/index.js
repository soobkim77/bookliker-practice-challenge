document.addEventListener("DOMContentLoaded", () => {
    getBookList()
});

function getBookList (){
    fetch("http://localhost:3000/books")
    .then(r => r.json())
    .then(books => {
        books.forEach(book => buildBookList(book))
    })
}

// function buildBook(){
//     console.log(book)
// }

function buildBookList(book){
    let ul = document.getElementById("list")
    let li = document.createElement("li")
    li.textContent = book.title
    ul.appendChild(li)
    li.addEventListener('click', () => {
        let showBook = document.getElementById("show-panel")
        showBook.innerHTML = ""
        showBook.dataset.id = book.id
        let img = document.createElement("img")
        let p = document.createElement("p")
        let ul = document.createElement("ul")
        book.users.forEach(user => {
            let li = document.createElement("li")
            li.textContent = user.username
            li.id = user.id
            ul.appendChild(li)
        })
        img.src = book.img_url
        p.textContent = book.description
        let btn = document.createElement("button")
        btn.textContent = "like"
        showBook.append(img, p, ul, btn)
        btn.addEventListener('click', addLike)
    })
}

function addLike(e){
    let showBook = document.getElementById("show-panel")
    let ul = e.target.previousElementSibling
    let liArr = ul.querySelectorAll("li")
    let pouros = {"id": 1, "username": "pouros"}
    let userObj = []
    for (let i = 0; i < liArr.length; i++){
        userObj[i] = {
            "id": parseInt(liArr[i].id) ,
            "username": `${liArr[i].textContent}`
        }
    }
    userObj.push(pouros)
    let bookURL = `http://localhost:3000/books/${showBook.dataset.id}`
    let config = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application.json"
        },
        body: JSON.stringify({"users": userObj})
    }
    fetch(bookURL, config)
    .then(r => r.json())
    .then(book => {
        let showBook = document.getElementById("show-panel")
        let ul = showBook.querySelector("ul")
        let li = document.createElement("li")
        debugger
        li.textContent = book.users[book.users.length-1].username
        li.id = book.users[book.users.length-1].id
        ul.appendChild(li)
    //     book.users.forEach(user => {
    //         let li = document.createElement("li")
    //         li.textContent = user.username
    //         li.id = user.id
    //         ul.appendChild(li)
    // })
})
}

