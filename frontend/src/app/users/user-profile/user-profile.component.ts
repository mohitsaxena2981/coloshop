import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';
import { User } from 'src/app/models/user';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: User;
  userId: string; // Add a property to store the userId

  constructor(
    private userService: UserServiceService,
    private router: Router,
    private route: ActivatedRoute // Inject ActivatedRoute to get the userId from the route
  ) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('user'); // Store the userId in the property
    this.getUserProfile();
  }

  getUserProfile(): void {
    if (this.userId) { // Use the stored userId
      this.userService.getOneUser(this.userId).subscribe(
        (user) => {
          this.user = user;
        },
        (error) => {
          console.log('Error retrieving user profile:', error);
        }
      );
    }
  }

  forwardToForm() {
    this.router.navigate(['user/profile-edit', this.userId]); 
  }
  forwardToOrder(){
    this.router.navigate(['cart/user']);
  }

  backToShop() {
    this.router.navigateByUrl('/');
  }
}
