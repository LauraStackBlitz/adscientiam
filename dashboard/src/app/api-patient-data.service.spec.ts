import { TestBed } from '@angular/core/testing';

import { ApiPatientDataService } from './api-patient-data.service';

describe('ApiPatientDataService', () => {
  let service: ApiPatientDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiPatientDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
