// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { Cart } from 'src/app/models/cart';
// import { CartService } from 'src/app/services/cart.service';

// @Component({
//   selector: 'app-header',
//   templateUrl: './header.component.html',
//   styleUrls: ['./header.component.css']
// })
// export class HeaderComponent implements OnInit {

//   cartCount = 0;
//   userIsAdmin:boolean = false;

//   constructor(private cartService : CartService) { }

//   ngOnInit(): void {
//     this.cartService.cart$.subscribe(
//       (cart)=>{
//         this.cartCount = cart?.cartItems.length ?? 0
//       }
//     )
//   }

//   getLoggedStatus(){
//     if(localStorage.getItem('user') !== null){
//       return true
//     }else {
//       return false
//     }
//   }

//   ngDoCheck(){
//     this.userIsAdmin = JSON.parse(localStorage.getItem('userAdmin'));
//   }


//   logout(){
//     const initialCart = {
//       cartItems: [],
//       user:{}
//     };
//   const initialCartJson = JSON.stringify(initialCart);
//   localStorage.setItem('cart', initialCartJson);

//   const cartJsonString : string = localStorage.getItem('cart');
//   const cart : Cart = JSON.parse(cartJsonString);
//   this.cartService.cart$.next(cart);

//   localStorage.removeItem('user');

//   localStorage.setItem('userAdmin', JSON.stringify(false));
    
//   }
//   toggleMenu() {
//     const menuContainer = document.querySelector('.menu-container');
//     menuContainer.classList.toggle('show');
//   }
  

// }




// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { Cart } from 'src/app/models/cart';
// import { CartService } from '../../services/cart.service';
// import { UserServiceService } from '../../services/user-service.service';
// import { User } from 'src/app/models/user';
// @Component({
//   selector: 'app-header',
//   templateUrl: './header.component.html',
//   styleUrls: ['./header.component.css']
// })
// export class HeaderComponent implements OnInit {
//   cartCount = 0;
//   userIsAdmin: boolean = false;
//   userName: string;

//   constructor(
//     private cartService: CartService,
//     private userService: UserServiceService,
//   ) {}

//   ngOnInit(): void {
//     this.cartService.cart$.subscribe((cart) => {
//       this.cartCount = cart?.cartItems.length ?? 0;
//     });

//     this.getUserName();
//   }

//   getLoggedStatus(): boolean {
//     return localStorage.getItem('user') !== null;
//   }

//   ngDoCheck(): void {
//     this.userIsAdmin = JSON.parse(localStorage.getItem('userAdmin'));
//   }

//   logout(): void {
//     const initialCart = {
//       cartItems: [],
//       user: {}
//     };
//     const initialCartJson = JSON.stringify(initialCart);
//     localStorage.setItem('cart', initialCartJson);
  
//     const cartJsonString: string = localStorage.getItem('cart');
//     const cart: Cart = JSON.parse(cartJsonString);
//     this.cartService.cart$.next(cart);
  
//     localStorage.removeItem('user');
//     localStorage.removeItem('userName'); // Add this line to remove the username
  
//     localStorage.setItem('userAdmin', JSON.stringify(false));
//   }
  

//   toggleMenu(): void {
//     const menuContainer = document.querySelector('.menu-container');
//     menuContainer.classList.toggle('show');
//   }

//   // getUserName(): void {
//   //   const userId = localStorage.getItem('user');
//   //   if (userId) {
//   //     this.userService.getOneUser(userId).subscribe(
//   //       (user) => {
//   //         this.userName = user.name;
//   //       },
//   //       (error) => {
//   //         console.log('Error retrieving user name:', error);
//   //       }
//   //     );
//   //   }
//   //   console.log(this.userName);
//   // }

//   // getUserName(): void {
//   //   const userId = localStorage.getItem('user');
//   //   if (userId) {
//   //     this.userService.getOneUser(userId).subscribe(
//   //       (user) => {
//   //         this.userName = user.name;
//   //         console.log(this.userName); // Move the console.log statement here
//   //       },
//   //       (error) => {
//   //         console.log('Error retrieving user name:', error);
//   //       }
//   //     );
//   //   }
//   // }

//   getUserName(): void {
//     const userId = localStorage.getItem('user');
//     if (userId) {
//       this.userService.getOneUser(userId).subscribe(
//         (user) => {
//           this.userName = user.name;
//           localStorage.setItem('userName', this.userName); // Save the username in local storage
//         },
//         (error) => {
//           console.log('Error retrieving user name:', error);
//         }
//       );
//     } else {
//       this.userName = localStorage.getItem('userName'); // Retrieve the username from local storage
//     }
//   }
  

  
// }




// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { Cart } from 'src/app/models/cart';
// import { CartService } from '../../services/cart.service';
// import { UserServiceService } from '../../services/user-service.service';
// import { User } from 'src/app/models/user';

// @Component({
//   selector: 'app-header',
//   templateUrl: './header.component.html',
//   styleUrls: ['./header.component.css']
// })
// export class HeaderComponent implements OnInit {
//   cartCount = 0;
//   userIsAdmin: boolean = false;
//   userName: string;
//   userLoggedIn: boolean = false; // Update this line

//   constructor(
//     private cartService: CartService,
//     private userService: UserServiceService,
//   ) {}

//   ngOnInit(): void {
//     this.cartService.cart$.subscribe((cart) => {
//       this.cartCount = cart?.cartItems.length ?? 0;
//     });

