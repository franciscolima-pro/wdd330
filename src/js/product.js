import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { getParam } from "./utils.mjs";

const dataSource = new ProductData("tents");
const productId = getParam('product');
// console.log(dataSource)

const product = new ProductDetails(productId, dataSource);

product.init();