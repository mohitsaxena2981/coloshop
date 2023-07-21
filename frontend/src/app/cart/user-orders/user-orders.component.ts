import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cart, CartItem } from 'src/app/models/cart';
import { CartService } from 'src/app/services/cart.service';
import { ItemsService } from 'src/app/services/items.service';
import { UserServiceService } from '../../services/user-service.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css'],
})
export class UserOrdersComponent implements OnInit {
  userName: string;
  previousOrders: Cart[] = [];
  constructor(
    private cartService: CartService,
    private itemService: ItemsService,
    private snackBar: MatSnackBar,
    private userService: UserServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.getItemDetails();
    this.getUserName();
    this.getPreviousOrders();
  }

  getPreviousOrders() {
    const userId = localStorage.getItem('user');
    if (userId) {
      this.cartService.getPreviousOrders(userId).subscribe(
        (previousOrders) => {
          this.previousOrders = previousOrders;
          console.log(this.previousOrders);
        },
        (error) => {
          console.error(error);
        }
      );
    }
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

  backToShop() {
    this.router.navigateByUrl('/user/profile');
  }
}
