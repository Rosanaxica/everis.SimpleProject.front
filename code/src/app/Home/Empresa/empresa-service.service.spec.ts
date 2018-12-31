import { TestBed } from '@angular/core/testing';

import { EmpresaServiceService } from './empresa-service.service';

describe('EmpresaServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmpresaServiceService = TestBed.get(EmpresaServiceService);
    expect(service).toBeTruthy();
  });
});
