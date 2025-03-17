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

  if (!currentCart.some(item => item.Id === data.Id)) {
    currentCart.push(data);
    localStorage.setItem(key, JSON.stringify(currentCart));
  }
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

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  if (!parentElement) {
    console.error("Erro: O elemento pai não existe.");
    return;
  }

  if (clear) {
    parentElement.innerHTML = ""; // Limpa o conteúdo se `clear` for true
  }

  parentElement.insertAdjacentHTML(position, list.map(templateFn).join(""));
}