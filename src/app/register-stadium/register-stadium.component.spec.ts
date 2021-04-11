import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterStadiumComponent } from './register-stadium.component';

describe('RegisterStadiumComponent', () => {
  let component: RegisterStadiumComponent;
  let fixture: ComponentFixture<RegisterStadiumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterStadiumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterStadiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
