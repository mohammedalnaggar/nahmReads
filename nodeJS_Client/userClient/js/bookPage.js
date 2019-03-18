let bookName = document.getElementById('bookName')
window.addEventListener("load", (evt) => {
  fillBookPage();
  
})

function fillBookPage() {

  let userId = localStorage.getItem('userId')
  let bookId = localStorage.getItem('bookId')

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let new_res = JSON.parse(this.response)
      // user shelve
      document.getElementsByTagName('span')[1].innerText = new_res.status

      // user rating filling
      let userStars = document.getElementsByClassName('rate')[0].children
      for (let i = 0; i < new_res.user_rating; i++) {
        userStars[i].src = './images/goldenstar.png'
      }

      // book attr
      document.getElementById('bookName').innerText = new_res.book.name
      document.getElementById('bookAuthor').innerText = new_res.book.author_id.first_name + " " + new_res.book.author_id.last_name
      document.getElementById('bookCategory').innerText = new_res.book.category_id.name

      // Avg rating
      let avgStars = document.getElementsByClassName('rate')[1].children
      for (let i = 0; i < Math.round(new_res.book.rating); i++) {
        avgStars[i].src = './images/goldenstar.png'
      }

      document.getElementById('avgRating').innerText = new_res.book.rating
      let div = document.getElementsByClassName("thumbnails")[0]
      ///rating
      rate(div)
      ////add listener on selection from menue
      let liTags = div.getElementsByTagName("li")
      for (let i = 0; i < 3; i++) {
        liTags[i].addEventListener("click", function (event) {
          shelve(this.innerText, localStorage.getItem("bookId"))
        })
      }

      // show image
      let bookImage=document.getElementById("bookImage")
      getImage(new_res.book.picture,bookImage)

    }
  };
  xhttp.open("POST", `http://127.0.0.1:5000/books/${bookId}`);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(JSON.stringify({
    "user_id": `${userId}`
  }));

}




