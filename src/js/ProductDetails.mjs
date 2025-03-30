import { setLocalStorage } from "./utils.mjs";

function productDetailsTemplate(product) {

  return `<section class="product-detail">
      <h3>${product.Brand.Name}</h3>
      <h2 class="divider">${product.NameWithoutBrand}</h2>
      <img
        class="divider"
        src="${product.Image}"
        alt="${product.NameWithoutBrand}"
      />
      <p class="product-card__price">$${product.FinalPrice}</p>
      <p class="product__color">${product.Colors?.[0]?.ColorName || "No color"}</p>
      <p class="product__description">${product.DescriptionHtmlSimple}</p>
      <div class="product-detail__add">
        <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
      </div>
    </section>`;
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {

      // Obtém os detalhes do produto
      this.product = await this.dataSource.findProductById(this.productId);

      // Renderiza os detalhes do produto
      this.renderProductDetails(".product-list");

      // Adiciona o evento ao botão "Add to Cart"
      const addToCartBtn = document.getElementById("addToCart");
      if (addToCartBtn) {
        addToCartBtn.addEventListener("click", this.addProductToCart.bind(this));
      }
  }

  addProductToCart() {
    setLocalStorage("so-cart", this.product);
    alert("Produto adicionado ao carrinho!");
  }

  renderProductDetails(selector, error = false) {
    const element = document.querySelector(selector);
    element.insertAdjacentHTML(
      "afterBegin",
      productDetailsTemplate(this.product)
    );
  }
}

