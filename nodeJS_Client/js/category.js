const categoryAddBtn = document.getElementById("addNewCategoryBtn");
const editCategoryBtn=document.getElementById("editCategoryBtn");
categoryAddBtn.addEventListener("click", function (evt) {
  // evt.preventDefault();
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let response = JSON.parse(this.response)[JSON.parse(this.response).length - 1]
      let category_arr = [response._id, response.name]
      addRow(1,"categoriesTable", category_arr)
    }
  };
  xhttp.open("POST", "http://localhost:5000/admin/categories");
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(JSON.stringify({
    "name": document.getElementById("categoryAddTF").value
  }));
});

function editCategories(rowToEdit, uri) {
  // console.log('from editCategoies func')
  // console.log(rowToEdit)

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let response = JSON.parse(this.response)[JSON.parse(this.response).length - 1]
      let category_arr = [response._id, response.name]
      // console.log(category_arr)
      // addRow("categoriesTable", category_arr)
      editRow(rowToEdit, category_arr)
    }
  };
  xhttp.open("POST", `http://localhost:5000/admin/categories/${uri}/update`);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  // xhttp.setRequestHeader("Access-Control-Allow-Methods", "PUT");
  xhttp.send(JSON.stringify({
    "name": document.getElementById("categoryEditTF").value
  }));
}

function listCategories() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      listRows(this.response, "categoriesTable")
    }
  };
  xhttp.open("GET", "http://localhost:5000/admin/categories");
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send()
};
