import ExternalServices from './ExternalServices.mjs';
import { getLocalStorage } from "./utils.mjs";

const services = new ExternalServices();

function packageItems(items) {
  return items.map(item => ({
      id: item.Id,
      name: item.Name,
      price: item.Price,
      quantity: 1,
    }));
};

function formDataToJSON(formElement) {
  return Object.fromEntries(new FormData(formElement));
};
export default class CheckoutProcess {
    constructor(key, outputSelector) {
      this.key = key;
      this.outputSelector = outputSelector;
      this.list = [];
      this.itemTotal = 0;
      this.shipping = 0;
      this.tax = 0;
      this.orderTotal = 0;
    }
  
    init() {
      this.calculateItemSubTotal();
    }
  
    calculateItemSubTotal() {
      this.itemTotal = parseFloat(localStorage.getItem('cartTotal')) || 0;
      this.displayItemSubTotal();
    }
  
    calculateOrderTotal() {
      this.tax = this.itemTotal * 0.06;
      this.list = getLocalStorage('so-cart');
      const quantItems = JSON.parse(localStorage.getItem('so-cart')).length - 1;
      this.shipping = 10 + (2 * (quantItems));
      this.orderTotal = this.itemTotal + this.tax + this.shipping;
      this.displayOrderTotals();
    }
  
    displayItemSubTotal() {
      const subtotal = document.querySelector(`${this.outputSelector} #subtotal`);
      if (subtotal) subtotal.textContent = `$${this.itemTotal.toFixed(2)}`;
    }
  
    displayOrderTotals() {
      const tax = document.querySelector(`${this.outputSelector} #tax`);
      const shipping = document.querySelector(`${this.outputSelector} #shipping`);
      const orderTotal = document.querySelector(`${this.outputSelector} #orderTotal`);
  
      if (tax) tax.textContent = `$${this.tax.toFixed(2)}`;
      if (shipping) shipping.textContent = `$${this.shipping.toFixed(2)}`;
      if (orderTotal) orderTotal.textContent = `$${this.orderTotal.toFixed(2)}`;
    }
  
    startProcess() { 
      const zipcodeInput = document.querySelector('#zip');
      if (zipcodeInput) {
        zipcodeInput.addEventListener('change', () => this.calculateOrderTotal());
      }
    }

    async checkout() {
      const formElement = document.forms["checkout-form"];
      const order = formDataToJSON(formElement);
      order.orderDate = new Date().toISOString();
      order.items = packageItems(this.list);
      order.orderTotal = this.orderTotal;
      order.shipping = this.shipping;
      order.tax = this.tax;
      console.log(order);
  
      try {
        const response = await services.checkout(order);
        console.log(response); //ELE SÓ NÃOO TA GRAVANDO OS DADOS NO URL
      } catch (err) {
        console.log(err);
      }
    }
  }
