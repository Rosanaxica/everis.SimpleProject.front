import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroColaboradorComponent } from './cadastro-colaborador.component';

describe('CadastroColaboradorComponent', () => {
  let component: CadastroColaboradorComponent;
  let fixture: ComponentFixture<CadastroColaboradorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroColaboradorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroColaboradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
