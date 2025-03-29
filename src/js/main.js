import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import ProductDetails from './ProductDetails.mjs';
import { loadHeaderFooter } from './utils.mjs';
loadHeaderFooter()

const productId = new URLSearchParams(window.location.search).get('product');

if (productId) {
  const productData = new ProductData();
  const productDetails = new ProductDetails(productId, productData);
  productDetails.init();
} else {
  // Caso contrário, mostrar a lista de produtos
  const productData = new ProductData("tents");
  const productList = new ProductList("tents", productData, document.querySelector(".product-list"));
  productList.init();
}

