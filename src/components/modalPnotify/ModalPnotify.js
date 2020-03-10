import './modalPnitufy.css';

const ModalPnotify = (title, text, classs = 'green') => {
  let color;
  classs === 'green' && (color = 'rgba(117, 255, 71, 0.816)');
  classs === 'red' && (color = 'rgba(255, 99, 71, 0.900)');

  document.querySelector('.pnotifyTitle').textContent = `!!! ${title}`;
  document.querySelector('.pnotifyText').textContent = text;
  document.querySelector('.pnotifyContainer').classList.remove('fade');
  document
    .querySelector('.pnotifyContainer')
    .setAttribute('style', `background-color: ${color};`);
  document.querySelector('.closePnotify').addEventListener('click', onClick);
  function onClick() {
    document.querySelector('.pnotifyContainer').classList.add('fade');
  }
  setTimeout(() => {
    document.querySelector('.pnotifyContainer').classList.add('fade');
  }, 4000);
};

export default ModalPnotify;
