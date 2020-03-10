import services from '../../services/services.js';
import itemCard from '../itemCard/itemCard';
import styleSearch from './styleSearch.css';
import pagination from '../pagination/pagination.js';
import functionFavoriteDrow from '../favorit/functionFavoriteDrow.js';
import parseResponse from '../../helpers/parseResponse';

const refs = {
  input: document.querySelector('.search-input'),
  main: document.querySelector('.main-section'),
  form: document.querySelector('form'),
  ulCont: document.querySelector('.categories'),
  ownButtonMore: document.querySelector('.loadMore'),
  paginationBlock: document.querySelector('.pagination'),
};

const state = {
  page: 1,
  id: '',
};

function handleInput(e) {
  e.preventDefault();
  state.page = 1;
  document.querySelector('.filterButtonMore') &&
    document
      .querySelector('.filterButtonMore')
      .setAttribute('style', 'display:none');
  refs.ownButtonMore.setAttribute('style', 'display:none');
  const preload = document.querySelector('.preloaderfade');
  preload.className = 'preloader';
  preload.style.display = 'block';
  let searchItem = refs.input.value.toLowerCase();
  services.searchAllItems(searchItem, state.page).then(data => {
    let card = `<li><p class="itemSearchCount">Знайдено об'яв ${data.totalDocs} шт</p></li><li><ul class="searchResult"></ul></li>`;
    data.docs.forEach(item => {
      card += `<li class="listcards-itemcard liforCategories">${itemCard(
        item,
      )}</li>`;
    });

    refs.ulCont.innerHTML = card;
    if (data.docs.length === 6) {
      refs.paginationBlock.innerHTML = `<button type="button" class="searchButtonMore loadMore">більше</button>`;
      document
        .querySelector('.searchButtonMore')
        .addEventListener('click', onHandleClickMore);
        data.totalPages === state.page &&
          document
            .querySelector('.searchButtonMore')
            .setAttribute('style', 'display:none');
    }
    async function onHandleClickMore(params) {
      const preload = document.querySelector('.preloaderfade');
      preload.className = 'preloader';
      preload.style.display = 'block';
      state.page += 1;
      const response = await services.searchAllItems(searchItem, state.page);
      !response.docs && (state.page = 1);
      response.docs.length < 6 &&
        document
          .querySelector('.searchButtonMore')
          .setAttribute('style', 'display:none');
      response.docs.length === 0 &&
        document
          .querySelector('.searchButtonMore')
          .setAttribute('style', 'display:none');
      refs.ulCont.insertAdjacentHTML('beforeend', parseResponse(response.docs));
      functionFavoriteDrow();
      if (response.docs.length > 3) {
        if (window.innerWidth > 768) {
          window.scrollTo({
            top:
              document.documentElement.scrollHeight -
              document.documentElement.clientHeight * 2,
            behavior: 'smooth',
          });
        }
      }
      setTimeout(function() {
        preload.className += 'fade';
        preload.style.display = 'none';
      }, 500);
      response.totalPages === state.page &&
        document
          .querySelector('.searchButtonMore')
          .setAttribute('style', 'display:none');
    }
    setTimeout(function() {
      preload.className += 'fade';
      preload.style.display = 'none';
    }, 500);
    return data;
  });
}
refs.form.addEventListener('submit', handleInput);
