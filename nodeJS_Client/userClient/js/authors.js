let authors_div=document.getElementsByClassName("thumbnails")[0]
let author_div=document.getElementById("author_div")
window.addEventListener("load", (evt) => {
  listAuthors();
})

  function listAuthors() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let response = JSON.parse(this.response)
        response.forEach(author => {
          let div= document.createElement("div")
          authors_div.appendChild(div)
          div.innerHTML=author_div.innerHTML
          div.setAttribute("id",author._id)
          div.setAttribute("class","box") 
          div.getElementsByTagName("h3")[0].innerText=author.first_name+" "+author.last_name
          div.style.display=true
// add event listeners to send you to author page
        });
      }
    };
    xhttp.open("GET", "http://127.0.0.1:5000/authors");
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send()
  };