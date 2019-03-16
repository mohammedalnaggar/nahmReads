let books_div = document.getElementsByClassName("thumbnails")[0]
let books_read_div = document.getElementsByClassName("thumbnails")[1]
let books_reading_div = document.getElementsByClassName("thumbnails")[2]
let books_want_div = document.getElementsByClassName("thumbnails")[3]

let book_div = document.getElementById("book_div")
window.addEventListener("load", (evt) => {
    listBooks();
})
function listBooks() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.response)
            let inc = 0
            document.getElementById("username").innerHTML = response.books.name.first_name + " " + response.books.name.last_name
            response.books.books.forEach(book => {
                let div = document.createElement("div")
                //////all section/////////////////
                books_div.appendChild(div)
                div.innerHTML = book_div.innerHTML
                div.setAttribute("id", book.book_id._id)
                div.setAttribute("class", "box")
                div.getElementsByTagName("h3")[0].innerText = book.book_id.name
                div.getElementsByTagName("button")[1].innerText = response.authors[inc].first_name
                div.style.display = true
                div.getElementsByTagName('button')[0].setAttribute('id', book.book_id._id)
                div.getElementsByTagName('button')[1].setAttribute('id', book.book_id.author_id)
                //////read section/////////////////
                if (book.status == "read") {
                    let div = document.createElement("div")
                    books_read_div.appendChild(div)
                    div.innerHTML = book_div.innerHTML
                    div.setAttribute("id", book.book_id._id)
                    div.setAttribute("class", "box")
                    div.getElementsByTagName("h3")[0].innerText = book.book_id.name
                    div.getElementsByTagName("button")[1].innerText = response.authors[inc].first_name
                    div.style.display = true
                    div.getElementsByTagName('button')[0].setAttribute('id', book.book_id._id)
                    div.getElementsByTagName('button')[1].setAttribute('id', book.book_id.author_id)
                }
                //////reading section/////////////////
                if (book.status == "reading") {
                    let div = document.createElement("div")
                    books_reading_div.appendChild(div)
                    div.innerHTML = book_div.innerHTML
                    div.setAttribute("id", book.book_id._id)
                    div.setAttribute("class", "box")
                    div.getElementsByTagName("h3")[0].innerText = book.book_id.name
                    div.getElementsByTagName("button")[1].innerText = response.authors[inc].first_name
                    div.style.display = true
                    div.getElementsByTagName('button')[0].setAttribute('id', book.book_id._id)
                    div.getElementsByTagName('button')[1].setAttribute('id', book.book_id.author_id)
                }
                //////want to read section/////////////////
                if (book.status == "want to read") {
                    let div = document.createElement("div")
                    books_want_div.appendChild(div)
                    div.innerHTML = book_div.innerHTML
                    div.setAttribute("id", book.book_id._id)
                    div.setAttribute("class", "box")
                    div.getElementsByTagName("h3")[0].innerText = book.book_id.name
                    div.getElementsByTagName("button")[1].innerText = response.authors[inc].first_name
                    div.style.display = true
                    div.getElementsByTagName('button')[0].setAttribute('id', book.book_id._id)
                    div.getElementsByTagName('button')[1].setAttribute('id', book.book_id.author_id)
                }

                inc++

                // add event listeners to send you to author page
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


        }
    };
    xhttp.open("GET", "http://127.0.0.1:5000/home");
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.setRequestHeader("user_id", localStorage.getItem("userId"));
    xhttp.send()
};