import "./styles/index.css"; // добавьте импорт главного файла стилей
//import { initialCards } from "./scripts/cards.js";
import { openPopup, closePopup } from "./scripts/modal.js";
import {
  createCard,
  deleteCard,
  likeCard,
  putInitialLikes,
  getCurrCardInfo,
} from "./scripts/card.js";
import {
  validationConfig,
  enableValidation,
  clearValidation,
} from "./scripts/validation.js";
import {
  getInitials,
  updateProfileInfo,
  updateProfileImage,
  addNewCard,
  deleteCardAtServer,
  addLikeToCard,
  deleteLikeFromCard,
} from "./scripts/api.js";

const cardsList = document.querySelector(".places__list");
const cardTemplateID = "#card-template";
const cardElemClass = ".card";

// @todo: Вывести карточки на страницу
function addCardToPage(initialCards, profileId) {
  initialCards.forEach((card) => {
    const cardElem = createCard(
      card,
      cardTemplateID,
      cardElemClass,
      openConfirmPopup,
      likeCard,
      putInitialLikes,
      addLikeToCard,
      deleteLikeFromCard,
      showImage,
      profileId
    );
    cardsList.append(cardElem);
  });
}

function saveLoading(isLoading, button, textLoad, textFinal) {
  if (!isLoading) {
    button.textContent = textLoad;
  } else {
    button.textContent = textFinal;
  }
}

// Подтверждение удаления карточки
const popupDeleteConfirm = document.querySelector(".popup_delete_confirm");
const popupDeleteConfirmCloseButton =
  popupDeleteConfirm.querySelector(".popup__close");

const deleteConfirmFormElement = document.forms["delete-confirm"];

function openConfirmPopup() {
  openPopup(popupDeleteConfirm);
}

popupDeleteConfirmCloseButton.addEventListener("click", () => {
  closePopup(popupDeleteConfirm);
});

function confirmDelete(cardDataId, cardElem) {
  deleteCardAtServer(cardDataId)
    .then(() => {
      deleteCard(cardElem);
      closePopup(popupDeleteConfirm);
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    });
}

deleteConfirmFormElement.addEventListener("submit", () => {
  const [cardElem, cardDataId] = getCurrCardInfo();
  confirmDelete(cardDataId, cardElem);
  closePopup(popupDeleteConfirm);
});

// Работа с popup
// Редактирование профиля
const popupTypeEdit = document.querySelector(".popup_type_edit");
const profileEditButton = document.querySelector(".profile__edit-button");
const popupTypeEditCloseButton = popupTypeEdit.querySelector(".popup__close");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const editProfileFormElement = document.forms["edit-profile"];
const nameInput = editProfileFormElement.elements.name;
const jobInput = editProfileFormElement.elements.description;

const popupTypeEditButton = popupTypeEdit.querySelector(".popup__button");

profileEditButton.addEventListener("click", () => {
  putMeaningsToEditProfilePopup();
  openPopup(popupTypeEdit);
  clearValidation(editProfileFormElement, validationConfig);
});
popupTypeEditCloseButton.addEventListener("click", () => {
  closePopup(popupTypeEdit);
});

function putMeaningsToEditProfilePopup() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

// Обработчик «отправки» формы
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const name = nameInput.value;
  const job = jobInput.value;

  updateProfileInfo(name, job)
    .then((res) => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.job;
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    })
    .finally(() => {
      saveLoading(false, popupTypeEditButton, "Сохранение...", "Сохранить");
    });

  closePopup(popupTypeEdit);
}

editProfileFormElement.addEventListener("submit", handleProfileFormSubmit);

// Редактирование изображения профиля
const popupTypeAvatar = document.querySelector(".popup_type_avatar");
const profileChangeImageButton = document.querySelector(
  ".profile__change-image-button"
);
const profileImage = document.querySelector(".profile__image");
const popupTypeNewProfileImageCloseButton =
  popupTypeAvatar.querySelector(".popup__close");

