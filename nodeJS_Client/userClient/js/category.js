let books_div=document.getElementsByClassName("thumbnails")[0]
let book_div=document.getElementById("book_div")
let categoryName_span=document.getElementById("categoryName")




window.addEventListener("load", (evt) => {
    listCategoryBooks();
})





  function listCategoryBooks() {
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
          div.getElementsByTagName("h2")[0].innerText=book.name
          categoryName_span.innerHTML=book.category_id.name
          div.style.display=true
// add event listeners to send you to author page
        });
      }
    };
    xhttp.open("GET", "http://127.0.0.1:5000/categories/5c801db36cc08a765e22e0bc");
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send()
  };