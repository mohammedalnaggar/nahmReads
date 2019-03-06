const authorAddBtn = document.getElementById("addNewAuthorBtn");
authorAddBtn.addEventListener("click", function () {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.response);
    }
  };
  xhttp.open("POST", "http://192.168.1.94:5000/admin/authors");
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(JSON.stringify({
    "first_name": document.getElementById("newAuthorFName").value,
    "last_name": document.getElementById("newAuthorLName").value,
    "birth_date": document.getElementById("newAuthorDOB").value
  }));
});