import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../shared/models/Cart';
import { CartItem } from '../shared/models/Cartitem';
import { Food } from '../shared/models/Food';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: Cart = this.getCartFromLocalStorage();

  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);

  constructor() { }

  addToCart(food: Food): void {
    let cartItem = this.cart.items.find(item => item.food.id === food.id);
    if (cartItem)
      return;

    this.cart.items.push(new CartItem(food));
    this.setCartToLocalStorage();
  }

  removeFromCart(foodId: string): void {
    this.cart.items = this.cart.items.filter(item => item.food.id != foodId);
    this.setCartToLocalStorage();
  }

  changeQuantity(foodId: string, quantity: number) {

    let cartItem = this.cart.items.find(item => item.food.id === foodId);
    if (!cartItem) return;

    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.food.price;
    this.setCartToLocalStorage();
  }

  clearCart() {
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }

  getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  getCart(): Cart{
    return this.cartSubject.value;//SUBJECT ALWAYS KEEPS THE LATEST VALUES.
  }

  private setCartToLocalStorage(): void {

    this.cart.totalPrice = this.cart.items
      .reduce((prevSum, currentItem) => prevSum + currentItem.price, 0);
      //if we have in cart to items then raduce function will call two time. START FROM THE PREV-SUM=0+20(CURRENT-ITEM) FIRST RUN AND PREV-SUM=20+CURN-ITEM

    this.cart.totalCount = this.cart.items
      .reduce((prevSum, currentItem) => prevSum + currentItem.quantity, 0);

    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);

    this.cartSubject.next(this.cart); //NOTIFY THE ALL CART OBSERVABLE LISTENER.
  }

  private getCartFromLocalStorage(): Cart {

    const cartJson = localStorage.getItem('Cart');

    return cartJson ? JSON.parse(cartJson) : new Cart();
  }

}
