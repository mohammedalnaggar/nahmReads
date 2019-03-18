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
                    if (this.response){location.reload()}
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

