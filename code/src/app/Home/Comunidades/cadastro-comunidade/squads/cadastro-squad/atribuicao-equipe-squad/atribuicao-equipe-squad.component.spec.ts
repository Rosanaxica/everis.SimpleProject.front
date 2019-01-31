import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtribuicaoEquipeSquadComponent } from './atribuicao-equipe-squad.component';

describe('AtribuicaoEquipeSquadComponent', () => {
  let component: AtribuicaoEquipeSquadComponent;
  let fixture: ComponentFixture<AtribuicaoEquipeSquadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtribuicaoEquipeSquadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtribuicaoEquipeSquadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
