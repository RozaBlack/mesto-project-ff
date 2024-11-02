let CurCardElem;
let CurCardDataId;
// @todo: Темплейт карточки
function getTemplate(templateID) {
  return document.querySelector(templateID).content;
}

// @todo: DOM узлы
function getElemFromTemplate(elemTemplate, elemClass) {
  return elemTemplate.querySelector(elemClass).cloneNode(true);
}

// @todo: Функция создания карточки
function createCard(
  cardData,
  cardTemplateID,
  cardElemClass,
  openConfirmPopup,
  likeCard,
  putInitialLikes,
  addLikeToCard,
  deleteLikeFromCard,
  showImage,
  profileId
) {
  const cardTemplate = getTemplate(cardTemplateID);
  const cardElem = getElemFromTemplate(cardTemplate, cardElemClass);

  const cardImage = cardElem.querySelector(".card__image");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  cardElem.querySelector(".card__title").textContent = cardData.name;
  const deleteButton = cardElem.querySelector(".card__delete-button");

  if (cardData.owner._id !== profileId) {
    deleteButton.style.display = "none";
  } else {
    deleteButton.addEventListener("click", () => {
      CurCardElem = cardElem;
      CurCardDataId = cardData._id;
      openConfirmPopup();
    });
  }

  const cardLikesNumber = cardElem.querySelector(".like__number");
  cardLikesNumber.textContent = cardData.likes.length;

  const likeButton = cardElem.querySelector(".card__like-button");
  putInitialLikes(likeButton, cardData.likes, profileId);
  likeButton.addEventListener("click", () => {
    likeCard(
      likeButton,
      cardLikesNumber,
      addLikeToCard,
      deleteLikeFromCard,
      cardData._id
    );
  });

  cardImage.addEventListener("click", () => {
    showImage(cardImage.src, cardImage.alt);
  });

  return cardElem;
}

function getCurrCardInfo() {
  return [CurCardElem, CurCardDataId];
}

// @todo: Функция удаления карточки
function deleteCard(cardElem) {
  cardElem.remove();
}

// лайкнуть карточку
function likeCard(
  likeButton,
  cardLikesNumber,
  addLikeToCard,
  deleteLikeFromCard,
  cardDataId
) {
  if (likeButton.classList.contains("card__like-button_is-active")) {
    deleteLikeFromCard(cardDataId)
      .then((card) => {
        likeButton.classList.remove("card__like-button_is-active");
        cardLikesNumber.textContent = card.likes.length;
      })
      .catch((err) => console.log(err));
  } else {
    addLikeToCard(cardDataId)
      .then((card) => {
        likeButton.classList.add("card__like-button_is-active");
        cardLikesNumber.textContent = card.likes.length;
      })
      .catch((err) => console.log(err));
  }
}

function putInitialLikes(likeButton, cardDataLikes, profileId) {
  cardDataLikes.forEach((like) => {
    if (like._id == profileId) {
      likeButton.classList.add("card__like-button_is-active");
    }
  });
}

export { createCard, deleteCard, likeCard, putInitialLikes, getCurrCardInfo };
