$(document).ready(function () {
  preventDefaultAnchor();
});

function preventDefaultAnchor() {
  $(document).on('click', 'a[href="#"]', function (e) {
    e.preventDefault();
  });
}

$('a.btn-menu').on('click', function () {
  if ($('header').hasClass('open') === true) {
    $(this).text('MENU');
    $('ul.gnb-menu').css({
      'height': '0'
    });
    $('header').removeClass('open');
  } else {
    var gnbHeight = 0;
    $(this).text('CLOSE');
    $('ul.gnb-menu').find('li').each(function () {
      gnbHeight += $(this).outerHeight(true);
    });
    $('ul.gnb-menu').css({
      'height': gnbHeight + 'px'
    });
    $('header').addClass('open');
  }

});

setImageSlide('body.main div.img-slide', 3);

function setImageSlide(selector, first) {
  var numSlide = $(selector).find('ul.slide li').length;
  var slideNow = 0;
  var slidePrev = 0;
  var slideNext = 0;
  var slidePPrev = 0;
  var slideNNext = 0;
  var slideFirst = first;
  var startX = 0;
  var delX = 0;
  var offsetX = 0;
  var isClickAllowed = true;
  var onAnimation = false;

  showSlide(slideFirst, 'change');

  $(selector).find('ul.slide').on('mousedown', function (e) {
    if (onAnimation === true) return false;
    $(this).css({
      'transition': 'none'
    });
    startX = e.clientX;
    offsetX = $(this).position().left;

    $(document).on('mousemove', function (e) {
      e.preventDefault();
      delX = e.clientX - startX;
      $(selector).find('ul.slide').css({
        'left': (offsetX + delX) + 'px'
      });
      if (delX > 20) {
        $('ul.slide').addClass('right');
      } else if (delX < -20) {
        $('ul.slide').addClass('left');
      }
      if (Math.abs(delX) > 10) isClickAllowed = false;
    });

    $(document).on('mouseup', function (e) {
      $('ul.slide').removeClass('left right');
      if (delX < -50) {
        showSlide(slideNext, 'next');
      } else if (delX > 50) {
        showSlide(slidePrev, 'prev');
      } else {
        showSlide(slideNow, 'now');
      }
      $(document).off('mousemove mouseup');
    });
  }).on('click', function (e) {
    if (isClickAllowed === false) {
      e.preventDefault();
      isClickAllowed = true;
    }
  });


  function showSlide(n, direction) {
    if (onAnimation === true) return false;
    if (direction === 'change') {
      resetSlide(n);
    } else {
      var offsetLeft = 0;
      if (direction === 'prev') {
        offsetLeft = 100;
      } else if (direction === 'next') {
        offsetLeft = -100;
      } else {
        offsetLeft = 0;
      }
      onAnimation = true;
      $(selector).find('ul.slide').css({
        'transition': 'left 0.3s',
        'left': offsetLeft + '%'
      }).one('transitionend', function () {
        resetSlide(n);
        onAnimation = false;
      });
    }
    $(selector).find('ul.slide li').removeClass('on');
    $(selector).find('ul.slide li').eq(n - 1).addClass('on');
  }

  function resetSlide(n) {
    slideNow = n;
    slidePrev = (n <= 1) ? numSlide : (n - 1);
    slideNext = (n >= numSlide) ? 1 : (n + 1);
    slidePPrev = (n <= 1) ? numSlide - 1 : (n - 2);
    if (n >= numSlide) {
      slideNNext = 2;
    } else if (n === numSlide - 1) {
      slideNNext = 1;
    } else {
      slideNNext = n + 2;
    }

    $(selector).find('ul.slide').css({
      'transition': 'none',
      'left': 0
    });
    $(selector).find('ul.slide li').css({
      'left': 0,
      'display': 'none'
    });
    $(selector).find('ul.slide li:eq(' + (slideNow - 1) + ')').css({
      'left': 0,
      'display': 'block'
    });
    $(selector).find('ul.slide li:eq(' + (slidePrev - 1) + ')').css({
      'left': '-100%',
      'display': 'block'
    });
    $(selector).find('ul.slide li:eq(' + (slideNext - 1) + ')').css({
      'left': '100%',
      'display': 'block'
    });
    $(selector).find('ul.slide li:eq(' + (slidePPrev - 1) + ')').css({
      'left': '-200%',
      'display': 'block'
    });
    $(selector).find('ul.slide li:eq(' + (slideNNext - 1) + ')').css({
      'left': '200%',
      'display': 'block'
    });
  }
}