//     this.getUserName();

//     // Subscribe to userLoggedIn$ instead of userLoggedIn
//     this.userService.userLoggedIn$.subscribe((isLoggedIn) => {
//       this.userLoggedIn = isLoggedIn;
//       if (isLoggedIn) {
//         this.getUserName();
//       }
//     });
//   }

//   getLoggedStatus(): boolean {
//     return localStorage.getItem('user') !== null;
//   }

//   ngDoCheck(): void {
//     this.userIsAdmin = JSON.parse(localStorage.getItem('userAdmin'));
//   }

//   logout(): void {
//     const initialCart = {
//       cartItems: [],
//       user: {}
//     };
//     const initialCartJson = JSON.stringify(initialCart);
//     localStorage.setItem('cart', initialCartJson);
  
//     const cartJsonString: string = localStorage.getItem('cart');
//     const cart: Cart = JSON.parse(cartJsonString);
//     this.cartService.cart$.next(cart);
  
//     localStorage.removeItem('user');
//     localStorage.removeItem('userName');
  
//     localStorage.setItem('userAdmin', JSON.stringify(false));

//     this.userService.logout(); // Add this line to trigger logout in the service
//   }

//   toggleMenu(): void {
//     const menuContainer = document.querySelector('.menu-container');
//     menuContainer.classList.toggle('show');
//   }

//   getUserName(): void {
//     const userId = localStorage.getItem('user');
//     if (userId) {
//       this.userService.getOneUser(userId).subscribe(
//         (user) => {
//           this.userName = user.name;
//         },
//         (error) => {
//           console.log('Error retrieving user name:', error);
//         }
//       );
//     }
//   }
// }










import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/models/cart';
import { CartService } from '../../services/cart.service';
import { UserServiceService } from '../../services/user-service.service';
import { User } from 'src/app/models/user';
import { MatDialog } from '@angular/material/dialog';
import { UserInfoDialogComponent } from 'src/app/dialogs/user-info-dialog/user-info-dialog.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cartCount = 0;
  userIsAdmin: boolean = false;
  userName: string;
  userEmail: string;
  userAddress:string;
  userLoggedIn: boolean = false; // Update this line

  constructor(
    private cartService: CartService,
    private userService: UserServiceService,
    public dialog:MatDialog
  ) {}
  

  ngOnInit(): void {
    this.cartService.cart$.subscribe((cart) => {
      this.cartCount = cart?.cartItems.length ?? 0;
    });

    this.getUserName();

    // Subscribe to userLoggedIn$ instead of userLoggedIn
    this.userService.userLoggedIn$.subscribe((isLoggedIn) => {
      this.userLoggedIn = isLoggedIn;
      if (isLoggedIn) {
        this.getUserName();
      }
    });
  }
  

  getLoggedStatus(): boolean {
    return localStorage.getItem('user') !== null;
  }

  ngDoCheck(): void {
    this.userIsAdmin = JSON.parse(localStorage.getItem('userAdmin'));
  }

  logout(): void {
    const initialCart = {
      cartItems: [],
      user: {}
    };
    const initialCartJson = JSON.stringify(initialCart);
    localStorage.setItem('cart', initialCartJson);
  
    const cartJsonString: string = localStorage.getItem('cart');
    const cart: Cart = JSON.parse(cartJsonString);
    this.cartService.cart$.next(cart);
  
    localStorage.removeItem('user');
    localStorage.removeItem('userName');
  
    localStorage.setItem('userAdmin', JSON.stringify(false));

    this.userService.logout(); // Add this line to trigger logout in the service
  }

  toggleMenu(): void {
    const menuContainer = document.querySelector('.menu-container');
    menuContainer.classList.toggle('show');
  }

  getUserName(): void {
    const userId = localStorage.getItem('user');
    if (userId) {
      this.userService.getOneUser(userId).subscribe(
        (user) => {
          this.userName = user.name;
          this.userEmail=user.email;
          this.userAddress=user.address;
        },
        (error) => {
          console.log('Error retrieving user name:', error);
        }
      );
    }
  }


  // openUserProfileModal(user: User) {
  //   const dialogRef = this.dialog.open(UserInfoDialogComponent, {
  //     width: '300px',
  //     data: { name:user?.name },
  //   });
  
  //   dialogRef.afterClosed().subscribe((result: boolean) => {
  //     // Handle any actions after the modal is closed
  //   });
  // }
  


  // openUserProfileModal(user: User) {
  //   const dialogRef = this.dialog.open(UserInfoDialogComponent, {
  //     width: '300px',
  //     data: { user },
  //   });
  
  //   dialogRef.afterClosed().subscribe((result: boolean) => {
  //     // Handle any actions after the modal is closed
  //   });
  // }
  

  // openUserProfileModal(user: User) {
  //   const dialogRef = this.dialog.open(UserInfoDialogComponent, {
  //     width: '300px',
  //     data: { name: user?.name }, // Pass the name property as data
  //   });
  
  //   dialogRef.afterClosed().subscribe((result: boolean) => {
  //     // Handle any actions after the modal is closed
  //   });
  // }
  
  openUserProfileModal(): void {
    const dialogRef = this.dialog.open(UserInfoDialogComponent, {
      width: '300px',
      data: { 
        name: this.userName,
        email: this.userEmail,
        address: this.userAddress
      } 
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      // Handle any actions after the modal is closed
    });
  }


}