const editAvatarFormElement = document.forms["edit-avatar"];
const profileImageUrlInput = editAvatarFormElement.elements.avatar;

const popupTypeAvatarButton = popupTypeAvatar.querySelector(".popup__button");

profileChangeImageButton.addEventListener("click", () => {
  openPopup(popupTypeAvatar);
  editAvatarFormElement.reset();
  clearValidation(editAvatarFormElement, validationConfig);
});
popupTypeNewProfileImageCloseButton.addEventListener("click", () => {
  closePopup(popupTypeAvatar);
});

function handleProfileImageFormSubmit(evt) {
  evt.preventDefault();

  const profileImageUrl = profileImageUrlInput.value;

  updateProfileImage(profileImageUrl)
    .then((res) => {
      profileImage.style.backgroundImage = res.avatar;
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    })
    .finally(() => {
      saveLoading(false, popupTypeAvatarButton, "Сохранение...", "Сохранить");
    });

  closePopup(popupTypeAvatar);
}

editAvatarFormElement.addEventListener("submit", handleProfileImageFormSubmit);

// Добавление нового места
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const profileAddButton = document.querySelector(".profile__add-button");
const popupTypeNewCardCloseButton =
  popupTypeNewCard.querySelector(".popup__close");

// Находим форму в DOM
//const newCardFormElement = popupTypeNewCard.querySelector('.popup__form');
const newCardFormElement = document.forms["new-place"];

// Находим поля формы в DOM
//const cardNameInput = popupTypeNewCard.querySelector('.popup__input_type_card-name');
//const pictureUrlInput = popupTypeNewCard.querySelector('.popup__input_type_url');
const cardNameInput = newCardFormElement.elements["place-name"];
const pictureUrlInput = newCardFormElement.elements.link;

const popupTypeNewCardButton = popupTypeNewCard.querySelector(".popup__button");

profileAddButton.addEventListener("click", () => {
  openPopup(popupTypeNewCard);
  newCardFormElement.reset();
  clearValidation(newCardFormElement, validationConfig);
});
popupTypeNewCardCloseButton.addEventListener("click", () => {
  closePopup(popupTypeNewCard);
});

function addCardToCardsList(evt) {
  evt.preventDefault();

  const name = cardNameInput.value;
  const link = pictureUrlInput.value;
  addNewCard(name, link)
    .then((card) => {
      const cardElem = createCard(
        card,
        cardTemplateID,
        cardElemClass,
        openConfirmPopup,
        likeCard,
        putInitialLikes,
        addLikeToCard,
        deleteLikeFromCard,
        showImage,
        profileId
      );
      cardsList.prepend(cardElem);
      closePopup(popupTypeNewCard);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      newCardFormElement.reset();
      saveLoading(false, popupTypeNewCardButton, "Создание...", "Создать");
    });
}

newCardFormElement.addEventListener("submit", addCardToCardsList);

// Увеличение изображения на карточке
const popupTypeImage = document.querySelector(".popup_type_image");
const popupTypeImageCloseButton = popupTypeImage.querySelector(".popup__close");
const popupImage = popupTypeImage.querySelector(".popup__image");
const popupCaption = popupTypeImage.querySelector(".popup__caption");

popupTypeImageCloseButton.addEventListener("click", () => {
  closePopup(popupTypeImage);
});

function showImage(link, name) {
  openPopup(popupTypeImage);
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
}

// включение валидации вызовом enableValidation
// все настройки передаются при вызове
enableValidation(validationConfig);

//-------------------------------------------------------------------------------//
let profileId;

getInitials().then(([getInitialProfileInfo, getInitialCards]) => {
  Promise.all([getInitialProfileInfo(), getInitialCards()])
    .then(([userInfo, initialCards]) => {
      profileTitle.textContent = userInfo.name;
      profileDescription.textContent = userInfo.about;
      profileImage.style.backgroundImage = `url(${userInfo.avatar})`;
      profileId = userInfo._id;

      addCardToPage(initialCards, profileId);
    })
    .catch((err) => console.log(err));
});
