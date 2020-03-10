import itemCard from '../components/itemCard/itemCard';

export default function parseResponse(arr) {
  let card = '';
  arr.forEach(item => {
    card += `<li class="listcards-itemcard liforCategories">${itemCard(
      item,
    )}</li>`;
  });
  return card;
}
