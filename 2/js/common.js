$(document).ready(function () {
  preventDefaultAnchor();
});

setHeaderScroll();
setSubLnb();

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
        $selector.find('ul.indicator li a img').attr({
          'alt': ''
        });
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

function setBannerSlide(selector) {
  var offsetLeft = 0;
  var boxWidth = $(selector).find('div.box').innerWidth();
  var barWidth = 0;
  var minOffsetLeft = 0;
  var numBanner = $(selector).find('ul.banner li').length;
  var bannerNow = 0;
  var bannerPrev = 0;
  var bannerNext = 0;
  var timerId = '';
  var isTimerOn = true;
  var timerSpeed = 5000;
  var indicatorMode = true;

  setBannerStatus();
  setIndicator();
  showBanner(1);

  $(selector).find('p.control a.prev').on('click', function () {
    showBanner(bannerPrev);
  });
  $(selector).find('p.control a.next').on('click', function () {
    showBanner(bannerNext);
  });
  $(selector).find('p.control a.play').on('click', function () {
    if (isTimerOn === true) {
      clearTimeout(timerId);
      $(this).removeClass('on');
      isTimerOn = false;
    } else {
      timerId = setTimeout(function () {
        showBanner(bannerNext);
      }, timerSpeed);
      $(this).addClass('on');
      isTimerOn = true;
    }
  });
  $(selector).find('ul.indicator li a').on('click', function () {
    var index = $(selector).find('ul.indicator li').index($(this).parent());
    showBanner(index + 1);
  });
  onIndicater();

  $(window).on('resize', function () {
    setBannerStatus();
    $(selector).find('ul.indicator li').remove();
    setIndicator();
    $(selector).find('ul.indicator li a').off('click');
    onIndicater();
    showBanner(bannerNow);
  });

  function setBannerStatus() {
    boxWidth = $(selector).find('div.box').innerWidth();
    barWidth = 0;
    $(selector).find('ul.banner li').each(function () {
      barWidth += $(this).outerWidth(true);
    });
    $(selector).find('ul.banner').css({
      'width': (barWidth + 1) + 'px'
    });
    minOffsetLeft = boxWidth - barWidth;
    $(selector).find('ul.banner li').each(function (i) {
      if (-$(this).position().left < minOffsetLeft) {
        numBanner = i;
        return false;
      }
    });
    if (bannerNow !== 0) showBanner(bannerNow);
  }

  function onIndicater() {
    $(selector).find('ul.indicator li a').on('click', function () {
      var index = $(selector).find('ul.indicator li').index($(this).parent());
      showBanner(index + 1);
    });

  }

  function setIndicator() {
    if (indicatorMode === true) {
      for (i = 1; i <= numBanner; i++) {
        $(selector).find('ul.indicator').append('<li><a href="#"><span class="blind">' + i + '번 배너</span></a></li>\n');
      }
    }

  }

  function showBanner(n) {
    clearTimeout(timerId);
    offsetLeft = -$(selector).find('ul.banner li:eq(' + (n - 1) + ')').position().left;
    if (offsetLeft < minOffsetLeft) offsetLeft = minOffsetLeft;
    // 첫 동작시 css의 left 속성이 없어서 transition 없이 이동
    $(selector).find('ul.banner').css({
      'transition': 'left 0.3s',
      'left': offsetLeft + 'px'
    });
    $(selector).find('ul.indicator li').removeClass('on');
    $(selector).find('ul.indicator li:eq(' + (n - 1) + ')').addClass('on');
    bannerNow = n;
    bannerPrev = (n <= 1) ? numBanner : (n - 1);
    bannerNext = (n >= numBanner) ? 1 : (n + 1);
    if (isTimerOn === true) {
      timerId = setTimeout(function () {
        showBanner(bannerNext);
      }, timerSpeed);
    }
  }
}

function setHeaderScroll() {
  var startScroll = 0;
  var nowScroll = 0;
  var delScroll = 0;

  moveScrollUp();

  $(window).on('scroll', function () {
    moveScrollUp();
    if (nowScroll === 0) {
      $('#wrap').removeClass('scroll');
    }
  });

  function moveScrollUp() {
    nowScroll = $(document).scrollTop();
    delScroll = nowScroll - startScroll;
    if (delScroll < 0) {
      $('#wrap').addClass('scroll');
    } else {
      $('#wrap').removeClass('scroll');
    }
    startScroll = nowScroll;
  }
}

function setSubLnb() {
  var scrollAmt = $('#head-visual').outerHeight();
  var nowScroll = 0;
  $(window).on('scroll resize', function () {
    moveScroll();
  });

  function moveScroll() {
    nowScroll = $(document).scrollTop();
    if (nowScroll >= scrollAmt) {
      $('#lnb').addClass('scroll');
    } else {
      $('#lnb').removeClass('scroll');
    }
  }

}

checkVisibility('.section-video', true);
checkVisibility('.section-list', false);
$(window).on('scroll resize', function () {
checkVisibility('.section-video', true);
checkVisibility('.section-list', false);
});

$('.btn-top').on('click', function() {
    $('html, body').animate({'scrollTop': 0}, 500);
});

function checkVisibility(selector, repeat) {
  var isRepeat = repeat;
  var scrollTop = $(document).scrollTop();
  $(selector).each(function (i) {
    var $selector = $(this);
    var minScroll = $selector.offset().top - $(window).height() / 2;
    var maxScroll = $selector.offset().top + $selector.outerHeight() / 2;
    if (scrollTop > minScroll && scrollTop <= maxScroll) {
      $selector.addClass('show');
    } else {
      if (isRepeat === true) {
        $selector.removeClass('show');
      }      
    }
  });
}
