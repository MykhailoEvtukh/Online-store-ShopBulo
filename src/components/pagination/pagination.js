// export async function getCategoryItemInfo() {
//   state.totalPages = null;
//   state.categoryItemsShow = [...document.querySelectorAll('.categories-item')];
//   console.log('__________________________state.categoryItemsShow', state.categoryItemsShow);

//   state.categoryNumber = categoryNumber;
//   state.refs.container = document.querySelector(`body`);
//   state.refs.placeForCards = document.querySelector(`.categoryContainer`);
//   state.refs.placeForPaginationButtons = document.querySelector(
//     `.overlayPagination`,
//   );
//   // state.totalPages = await axios
//   //   .get(`/ads/all?limit=${state.limit}&category=${categoryNumber}&page=1`)
//   //   .then(data => data.data.ads.totalPages);
//   // state.categoryArr = await axios
//   //   .get(`/ads/all?limit=${state.limit}&category=${categoryNumber}&page=1`)
//   //   .then(data => data.data.ads.docs);
// }

import API from '../../services/services';
import axios from 'axios';
import './stylePagination.css';
import itemCard from '../itemCard/itemCard';
import functionFavoriteDrow from '../favorit/functionFavoriteDrow.js';
export default async function pagination(value) {
  const state = {
    categoryNumber: null,
    searchValue: null,
    currentPage: 1,
    totalPages: null,
    categoryArr: [],
    searchArr: [],
    limit: 3,
    refs: {
      container: null,
      placeForCards: null,
      placeForPaginationButtons: null,
      searchRes: null,
    },
  };

  async function getCategoryInfo(categoryNumber) {
    state.totalPages = null;
    state.currentPage = 1;
    state.categoryNumber = categoryNumber;
    state.refs.container = document.querySelector(`body`);
    state.refs.placeForCards = document.querySelector(`.categoryContainer`);
    state.refs.placeForPaginationButtons = document.querySelector(
      `.overlayPagination`,
    );
    state.totalPages = await axios
      .get(`/ads/all?limit=${state.limit}&category=${categoryNumber}&page=1`)
      .then(data => data.data.ads.totalPages);
    state.categoryArr = await axios
      .get(`/ads/all?limit=${state.limit}&category=${categoryNumber}&page=1`)
      .then(data => data.data.ads.docs);
  }

  async function getSearchInfo(searchValue) {
    console.log('==================state', state);
    state.totalPages = null;
    state.currentPage = 1;
    state.searchValue = searchValue;
    state.refs.container = document.querySelector('body');
    state.refs.placeForCards = document.querySelector('.categories');
    state.refs.placeForPaginationButtons = document.querySelector(
      '.pagination',
    );
    state.searchArr = await axios
      .get(`/ads/all?search=${searchValue}&limit=${state.limit}&page=1`)
      .then(data => data.data.ads.docs);
    state.totalPages = await axios
      .get(`/ads/all?search=${searchValue}&limit=${state.limit}&page=1`)
      .then(data => data.data.ads.totalPages);
  }

  async function search() {
    let card = '';
    let searchItem = state.searchValue.toLowerCase();
    await axios
      .get(
        `/ads/all?search=${searchItem}&limit=${state.limit}&page=${state.currentPage}`,
      )
      .then(data => data.data.ads)
      .then(data => {
        state.refs.placeForCards.innerHTML = `<li><p class="itemSearchCount">Знайдено об'яв ${data.totalDocs} шт</p></li><li><ul class="searchResult"></ul></li>`;
        return data;
      })
      .then(data => {
        state.refs.searchRes = document.querySelector('.searchResult');
        card = data.docs
          .map(item => `<li class="listcards-itemcard">${itemCard(item)}</li>`)
          .join('');
      })
      .finally(() => {
        state.refs.searchRes.insertAdjacentHTML('beforeend', card);
        functionFavoriteDrow();
      });
  }

  async function search2() {
    let card = '';
    let searchItem = state.searchValue.toLowerCase();
    console.log('cur', state.currentPage);
    await axios
      .get(
        `/ads/all?search=${searchItem}&limit=${state.limit}&page=${state.currentPage}`,
      )
      .then(data => data.data.ads)
      .then(data => {
        card = data.docs
          .map(item => `<li class="listcards-itemcard">${itemCard(item)}</li>`)
          .join('');
      })
      .finally(() => {
        state.refs.searchRes.insertAdjacentHTML('beforeend', card);
        functionFavoriteDrow();
      });
  }

  // ===============pagination block=================================
  function createPagination() {
    state.currentPage = 1;
    function pageButtons(pagesCount) {
      let string = '';
      for (let i = 1; i <= pagesCount; i += 1) {
        string += `<button class="pag-btn" data-pagnumber="${i}">${i}</button>`;
      }
      return string;
    }
    return `<div class="pageContainer">
            <div>
                ${pageButtons(state.totalPages)}
            </div>
            <button class="more-btn" data-more="downloadMore">вимагай більше</button>
        </div>`;
  }

  function addListener() {
    const pagBtnsArr = document.querySelectorAll('.pag-btn');
    const moreBtn = document.querySelector('.more-btn');
    pagBtnsArr[0].classList.add('checked');
    state.refs.container.addEventListener('click', e => {
      let card = '';

      if (e.target.nodeName === 'BUTTON' && e.target.dataset.pagnumber) {
        state.currentPage = +e.target.dataset.pagnumber;
        pagBtnsArr.forEach(item => item.classList.remove('checked'));
        e.target.classList.add('checked');
        state.currentPage !== state.totalPages &&
          moreBtn.classList.remove('unvisible');
        state.currentPage === state.totalPages &&
          moreBtn.classList.add('unvisible');

        state.categoryNumber !== null &&
          API.getAllItemsWithNumberCategories(
            state.categoryNumber,
            state.limit,
            state.currentPage,
          )
            .then(data => {
              data.forEach(item => {
                card += `<li class="listcards-itemcard">${itemCard(item)}</li>`;
              });
            })
            .finally(() => {
              state.refs.placeForCards.innerHTML = `${card}`;
              functionFavoriteDrow();
            });
        state.searchValue !== null && search();
      }

      // ===========================end paggination Block ==============================

      if (e.target.nodeName === 'BUTTON' && e.target.dataset.more) {
        let card = '';
        pagBtnsArr.forEach((item, index) => {
          index === state.currentPage &&
            pagBtnsArr[index].classList.add('checked');
        });
        state.currentPage += 1;
        state.currentPage === state.totalPages &&
          moreBtn.classList.add('unvisible');

        state.categoryNumber !== null &&
          API.getAllItemsWithNumberCategories(
            state.categoryNumber,
            state.limit,
            state.currentPage,
          )
            .then(data => {
              data.forEach(item => {
                card += `<li class="listcards-itemcard">${itemCard(item)}</li>`;
              });
            })
            .finally(() => {
              state.refs.placeForCards.insertAdjacentHTML('beforeend', card);
              functionFavoriteDrow();
            });
        state.searchValue !== null && search2();
      }
    });
  }

  value.constructor === Number && (await getCategoryInfo(value));
  value.constructor === String && (await getSearchInfo(value));

  // ==============category=====================

  if (state.totalPages > 1) {
    let card = '';
    axios
      .get(
        `/ads/all?limit=${state.limit}&category=${state.categoryNumber}&page=${state.currentPage}`,
      )
      .then(data => data.data.ads.docs)
      .then(data => {
        data.forEach(item => {
          card += `<li class="listcards-itemcard">${itemCard(item)}</li>`;
        });
      })
      .then(() => (state.refs.placeForCards.innerHTML = `${card}`))
      .finally(() => {
        async function create() {
          state.refs.placeForPaginationButtons.innerHTML = await createPagination(
            state.totalPages,
          );
          await addListener();
        }
        create();
        functionFavoriteDrow();
      });
  }
  if (state.totalPages === 1 && state.categoryNumber !== null) {
    let card = '';
    await axios
      .get(
        `/ads/all?limit=${state.limit}&category=${state.categoryNumber}&page=${state.currentPage}`,
      )
      .then(data => data.data.ads.docs)
      .then(data => {
        data.forEach(item => {
          card += `<li class="listcards-itemcard">${itemCard(item)}</li>`;
        });
      })
      .finally(() => {
        state.refs.placeForCards.innerHTML = `${card}`;
        state.refs.placeForPaginationButtons.classList.add('unvisible');
        functionFavoriteDrow();
      });
  }

  // ===========search====================

  if (state.totalPages === 1 && state.searchValue !== null) {
    let card = '';

    let searchItem = state.searchValue.toLowerCase();
    axios
      .get(
        `/ads/all?search=${searchItem}&limit=${state.limit}&page=${state.currentPage}`,
      )
      .then(data => data.data.ads)
      .then(data => {
        state.refs.placeForCards.innerHTML = `<li><p class="itemSearchCount">Знайдено об'яв ${data.totalDocs} шт</p></li><li><ul class="searchResult"></ul></li>`;
        return data;
      })
      .then(data => {
        state.refs.searchRes = document.querySelector('.searchResult');
        card = data.docs
          .map(item => `<li class="listcards-itemcard">${itemCard(item)}</li>`)
          .join('');
      })
      .finally(() => {
        state.refs.placeForPaginationButtons.classList.add('unvisible');
        state.refs.searchRes.insertAdjacentHTML('beforeend', card);
        functionFavoriteDrow();
      });
  }
  if (state.totalPages > 1 && state.searchValue !== null) {
    let card = '';
    let searchItem = state.searchValue.toLowerCase();
    await axios
      .get(
        `/ads/all?search=${searchItem}&limit=${state.limit}&page=${state.currentPage}`,
      )
      .then(data => data.data.ads)
      .then(data => {
        state.refs.placeForCards.innerHTML = `<li><p class="itemSearchCount">Знайдено об'яв ${data.totalDocs} шт</p></li><li><ul class="searchResult"></ul></li>`;
        return data;
      })
      .then(data => {
        state.refs.searchRes = document.querySelector('.searchResult');
        card = data.docs
          .map(item => `<li class="listcards-itemcard">${itemCard(item)}</li>`)
          .join('');
      })
      .finally(() => {
        state.refs.searchRes.insertAdjacentHTML('beforeend', card);
        state.refs.placeForPaginationButtons.classList.remove('unvisible');
        functionFavoriteDrow();
      });
  }
}
