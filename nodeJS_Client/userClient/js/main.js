$('.tab a').on('click', function (e) {
  
    e.preventDefault();
    
    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active');
    
    target = $(this).attr('href');
  
    $('.tab-content > div').not(target).hide();
    
    $(target).fadeIn(600);
    
});

            // for drop down menu
            /*Dropdown Menu*/
            $('.dropdown').click(function () {
                $(this).attr('tabindex', 1).focus();
                $(this).toggleClass('active');
                $(this).find('.dropdown-menu').slideToggle(300);
            });
            $('.dropdown').focusout(function () {
                $(this).removeClass('active');
                $(this).find('.dropdown-menu').slideUp(300);
            });

            $('.dropdown .dropdown-menu li').click(function () {
                $(this).parents('.dropdown').find('span').text($(this).text());
                $(this).parents('.dropdown').find('input').attr('value', $(this).attr('id'));
            });
            /*End Dropdown Menu*/


            $('.dropdown-menu li').click(function () {
                var input = '<strong>' + $(this).parents('.dropdown').find('input').val() + '</strong>',
                    msg = '<span class="msg">Hidden input value: ';
                $('.msg').html(msg + input + '</span>');
            });
            function shelve(status,book_id){
                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function () {
                  if (this.readyState == 4 && this.status == 200) {
                    if (this.response){location.reload();console.log("hi")}
                  }
                };
                xhttp.open("POST", `http://127.0.0.1:5000/books/${book_id}/shelve`);
                xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                // xhttp.setRequestHeader("access-token", localStorage.getItem("token"));
                xhttp.send(JSON.stringify({
                    user_id:localStorage.getItem("userId"),
                    status:status
                }))
            }

// $('#star1').hover(
//     function(){
//       $(this).attr('src','../images/goldenstar.png')
//     },
//     function(){
//       $(this).attr('src','../images/emptystar.png')
//     }
// )


//   <div class="tab-content">

//             <div id="allBooksTab">

//                 <!-- Boxes -->

//                 <div class="thumbnails" >


//                     <div class="box" style="height:10%">
//                         <div class="inner">
//                             <h2>Romance</h2>
//                             <a href="" class="button style2 fit">Visit this category page</a>
//                         </div>
//                     </div>

//                     <div class="box" style="height:10%">
//                         <div class="inner">
//                             <h2>Romance</h2>
//                             <a href="" class="button style2 fit">Visit this category page</a>
//                         </div>
//                     </div>

//                     <div class="box" style="height:10%">
//                         <div class="inner">
//                             <h2>Romance</h2>
//                             <a href="" class="button style2 fit">Visit this category page</a>
//                         </div>
//                     </div>


//                 </div>

//             </div>

//             <!-- read tab -->
//             <div  id="readTab">

//                 <!-- Boxes -->
//                 <div class="thumbnails" >


//                     <div class="box" style="height:10%">
//                         <div class="inner">
//                             <h2>Tab 2</h2>
//                             <a href="" class="button style2 fit">Visit this category page</a>
//                         </div>
//                     </div>

//                     <div class="box" style="height:10%">
//                         <div class="inner">
//                             <h2>Tab 2</h2>
//                             <a href="" class="button style2 fit">Visit this category page</a>
//                         </div>
//                     </div>


//                 </div>

//             </div>
//         </div>

let stars = document.getElementsByClassName("rate")[0].children;
let current_star = 0;
let star1 = document.getElementById('1');
let star2 = document.getElementById('2');
let star3 = document.getElementById('3');
let star4 = document.getElementById('4');
let star5 = document.getElementById('5');


star1.addEventListener("click", displayRate);
star2.addEventListener("click", displayRate);
star3.addEventListener("click", displayRate);
star4.addEventListener("click", displayRate);
star5.addEventListener("click", displayRate);


star1.addEventListener("mouseover", mouseOver);
star2.addEventListener("mouseover", mouseOver);
star3.addEventListener("mouseover", mouseOver);
star4.addEventListener("mouseover", mouseOver);
star5.addEventListener("mouseover", mouseOver);


star1.addEventListener("mouseout", mouseOut);
star2.addEventListener("mouseout", mouseOut);
star3.addEventListener("mouseout", mouseOut);
star4.addEventListener("mouseout", mouseOut);
star5.addEventListener("mouseout", mouseOut);

function mouseOut() {
  for (let i = 1; i <= stars.length; i++) {
    if (i <= current_star)
      document.getElementById(i.toString()).src = "images/goldenstar.png";
    else
      document.getElementById(i.toString()).src = "images/emptystar.png";
  }
}

function mouseOver() {
  //displayRate(this);
  // console.log(current_star)
  for (let i = 1; i <= stars.length; i++) {
    if (i <= parseInt(this.getAttribute("id")))
      document.getElementById(i.toString()).src = "images/goldenstar.png";
    else
      document.getElementById(i.toString()).src = "images/emptystar.png";
  }
}

function displayRate() {

  current_star = parseInt(this.getAttribute("id"));
  for (let i = 1; i <= stars.length; i++) {
    if (i <= current_star)
      document.getElementById(i.toString()).src = "images/goldenstar.png";
    else
      document.getElementById(i.toString()).src = "images/emptystar.png";
  }
  
  if (this.parentElement.parentElement.getAttribute('class') === 'box'){
    let bookId = this.parentElement.parentElement.getAttribute('id');
    rating_request(bookId);
  } else
  {
    let bookId = this.parentElement.parentElement.parentElement.getAttribute('id');
    rating_request(bookId);
  }
}

function rating_request(book_id) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.response);
    }
  };
  //get book_id to send it to the route.

  xhttp.open("POST", `http://127.0.0.1:5000/api/booksRouter/${book_id}/rate`);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.setRequestHeader("access-token", localStorage.getItem("token"));

  xhttp.send(JSON.stringify({
    user_id: localStorage.getItem("userId"),
    user_rating: current_star
  }))
};

function retrieve_rate(total_rate) {
  total_rate = Math.abs(Math.round(total_rate));
  for (let i = 1; i <= total_rate; i++) {
    document.getElementById("_" + i.toString()).src = "images/goldenstar.png";
  }
}