$('#btn-open').on('click focus', function () {
  $('#wrap').addClass('open');
});
//$('#btn-close').on('focusin', function () {
//  $('#wrap').addClass('open');
//});
$('#btn-close').on('click focusout', function () {
  $('#wrap').removeClass('open');
});
