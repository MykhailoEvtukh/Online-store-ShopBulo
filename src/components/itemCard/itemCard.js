import services from '../../services/services.js';
import './cardstyle.css';

export default item => {
  let itemsCard = `<div class="itemCard"><div class="imageContainer">
      <img src='${
        item.images.length === 0
        ? 'https://iom.anketolog.ru/images/original/2016/04/ps-201-498fcd768f.jpg'
          : item.images
      }'alt=${item.title} class='itemImage'/>
    <div class="overlay" data-id="${item._id}" key="${item._id}">
      <div class="favorite"><button data-fav="key" class="btn-fav"></button></div>
      <div data-id="${item._id}" class="open"></div>
    </div>
    <div class="itemInfo" data-id="${item._id}" key="${item._id}">
                <h3 class="itemTitle">${item.title}</h3>
                <p class="itemPrice">${item.price} грн</p>
            </div>
    </div>`;
  return itemsCard;
};

// const favoriteAdd = document.querySelector('.favorite');
// favoriteAdd.addEventListener('click', e => {
//   e.target.classList.toggle('addedToFavorite');
// });
