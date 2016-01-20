// Provides greater control over CSS styling by wrapping
// select elements in divs and augmenting their behaviour

jQuery(document).ready(function($) {

  wrapSelectBoxes();

  function wrapSelectBoxes() {
    $.each($('select'), function(key, value){
      if (!$(this).parent().hasClass('select-wrapper')) {
        var defaultVal = $(this).find('option:selected').text();
        $(this)
          .after('<div class="select-text">'+defaultVal+'</div>')
          .wrap('<div class="select-wrapper"></div>')
          .bind('focus', function(){ $(this).parent().addClass('focus'); })
          .bind('blur', function(){ $(this).parent().removeClass('focus'); })
          .bind('change', function(){
            $(this).parent().next('.select-text').html($(this).find('option:selected').text());
          })
          .bind('keyup', function(event){
            // Arrow keys
            if (event.which == 37 || event.which == 38 || event.which == 39 || event.which == 40) {
              $(this).parent().next('.select-text').html($(this).find('option:selected').text());
            }
          });
      }
    });
  }

  function unwrapSelectBoxes() {
    $.each($('select'), function(key, value){
      if ($(this).parent().hasClass('select-wrapper')) {
        $(this).parent().next('.select-text').remove();
        $(this).unwrap();
      }
    });
  }

});