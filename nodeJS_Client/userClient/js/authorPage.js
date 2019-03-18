window.addEventListener("load", (evt) => {
  // let div =document.getElementsByClassName("thumbnails")[0]
  // rate(div)
  fillAuthorPage();
})

function fillAuthorPage() {

  let userId = localStorage.getItem("userId")
  let authorId = localStorage.getItem("authorId")
  console.log(userId + " user ID")
  console.log(authorId + " Author ID")

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let new_res = JSON.parse(this.response)
      console.log(new_res)

      document.getElementById("authorName").innerText = new_res.author.first_name+" "+new_res.author.last_name
      // DOB
      let date = new Date(new_res.author.birth_date)
      let EditedDate = conv_to_date(date)
      document.getElementById("BOD").innerText = EditedDate
      let div =document.getElementsByClassName("thumbnails")[0]
      // rate(div)
    }
  };
  xhttp.open("GET", `http://127.0.0.1:5000/authors/5c8e462ddd97366afe000be5/5c8e3eb4d3722941f81f7866`);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send();

}

function conv_to_date(date){
  let month=date.getMonth()+1
  let day=date.getDate()
  let year=date.getFullYear()
  if (month.toString().length===1){month="0"+month.toString()}
  if (day.toString().length===1){day="0"+day.toString()}
  return year.toString()+"-"+month.toString()+"-"+day.toString()
}
