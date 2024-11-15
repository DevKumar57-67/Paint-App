const canvas = document.getElementById('paintCanvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const brushSize = document.getElementById('brushSize');
const clearButton = document.getElementById('clearCanvas');

canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.6;
let painting = false;

const startPainting = (e) => {
  painting = true;
  draw(e);
};

const stopPainting = () => {
  painting = false;
  ctx.beginPath();
};

const draw = (e) => {
  if (!painting) return;

  // Get the position of the cursor or touch
  const x = e.clientX || e.touches[0].clientX;
  const y = e.clientY || e.touches[0].clientY;

  ctx.lineWidth = brushSize.value;
  ctx.lineCap = 'round';
  ctx.strokeStyle = colorPicker.value;

  ctx.lineTo(x - canvas.offsetLeft, y - canvas.offsetTop);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x - canvas.offsetLeft, y - canvas.offsetTop);
};

// Mouse Events
canvas.addEventListener('mousedown', startPainting);
canvas.addEventListener('mouseup', stopPainting);
canvas.addEventListener('mousemove', draw);

// Touch Events for mobile
canvas.addEventListener('touchstart', startPainting);
canvas.addEventListener('touchend', stopPainting);
canvas.addEventListener('touchmove', draw);

clearButton.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});