const bookAddBtn = document.getElementById("addNewBookBtn");
const bookEditBtn=document.getElementById("editBookBtn")
bookAddBtn.addEventListener("click", function (evt) {
  evt.preventDefault()
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let response=JSON.parse(this.response)[JSON.parse(this.response).length-1]
      console.log(response.name)
      let book_arr = [response._id,response.name, response.category_id,response.author_id]
      addRow(2,"booksTable",book_arr)
    }
  };
  xhttp.open("POST", "http://localhost:5000/admin/books");
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(JSON.stringify({
    "name": document.getElementById("newBookName").value,
    "author_id": document.getElementById("addAuthorChoice").value,
    "category_id": document.getElementById("addCategoryChoice").value,
    "rating": 0
  }));
});


bookEditBtn.addEventListener("click",(evt)=>{
  let id=document.getElementById("editBookID").value
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let response=JSON.parse(this.response)[JSON.parse(this.response).length-1]
      let book_arr = [response._id,response.name, response.category_id,response.author_id]
      // addRow("authorsTable",author_arr)
    }
  };
  xhttp.open("POST", `http://localhost:5000/admin/books/${id}/edit`);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(JSON.stringify({
    "name": document.getElementById("editBookName").value,
    "author_id": document.getElementById("editAuthorChoice").value,
    "category_id": document.getElementById("editCategoryChoice").value
  }));
})

function listBooks() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.response)
      listRows(this.response,"booksTable")
    }
  };
  xhttp.open("GET", "http://localhost:5000/admin/books");
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send()
};