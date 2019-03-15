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