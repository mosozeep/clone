$('.toggle-h3').on('click', function() {
  if ($(this).hasClass('on') === true) {
    $(this).removeClass('on');
    $(this).next().removeClass('on'); 
  } else {
    $(this).addClass('on');
    $(this).next().addClass('on');     
  }
});

