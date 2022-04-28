import Card from './Card.js';
import FormValidator from './FormValidator.js';

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

const editButton = document.querySelector('.profile__edit-button');
const popupEditor = document.querySelector('.popup_name_editor');
const popupAdd = document.querySelector('.popup_name_add');
const closeButtonEditor = document.querySelector('.popup__close-icon_name_editor');
const closeButtonAdd = document.querySelector('.popup__close-icon_name_add');
const userName = document.querySelector('.profile__title');
const userJob = document.querySelector('.profile__subtitle');
const inputName = document.querySelector('.popup__input_type_name');
const inputJob = document.querySelector('.popup__input_type_job');
const inputTitle = document.querySelector('.popup__input_type_title');
const inputLink = document.querySelector('.popup__input_type_link');
const popupFormEditor = document.querySelector('.popup__form_name_editor');
const popupFormAdd = document.querySelector('.popup__form_name_add');
const elementsContainer = document.querySelector('.elements__container');
const addButton = document.querySelector('.profile__add-button');
const popupImgResize = document.querySelector('.popup_name_resize');
const closeButtonResize = document.querySelector('.popup__close-icon_name_resize');

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
  popup.addEventListener('mousedown', closePopupByOverlay);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
  popup.removeEventListener('mousedown', closePopupByOverlay);
}

function submitUser(evt) {
  evt.preventDefault();
  userName.textContent = inputName.value;
  userJob.textContent = inputJob.value;
  closePopup(popupEditor);
}

function submitAdd(evt) {
  evt.preventDefault();
  renderElement({ name: inputTitle.value, link: inputLink.value }, elementsContainer);
  closePopup(popupAdd);
  popupFormAdd.reset();
}

function createElement(newElement) {
  return new Card(newElement, '#template__element', openPopup, popupImgResize).createElement();
}

function renderElement(element, elementsContainer) {
  elementsContainer.prepend(createElement(element));
}

function renderAllElement(initialCards, elementsContainer) {
  initialCards.forEach((element) => {
    renderElement(element, elementsContainer);
  });
}

const closePopupByEsc = (evt) => {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
};

const closePopupByOverlay = (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
};

editButton.addEventListener('click', () => {
  inputName.value = userName.textContent;
  inputJob.value = userJob.textContent;
  validationNameEditor.resetValidation();
  openPopup(popupEditor);
});

addButton.addEventListener('click', () => {
  validationNameAdd.resetValidation();
  openPopup(popupAdd);
});

closeButtonEditor.addEventListener('click', () => {
  closePopup(popupEditor);
});

closeButtonAdd.addEventListener('click', () => {
  closePopup(popupAdd);
});
closeButtonResize.addEventListener('click', () => {
  closePopup(popupImgResize);
});

popupFormEditor.addEventListener('submit', submitUser);
popupFormAdd.addEventListener('submit', submitAdd);

renderAllElement(initialCards, elementsContainer);

const options = {
  formSelector: '.popup__form',
  fieldSetSelector: '.popup__set',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};

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
