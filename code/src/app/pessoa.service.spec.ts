import { TestBed } from '@angular/core/testing';

import { PessoaService } from './services/pessoa.service';

describe('PessoaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PessoaService = TestBed.get(PessoaService);
    expect(service).toBeTruthy();
  });
});
