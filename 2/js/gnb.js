const menu = document.getElementById('pc-menu');
const gnb = document.getElementById('gnb');

function handleMenuClcik(){
  gnb.classList.add('display');
}
menu.addEventListener('click',handleMenuClcik);