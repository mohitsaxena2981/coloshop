// import { Component, Inject, OnInit } from '@angular/core';
// import { MAT_DIALOG_DATA } from '@angular/material/dialog';

// @Component({
//   selector: 'app-user-info-dialog',
//   templateUrl: './user-info-dialog.component.html',
//   styleUrls: ['./user-info-dialog.component.css']
// })
// export class UserInfoDialogComponent implements OnInit {

//   constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

//   ngOnInit(): void {
//   }

// }



// import { Component, Inject, OnInit } from '@angular/core';
// import { MAT_DIALOG_DATA } from '@angular/material/dialog';

// @Component({
//   selector: 'app-user-info-dialog',
//   templateUrl: './user-info-dialog.component.html',
//   styleUrls: ['./user-info-dialog.component.css']
// })
// export class UserInfoDialogComponent implements OnInit {
//   userName: string;

//   constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

//   ngOnInit(): void {
//     this.userName = this.data.name;
//   }
// }



import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-info-dialog',
  templateUrl: './user-info-dialog.component.html',
  styleUrls: ['./user-info-dialog.component.css']
})
export class UserInfoDialogComponent implements OnInit {
  userName: string;
  userEmail: string;
  userAddress: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.userName = this.data.name;
    this.userEmail = this.data.email;
    this.userAddress=this.data.address;
  }
}
