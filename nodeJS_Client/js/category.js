const categoryAddBtn = document.getElementById("addNewCategoryBtn");
const editCategoryBtn=document.getElementById("editCategoryBtn");
categoryAddBtn.addEventListener("click", function (evt) {
  evt.preventDefault();
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let response = JSON.parse(this.response)[JSON.parse(this.response).length - 1]
      let category_arr = [response._id, response.name]
      addRow("categoriesTable", category_arr)
    }
  };
  xhttp.open("POST", "http://localhost:5000/admin/categories");
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(JSON.stringify({
    "name": document.getElementById("categoryAddTF").value
  }));
});


function editCategories(id) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let response = JSON.parse(this.response)[JSON.parse(this.response).length - 1]
      let category_arr = [response._id, response.name]
      // addRow("categoriesTable", category_arr)
    }
  };
  xhttp.open("PUT", `http://localhost:5000/admin/categories/${id}`);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.setRequestHeader("Access-Control-Allow-Methods", "PUT");
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
