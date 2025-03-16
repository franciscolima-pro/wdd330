// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// save data to local storage (ensuring multiple items are stored)
export function setLocalStorage(key, data) {
  // Pega os itens atuais do localStorage
  let currentCart = JSON.parse(localStorage.getItem(key)) || [];

  // Verifica se o currentCart é um array (evita possíveis erros)
  if (!Array.isArray(currentCart)) {
    currentCart = [];
  }

  // Adiciona o novo item ao array
  currentCart.push(data);

  // Salva o array atualizado no localStorage
  localStorage.setItem(key, JSON.stringify(currentCart));
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}