import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaSolicitacaoMudanca } from './nova-solicitacao-mudanca.component';

describe('NovaChangeComponent', () => {
  let component: NovaSolicitacaoMudanca;
  let fixture: ComponentFixture<NovaSolicitacaoMudanca>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NovaSolicitacaoMudanca]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaSolicitacaoMudanca);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