setTextFloat('ul.slide li:nth-child(1) h2:nth-of-type(1)', 'MUSEUM');
setTextFloat('ul.slide li:nth-child(1) h2:nth-of-type(2)', 'CLOSED');
setTextFloat('ul.slide li:nth-child(2) h2:nth-of-type(1)', 'LOUVRE');
setTextFloat('ul.slide li:nth-child(2) h2:nth-of-type(2)', 'HIGHLIGHTS');
setTextFloat('ul.slide li:nth-child(2) span', 'Selectied works');
setTextFloat('ul.slide li:nth-child(3) h2', 'MONA LISA');
setTextFloat('ul.slide li:nth-child(3) span', 'A closer look at...');
setTextFloat('ul.slide li:nth-child(4) h2:nth-of-type(1)', '800 YEARS');
setTextFloat('ul.slide li:nth-child(4) h2:nth-of-type(2)', 'OF HISTORY');
setTextFloat('ul.slide li:nth-child(4) span', 'Virtual tour');
setTextFloat('ul.slide li:nth-child(5) h2', 'Virtual tour');

function setTextFloat(selector, text) {
  var floatText = text;
  for (var i in floatText) {
    if (floatText[i] === '') {
      $(selector).append($('<i>').html('&nbsp;'));
    } else {
      $(selector).append($('<i>').text(text[i]));
    }
    $(selector).find('i').eq(i).css({
      'animation-delay': Math.random() * 3 + 's'
    });
    var uu = String(Math.round(Math.random()));
    $(selector).find('i').eq(i).addClass('t' + uu);
  }
}

setSubMenu('#sub-menu div.img-slide', 1, false, 3000);

function setSubMenu(selector, first, status, speed) {
  var numSlide = $(selector).find('ul.slide.white li').length - 2;
  var slideNow = 0;
  var slidePrev = 0;
  var slideNext = 0;
  var slideFirst = first;
  var startX = 0;
  var delX = 0;
  var offsetX = 0;
  var isClickAllowed = true;

  $(selector).find('ul.slide.white li').each(function (i) {
    $(this).css({
      'left': (i * 100) + '%',
    });
  });
    $(selector).find('ul.slide.shadow li').each(function (i) {
    $(this).css({
      'left': (i * 100) + '%',
    });
  });

  showSlide(slideFirst);

  $(selector).find('ul.slide.white').on('mousedown', function (e) {
    $(this).css({
      'transition': 'none'
    });
    $('ul.slide.shadow').css({'transition': 'none'});
    startX = e.clientX;
    offsetX = $(this).position().left;

    $(document).on('mousemove', function (e) {
      e.preventDefault();
      delX = e.clientX - startX;
      if ((delX > 0 && slideNow === 1) || (delX < 0 && slideNow === numSlide)) delX = delX / 10;
      $(selector).find('ul.slide.white , ul.slide.shadow').css({
        'left': (offsetX + delX) + 'px'
      });
      if (Math.abs(delX) > 10) isClickAllowed = false;
    });

    $(document).on('mouseup', function (e) {
      if (delX < -50 && slideNow !== numSlide) {
        showSlide(slideNext);
      } else if (delX > 50 && slideNow !== 1) {
        showSlide(slidePrev);
      } else {
        showSlide(slideNow);
      }
      $(document).off('mousemove mouseup');
    });
  }).on('click', function (e) {
    if (isClickAllowed === false) {
      e.preventDefault();
      isClickAllowed = true;
    }
  });


  function showSlide(n) {
    if (slideNow === 0) {
      $(selector).find('ul.slide.white , ul.slide.shadow').css({
        'transition': 'none',
        'left': -((n - 1) * 100) + '%'
      });
    } else {
      $(selector).find('ul.slide.white , ul.slide.shadow').css({
        'transition': 'left 0.3s',
        'left': -((n - 1) * 100) + '%'
      });
    }
    slideNow = n;
    slidePrev = (n <= 1) ? numSlide : (n - 1);
    slideNext = (n >= numSlide) ? 1 : (n + 1);
  }
}
setCursor();
$(document).on('load', function() {
   $('#wrap').trigger('mousemove'); 
});

function setCursor() {
  $('#wrap').on('mousemove', function (e) {
    var X = e.pageX;
    var Y = e.pageY;
    $('#cursor').css({
      'left': X + 'px',
      'top': Y + 'px'
    });
  });
  $('ul.slide.white li a').on('mouseenter', function () {
    $('#cursor').addClass('img');
  });
  $('ul.slide.white li a').on('mouseleave', function () {
    $('#cursor').removeClass('img');
  });
}
