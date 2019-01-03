import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoEsforcoProjetoComponent } from './novo-esforco-projeto.component';

describe('NovoEsforcoProjetoComponent', () => {
  let component: NovoEsforcoProjetoComponent;
  let fixture: ComponentFixture<NovoEsforcoProjetoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovoEsforcoProjetoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoEsforcoProjetoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
