let books_div=document.getElementsByClassName("thumbnails")[0]
let book_div=document.getElementById("book_div")
window.addEventListener("load", (evt) => {
  listBooks();
})
function listBooks() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let response = JSON.parse(this.response)
        response.forEach(book => {
          let div= document.createElement("div")
          books_div.appendChild(div)
          div.innerHTML=book_div.innerHTML
          div.setAttribute("id",book._id)
          div.setAttribute("class","box") 
          div.getElementsByTagName("h3")[0].innerText=book.name
          div.getElementsByTagName("h3")[1].innerText=book.author_id.first_name
          div.style.display=true
          div.getElementsByTagName('button')[0].setAttribute('id', book._id)
          div.getElementsByTagName('button')[1].setAttribute('id', book.author_id._id)

// add event listeners to send you to author page
        });
      }
    };
    xhttp.open("GET", "http://127.0.0.1:5000/books");
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send()
  };