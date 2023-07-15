// import { Component, OnInit } from '@angular/core';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { Cart, CartItem } from 'src/app/models/cart';
// import { CartService } from 'src/app/services/cart.service';
// import { ItemsService } from 'src/app/services/items.service';

// @Component({
//   selector: 'app-cart',
//   templateUrl: './cart.component.html',
//   styleUrls: ['./cart.component.css']
// })
// export class CartComponent implements OnInit {

//   cartItemDetailed : CartItem[] = [];
//   respCart : Cart;
//   totalPrice : number;

//   constructor(private cartService : CartService,
//     private itemService : ItemsService,
//     private snackBar : MatSnackBar) { }

//   ngOnInit(): void {
//     this.getItemDetails();
//   }

//   getItemDetails(){
//     this.cartService.cart$.pipe().subscribe(
//       (respCart)=>{
//         this.cartItemDetailed = [];
//         this.respCart = respCart;
//         respCart.cartItems.forEach(
//           (cartItem)=>{
//             this.itemService.getOneItem(cartItem.item._id).subscribe(
//               (item)=>{
//                 this.totalPrice = item.price * cartItem.quantity;
//                 this.cartItemDetailed.push({
//                   item:item,
//                   quantity:cartItem.quantity
//                 })
//               }
//             )
//           }
//         )
//       }
//     )
//   }

//   removeItem(index:number, cartItem:CartItem){
//     this.cartService.removeItem(index);

//     this.snackBar.open("You deleted "+cartItem.item.name+" from the cart", "OK", {
//       duration:2000,
//       horizontalPosition:'right',
//       verticalPosition:'top'
//     })
//   }

// }





// import { Component, OnInit } from '@angular/core';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { Cart, CartItem } from 'src/app/models/cart';
// import { CartService } from 'src/app/services/cart.service';
// import { ItemsService } from 'src/app/services/items.service';

// @Component({
//   selector: 'app-cart',
//   templateUrl: './cart.component.html',
//   styleUrls: ['./cart.component.css']
// })
// export class CartComponent implements OnInit {

//   cartItemDetailed: CartItem[] = [];
//   respCart: Cart;
//   totalPrice: number;

//   constructor(
//     private cartService: CartService,
//     private itemService: ItemsService,
//     private snackBar: MatSnackBar
//   ) {}

//   ngOnInit(): void {
//     this.getItemDetails();
//   }

//   getItemDetails() {
//     this.cartService.cart$.pipe().subscribe((respCart) => {
//       this.cartItemDetailed = [];
//       this.respCart = respCart;
//       respCart.cartItems.forEach((cartItem) => {
//         this.itemService.getOneItem(cartItem.item._id).subscribe((item) => {
//           this.totalPrice = item.price * cartItem.quantity;
//           this.cartItemDetailed.push({
//             item: item,
//             quantity: cartItem.quantity
//           });
//         });
//       });
//     });
//   }

//   removeItem(index: number, cartItem: CartItem) {
//     this.cartService.removeItem(index);

//     this.snackBar.open("You deleted " + cartItem.item.name + " from the cart", "OK", {
//       duration: 2000,
//       horizontalPosition: 'right',
//       verticalPosition: 'top'
//     });
//   }

//   proceedToPayment() {
//     // Send the cart items to the backend API for payment processing
//     // Here, you can make an HTTP request to your backend API with the cart items
//     // and handle the payment logic on the server side.

//     // Once the payment is successful, you can empty the cart by resetting it.
    
//     this.cartService.resetCart();

//     // Show a success message to the user
//     this.snackBar.open("Payment successful!", "OK", {
//       duration: 2000,
//       horizontalPosition: 'right',
//       verticalPosition: 'top'
//     });
//   }
// }














// import { Component, OnInit } from '@angular/core';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { Cart, CartItem } from 'src/app/models/cart';
// import { CartService } from 'src/app/services/cart.service';
// import { ItemsService } from 'src/app/services/items.service';

// @Component({
//   selector: 'app-cart',
//   templateUrl: './cart.component.html',
//   styleUrls: ['./cart.component.css']
// })
// export class CartComponent implements OnInit {

