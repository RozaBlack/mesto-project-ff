const apiConfig = {
  baseURL: "https://nomoreparties.co/v1/wff-cohort-25",
  headers: {
    authorization: "5569c5c0-bc1b-4750-8060-286b3a7e977d",
    "Content-Type": "application/json",
  },
};

function checkFormInfo(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

function getFormInfo(infoAddres) {
  return fetch(`${apiConfig.baseURL}/${infoAddres}`, {
    method: "GET",
    headers: apiConfig.headers,
  }).then(checkFormInfo);
}

function getInitialProfileInfo() {
  return getFormInfo("users/me");
}

function getInitialCards() {
  return getFormInfo("cards");
}

export function getInitials() {
  return [getInitialProfileInfo, getInitialCards];
}

export function updateProfileInfo(name, about) {
  return fetch(`${apiConfig.baseURL}/users/me`, {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then(checkFormInfo);
}

export function updateProfileImage(link) {
  return fetch(`${apiConfig.baseURL}/users/me/avatar`, {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify({
      avatar: link,
    }),
  }).then(checkFormInfo);
}

export function addNewCard(name, link) {
  return fetch(`${apiConfig.baseURL}/cards`, {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then(checkFormInfo);
}

export function deleteCardAtServer(id) {
  return fetch(`${apiConfig.baseURL}/cards/${id}`, {
    method: "DELETE",
    headers: apiConfig.headers,
  }).then(checkFormInfo);
}

export function addLikeToCard(id) {
  return fetch(`${apiConfig.baseURL}/cards/likes/${id}`, {
    method: "PUT",
    headers: apiConfig.headers,
  }).then(checkFormInfo);
}

export function deleteLikeFromCard(id) {
  return fetch(`${apiConfig.baseURL}/cards/likes/${id}`, {
    method: "DELETE",
    headers: apiConfig.headers,
  }).then(checkFormInfo);
}
