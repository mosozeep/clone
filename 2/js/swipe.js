$(document).ready(function () {
  preventDefaultAnchor();
});

function preventDefaultAnchor() {
  $(document).on('click', 'a[href="#"]', function (e) {
    e.preventDefault();
  });
}

$.fn.setImgSlide = function (options) {
  var settings = $.extend({
    slideFist: 1,
    slideMode: 'slide',
    fadeS: 800,
    slideS: 0.5,
    timerMode: true,
    timerS: 3000,
    indicatorMode: false
  }, options);
  this.each(function () {
    var $selector = $(this);
    var numSlide = $selector.find('ul.slide li').length;
    var slideNow = 0;
    var slidePrev = 0;
    var slideNext = 0;
    var slideFirst = settings.slideFist;
    var effect = settings.slideMode;
    var fadeSpeed = settings.fadeS;
    var slideSpeed = settings.slideS;
    var isTimerOn = settings.timerMode;
    var timerId = null;
    var timerSpeed = settings.timerS;
    var isImgIndicator = settings.indicatorMode;

    $selector.find('ul.slide li').each(function (i) {
      if (isImgIndicator === true) {
        var img = $(this).html();
        $selector.find('ul.indicator').append('<li><a href="#"><span class="blind">' + (i + 1) + '번 비주얼</span>' + img + '</a></li>\n');
        $selector.find('ul.indicator li a img').attr({'alt': ''});
      } else {
        $selector.find('ul.indicator').append('<li><a href="#"><span class="blind">' + (i + 1) + '번 비주얼</span></a></li>\n');
      }
    });

    showSlide(slideFirst);

    $selector.find('ul.indicator li a').on('click', function () {
      var index = $selector.find('ul.indicator li').index($(this).parent());
      showSlide(index + 1);
    });
    $selector.find('p.control a.prev').on('click', function () {
      showSlide(slidePrev);
    });
    $selector.find('p.control a.next').on('click', function () {
      showSlide(slideNext);
    });
    $selector.find('p.control a.play').on('click', function () {
      if (isTimerOn === true) {
        clearTimeout(timerId);
        $(this).removeClass('on');
        isTimerOn = false;
      } else {
        timerId = setTimeout(function () {
          showSlide(slideNext);
        }, timerSpeed);
        $(this).addClass('on');
        isTimerOn = true;
      }
    });


    function showSlide(n) {
      clearTimeout(timerId);
      if (slideNow === n) return false;
      if (effect === 'fade') {
        if (slideNow === 0) {
          $selector.find('ul.slide li:eq(' + (n - 1) + ')').css({
            'display': 'block',
            'opacity': 1
          });
        } else {
          $selector.find('ul.slide li:eq(' + (slideNow - 1) + ')').stop(true).animate({
            'opacity': 0
          }, fadeSpeed, function () {
            $(this).css({
              'display': 'none'
            });
          });
          $selector.find('ul.slide li:eq(' + (n - 1) + ')').css({
            'display': 'block',
            'opacity': 0
          }).stop(true).animate({
            'opacity': 1
          }, fadeSpeed);
        }

      } else if (effect === 'slide') {
        $selector.find('ul.slide li').each(function (i) {
          $(this).css({
            'left': (i * 100) + '%',
            'display': 'block'
          });
        });
        if (slideNow === 0) {
          $selector.find('ul.slide').css({
            'transition': 'none',
            'left': (-(n - 1) * 100) + '%'
          });
        } else {
          $selector.find('ul.slide').css({
            'transition': ('left ' + slideSpeed + 's'),
            'left': (-(n - 1) * 100) + '%'
          });
        }

      } else {
        $selector.find('ul.slide li').css({
          'display': 'none'
        });
        $selector.find('ul.slide li:eq(' + (n - 1) + ')').css({
          'display': 'block'
        });
      }
      $selector.find('ul.indicator li').removeClass('on');
      $selector.find('ul.indicator li:eq(' + (n - 1) + ')').addClass('on');
      slideNow = n;
      slidePrev = (n <= 1) ? numSlide : (n - 1);
      slideNext = (n >= numSlide) ? 1 : (n + 1);
      if (isTimerOn === true) {
        timerId = setTimeout(function () {
          showSlide(slideNext);
        }, timerSpeed);
      }
    }
  });
}
