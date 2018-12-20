import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsforcoProjetoComponent } from './esforco-projeto.component';

describe('EsforcoProjetoComponent', () => {
  let component: EsforcoProjetoComponent;
  let fixture: ComponentFixture<EsforcoProjetoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsforcoProjetoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsforcoProjetoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
