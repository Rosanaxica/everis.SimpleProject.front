import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficolinhaComponent } from './graficolinha.component';

describe('GraficolinhaComponent', () => {
  let component: GraficolinhaComponent;
  let fixture: ComponentFixture<GraficolinhaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficolinhaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficolinhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
