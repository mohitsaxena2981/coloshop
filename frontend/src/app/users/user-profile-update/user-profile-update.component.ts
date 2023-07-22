import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-user-profile-update',
  templateUrl: './user-profile-update.component.html',
  styleUrls: ['./user-profile-update.component.css'],
})
export class UserProfileUpdateComponent implements OnInit {
  userForm!: FormGroup;
  isSubmitted = false;
  editMode = false;
  currentUserId!: string;
  isForgotPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserServiceService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.checkEditMode();
  }
  initForm() {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: [{ value: '', disabled: true }],
      address: ['', Validators.required],
      isAdmin: [''],
    });
  }

  private checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.editMode = true;
        this.currentUserId = params['id'];
        this.userService.getOneUser(params['id']).subscribe((user) => {
          this.userForm.get('name').setValue(user.name);
          this.userForm.get('email').setValue(user.email);
          this.userForm.get('address').setValue(user.address);
          this.userForm.get('isAdmin').setValue(user.isAdmin);
          this.userForm.get('password').setValue(user.password);
        });
      }
    });
  }

  updateUser(user: User) {
    this.userService.updateUser(user, user._id).subscribe(
      (user) => {
        this.snackBar.open(
          user.name + ' Your profile is updated successfully 😄',
          'OK',
          {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration: 4000,
          }
        );
        this.navigateToHomePage();
      },
      (error) => {
        if (error.status === 409) {
          this.snackBar.open('User with this email already exists', 'OK', {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration: 4000,
          });
        }
      }
    );
  }
  onSubmit() {
    this.isSubmitted = true;
    if (this.userForm.invalid) {
      return;
    }

    const user: User = {
      _id: this.currentUserId,
      name: this.userForm.get('name').value,
      email: this.userForm.get('email').value,
      password: this.userForm.get('password').value,
      address: this.userForm.get('address').value,
      isAdmin: this.userForm.get('isAdmin').value,
    };

    if (this.editMode) {
      this.updateUser(user);
    }
  }

  navigateToHomePage() {
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 2000);
  }
}
