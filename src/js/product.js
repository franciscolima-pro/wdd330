import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { getParam } from "./utils.mjs";

async function init() {
  const dataSource = new ExternalServices();
  const productId = getParam('product');
  try {
    const product = new ProductDetails(productId, dataSource);
  } catch (error) {
    console.error("Erro ao buscar os produtos: ", error);
  }
}

init();
