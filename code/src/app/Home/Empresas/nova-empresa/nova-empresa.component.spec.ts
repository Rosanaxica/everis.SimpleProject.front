import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaEmpresaComponent } from './nova-empresa.component';

describe('NovaEmpresaComponent', () => {
  let component: NovaEmpresaComponent;
  let fixture: ComponentFixture<NovaEmpresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovaEmpresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
