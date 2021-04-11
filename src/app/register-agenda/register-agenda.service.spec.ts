import { TestBed } from '@angular/core/testing';

import { RegisterAgendaService } from './register-agenda.service';

describe('RegisterAgendaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegisterAgendaService = TestBed.get(RegisterAgendaService);
    expect(service).toBeTruthy();
  });
});
