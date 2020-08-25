var isH4Move = false;

$('.indicator a').on('click', function () {
  var index = $(this).index();
  $('.sub h4').off('click');
  $('.indicator a').removeClass('on');
  $('.indicator a').eq(index).addClass('on');
  $('.sub').removeClass('on');
  $('.sub').eq(index).addClass('on');
  setH4Click();
});

setH4Click();
function setH4Click() {
  $('.sub.on h4').on('click', function() {
  var index = $('.sub.on h4').index($(this));
  $('#content div.bg').addClass('on');
  $(this).addClass('on');
  $(this).siblings().addClass('off');
  $('aside').addClass('off');
  $('.btn-back').addClass('on');
  $('.sub.on .text-box').eq(index).addClass('on');
});
}


$('.btn-back').on('click', function() {
  $('.sub.on h4, #content div.bg, aside, .sub.on .text-box, .back, .btn-back').removeClass('on off');
});















