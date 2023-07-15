import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroundZeroComponent } from './ground-zero.component';

describe('GroundZeroComponent', () => {
  let component: GroundZeroComponent;
  let fixture: ComponentFixture<GroundZeroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroundZeroComponent]
    });
    fixture = TestBed.createComponent(GroundZeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
