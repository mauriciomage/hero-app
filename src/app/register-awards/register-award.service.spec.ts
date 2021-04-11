import { TestBed } from '@angular/core/testing';

import { RegisterAwardService } from './register-award.service';

describe('RegisterAwardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegisterAwardService = TestBed.get(RegisterAwardService);
    expect(service).toBeTruthy();
  });
});
