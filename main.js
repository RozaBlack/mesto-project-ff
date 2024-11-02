(()=>{"use strict";function e(e){e.classList.add("popup_is-opened"),document.addEventListener("keyup",n),e.addEventListener("click",r)}function t(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keyup",n),e.removeEventListener("click",r)}function n(e){"Escape"===e.key&&t(document.querySelector(".popup_is-opened"))}function r(e){e.target===e.currentTarget&&t(e.currentTarget)}var o,c;function a(e,t,n,r,a,i,u,l,s,d){var f,p,m=(p=n,(f=t,document.querySelector(f).content).querySelector(p).cloneNode(!0)),v=m.querySelector(".card__image");v.src=e.link,v.alt=e.name,m.querySelector(".card__title").textContent=e.name;var _=m.querySelector(".card__delete-button");e.owner._id!==d?_.style.display="none":_.addEventListener("click",(function(){o=m,c=e._id,r()}));var y=m.querySelector(".like__number");y.textContent=e.likes.length;var h=m.querySelector(".card__like-button");return i(h,e.likes,d),h.addEventListener("click",(function(){a(h,y,u,l,e._id)})),v.addEventListener("click",(function(){s(v.src,v.alt)})),m}function i(e,t,n,r,o){e.classList.contains("card__like-button_is-active")?r(o).then((function(n){e.classList.remove("card__like-button_is-active"),t.textContent=n.likes.length})).catch((function(e){return console.log(e)})):n(o).then((function(n){e.classList.add("card__like-button_is-active"),t.textContent=n.likes.length})).catch((function(e){return console.log(e)}))}function u(e,t,n){t.forEach((function(t){t._id==n&&e.classList.add("card__like-button_is-active")}))}var l={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},s=function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n),o.classList.remove(r),o.textContent=""},d=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?t.classList.remove(n):t.classList.add(n)},f=function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);d(n,r,t.inactiveButtonClass),n.forEach((function(n){s(e,n,t.inputErrorClass,t.errorClass)}))},p={baseURL:"https://nomoreparties.co/v1/wff-cohort-25",headers:{authorization:"5569c5c0-bc1b-4750-8060-286b3a7e977d","Content-Type":"application/json"}};function m(e){return e.ok?e.json():Promise.reject("Error: ".concat(e.status))}function v(e){return fetch("".concat(p.baseURL,"/").concat(e),{method:"GET",headers:p.headers}).then((function(e){return m(e)}))}function _(e){return fetch("".concat(p.baseURL,"/cards/likes/").concat(e),{method:"PUT",headers:p.headers}).then((function(e){return m(e)}))}function y(e){return fetch("".concat(p.baseURL,"/cards/likes/").concat(e),{method:"DELETE",headers:p.headers}).then((function(e){return m(e)}))}function h(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return i}}(e,t)||function(e,t){if(e){if("string"==typeof e)return b(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?b(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function b(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var S=document.querySelector(".places__list"),L="#card-template",E=".card";function q(e,t,n,r){t.textContent=e?r:n}var g=document.querySelector(".popup_delete_confirm"),k=g.querySelector(".popup__close"),C=document.forms["delete-confirm"];function x(){e(g)}k.addEventListener("click",(function(){t(g)})),C.addEventListener("submit",(function(){var e=h([o,c],2),n=e[0];(function(e,n){var r;(r=e,fetch("".concat(p.baseURL,"/cards/").concat(r),{method:"DELETE",headers:p.headers}).then((function(e){return m(e)}))).then((function(){!function(e){e.remove()}(n),t(g)})).catch((function(e){console.log("Error: ".concat(e))}))})(e[1],n),t(g)}));var A=document.querySelector(".popup_type_edit"),T=document.querySelector(".profile__edit-button"),U=A.querySelector(".popup__close"),P=document.querySelector(".profile__title"),j=document.querySelector(".profile__description"),R=document.forms["edit-profile"],w=R.elements.name,B=R.elements.description,O=A.querySelector(".popup__button");T.addEventListener("click",(function(){w.value=P.textContent,B.value=j.textContent,e(A),f(R,l)})),U.addEventListener("click",(function(){t(A)})),R.addEventListener("submit",(function(e){var n,r;e.preventDefault(),(n=w.value,r=B.value,fetch("".concat(p.baseURL,"/users/me"),{method:"PATCH",headers:p.headers,body:JSON.stringify({name:n,about:r})}).then((function(e){return m(e)}))).then((function(e){P.textContent=e.name,j.textContent=e.job})).catch((function(e){console.log("Error: ".concat(e))})).finally((function(){q(!1,O,"Сохранение...","Сохранить")})),t(A)}));var D=document.querySelector(".popup_type_avatar"),I=document.querySelector(".profile__change-image-button"),M=document.querySelector(".profile__image"),N=D.querySelector(".popup__close"),J=document.forms["edit-avatar"],H=J.elements.avatar,V=D.querySelector(".popup__button");I.addEventListener("click",(function(){e(D),J.reset(),f(J,l)})),N.addEventListener("click",(function(){t(D)})),J.addEventListener("submit",(function(e){var n;e.preventDefault(),(n=H.value,fetch("".concat(p.baseURL,"/users/me/avatar"),{method:"PATCH",headers:p.headers,body:JSON.stringify({avatar:n})}).then((function(e){return m(e)}))).then((function(e){M.style.backgroundImage=e.avatar})).catch((function(e){console.log("Error: ".concat(e))})).finally((function(){q(!1,V,"Сохранение...","Сохранить")})),t(D)}));var z=document.querySelector(".popup_type_new-card"),G=document.querySelector(".profile__add-button"),$=z.querySelector(".popup__close"),F=document.forms["new-place"],K=F.elements["place-name"],Q=F.elements.link,W=z.querySelector(".popup__button");G.addEventListener("click",(function(){e(z),F.reset(),f(F,l)})),$.addEventListener("click",(function(){t(z)})),F.addEventListener("submit",(function(e){var n,r;e.preventDefault(),(n=K.value,r=Q.value,fetch("".concat(p.baseURL,"/cards"),{method:"POST",headers:p.headers,body:JSON.stringify({name:n,link:r})}).then((function(e){return m(e)}))).then((function(e){var n=a(e,L,E,x,i,u,_,y,ne,X);S.prepend(n),t(z)})).catch((function(e){return console.log(e)})).finally((function(){F.reset(),q(!1,W,"Создание...","Создать")}))}));var X,Y=document.querySelector(".popup_type_image"),Z=Y.querySelector(".popup__close"),ee=Y.querySelector(".popup__image"),te=Y.querySelector(".popup__caption");function ne(t,n){e(Y),ee.src=t,ee.alt=n,te.textContent=n}Z.addEventListener("click",(function(){t(Y)})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);d(n,r,t.inactiveButtonClass),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n,r){t.validity.valid?s(e,t,n,r):(function(e){e.validity.patternMismatch?e.setCustomValidity(e.dataset.errorMessage):e.setCustomValidity("")}(t),function(e,t,n,r,o){var c=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r),c.classList.add(o),c.textContent=n}(e,t,t.validationMessage,n,r))}(e,o,t.inputErrorClass,t.errorClass),d(n,r,t.inactiveButtonClass)}))}))}(t,e)}))}(l),Promise.all([function(){return Promise.resolve(v("users/me"))},function(){return Promise.resolve(v("cards"))}]).then((function(e){var t=h(e,2),n=t[0],r=t[1];Promise.all([n(),r()]).then((function(e){var t=h(e,2),n=t[0],r=t[1];P.textContent=n.name,j.textContent=n.about,M.style.backgroundImage="url(".concat(n.avatar,")"),function(e,t){e.forEach((function(e){var n=a(e,L,E,x,i,u,_,y,ne,t);S.append(n)}))}(r,X=n._id)})).catch((function(e){return console.log(e)}))}))})();