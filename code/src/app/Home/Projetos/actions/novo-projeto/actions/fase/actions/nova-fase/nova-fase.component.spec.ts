import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaFaseComponent } from './nova-fase.component';

describe('NovaFaseComponent', () => {
  let component: NovaFaseComponent;
  let fixture: ComponentFixture<NovaFaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovaFaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaFaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
