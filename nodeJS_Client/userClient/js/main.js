$('.tab a').on('click', function (e) {
  
    e.preventDefault();
    
    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active');
    
    target = $(this).attr('href');
  
    $('.tab-content > div').not(target).hide();
    
    $(target).fadeIn(600);
    
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