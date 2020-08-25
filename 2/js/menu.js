  /*pc-menu*/
  $('#pc-menu').on('click focus', function () {
    $('body , #gnb').addClass('open');
  });
  $('#gnb .btn-close').on('click focusout', function () {
    $('body , #gnb').removeClass('open');
  });
  /*mobile-menu*/
  $('#mobile-menu').on('click focus', function () {
    $('body , #mobile-gnb').addClass('open-mobile').stop(true).animate({'left': 0}, 500);
  });
  $('#mobile-close').on('click focusout', function () {
    $('#mobile-gnb').stop(true).animate({'left': '-120%'}, 500, function() {
      $('body , #mobile-gnb').removeClass('open-mobile');
    });
  });

  $('#mobile-gnb .gnb-menu .toggle').on('click', function () {
    var subHeight = 0;
      $(this).find('.sub-menu li').each(function() {
      subHeight += $(this).outerHeight(true);
      });
      $('#mobile-gnb .sub-menu').css({'height': 0});
      $(this).find('.sub-menu').css({'height': subHeight + 'px'});
      $('#mobile-gnb .gnb-menu .toggle').removeClass('on');
      $(this).addClass('on');
  
  });
 
$(window).on('resize', function() {
  if ($(window).outerWidth() > 1025) {
    $('body , #mobile-gnb').removeClass('open-mobile');
  } else {
    $('body , #gnb').removeClass('open');
  }
});

$('#lnb > ul > li > a').on('click', function() {
    var subHeight = 0;
    
  if ($(this).parent().find('ul').length > 0) {
    if ($(this).hasClass('on') === true) {
      $(this).parent().find('.sub-menu').css({'height': 0});
      $(this).removeClass('on');
      $('body').removeClass('open-lnb');
    } else {
      if ($(window).outerWidth() > 767) {
        $(this).parent().find('.sub-menu li').each(function() {
          subHeight += $(this).outerHeight(true);
        });
        $('#lnb .sub-menu').css({'height': 0});
        $(this).parent().find('.sub-menu').css({'height': subHeight + 'px'});
        $('#lnb > ul > li > a').removeClass('on');
        $(this).addClass('on');
      } else {
        $(this).parent().find('.sub-menu').css({'height': 200 + 'px'});
        $('body').addClass('open-lnb');
        $(this).addClass('on');
      }
    
    }
    //$(this).parent().siblings().removeClass('on');
    //$(this).parent().toggleClass('on');
  }
});

