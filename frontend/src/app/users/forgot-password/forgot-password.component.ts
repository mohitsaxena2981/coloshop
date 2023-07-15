// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { UserServiceService } from 'src/app/services/user-service.service';
// import { MatSnackBar } from '@angular/material/snack-bar';

// @Component({
//   selector: 'app-forgot-password',
//   templateUrl: './forgot-password.component.html',
//   styleUrls: ['./forgot-password.component.css']
// })
// export class ForgotPasswordComponent implements OnInit {

//   securityQuestionForm!: FormGroup;
//   newPasswordForm!: FormGroup;
//   isSubmitted = false;
//   securityAnswerCorrect = false;
//   resetPassword = false;

//   constructor(
//     private formBuilder: FormBuilder,
//     private userService: UserServiceService,
//     private snackBar: MatSnackBar
//   ) {}

//   ngOnInit(): void {
//     this.initSecurityQuestionForm();
//     this.initNewPasswordForm();
//   }

//   initSecurityQuestionForm(): void {
//     this.securityQuestionForm = this.formBuilder.group({
//       email: ['', [Validators.required, Validators.email]],
//       securityAnswer: ['', Validators.required]
//     });
//   }

//   initNewPasswordForm(): void {
//     this.newPasswordForm = this.formBuilder.group({
//       password: ['', [Validators.required, Validators.minLength(5)]],
//       confirmPassword: ['', Validators.required]
//     });
//   }

//   onSubmitSecurityQuestion(): void {
//     if (this.securityQuestionForm.invalid) {
//       return;
//     }

//     const email = this.securityQuestionForm.get('email').value;
//     const securityAnswer = this.securityQuestionForm.get('securityAnswer').value;

//     this.userService.checkSecurityAnswer(email, securityAnswer).subscribe(
//       (isCorrect) => {
//         if (isCorrect) {
//           this.securityAnswerCorrect = true;
//         } else {
//           this.securityAnswerCorrect = false;
//           this.snackBar.open('Incorrect security answer. Please try again.', 'OK', {
//             horizontalPosition: 'right',
//             verticalPosition: 'top',
//             duration: 4000
//           });
//         }
//         this.isSubmitted = true;
//       },
//       () => {
//         this.securityAnswerCorrect = false;
//         this.isSubmitted = true;
//         this.snackBar.open('Failed to check security answer. Please try again later.', 'OK', {
//           horizontalPosition: 'right',
//           verticalPosition: 'top',
//           duration: 4000
//         });
//       }
//     );
//   }

//   onSubmitNewPassword(): void {
//     if (this.newPasswordForm.invalid) {
//       return;
//     }

//     const email = this.securityQuestionForm.get('email').value;
//     const newPassword = this.newPasswordForm.get('password').value;

//     this.userService.resetPassword(email, newPassword).subscribe(
//       () => {
//         this.resetPassword = true;
//         this.snackBar.open('Password reset successful. Please login with your new password.', 'OK', {
//           horizontalPosition: 'right',
//           verticalPosition: 'top',
//           duration: 4000
//         });
//       },
//       () => {
//         this.resetPassword = false;
//         this.snackBar.open('Failed to reset password. Please try again later.', 'OK', {
//           horizontalPosition: 'right',
//           verticalPosition: 'top',
//           duration: 4000
//         });
//       }
//     );
//   }

// }









import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from 'src/app/services/user-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm!: FormGroup;
  newPasswordForm!: FormGroup;
  isSubmitted = false;
  emailNotFound = false;
  securityAnswerIncorrect = false;
  resetPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserServiceService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initForgotPasswordForm();
    this.initNewPasswordForm();
  }

  initForgotPasswordForm(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      securityAnswer: ['', Validators.required]
    });
  }

  initNewPasswordForm(): void {
    this.newPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup): null | { passwordMismatch: boolean } {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }




  // onSubmit(): void {
  //   if (this.forgotPasswordForm.invalid) {
  //     return;
  //   }
  
  //   const email = this.forgotPasswordForm.get('email')?.value;
  //   const securityAnswer = this.forgotPasswordForm.get('securityAnswer')?.value;
  
  //   this.userService.checkSecurityAnswer(email, securityAnswer).subscribe(
  //     () => {
  //       this.securityAnswerIncorrect = false;
  //       this.resetPassword = true;
  //       this.isSubmitted = true;
  //     },
  //     () => {
  //       this.securityAnswerIncorrect = true;
  //       this.resetPassword = false;
  //       this.isSubmitted = true;
  //       this.snackBar.open('Failed to check security answer. Please try again later.', 'OK', {
  //         horizontalPosition: 'right',
  //         verticalPosition: 'top',
  //         duration: 4000
  //       });
  //     }
  //   );
  // }

  onSubmit(): void {
    if (this.forgotPasswordForm.invalid) {
      return;
    }
  
    const email = this.forgotPasswordForm.get('email')?.value;
    const securityAnswer = this.forgotPasswordForm.get('securityAnswer')?.value;
  
    this.userService.checkSecurityAnswer(email, securityAnswer).subscribe(
      (isCorrect) => {
        if (isCorrect) {
          this.securityAnswerIncorrect = false;
          this.resetPassword = true;
        } else {
          this.securityAnswerIncorrect = true;
          this.resetPassword = false;
        }
        this.isSubmitted = true;
      },
      () => {
        this.securityAnswerIncorrect = true;
        this.resetPassword = false;
        this.isSubmitted = true;
        this.snackBar.open('Failed to check security answer. Please try again later.', 'OK', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 4000
        });
      }
    );
  }
  
  
  

  onUpdatePassword(): void {
    if (this.newPasswordForm.invalid) {
      return;
    }

    const email = this.forgotPasswordForm.get('email')?.value;
    const newPassword = this.newPasswordForm.get('password')?.value;

    this.userService.resetPassword(email, newPassword).subscribe(
      () => {
        this.resetPassword = true;
        this.snackBar.open('Password reset successful. Please login with your new password.', 'OK', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 4000
        });
      },
      () => {
        this.resetPassword = false;
        this.snackBar.open('Failed to reset password. Please try again later.', 'OK', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 4000
        });
      }
    );
  }

}


