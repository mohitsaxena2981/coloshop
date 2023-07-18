import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-carousal',
  templateUrl: './carousal.component.html',
  styleUrls: ['./carousal.component.css']
})
export class CarousalComponent implements OnInit, OnDestroy {
  images = [
    'assets/images/diwali.jpg',
    'assets/images/holi.jpg',
    'assets/images/christmas.jpg',
    // Add more image URLs here
  ];
  currentImageIndex = 0;
  intervalId: any;

  ngOnInit(): void {
    this.startAutoRotation();
  }

  ngOnDestroy(): void {
    this.stopAutoRotation();
  }

  startAutoRotation(): void {
    this.intervalId = setInterval(() => {
      this.showNextImage();
    }, 3000); // Set the interval duration (e.g., 3000ms = 3 seconds)
  }

  stopAutoRotation(): void {
    clearInterval(this.intervalId);
  }

  showNextImage(): void {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
  }

  showPrevImage(): void {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
  }
}
