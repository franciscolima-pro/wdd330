import {renderListWithTemplate} from './utils.mjs';

function productCardTemplate(product){
    return `      
        <li class="product-card">
    <a href="?product=${product.Id}">
      <img src="${product.Image}" alt="${product.Brand.Name}">
      <h2 class="card__brand">${product.Brand.Name}</h2>
      <h3 class="card__name">${product.Name}</h3>
      <p class="product-card__price">${product.FinalPrice}</p>
    </a>
  </li>`
}

export default class ProductList {
    constructor(category, dataSource, listElement){
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init(){
        this.productList = await this.dataSource.getData();
        // console.log("Produtos carregados:", this.productList);
        this.renderList()
    }

    renderList(){
        renderListWithTemplate(productCardTemplate, this.listElement, this.productList);
    }  
    

}
