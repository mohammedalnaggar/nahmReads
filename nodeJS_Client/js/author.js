const authorAddBtn = document.getElementById("addNewAuthorBtn");
const editAuthorBtn=document.getElementById("editCategoryBtn");

authorAddBtn.addEventListener("click", function (evt) {
  evt.preventDefault()
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let response=JSON.parse(this.response)[JSON.parse(this.response).length-1]
      let author_arr = [response._id,null, response.first_name,response.last_name,response.birth_date]
      addRow("authorsTable",author_arr)
    }
  };
  xhttp.open("POST", "http://localhost:5000/admin/authors");
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(JSON.stringify({
    "first_name": document.getElementById("newAuthorFName").value,
    "last_name": document.getElementById("newAuthorLName").value,
    "birth_date": document.getElementById("newAuthorDOB").value
  }));
});


function editAuthor(id){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let response=JSON.parse(this.response)[JSON.parse(this.response).length-1]
      let author_arr = [response._id,null, response.first_name,response.last_name,response.birth_date]
      // addRow("authorsTable",author_arr)
    }
  };
  xhttp.open("PUT", `http://localhost:5000/admin//${id}`);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(JSON.stringify({
    "first_name": document.getElementById("newAuthorFName").value,
    "last_name": document.getElementById("newAuthorLName").value,
    "birth_date": document.getElementById("newAuthorDOB").value
  }));
}


function listAuthors() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      listRows(this.response,"authorsTable")
    }
  };
  xhttp.open("GET", "http://localhost:5000/admin/authors");
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send()
};
