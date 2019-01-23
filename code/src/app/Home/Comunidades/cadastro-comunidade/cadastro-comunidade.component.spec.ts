import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroComunidadeComponent } from './cadastro-comunidade.component';

describe('CadastroComunidadeComponent', () => {
  let component: CadastroComunidadeComponent;
  let fixture: ComponentFixture<CadastroComunidadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroComunidadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroComunidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
