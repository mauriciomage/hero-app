import { TestBed } from '@angular/core/testing';

import { RegisterStadiumService } from './register-stadium.service';

describe('RegisterStadiumService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegisterStadiumService = TestBed.get(RegisterStadiumService);
    expect(service).toBeTruthy();
  });
});
