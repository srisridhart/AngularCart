import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product } from './models/Product';
import 'rxjs/add/operator/take';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class ShoppingCartService {
  subscription: Subscription;
  constructor(private db: AngularFireDatabase) { }

  private create(){
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart(){
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId);
  }

  private getItem(cartId: string, productId: string){
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId() : Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if(cartId) return cartId; 

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  async addToCart(product: Product){
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.$key);
    item$.subscribe(item => {
      item$.update({product: product, quantity : (item.quantity | 0) + 1});
    });
  }

}
