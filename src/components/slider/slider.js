const categories = document.querySelector('.categories');

categories.addEventListener('click', e => {
  const ul = e.target.parentNode.closest('li').lastElementChild;

  if (e.target.classList.contains('categories-item-btn-slider-prev')) {
    ul.scrollLeft -= 315;
  }
  if (e.target.classList.contains('categories-item-btn-slider-next')) {
    ul.scrollLeft += 315;
  }
});
