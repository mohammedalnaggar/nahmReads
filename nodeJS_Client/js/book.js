const bookAddBtn = document.getElementById("addNewBookBtn");
bookAddBtn.addEventListener("click", function () {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.response);
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