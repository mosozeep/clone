const list = document.getElementsByClassName('list');
const img = document.getElementById('image');

console.log(list,img);

function handleMouseOn() {
  img.classList.add('big');
}
function handleMouseLeave() {
  img.classList.remove('big');
}


Array.from(list).forEach(i => i.addEventListener("mouseon",handleMouseOn));
Array.from(list).forEach(i => i.addEventListener("mouseleave",handleMouseLeave));