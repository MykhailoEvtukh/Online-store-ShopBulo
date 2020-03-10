import '../../styles.css';
import '../sideBar/sideBar.css';
import category from '../templates/menuList.hbs';
import { categories } from '../../helpers/categories.array';
import { handleSubmit } from '../filter/filter';

const refs = {
  btnMenu: document.querySelector('.modal-menu'),
  modalka: document.querySelector('#modalka'),
  close: document.querySelector('.close'),
  ul: document.querySelector('.navigation__menu_list'),
  li: document.querySelector('.navigation__menu_list-item'),
  logIn: document.querySelector('.loginOnMobile'),
  logOut: document.querySelector('.logout'),
  categories: document.querySelector('.categories'),
};

// слушатели на кнопках

refs.btnMenu.addEventListener('click', () => {
  refs.modalka.setAttribute('class', 'menu-wrapper');
});

refs.close.addEventListener('click', () => {
  refs.modalka.setAttribute('class', 'menu-wrapper-none');
});

refs.ul.addEventListener('click', () => {
  refs.modalka.setAttribute('class', 'menu-wrapper-none');
});

refs.modalka.addEventListener('click', () => {
  refs.modalka.setAttribute('class', 'menu-wrapper-none');
});

// выводим категории

(() => {
  const string = category(categories);
  refs.ul.insertAdjacentHTML('beforeend', string);
})();


refs.ul.addEventListener('click', handleSubmit);

//вывод входа в личный кабинет

const userLogin = localStorage.getItem('userName');

refs.logIn.addEventListener('click', event => {
  if (!localStorage.getItem('token')) {
    return;
  }
});

if (localStorage.getItem('token')) {
  refs.logIn.textContent = userLogin;
  refs.logOut.setAttribute('style', 'display: block');
}
