import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import ProductDetails from './ProductDetails.mjs';


const productData = new ProductData("tents");


const productList = new ProductList("tents", productData, document.querySelector(".product-detail"));
productList.init()
