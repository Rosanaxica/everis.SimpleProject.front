import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtribuicaoEquipeComponent } from './atribuicao-equipe.component';

describe('AtribuicaoEquipeComponent', () => {
  let component: AtribuicaoEquipeComponent;
  let fixture: ComponentFixture<AtribuicaoEquipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtribuicaoEquipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtribuicaoEquipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
