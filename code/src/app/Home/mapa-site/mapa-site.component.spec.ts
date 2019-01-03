import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaSiteComponent } from './mapa-site.component';

describe('MapaSiteComponent', () => {
  let component: MapaSiteComponent;
  let fixture: ComponentFixture<MapaSiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapaSiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
