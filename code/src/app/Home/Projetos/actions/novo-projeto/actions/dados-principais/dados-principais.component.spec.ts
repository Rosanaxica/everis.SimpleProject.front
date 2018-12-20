import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosPrincipaisComponent } from './dados-principais.component';

describe('DadosPrincipaisComponent', () => {
  let component: DadosPrincipaisComponent;
  let fixture: ComponentFixture<DadosPrincipaisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DadosPrincipaisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DadosPrincipaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
