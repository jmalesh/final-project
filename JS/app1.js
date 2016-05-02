function draw() {
  var logo = document.getElementById('logo');
  var ctx = logo.getContext('2d');
  ctx.beginPath();
  ctx.moveTo(75,75);
  ctx.bezierCurveTo(37.5, 275, 262.5, 275, 225, 75);
  ctx.lineTo(75, 75);
  ctx.stroke();
}

draw();
