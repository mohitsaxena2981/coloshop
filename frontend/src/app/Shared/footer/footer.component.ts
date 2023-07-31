import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
  openAboutPage(): void {
    this.router.navigate(['/about']);
    window.scrollTo(0, 0);
  }

  openContactPage(): void {
    this.router.navigate(['/contact']);
    window.scrollTo(0, 0);
  }

  openPolicyPage(): void {
    this.router.navigate(['/policy']);
    window.scrollTo(0, 0);
  }
}
