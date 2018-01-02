import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/Product';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {
  @Input('product') product: Product;
  @Input('shopping-cart') shoppingCart: ShoppingCart;
  constructor(private cartService: ShoppingCartService) { }

  async addToCart(){
    await this.cartService.addToCart(this.product);
  }

  async removeFromCart(){
    console.log('product-quantity.component.ts - removeFromCart() - Begin');
    await this.cartService.removeFromCart(this.product);
    console.log('product-quantity.component.ts - removeFromCart() - End');
  }

  

}
