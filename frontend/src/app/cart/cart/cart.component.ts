import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cart, CartItem } from 'src/app/models/cart';
import { CartService } from 'src/app/services/cart.service';
import { ItemsService } from 'src/app/services/items.service';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItemDetailed: CartItem[] = [];
  respCart: Cart;
  totalPrice: number;
  userName: string;
  previousOrders: Cart[] = [];

  constructor(
    private cartService: CartService,
    private itemService: ItemsService,
    private snackBar: MatSnackBar,
    private userService: UserServiceService
  ) {}

  ngOnInit(): void {
    this.getItemDetails();
    this.getUserName();
  }

  getItemDetails() {
    this.cartService.cart$.subscribe((respCart) => {
      this.cartItemDetailed = [];
      this.respCart = respCart;
      let totalPrice = 0;

      respCart.cartItems.forEach((cartItem) => {
        this.itemService.getOneItem(cartItem.item._id).subscribe((item) => {
          const itemTotalPrice = item.price * cartItem.quantity;
          totalPrice += itemTotalPrice;

          this.cartItemDetailed.push({
            item: item,
            quantity: cartItem.quantity,
          });

          this.totalPrice = totalPrice;
        });
      });
    });
  }

  removeItem(index: number, cartItem: CartItem) {
    this.cartService.removeItem(index);

    this.snackBar.open(
      'You deleted ' + cartItem.item.name + ' from the cart',
      'OK',
      {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      }
    );
  }

  proceedToPayment() {
    const cart: Cart = this.cartService.getCart();
    const userId = this.getUserId();

    if (!userId || userId === 'guest') {
      this.snackBar.open(
        'You need to log in to proceed with the payment.',
        'OK',
        {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        }
      );
      return;
    }

    if (cart.cartItems.length === 0) {
      this.snackBar.open(
        'Your cart is empty. Please add items to proceed with the payment.',
        'OK',
        {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        }
      );
      return;
    }

    cart.user = userId; // Assign the user ID to the cart's user field

    this.cartService.saveCartToServer(cart).subscribe(
      (response) => {
        // Handle successful response
        console.log('Cart saved to the server:', response);

        // Reset the cart
        this.cartService.resetCart();

        // Display success message to the user
        this.snackBar.open(
          'Order Successful, Thanks for Shopping with us!',
          'OK',
          {
            duration: 2000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          }
        );
      },
      (error) => {
        // Handle error response
        console.error('Error saving cart data:', error);

        // Display error message to the user
        this.snackBar.open('Error occurred while saving cart data!', 'OK', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      }
    );
  }

  getUserName(): void {
    const userId = localStorage.getItem('user');
    if (userId) {
      this.userService.getOneUser(userId).subscribe(
        (user) => {
          this.userName = user.name;
        },
        (error) => {
          console.log('Error retrieving user name:', error);
        }
      );
    } else {
      this.userName = 'guest';
    }
  }

  getUserId(): string {
    return localStorage.getItem('user');
  }
}
