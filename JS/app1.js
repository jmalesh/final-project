function draw() {
  var canvas = document.getElementById('logo');
  var ctx = canvas.getContext('2d');
  ctx.beginPath();
  ctx.moveTo(75,75);
  ctx.bezierCurveTo(37.5, 275, 262.5, 275, 225, 75);
  ctx.lineTo(75, 75);
  ctx.moveTo(150, 75);
  ctx.lineTo(150, 140);
  ctx.lineTo(85, 185);
  ctx.moveTo(150,140);
  ctx.lineTo(215, 185);
  ctx.stroke();
}

draw();
