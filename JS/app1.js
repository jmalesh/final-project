// function draw() {
//   var canvas = document.getElementById('logo');
//   var ctx = canvas.getContext('2d');
//   ctx.beginPath();
//   ctx.moveTo(75,75);
//   ctx.bezierCurveTo(37.5, 275, 262.5, 275, 225, 75);
//   ctx.lineTo(75, 75);
//   ctx.moveTo(150, 75);
//   ctx.lineTo(150, 140);
//   ctx.lineTo(85, 185);
//   ctx.moveTo(150,140);
//   ctx.lineTo(215, 185);
//   ctx.stroke();
// }
//
// draw();

//storing user Input from the landing page

var userName;
function handleUserName(event){
  event.preventDefault();
  userName = event.target.userName.value;
  localStorage.setItem('userName', JSON.stringify(userName));
  var beginGame = document.getElementById('beginGame');
  beginGame.classList.remove('hidden');
  userInput.classList.add('hidden');
  event.target.userName.value = null;
}

var userInput = document.getElementById('user-input');
userInput.addEventListener('submit', handleUserName);
