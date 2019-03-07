const categoryAddBtn = document.getElementById("addNewCategoryBtn");

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
  xhttp.open("POST", "http://192.168.1.90:5000/admin/categories");
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(JSON.stringify({
    "name": document.getElementById("categoryAddTF").value
  }));
});


function listCategories() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      listRows(this.response, "categoriesTable")
    }
  };
  xhttp.open("GET", "http://192.168.1.90:5000/admin/categories");
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send()
};
