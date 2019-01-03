import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTelephoneComponent } from './add-telephone.component';

describe('AddTelephoneComponent', () => {
  let component: AddTelephoneComponent;
  let fixture: ComponentFixture<AddTelephoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTelephoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTelephoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
