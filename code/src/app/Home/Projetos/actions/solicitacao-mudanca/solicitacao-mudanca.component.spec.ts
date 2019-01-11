import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitacaoMudancaComponent } from './solicitacao-mudanca.component';

describe('ChangesComponent', () => {
  let component: SolicitacaoMudancaComponent;
  let fixture: ComponentFixture<SolicitacaoMudancaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SolicitacaoMudancaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitacaoMudancaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
