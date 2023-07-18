import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/models/cart';
import { CartService } from '../../services/cart.service';
import { UserServiceService } from '../../services/user-service.service';
import { User } from 'src/app/models/user';
import { MatDialog } from '@angular/material/dialog';
import { UserInfoDialogComponent } from 'src/app/dialogs/user-info-dialog/user-info-dialog.component';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  cartCount = 0;
  userIsAdmin: boolean = false;
  userName: string;
  userEmail: string;
  userAddress: string;
  userLoggedIn: boolean = false;
  id: string;
  private unsubscribe$ = new Subject<void>(); //  This line declares a private variable unsubscribe$ of type Subject<void>, which will be used to unsubscribe from observables when the component is destroyed.

  constructor(
    private cartService: CartService,
    private userService: UserServiceService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe((cart) => {
      this.cartCount = cart?.cartItems.length ?? 0;
    });
    this.userService.userUpdated$.subscribe(() => {
      this.getUserName();
    });

    this.userService.userLoggedIn$
      .pipe(takeUntil(this.unsubscribe$)) //  This line declares a private variable unsubscribe$ of type Subject<void>, which will be used to unsubscribe from observables when the component is destroyed.
      .subscribe((isLoggedIn) => {
        this.userLoggedIn = isLoggedIn;
        if (isLoggedIn) {
          this.getUserName();
          this.getAdminStatus();
        } else {
          this.clearUserData();
          this.userIsAdmin = false;
        }
      });

    this.userService.userUpdated$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.getUserName();
      });

    this.getUserName();
    this.getAdminStatus();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getLoggedStatus(): boolean {
    return this.userService.isLoggedIn();
  }

  ngDoCheck(): void {
    this.userIsAdmin = this.userService.isAdmin();
  }

  getUserName(): void {
    const userId = localStorage.getItem('user');
    if (userId) {
      this.userService.getOneUser(userId).subscribe(
        (user) => {
          this.userName = user.name;
          this.userEmail = user.email;
          this.userAddress = user.address;
          this.id = user._id;
        },
        (error) => {
          console.log('Error retrieving user name:', error);
        }
      );
    }
  }

  getAdminStatus(): void {
    this.userIsAdmin = this.userService.isAdmin();
  }

  logout(): void {
    this.userService.logout();
  }

  clearUserData(): void {
    this.userName = '';
    this.userEmail = '';
    this.userAddress = '';
    this.id = '';
  }

  openUserProfileModal(): void {
    const dialogRef = this.dialog.open(UserInfoDialogComponent, {
      width: '300px',
      data: {
        name: this.userName,
        email: this.userEmail,
        address: this.userAddress,
        _id: this.id
      }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      // Handle any actions after the modal is closed
    });
  }
}
