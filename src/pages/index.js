import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
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
  userAvatarSelector,
  popupDelSelector,
  avatarButton,
  popupAvatarSelector,
  popupFormAvatar,
} from '../utils/constants.js';
import api from '../components/Api';
let defaultCardList = null;
let userId = null;

const userInfo = new UserInfo(userNameSelector, userJobSelector, userAvatarSelector);

Promise.all([api.getUser(), api.getInitialCards()])
  .then(([userRes, cardRes]) => {
    //user
    userId = userRes._id;
    userInfo.setUserInfo(userRes.name, userRes.about, userRes.avatar);

    //cards
    defaultCardList = new Section(
      {
        items: cardRes,
        renderer: (item) => {
          const card = createElement(item);
          defaultCardList.addItem(card);
        },
      },
      elementsContainerSelector
    );
    defaultCardList.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

const popupWithImage = new PopupWithImage(popupWithImageSelector);
popupWithImage.setEventListeners();

function handleCardClick(img, text) {
  popupWithImage.open(img, text);
}

const popupDel = new PopupWithConfirmation(popupDelSelector);
popupDel.setEventListeners();

function createElement(newElement) {
  const card = new Card(
    userId,
    newElement,
    '#template__element',
    handleCardClick,
    (cardId) => {
      popupDel.open();
      popupDel.setHandler(() => {
        api
          .deleteCard(cardId)
          .then((res) => {
            card.deleteElement();
            popupDel.close();
          })
          .then(() => {
            popupDel.close();
          })
          .catch((err) => {
            console.log(err);
          });
      });
    },
    (cardId) => {
      if (card.isLiked()) {
        api
          .deleteLike(cardId)
          .then((res) => {
            card.toggleLike(res.likes);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        api
          .setLike(cardId)
          .then((res) => {
            card.toggleLike(res.likes);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  );
  return card.createElement();
}

const popupAdd = new PopupWithForm(popupAddSelector, (item) => {
  popupAdd.loading(true);
  api
    .setCard(item.name, item.link)
    .then((res) => {
      const card = createElement(res);
      defaultCardList.addItem(card);
    })
    .then(() => {
      popupAdd.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAdd.loading(false);
    });
});

popupAdd.setEventListeners();

const popupEditor = new PopupWithForm(popupEditorSelector, (inputsValue) => {
  popupEditor.loading(true);
  api
    .setUser(inputsValue.name, inputsValue.job)
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about, res.avatar);
    })
    .then(() => {
      popupEditor.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditor.loading(false);
    });
});

popupEditor.setEventListeners();

const popupAvatar = new PopupWithForm(popupAvatarSelector, (inputsValue) => {
  popupAvatar.loading(true);
  api
    .setAvatar(inputsValue.link)
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about, res.avatar);
    })
    .then(() => {
      popupAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAvatar.loading(false);
    });
});
popupAvatar.setEventListeners();

avatarButton.addEventListener('click', () => {
  validationNameAvatar.resetValidation();
  popupAvatar.open();
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

const validationNameAvatar = new FormValidator(options, popupFormAvatar);
validationNameAvatar.enableValidation();
