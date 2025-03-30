import { loadHeaderFooter } from './utils.mjs';
import CheckoutProcess from './CheckoutProcess.mjs';

loadHeaderFooter()

const order = new CheckoutProcess('cartTotal', '.order-summary');

order.init();
order.startProcess();

document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
    e.preventDefault();
  
    order.checkout();
  });