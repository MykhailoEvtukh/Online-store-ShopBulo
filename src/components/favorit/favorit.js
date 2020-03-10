import services from '../../services/services.js';
import './favorit.css';
import PNotify from 'pnotify/dist/es/PNotify.js';
import 'pnotify/dist/PNotifyBrightTheme.css';
import ModalPnotify from '../modalPnotify/ModalPnotify'

document.body.addEventListener('click', createdFavoritCard);

function createdFavoritCard(e) {
  let pushArrFavorites = ourEventId => {
    if (localStorage.getItem('token')) {
      services.getAllProductFavorite().then(cards => {
        let flag = false;
        console.log(e.target);
        cards.map(elem => {
          if (ourEventId === elem._id) {
            flag = true;
          }
          return flag;
        });
        if (flag) {
          e.target.classList.remove('addedToFavorite');
          services.deletedFavoritCardById(ourEventId);
          ModalPnotify('О ні !','Як я міг Вам не сподобатися ?',"red")
          // PNotify.error({
          //   title: 'О ні !',
          //   text: 'Як я міг Вам не сподобатися ?',
          // });
        } else {
          e.target.classList.add('addedToFavorite');
          services.adsFavoritCardById(ourEventId);
          // PNotify.success({
          //   title: 'Мені це подобається!',
          //   text: 'Добавляю цю карту в моЇ обрані .',
          // });
          ModalPnotify('Мені це подобається!','Добавляю цю карту в моЇ обрані .',"green")
        }
      });
    } else {
      ModalPnotify('О ні !','Будь-ласка, для добавлення в обрані, зареєструйтесь або увійдіть в свій аккаунт !',"red")
      // PNotify.error({
      //   title: 'О ні !',
      //   text:
      //     'Будь-ласка, для добавлення в обрані, зареєструйтесь або увійдіть в свій аккаунт !',
      // });
    }
  };

  if (e.target.dataset.fav === 'key') {
    // e.target.classList.toggle('addedToFavorite');
    const eventId = e.target.closest('.overlay').dataset.id;
    pushArrFavorites(eventId);
  } else if (e.target.dataset.fav === 'keyModal') {
    const eventId = e.target.closest('.modal').dataset.id;
    pushArrFavorites(eventId);
  }
}
