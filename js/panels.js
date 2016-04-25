/* Javascript Document
/* Written by Summer Wilken */

var panelWidth = 0;
var startPanel = 0;

$(document).ready(function(){

  window.panelWidth = $('.panels').width();

  initializeScreen();

  $('.sp span').each(function(){
		$(this).on('click', function(){
		    changePanels( $(this).index() );
		});
	});
});

//hides all of the panels except for the starting panel
function initializeScreen() {

    $('.panels .panel').each(function() {
      if ($(this).index() != startPanel) {
        $(this).hide();
      }
    });
}

//iterates through each index
function changePanels(newIndex) {

  var currPanel = newIndex - 1;

  $('.panels .panel').each(function() {
    if ($(this).index() != currPanel) {

      $(this).hide();

    } else {

      $(this).show();
    }
  });
}
