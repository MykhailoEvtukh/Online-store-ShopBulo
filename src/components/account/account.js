import './account.css';
import services from '../../services/services.js';
import userAds from '../../components/templates/userAds.hbs';
import userFav from '../../components/templates/userFav.hbs';

const refs = {
  modal: document.querySelector('.js-lightbox'),
  overlay: document.querySelector('.lightbox__overlay'),
  content: document.querySelector('.lightbox__content'),
  btn: document.querySelector('button[data-action="close-lightbox"]'),
  ads: document.querySelector('.ads_acc'),
  favorites: document.querySelector('.favorites_acc'),
  headerBtn: document.querySelector('.account_btn'),
  wrapperAds: document.querySelector('.ads-wrapper'),
  wrapperFav: document.querySelector('.fav-wrapper'),
  wrapperTitleAds: document.querySelector('.title-wrapper-ads'),
  wrapperTitleFav: document.querySelector('.title-wrapper-fav'),
  lightboxTitleAds: document.querySelector('.lightbox__title-ads'),
  lightboxTitleFav: document.querySelector('.lightbox__title-fav'),
  popup: document.querySelector('.popup'),
  popupEnter: document.querySelector('.popup-enter'),
  popupExit: document.querySelector('.popup-exit'),
  popupEnterText: document.querySelector('.popup-enter-text'),
  popupExitText: document.querySelector('.popup-exit-text'),
  body: document.querySelector('body'),
  btnWrapper: document.querySelector('.account_btn-wrapper'),
  userName: document.querySelector('.account_btn-name'),
  accountBtn: document.querySelector('.account_btn'),
  menu: document.querySelector('.modal-menu'),
};

const state = {
  isOpen: false,
};

///------------------для мобилки

refs.menu.addEventListener('click', () => {
  const onMobile = document.querySelector('.loginOnMobile');
  const modalka = document.querySelector('#modalka');
  onMobile.addEventListener('click', e => {
    if (localStorage.getItem('token') && e.target === onMobile) {
      refs.modal.classList.add('is-open');
      modalka.setAttribute('class', 'menu-wrapper-none');
    }
  });

  //--------------открываем личный кабинет
  refs.modal.addEventListener('click', event => {
    if (
      event.target.nodeName === 'I' ||
      event.target === refs.btn ||
      event.target === refs.overlay
    ) {
      refs.modal.classList.remove('is-open');
    }

    state.isOpen = !state.isOpen;

    //--------------добавляем объявления юзера
    if (
      event.target === refs.ads ||
      event.target === refs.wrapperAds ||
      event.target === refs.wrapperTitleAds ||
      event.target === refs.lightboxTitleAds
    ) {
      services.getUser(token).then(data => {
        // state.isOpen && (refs.ads.innerHTML = userAds(data.data.ads))
        // !state.isOpen && (refs.ads.innerHTML = '')
        if (state.isOpen) {
          refs.ads.innerHTML = userAds(data.data.ads);
        } else if (!state.isOpen) {
          refs.ads.innerHTML = '';
        }
      });
    }

    //----------------добавляем избранное
    if (
      event.target === refs.favorite ||
      event.target === refs.wrapperFav ||
      event.target === refs.wrapperTitleFav ||
      event.target === refs.lightboxTitleFav
    ) {
      services.getUserFavorites(token).then(data => {
        if (state.isOpen) {
          refs.favorites.innerHTML = userFav(data.data.user.favorites);
        } else if (!state.isOpen) {
          refs.favorites.innerHTML = '';
        }
      });
    }

    //----------------удаляем и отрисовываем
    

    let deleteButton = document.querySelector('.lightbox__content');

    deleteButton.addEventListener('click', event => {
      if (event.target.nodeName !== 'BUTTON') {
        return;
      }
      
      if(event.target.dataset.delad) {
        
        const id = event.target.closest('li').dataset.id;
        services.deletedProduct(id);

        services.getUser(token).then(data => {
          refs.ads.innerHTML = userAds(data.data.ads);
         });
      }

      if(event.target.dataset.delfav) {
        const id = event.target.closest('li').dataset.id;
        services.deletedFavoritCardById(id);

        services.getUserFavorites(token).then(data => {
          refs.favorites.innerHTML = userFav(data.data.user.favorites);
        });
      }

      //-----------------редактируем

      //if(event.target.dataset.edit) {

        // //const id = 
        // services.getCardById(id).then(data => {
        //   console.log(data.data.ads._id)
          
        // }) 
      //}
    });
  });
});

