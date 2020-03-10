import axios from 'axios';
import './styles.css';
import modal from '../templates/modal.hbs';
import modalMobile from '../templates/modal-mobile.hbs';
import services from '../../services/services.js';
import functionFavoriteDrowModal from '../favorit/functionFavoriteDrowModal.js';
const body = document.querySelector('body');
const btn = document.querySelector('#btn');
const btnExit = document.querySelector('.exit');
const modalWindow = document.querySelector('#product-modal');
const categories = document.querySelector('.categories');

// console.log(categories);

categories.addEventListener('click', e => {
  if (e.target.nodeName === 'DIV') {
    // console.log(e.target);

    const id = e.target.dataset.id;
    axios
      .get(`/ads/${id}`)
      .then(({ data }) => {
        if (data.goal.images.length === 0) {
          data.goal.images = [
            'https://iom.anketolog.ru/images/original/2016/04/ps-201-498fcd768f.jpg',
          ];
        }
        modalWindow.setAttribute('class', 'modal-window-color');
        // modalWindow.innerHTML = modal(data.goal);
        if (window.innerWidth < 720) {
          modalWindow.innerHTML = modalMobile(data.goal);
        } else if (window.innerWidth >= 720 && window.innerWidth <= 1100) {
          modalWindow.innerHTML = modal(data.goal);
          // console.log('max 720');
        } else {
          // console.log('more');
          modalWindow.innerHTML = modal(data.goal);
        }
      })
      .finally(() => functionFavoriteDrowModal());
  }
});

modalWindow.addEventListener('click', e => {
  // console.log(e.target);
  if (e.target.nodeName === 'BUTTON' && e.target.classList.contains('exit')) {
    modalWindow.innerHTML = '';
    modalWindow.setAttribute('class', 'modal-window');
  }
  if (e.target.classList.contains('modal-window-color')) {
    modalWindow.innerHTML = '';
    modalWindow.setAttribute('class', 'modal-window');
  }
});
