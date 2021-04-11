import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAwardsComponent } from './register-awards.component';

describe('RegisterAwardsComponent', () => {
  let component: RegisterAwardsComponent;
  let fixture: ComponentFixture<RegisterAwardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterAwardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterAwardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
