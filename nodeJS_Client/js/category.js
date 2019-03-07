const categoryAddBtn = document.getElementById("addNewCategoryBtn");
categoryAddBtn.addEventListener("click", function () {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.response);
    }
  };
  xhttp.open("POST", "http://192.168.1.94:5000/admin/categories");
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(JSON.stringify({
    "name": document.getElementById("categoryAddTF").value
  }));
});

const categoriesTab = document.getElementById("categoriesTab")
categoriesTab.addEventListener("click",function(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // console.log(this.response)
      // addRow("categoriesTable",this.response)
       JSON.parse(this.response).forEach(element => {
        let arr = [element._id, element.name]
        addRow("categoriesTable", arr)
       });     
    }
  };
  xhttp.open("GET", "http://127.0.0.1:5000/admin/categories");
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send();
})
