import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-info-dialog',
  templateUrl: './user-info-dialog.component.html',
  styleUrls: ['./user-info-dialog.component.css']
})
export class UserInfoDialogComponent implements OnInit {
  userName: string;
  userEmail: string;
  userAddress: string;
  id: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private dialogRef: MatDialogRef<UserInfoDialogComponent> // Add MatDialogRef
  ) { }

  ngOnInit(): void {
    this.userName = this.data.name;
    this.userEmail = this.data.email;
    this.userAddress = this.data.address;
    this.id = this.data._id;
    console.log(this.data);
  }

  forwardToForm() {
    this.dialogRef.close(); // Close the dialog
    this.router.navigate(['user/profile-edit/' + this.id]);
  }
}
