// jQuery wrapper
$(document).ready(function() {

// When user clicks search button...
$('.submit').on('click', function(){
  // Declare value of text to variable
  var searchValue = $('#search').val().trim();
  console.log(searchValue);
})

});