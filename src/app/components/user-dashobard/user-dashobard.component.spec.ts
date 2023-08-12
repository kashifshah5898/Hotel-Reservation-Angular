import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashobardComponent } from './user-dashobard.component';

describe('UserDashobardComponent', () => {
  let component: UserDashobardComponent;
  let fixture: ComponentFixture<UserDashobardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDashobardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDashobardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
