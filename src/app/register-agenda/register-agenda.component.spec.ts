import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAgendaComponent } from './register-agenda.component';

describe('RegisterAgendaComponent', () => {
  let component: RegisterAgendaComponent;
  let fixture: ComponentFixture<RegisterAgendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterAgendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
