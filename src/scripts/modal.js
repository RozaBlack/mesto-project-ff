function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keyup", closePopupEsc);
  popup.addEventListener("click", closePopupOverlay);
}

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keyup", closePopupEsc);
  popup.removeEventListener("click", closePopupOverlay);
}

function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_is-opened"));
  }
}

function closePopupOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}

export { openPopup, closePopup };
