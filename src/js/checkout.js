import { loadHeaderFooter } from './utils.mjs';
import CheckoutProcess from './CheckoutProcess.mjs';

loadHeaderFooter()

const order = new CheckoutProcess('cartTotal', '.order-summary');

order.init();
order.startProcess();

document.querySelector("#checkoutSubmit").addEventListener("click", async (e) => {
    e.preventDefault();
    const myForm = document.forms[0];
    const validForm = myForm.checkValidity();
    myForm.reportValidity();
    if(validForm) {
      await order.checkout();
      localStorage.removeItem('so-cart');
      localStorage.removeItem('cartTotal');
      setTimeout(() => {
        window.location.href = "../checkout/success.html";
      }, 100);
    }
  });