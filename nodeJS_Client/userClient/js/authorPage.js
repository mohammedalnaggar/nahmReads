window.addEventListener("load", (evt) => {
<<<<<<< HEAD
  // let div =document.getElementsByClassName("thumbnails")[0]
  // rate(div)
=======

>>>>>>> 086d6e443fe4adb75063d180f68a818a17f9f3d1
  fillAuthorPage();
})

function fillAuthorPage() {

<<<<<<< HEAD
  let userId = localStorage.getItem("userId")
  let authorId = localStorage.getItem("authorId")
  console.log(userId + " user ID")
  console.log(authorId + " Author ID")

=======
  let userId = localStorage.getItem('userId')
  let authorId = localStorage.getItem('authorId')
>>>>>>> 086d6e443fe4adb75063d180f68a818a17f9f3d1
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let new_res = JSON.parse(this.response)
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
