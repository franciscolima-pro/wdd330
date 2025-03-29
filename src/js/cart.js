import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  if(cartItems.length > 0) {
    document.querySelector(".cart-total").style.display = "block";
    updateCartTotal(cartItems)
  }else {
    document.querySelector(".cart-total").style.display = "none";
  }

  

  setupRemoveButtons();
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">${item.FinalPrice}</p>
  <button class="remove-item" data-id="${item.Id}">X</button>
</li>`;

  return newItem;
}

function removeItemFromCart(itemId) {
  let cartItems = getLocalStorage("so-cart");

  // Filtra os itens para remover o item com o ID correspondente
  cartItems = cartItems.filter(item => item.Id !== itemId);

  // Atualiza o carrinho no localStorage
  localStorage.setItem("so-cart", JSON.stringify(cartItems));

  // Re-renderiza o conteúdo do carrinho
  renderCartContents();
}

function setupRemoveButtons() {
  // Adiciona o evento de clique para os botões de remoção
  const removeButtons = document.querySelectorAll(".remove-item");

  removeButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      const itemId = e.target.getAttribute("data-id");
      removeItemFromCart(itemId);
    });
  });
}

function updateCartTotal(cartItems) {
  const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);
  document.querySelector(".cart-total").textContent = `Total: $${total.toFixed(2)}`;
}

window.goToCheckout = function(){
  const cartItems = JSON.parse(localStorage.getItem("so-cart"));
  const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);
  localStorage.setItem("cartTotal", total);
  window.location.href = "/checkout/index.html";
}

renderCartContents();
loadHeaderFooter();
