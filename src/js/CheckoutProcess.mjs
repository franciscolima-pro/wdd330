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
      const zipcodeInput = document.querySelector('#zipcode');
      if (zipcodeInput) {
        zipcodeInput.addEventListener('change', () => this.calculateOrderTotal());
      }
    }
  }