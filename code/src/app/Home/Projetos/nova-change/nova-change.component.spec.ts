import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaChangeComponent } from './nova-change.component';

describe('NovaChangeComponent', () => {
  let component: NovaChangeComponent;
  let fixture: ComponentFixture<NovaChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovaChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
