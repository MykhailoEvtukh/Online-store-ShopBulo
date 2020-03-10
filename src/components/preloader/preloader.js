import './style.css';

const preload = document.createElement('div');
preload.className = 'preloader';
preload.innerHTML =
  '<div class="b-ico-preloader"></div><div class="spinner"></div>';
document.body.appendChild(preload);

window.addEventListener('load', function() {
  preload.className += 'fade';

  setTimeout(function() {
    preload.style.display = 'none';
  }, 600);
});