//   cartItemDetailed: CartItem[] = [];
//   respCart: Cart;
//   totalPrice: number;

//   constructor(
//     private cartService: CartService,
//     private itemService: ItemsService,
//     private snackBar: MatSnackBar
//   ) {}

//   ngOnInit(): void {
//     this.getItemDetails();
//   }

//   getItemDetails() {
//     this.cartService.cart$.pipe().subscribe((respCart) => {
//       this.cartItemDetailed = [];
//       this.respCart = respCart;
//       respCart.cartItems.forEach((cartItem) => {
//         this.itemService.getOneItem(cartItem.item._id).subscribe((item) => {
//           this.totalPrice = item.price * cartItem.quantity;
//           this.cartItemDetailed.push({
//             item: item,
//             quantity: cartItem.quantity
//           });
//         });
//       });
//     });
//   }

//   removeItem(index: number, cartItem: CartItem) {
//     this.cartService.removeItem(index);

//     this.snackBar.open("You deleted " + cartItem.item.name + " from the cart", "OK", {
//       duration: 2000,
//       horizontalPosition: 'right',
//       verticalPosition: 'top'
//     });
//   }
//   proceedToPayment() {
//     const cartItems = this.cartService.getCartItems();
  
//     if (cartItems.length === 0) {
//       this.snackBar.open("Cart is empty. Please add items to the cart.", "OK", {
//         duration: 2000,
//         horizontalPosition: 'right',
//         verticalPosition: 'top'
//       });
//       return;
//     }
  
//     // Send the cart items to the backend API for payment processing
//     // Here, you can make an HTTP request to your backend API with the cart items
//     // and handle the payment logic on the server side.
  
//     // Once the payment is successful, you can empty the cart by resetting it.
//     this.cartService.resetCart();
  
//     // Show a success message to the user
//     this.snackBar.open("Payment successful!", "OK", {
//       duration: 2000,
//       horizontalPosition: 'right',
//       verticalPosition: 'top'
//     });
//   }
//   getUsername(): string {
//     return localStorage.getItem('user') || '';
//   }
  
  
// }


















import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cart, CartItem } from 'src/app/models/cart';
import { CartService } from 'src/app/services/cart.service';
import { ItemsService } from 'src/app/services/items.service';
import { UserServiceService } from '../../services/user-service.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItemDetailed: CartItem[] = [];
  respCart: Cart;
  totalPrice: number;
  userName: string;

  constructor(
    private cartService: CartService,
    private itemService: ItemsService,
    private snackBar: MatSnackBar,
    private userService: UserServiceService,
  ) {}

  ngOnInit(): void {
    this.getItemDetails();
    this.getUserName();
  }

  getItemDetails() {
    this.cartService.cart$.pipe().subscribe((respCart) => {
      this.cartItemDetailed = [];
      this.respCart = respCart;
      respCart.cartItems.forEach((cartItem) => {
        this.itemService.getOneItem(cartItem.item._id).subscribe((item) => {
          this.totalPrice = item.price * cartItem.quantity;
          this.cartItemDetailed.push({
            item: item,
            quantity: cartItem.quantity
          });
        });
      });
    });
  }

  removeItem(index: number, cartItem: CartItem) {
    this.cartService.removeItem(index);

    this.snackBar.open("You deleted " + cartItem.item.name + " from the cart", "OK", {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }
  proceedToPayment() {
    const cartItems = this.cartService.getCartItems();
  
    if (cartItems.length === 0) {
      this.snackBar.open("Cart is empty. Please add items to the cart.", "OK", {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
      return;
    }
  
    // Send the cart items to the backend API for payment processing
    // Here, you can make an HTTP request to your backend API with the cart items
    // and handle the payment logic on the server side.
  
    // Once the payment is successful, you can empty the cart by resetting it.
    this.cartService.resetCart();
  
    // Show a success message to the user
    this.snackBar.open("Payment successful!", "OK", {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
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
    }
    else{
      this.userName='guest';
    }
  }
  
  
}









