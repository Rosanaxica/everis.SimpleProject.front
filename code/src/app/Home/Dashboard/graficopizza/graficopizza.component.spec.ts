import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficopizzaComponent } from './graficopizza.component';

describe('GraficopizzaComponent', () => {
  let component: GraficopizzaComponent;
  let fixture: ComponentFixture<GraficopizzaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficopizzaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficopizzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
