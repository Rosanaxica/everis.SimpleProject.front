import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FechamentoProjetoComponent } from './fechamento-projeto.component';

describe('FechamentoProjetoComponent', () => {
  let component: FechamentoProjetoComponent;
  let fixture: ComponentFixture<FechamentoProjetoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FechamentoProjetoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FechamentoProjetoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
