import services from '../../services/services.js';

export const stateFavorites = {
  favorites: [],
};

// stateFavorites.favorites.length === 0 &&
//   services.getAllProductFavorite().then(result => {
//     state.favorites = result;
//   });

export default function functionFavoriteDrow() {
  const psevdo = document.querySelectorAll('.overlay');
  // services.getAllProductFavorite().then(result => {
    psevdo.forEach(e => {
      stateFavorites.favorites.forEach(event => {
        if (event._id === e.dataset.id) {
          e.querySelector('.btn-fav').classList.add('addedToFavorite');
        }
      });
    });
  // });
}
