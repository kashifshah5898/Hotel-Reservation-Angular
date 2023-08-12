import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashobardComponent } from './admin-dashobard.component';

describe('AdminDashobardComponent', () => {
  let component: AdminDashobardComponent;
  let fixture: ComponentFixture<AdminDashobardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDashobardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDashobardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
