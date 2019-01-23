import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroSquadComponent } from './cadastro-squad.component';

describe('CadastroSquadComponent', () => {
  let component: CadastroSquadComponent;
  let fixture: ComponentFixture<CadastroSquadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroSquadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroSquadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
