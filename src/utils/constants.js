const options = {
  formSelector: '.popup__form',
  fieldSetSelector: '.popup__set',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};

const editButton = document.querySelector('.profile__edit-button');
const inputName = document.querySelector('.popup__input_type_name');
const inputJob = document.querySelector('.popup__input_type_job');
const popupFormEditor = document.querySelector('.popup__form_name_editor');
const popupFormAdd = document.querySelector('.popup__form_name_add');
const addButton = document.querySelector('.profile__add-button');
const elementsContainerSelector = '.elements__container';
const popupWithImageSelector = '.popup_name_resize';
const popupAddSelector = '.popup_name_add';
const popupEditorSelector = '.popup_name_editor';
const userNameSelector = '.profile__title';
const userJobSelector = '.profile__subtitle';

export {
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
};
