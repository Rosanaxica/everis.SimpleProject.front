import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaseComponent } from './fase.component';

describe('FaseComponent', () => {
  let component: FaseComponent;
  let fixture: ComponentFixture<FaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