const token = localStorage.getItem('token');

///--------------открываем popup
refs.body.addEventListener('click', event => {
  if (!localStorage.getItem('token')) {
    return;
  }

  if (event.target === refs.headerBtn || event.target == refs.userName) {
    refs.popup.style.display = 'block';
  }

  //---------------закрываем popup
  if (event.target !== refs.headerBtn && event.target !== refs.userName) {
    refs.popup.style.display = 'none';
  }
});

//----------------имя

if (!localStorage.getItem('token') && window.innerWidth > 767) {
  refs.btnWrapper.style.display = 'none';
}

if (localStorage.getItem('token')) {
  const userName = localStorage.getItem('userName');
  refs.userName.textContent = userName;
  refs.accountBtn.textContent = userName[0];
}

//---------------открываем модалку
refs.popupEnter.addEventListener('click', event => {
  if (!localStorage.getItem('token')) {
    return;
  }

  if (event.target == refs.popupEnter || event.target == refs.popupEnterText) {
    refs.modal.classList.add('is-open');
    refs.popup.style.display = 'none';
  }

  //---------------закрываем модалку
  refs.modal.addEventListener('click', event => {
    if (
      event.target.nodeName === 'I' ||
      event.target === refs.btn ||
      event.target === refs.overlay
    ) {
      refs.modal.classList.remove('is-open');
    }

    state.isOpen = !state.isOpen;

    //--------------добавляем объявления юзера
    if (
      event.target === refs.ads ||
      event.target === refs.wrapperAds ||
      event.target === refs.wrapperTitleAds ||
      event.target === refs.lightboxTitleAds
    ) {
      services.getUser(token).then(data => {
        if (state.isOpen) {
          refs.ads.innerHTML = userAds(data.data.ads);
        } else if (!state.isOpen) {
          refs.ads.innerHTML = '';
        }
      });
    }

    //----------------добавляем избранное
    if (
      event.target === refs.favorite ||
      event.target === refs.wrapperFav ||
      event.target === refs.wrapperTitleFav ||
      event.target === refs.lightboxTitleFav
    ) {
      services.getUserFavorites(token).then(data => {
        if (state.isOpen) {
          refs.favorites.innerHTML = userFav(data.data.user.favorites);
        } else if (!state.isOpen) {
          refs.favorites.innerHTML = '';
        }
      });
    }

    //--------------удаляем объявления и снова отрисовываем
    let deleteEditButton = document.querySelector('.lightbox__content');

    deleteEditButton.addEventListener('click', event => {
      if (event.target.nodeName !== 'BUTTON') {
        return;
      }
      if(event.target.dataset.delad) {
        
        const id = event.target.closest('li').dataset.id;
          services.deletedProduct(id);

        services.getUser(token).then(data => {
          refs.ads.innerHTML = userAds(data.data.ads);
        });
      }

      if(event.target.dataset.delfav) {
        const id = event.target.closest('li').dataset.id;
        services.deletedFavoritCardById(id);

        services.getUserFavorites(token).then(data => {
          refs.favorites.innerHTML = userFav(data.data.user.favorites);
        });
      }

      //------------редактируем

      // if(event.target.dataset.edit) {
      //   console.log(event.target)
      // }
    });
  });
});
