import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HourComponent } from './hour.component';

describe('HourComponent', () => {
  let component: HourComponent;
  let fixture: ComponentFixture<HourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
