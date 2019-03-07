$('.tab a').on('click', function (e) {

  e.preventDefault();

  $(this).parent().addClass('active');
  $(this).parent().siblings().removeClass('active');

  target = $(this).attr('href');

  $('.tab-content > div').not(target).hide();

  // close adding forms and edit forms while moving from tab to another
  for (let i = 1; i < 4; i++) {
    closeAddForm(i)
    closeEditForm(i)
  }

  $(target).fadeIn(900);

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

// common functions in three tabs (to add & remove & edit tables && manipulating forms)
function openAddForm(x) {
  if (x === 1)
    document.getElementById("newCategoryForm").style.display = "block";
  if (x === 2)
    document.getElementById("newBookForm").style.display = "block";
  if (x === 3)
    document.getElementById("newAuthorForm").style.display = "block";
}

function openEditForm(x, el) {
  if (x === 1) {
    document.getElementById("editCategoryForm").style.display = "block";
    fillEditForm(el);
  }

}

function closeAddForm(x) {
  if (x === 1)
    document.getElementById("newCategoryForm").style.display = "none";
  if (x === 2)
    document.getElementById("newBookForm").style.display = "none";
  if (x === 3)
    document.getElementById("newAuthorForm").style.display = "none";
}

function closeEditForm(x) {
  if (x === 1)
    document.getElementById("editCategoryForm").style.display = "none";

}

function deleteRow(el) {

  // while there are parents, keep going until reach TR 
  while (el.parentNode && el.tagName.toLowerCase() != 'tr') {
    el = el.parentNode;
  }
  if (el.parentNode && el.parentNode.rows.length > 0) {

    let idToDelete = el.firstElementChild.innerText
    console.log(idToDelete)
    // send the request to the server here 

    el.parentNode.removeChild(el);
  }
}

function addRow(tableID) {
  let table = document.getElementById(tableID);

  if (!table) return;

  let newRow = table.rows[1].cloneNode(true);

  // Now get the inputs and modify their names 
  let inputs = newRow.getElementsByTagName('td');

  for (let i = 0, iLen = inputs.length; i < iLen; i++) {
    // Update inputs[i]

    if (i === inputs.length - 1) {
      inputs[i].innerHTML = '<img src="../images/icons/delete.png" onclick="deleteRow(this)" style="width:50px; margin-right: 10%"> <img src="../images/icons/edit.png" onclick="openEditForm(1, this)" style="width:48px">'
    } else {

      // put your object attributes here
      inputs[i].innerText = 'hamaniiii'
    }
  }

  // Add the new row to the tBody (required for IE)
  let tBody = table.tBodies[0];
  tBody.insertBefore(newRow, tBody.lastChild);
}

function fillEditForm(el) {

  while (el.parentNode && el.tagName.toLowerCase() != 'tr') {
    el = el.parentNode;
  }
  if (el.parentNode && el.parentNode.rows.length > 0) {
    let sourceFillData = el.firstElementChild.nextElementSibling.innerText
    document.getElementById("categoryEditTF").value = sourceFillData
    // send the request to the server here 
  }
}