import services from '../../services/services.js';
import templateOption from '../templates/templateOptionFilter.hbs';
import './filter.css';
import itemCard from '../itemCard/itemCard.js';
import functionFavoriteDrow from '../favorit/functionFavoriteDrow.js';
import parseResponse from '../../helpers/parseResponse';
import { categories } from '../../helpers/categories.array';

const refs = {
  filter: document.querySelector('.filter'),
  clear: document.querySelector('.clear-btn'),
  logo: document.querySelector('.logoReload'),
  contanierCategories: document.querySelector('.categories'),
  ownButtonMore: document.querySelector('.loadMore'),
  paginationBlock: document.querySelector('.pagination'),
};

const state = {
  page: 1,
  id: '',
};

(function() {
  const option = templateOption(categories);
  refs.filter.insertAdjacentHTML('beforeend', option);
})();

refs.filter.addEventListener('click', handleSubmit);
refs.clear.addEventListener('click', handleSubmitClear);
refs.logo.addEventListener('click', handleSubmitClear);
const preload = document.createElement('div');

export function handleSubmit(e) {
  if (
    e.target.className === 'navigation__menu_list-item' ||
    e.target.className === 'navigation__menu_list-item'
  ) {
    return;
  }
  state.page = 1;
  state.id = e.target.id;
  if (e.target === e.currentTarget) {
    return;
  }
  refs.ownButtonMore.setAttribute('style', 'display:none');
  const preload = document.querySelector('.preloaderfade');
  preload.className = 'preloader';
  preload.style.display = 'block';
  let active = e.currentTarget.querySelector('.isActiveCategory');
  document.querySelector('.categories').classList.add('categoryStyle');
  if (active) {
    active.classList.remove('isActiveCategory');
  } else {
  }
  e.target.classList.add('isActiveCategory');
  services
    .getCategoriesWithNumberCategories(Number(e.target.id), state.page)
    .then(result => {
      let card = '';
      result.forEach(item => {
        card += `<li class="listcards-itemcard liforCategories">${itemCard(
          item,
        )}</li>`;
      });
      refs.contanierCategories.innerHTML = card;
      if (result.length === 6) {
        refs.paginationBlock.innerHTML = `<button type="button" class="filterButtonMore loadMore">більше</button>`;
        document
          .querySelector('.filterButtonMore')
          .addEventListener('click', onHandleClickMore);
        result.totalPages === state.page &&
          document
            .querySelector('.filterButtonMore')
            .setAttribute('style', 'display:none');
      }
      async function onHandleClickMore(params) {
        const preload = document.querySelector('.preloaderfade');
        preload.className = 'preloader';
        preload.style.display = 'block';
        state.page += 1;
        const response = await services.getCategoriesWithNumberCategories(
          Number(state.id),
          state.page,
        );
        !response && (state.page = 1);
        response.length < 6 &&
          document
            .querySelector('.filterButtonMore')
            .setAttribute('style', 'display:none');
        refs.contanierCategories.insertAdjacentHTML(
          'beforeend',
          parseResponse(response),
        );
        functionFavoriteDrow();
        setTimeout(function() {
          preload.className += 'fade';
          preload.style.display = 'none';
        }, 500);
        if (response.length > 3) {
          if (window.innerWidth > 768) {
            window.scrollTo({
              top:
                document.documentElement.scrollHeight -
                document.documentElement.clientHeight * 2,
              behavior: 'smooth',
            });
          }
        }
        response.totalPages === state.page &&
          document
            .querySelector('.filterButtonMore')
            .setAttribute('style', 'display:none');
      }
    })
    .finally(() => {
      functionFavoriteDrow();
      setTimeout(function() {
        preload.className += 'fade';
        preload.style.display = 'none';
      }, 600);
    });
}

function handleSubmitClear() {
  location.reload();
}
