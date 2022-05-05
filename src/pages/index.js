import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import '../pages/index.css';
import {
  options,
  editButton,
  inputName,
  inputJob,
  popupFormEditor,
  popupFormAdd,
  addButton,
  elementsContainerSelector,
  popupWithImageSelector,
  popupAddSelector,
  popupEditorSelector,
  userNameSelector,
  userJobSelector,
} from '../utils/constants.js';

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

const popupWithImage = new PopupWithImage(popupWithImageSelector);

function handleCardClick(img, text) {
  popupWithImage.open(img, text);
}

function createElement(newElement) {
  return new Card(newElement, '#template__element', handleCardClick).createElement();
}

const userInfo = new UserInfo(userNameSelector, userJobSelector);

const popupAdd = new PopupWithForm(popupAddSelector, (item) => {
  const card = createElement(item);
  defaultCardList.addItem(card);
});

const popupEditor = new PopupWithForm(popupEditorSelector, (inputsValue) => {
  userInfo.setUserInfo(inputsValue.name, inputsValue.job);
});

editButton.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  inputName.value = userData.name;
  inputJob.value = userData.job;
  validationNameEditor.resetValidation();
  popupEditor.open();
});

addButton.addEventListener('click', () => {
  validationNameAdd.resetValidation();
  popupAdd.open();
});

const defaultCardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = createElement(item);
      defaultCardList.addItem(card);
    },
  },
  elementsContainerSelector
);

defaultCardList.renderItems();

const formList = Array.from(document.querySelectorAll(options.formSelector));

formList.forEach((formElement) => {
  formElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
  });
});

const validationNameEditor = new FormValidator(options, popupFormEditor);
validationNameEditor.enableValidation();

const validationNameAdd = new FormValidator(options, popupFormAdd);
validationNameAdd.enableValidation();
