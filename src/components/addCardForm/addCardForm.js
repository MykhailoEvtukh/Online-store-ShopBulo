import axios from 'axios';
import './addCardstyle.css';
import API from '../../services/services.js';

const openNewAddform = document.querySelector('.create-ad');

// console.log('create add', openNewAddform);

let addNewModalForm = document.querySelector('.modalForm');
const category = {
  name: [],
  currentCategory: null,
};

const addNewCardformMarkup = `
<div class="modalBox">
<div class="formWrapper">
<button type="button" class="closeForm" data-action="closeForm">
<i class="material-icons">close</i>
</button>
<form class="formAdd">
<p class="formTitle">Додати оголошення</p>
<div class="firstInput__Wrapper iw">
<label for="firstInput" class="firstInput__label">Назва товару</label>
<input class="firstInput" type="text" name="title" required/>
</div>
<div class="secondInput__Wrapper iw">
<p class="secondInput--title">Фото</p>
<div class="formGroup">
<label class="secondLabel">
<div class="imageArr">
<image class="cardImg" src="" alt="" width="75" height="60">
<image class="cardImg" src="" alt="" width="75" height="60">
<image class="cardImg" src="" alt="" width="75" height="60">
<image class="cardImg" src="" alt="" width="75" height="60">
<image class="cardImg" src="" alt="" width="75" height="60">
<image class="cardImg" src="" alt="" width="75" height="60">
</div>
<input type="file" name="images" class="fileInput" multiple required />
</label>
</div>
</div>
<div class="thirdInput__Wrapper iw">
<label for="thirdInput" class="thirdInput__label">Опис товару</label>
<input class="thirdInput" type="text" name="description" required />
</div>
<div class="selectWrapper iw">
<label for="select">Категорія товару</label>
<select class="categorySelect" name="category" required>
<option></option>
</select>
</div>
<div class="fourthInput__Wrapper iw">
<label class="fourthInput__label" for="fourthInput">Ціна</label>
<input class="fourthInput" type="number" name="price" required />
</div>
<div class="firthInput__Wrapper iw">
<label for="fifthInput" class="fifthInput__label">Телефон</label>
<input class="fifthInput" type="text" name="phone" required />
</div>
<button type="submit" class="addButton" data-action="submitForm">Додати
</button>
</form>
</div>
</div>`;

const formMarkupMobile = `
<div class="modalBox">
<div class="formWrapper">
<button type="button" class="closeForm" data-action="closeForm">
<i class="material-icons">close</i>
</button>
<form class="formAdd">
<p class="formTitle">Додати оголошення</p>
<div class="firstInput__Wrapper iw">
<input class="firstInput" type="text" name="title" placeholder="Назва товару" required />
</div>
<div class="secondInput__Wrapper iw">
<div class="formGroup">
<label class="secondLabel">
<div class="imageArr">
<image class="cardImg" src="" alt="" width="75" height="60">
<image class="cardImg" src="" alt="" width="75" height="60">
<image class="cardImg" src="" alt="" width="75" height="60">
<image class="cardImg" src="" alt="" width="75" height="60">
<image class="cardImg" src="" alt="" width="75" height="60">
<image class="cardImg" src="" alt="" width="75" height="60">
</div>
<input type="file" name="images" class="fileInput" multiple required />
</label>
</div>
</div>
<div class="thirdInput__Wrapper iw">
<input class="thirdInput" type="text" name="description" placeholder="Опис товару"/>
</div>
<div class="selectWrapper iw">
<select class="categorySelect" name="category" required>
<option class="hiddenOption" selected="selected" hidden>Категорія</option>
</select>
</div>
<div class="fourthInput__Wrapper iw">
<input class="fourthInput" type="number" name="price" placeholder="0.00 грн" required/>
</div>
<div class="firthInput__Wrapper iw">
<input class="fifthInput" type="text" name="phone" placeholder="+38 (0--) --- -- --" required />
</div>
<button type="submit" class="addButton" data-action="submitForm">Додати
</button>
</form>
</div>
</div>`;

openNewAddform.addEventListener('click', e => {
  console.log('show modal form click add ', e.target);
  e.preventDefault();
  async function getData() {
    category.allCategories = await API.getAllProduct().then(
      data => data.categories,
    );
    return API.getAllProduct().then(data => {
      data.categories.forEach(item => {
        category.name = [...category.name, item];
      });
      return category.name;
    });
  }
  if (window.innerWidth < 768) {
    addNewModalForm.insertAdjacentHTML('beforeend', formMarkupMobile);
  } else if (window.innerWidth > 769) {
    console.log('more then 769');
    addNewModalForm.insertAdjacentHTML('beforeend', addNewCardformMarkup);
  }
  const select = document.querySelector('.categorySelect');
  getData().then(data => {
    let string = '';
    data.forEach(
      item =>
        (string += `<option data-category="${item._id}">${item.category}</option>`),
    );
    select.insertAdjacentHTML('beforeend', string);
  });

  const addProductImg = document.querySelector('.fileInput');
  const modalBox = document.querySelector('.modalBox');
  const form = document.querySelector('.formAdd');
  const image = [];
  let cardImg = document.querySelector('.cardImg');

  function handleFileSelect(evt) {
    let file = evt.target.files;
    let f;
    for (let i = 0; (f = file[i]); i++) {
      let reader = new FileReader();
      reader.onload = (function(theFile) {
        return function(e) {
          cardImg.src = e.target.result;
          image.push(e.target.result);
        };
      })(f);
      reader.readAsDataURL(f);
    }
  }

  addProductImg.addEventListener('input', handleFileSelect);

  modalBox.addEventListener('click', e => {
    if (
      e.target.dataset.action === 'closeForm' ||
      e.target.className === 'material-icons' ||
      e.target.className === 'modalBox'
    ) {
      addNewModalForm.innerHTML = '';
    }
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const imagesContainer = document.querySelector('.imageArr');
    let string = '';
    if (image.length !== null) {
      image.forEach(elem => {
        string += `<image class="cardImg" src="${elem}" alt="picture" width="75" height="60"></image>`;
      });
      imagesContainer.innerHTML = string;
    }
    category.currentCategory = document.querySelector('select').value;
    category.allCategories.forEach((item, index) => {
      if (item.category === category.currentCategory) {
        category.currentCategory = index + 1;
      }
    });
    const newCard = formParser();
    API.adsProduct(newCard);
    addNewModalForm.innerHTML = '<div class="modalSpace"';
    console.log('Объект данных из формы:', newCard);
  });
});

function formParser() {
  let cardImg = document.querySelector('.cardImg');
  return {
    images: [cardImg.src],
    title: document.querySelector('.firstInput').value,
    category: category.currentCategory,
    price: Number(document.querySelector('.fourthInput').value),
    phone: document.querySelector('.fifthInput').value,
    description: document.querySelector('.thirdInput').value,
  };
}
