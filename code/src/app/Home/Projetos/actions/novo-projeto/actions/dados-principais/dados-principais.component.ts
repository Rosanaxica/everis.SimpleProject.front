import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '../../../../../../../../node_modules/@angular/forms';
import { Router } from '@angular/router';
import { Projeto } from '../../../../../../_models/projeto.model';
import { GenericService } from '../../../../../../_services/generic.service';
import { Empresa } from '../../../../../../_models/empresa.model';


@Component({
  selector: 'app-dados-principais',
  templateUrl: './dados-principais.component.html',
  styleUrls: ['./dados-principais.component.css']
})
export class DadosPrincipaisComponent implements OnInit {
  projeto: Projeto;

  constructor(private formBuilder: FormBuilder, private svc: GenericService,
    private router: Router) { }
  dadosPrincipaisForm: FormGroup;
  empresas: Empresa[] = [];

  ngOnInit() {
    this.projeto = new Projeto();
    this.filtrar();
    this.gerarFormProjeto();
  }

  gerarFormProjeto(objProjeto?: Projeto) {

    objProjeto = objProjeto || new Projeto();

    this.dadosPrincipaisForm = this.formBuilder.group(
      {
        'nomeProjeto': [objProjeto.nome, Validators.required],
        'centroCusto': [objProjeto.centroCusto, Validators.required],
        'empresaId': [objProjeto.empresaId, Validators.required],
        'dataInicio': [objProjeto.dataInicio, Validators.required],
        'dataPrevista': [objProjeto.dataPrevista, Validators.required],
        'qtdHorasServico1': [objProjeto.qtdHorasServico1],
        'qtdHorasServico2': [objProjeto.qtdHorasServico2],
        'qtdHorasServico3': [objProjeto.qtdHorasServico3],
        'escopoProjeto': [objProjeto.escopoProjeto, Validators.required],
        'foraEscopoProjeto': [objProjeto.foraEscopoProjeto, Validators.required],
        'premissas': [objProjeto.premissas, Validators.required]
      }
    );
  }


  private obterDadosForm() {
    let values = this.dadosPrincipaisForm.value;
    this.projeto.nome = values.nomeProjeto;
    this.projeto.centroCusto = values.centroCusto;
    this.projeto.empresaId = values.empresaId;
    this.projeto.dataInicio = values.dataInicio;
    this.projeto.dataPrevista = values.dataPrevista;
    this.projeto.qtdHorasServico1 = values.qtdHorasServico1 ? values.qtdHorasServico1.split(':')[0] : 0;
    this.projeto.qtdHorasServico2 = values.qtdHorasServico2 ? values.qtdHorasServico2.split(':')[0] : 0;
    this.projeto.qtdHorasServico3 = values.qtdHorasServico3 ? values.qtdHorasServico3.split(':')[0] : 0;
    this.projeto.escopoProjeto = values.escopoProjeto;
    this.projeto.foraEscopoProjeto = values.foraEscopoProjeto;
    this.projeto.premissas = values.premissas;
  }

  private carregarDadosForm() {
    let values = this.dadosPrincipaisForm.value;
    values.nomeProjeto = this.projeto.nome;
    values.centroCusto = this.projeto.centroCusto;
    values.empresaId = this.projeto.empresaId;
    values.dataInicio = this.projeto.dataInicio;
    values.dataPrevista = this.projeto.dataPrevista;
    values.qtdHorasServico1 = this.projeto.qtdHorasServico1 + ":00";
    values.qtdHorasServico2 = this.projeto.qtdHorasServico2 + ":00";
    values.qtdHorasServico3 = this.projeto.qtdHorasServico3 + ":00";
    values.escopoProjeto = this.projeto.escopoProjeto;
    values.foraEscopoProjeto = this.projeto.foraEscopoProjeto;
    values.premissas = this.projeto.premissas;
  }

  Adicionar() {
    this.obterDadosForm();
    this.svc.salvar(this.projeto, Projeto)
      .toPromise().then((data: any) => {
        switch (data.codigo) {
          case 200:
            window.alert('Projeto adicionado com sucesso!');
            break;
          default:
            window.alert('erro: ' + data.mensagem);
            break;
        }
      },
        error => {
          alert('Erro ao tentar adicionar.');
        });
  }

  cancelar() {
    this.router.navigate(['/template/projetos/']);
  }


  formEstaValido() {
    let valido = this.dadosPrincipaisForm.valid;
    return valido;
  }

  filtrar() {
    this.svc.listar(Empresa).toPromise().then(
      s => {
        if (s.sucesso) {
          if (s.data != null && s.data !== undefined) {
            this.empresas = s.data;
          }
        }
      }
    );
  }
}
