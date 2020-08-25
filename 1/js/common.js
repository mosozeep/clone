$(document).ready(function(){
    preventDefaultAnchor();
});

function preventDefaultAnchor() {
    $(document).on('click', 'a[href="#"]', function(e) {
        e.preventDefault();
    });
}

function setParallaxWithBar(selector) {
    var numPage = $(selector).length;
    var pageNow = 0;
    var pagePrev = 0;
    var pageNext = 0;
    var eventScroll = '';
    var onAnimation = false;

    //console.log('onmousewheel' in window);
    eventScroll = ('onmousewheel' in window) ? 'mousewheel' : 'DOMMouseScroll';
    $(selector).each(function(i) {
        $('#page-indicator').append('<li><a href="#"><span class="blind">' + (i + 1) + '번 페이지 보기</span></a></li>');
    });
    
    checkScroll();
    setBodyColor();
    // 이벤트
    $('#page-indicator li a').on('click', function() {
        var index = $('#page-indicator li').index($(this).parent());
        showPage(index + 1);
    });
    
    // 마우스 휠 이벤트
    window.addEventListener(eventScroll, function(e) {
        e.preventDefault();
        if (onAnimation === true) return false;
        
        var delta = 0;
        if (eventScroll === 'mousewheel') {
            delta = e.wheelDelta / -120;
        } else {
            delta = e.detail / 3;
        }
        //console.log(delta);
        if (delta > 0) {
            showPage(pageNext);
        } else if (delta < 0) {
            showPage(pagePrev);
        }
    }, {passive: false});
    
    $(window).on('scroll resize', function() {
        checkScroll();
        setBodyColor();
    });
    
    function checkScroll() {
        var scrollTop = $(document).scrollTop();
        var minScroll = 0;
        var maxScroll = 0;
        $(selector).each(function(i) {
            minScroll = $(this).offset().top - $(window).height() / 2;
            maxScroll = $(this).offset().top + $(window).height() / 2;
          if (scrollTop <= minScroll) {            
            if ($(this).hasClass('down') !== true) {
                $(this).removeClass('show up');
                $(this).addClass('down');
            }
        } else if (scrollTop >= maxScroll) {
            if ($(this).hasClass('up') !== true) {
                $(this).removeClass('down show');
                $(this).addClass('up');
            }
        } else if (scrollTop > minScroll && scrollTop < maxScroll) 
            {
                var n = i + 1;
                $(selector).removeClass('show');
                $(selector).eq(n - 1).addClass('show').removeClass('down up');
                $('#page-indicator li').removeClass('on');
                $('#page-indicator li:eq(' + (n - 1) + ')').addClass('on');
                pageNow = n;
                pagePrev = (n - 1) < 1 ? 1 : n - 1;
                pageNext = (n + 1) > numPage ? numPage : n + 1;
            } 
        });
    }
    
    function showPage(n) {
        if (pageNow === n) return false;
        var scrollAmt = $(selector + ':eq(' + (n - 1) + ')').offset().top;
        onAnimation = true;
        $('html, body').stop(true).animate({'scrollTop': scrollAmt + 'px'}, 500, function() {
            onAnimation = false;
        });
    }
  
  function setBodyColor() {
    var bgColor = ['rgb(177, 31, 36)', 'rgb(177, 31, 36)', 'rgb(156, 213, 196)', 'rgb(36, 63, 147)', 'rgb(243, 137, 111)', 'rgb(221, 197, 125)', 'rgb(221, 197, 125)'];
    $('body.cork .full').each(function(i) {
      if ($(this).hasClass('show') === true) {
        $('body.cork').css({'background': bgColor[i]});
        if (i > 0 && i < $('body.cork .full').length - 2) {
          $('#page-indicator').addClass('show');
        } else {
          $('#page-indicator').removeClass('show');
        }        
      }
    });
  }
}
