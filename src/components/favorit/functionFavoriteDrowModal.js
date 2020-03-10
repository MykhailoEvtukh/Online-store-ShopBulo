import services from '../../services/services.js';
import { stateFavorites } from './functionFavoriteDrow';

export default function functionFavoriteDrowModal() {
  const psevdo = document.querySelector('.modal');
  stateFavorites.favorites.forEach(event => {
    if (event._id === psevdo.dataset.id) {
      psevdo.querySelector('.favorites').classList.add('addedToFavorite');
    }
  });
}
