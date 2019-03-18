let books_div = document.getElementsByClassName("thumbnails")[0]
let book_div = document.getElementById("book_div")
window.addEventListener("load", (evt) => {
  listBooks();
})

function listBooks() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let response = JSON.parse(this.response)
      response.forEach(book => {
        let div = document.createElement("div")
        books_div.appendChild(div)
        div.innerHTML = book_div.innerHTML
        div.setAttribute("id", book._id)
        div.setAttribute("class", "box")
        div.getElementsByTagName("h3")[0].innerText = book.name
        // div.getElementsByTagName("h3")[1].innerText=book.author_id.first_name
        div.style.display = true
        div.getElementsByTagName('button')[0].setAttribute('id', book._id)
        div.getElementsByTagName('button')[1].setAttribute('id', book.author_id._id)

        // add event listeners to send you to author page
        div.getElementsByTagName('button')[0].addEventListener('click', () => {
          localStorage.setItem('bookId',book._id)
          window.location.href='./bookPage.html'
        })

        div.getElementsByTagName('button')[1].addEventListener('click', () => {
          localStorage.setItem('authorId',book.author_id._id)
          window.location.href='./authorPage.html'
        })

      });
    }
  };
  xhttp.open("GET", "http://127.0.0.1:5000/books");
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send()
};



// let books_div = document.getElementsByClassName("thumbnails")[0]
// let book_div = document.getElementById("book_div")
// window.addEventListener("load", (evt) => {
//   listBooks();
// })

// function fillBookPage(book){

//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function () {
//       if (this.readyState == 4 && this.status == 200) {
//         let new_res = JSON.parse(this.response)
//         console.log(new_res.book.name)
//         // fillBookPage(new_res)
//       }
//     };
//     xhttp.open("POST", `http://127.0.0.1:5000/books/${book._id}`);
//     xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//     xhttp.send(JSON.stringify({
//       "user_id": '5c86b07b9411fa53c69270dd'
//     }));


//   // console.log(Response)
//   window.location.href='./bookPage.html'

//   document.getElementById('bookName').innerText = response.book.name


// }
// let globres=null

// function listBooks() {
//   var xhttp = new XMLHttpRequest();
//   xhttp.onreadystatechange = function () {
//     if (this.readyState == 4 && this.status == 200) {
//       let response = JSON.parse(this.response)
//       globres = response
//       response.forEach(book => {
//         let div = document.createElement("div")
//         books_div.appendChild(div)
//         div.innerHTML = book_div.innerHTML
//         div.setAttribute("id", book._id)
//         div.setAttribute("class", "box")
//         div.getElementsByTagName("h3")[0].innerText = book.name
//         div.getElementsByTagName("button")[0].setAttribute("id", book._id)
//         div.getElementsByTagName("button")[1].setAttribute("id", book.author_id._id)
//         div.style.display = true


//         // add event listeners to send you to author page
//         div.getElementsByTagName("button")[0].addEventListener("click", function() {
//           fillBookPage(book)
//         })

//       });
//     }
//   };
//   xhttp.open("GET", "http://127.0.0.1:5000/books");
//   xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//   xhttp.send()
// function fillListners(globres){
// globres.forEach(globr =>{
//   let div = document.createElement("div")
//   div.innerHTML = book_div.innerHTML

//   div.getElementsByTagName("button")[0].addEventListener(function(){
//     fillBookPage(globres)
//   })
// })
// }
// fillListners(globres)
// };