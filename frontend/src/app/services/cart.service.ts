import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Cart, CartItem } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:3000/fox/api/cart'; // Update the URL with your API endpoint

  cart$: BehaviorSubject<Cart> = new BehaviorSubject(this.getCart());

  constructor(private http: HttpClient) {
    this.initCartLocalStorage();
  }

  initCartLocalStorage() {
    const cart: Cart = this.getCart();

    if (!cart) {
      const initialCart = {
        cartItems: [],
        user: {}
      };
      const initialCartJson = JSON.stringify(initialCart);
      localStorage.setItem('cart', initialCartJson);
    }
  }

  getCart(): Cart {
    const cartJsonString: string = localStorage.getItem('cart');
    const cart: Cart = JSON.parse(cartJsonString);

    return cart;
  }

  setCartItem(cartItem: CartItem) {
    const cart = this.getCart();

    const cartItemExist = cart.cartItems.find(
      item => item.item._id === cartItem.item._id
    );

    if (cartItemExist) {
      cart.cartItems.map(item => {
        if (item.item._id === cartItem.item._id) {
          item.quantity = item.quantity + cartItem.quantity;
        }
      });
    } else {
      const user = localStorage.getItem('user');
      cart.cartItems.push(cartItem);
      cart.user = user;
      console.log(cart);
      this.cart$.next(cart);
    }

    const cartJson = JSON.stringify(cart);
    localStorage.setItem('cart', cartJson);
    this.cart$.next(cart);
    console.log(cart);
    return cart;
  }

  removeItem(index: number) {
    const cart = this.getCart();
    cart.cartItems.splice(index, 1);
    const cartJson = JSON.stringify(cart);
    localStorage.setItem('cart', cartJson);
    this.cart$.next(cart);
  }

  resetCart() {
    const initialCart: Cart = {
      _id: '',
      cartItems: [],
      user: '',
      totalPrice: 0
    };
    const initialCartJson = JSON.stringify(initialCart);
    localStorage.setItem('cart', initialCartJson);
    this.cart$.next(initialCart);
  }

  getCartFromServer():Observable<Cart[]>  {
    return this.http.get<Cart[]>(`${this.apiUrl}/admin/orders`);
  }
  saveCartToServer(cart: Cart) {
    return this.http.post<Cart>(`${this.apiUrl}`, cart);
  }

  getPreviousOrders(userId: string): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${this.apiUrl}/previous-orders/${userId}`);
  }
}
