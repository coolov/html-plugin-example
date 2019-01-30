const body = document.getElementsByTagName('body')[0];
const rnd = () => Math.floor(Math.random() * 256);

setInterval(
  () => (body.style.backgroundColor = `rgb(${rnd()},${rnd()},${rnd()})`),
  1000
);
