import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '../../../../../../../../node_modules/@angular/forms';
import { Router } from '@angular/router';
import { Projeto } from '../../../../../../_models/projeto.model';
import { GenericService } from '../../../../../../_services/generic.service';
import { Empresa } from '../../../../../../_models/empresa.model';
import { Status } from '../../../../../../_models/status.model';
import { Sigla } from 'src/app/_models/sigla.model';
import { Diretoria } from 'src/app/_models/diretoria.model';
import { Tecnologia } from 'src/app/_models/tecnologia.model';
import { Superintendencia } from 'src/app/_models/superintendencia.model';


@Component({
  selector: 'app-dados-principais',
  templateUrl: './dados-principais.component.html',
  styleUrls: ['./dados-principais.component.css']
})
export class DadosPrincipaisComponent implements OnInit {
  projeto: Projeto;
  @Output() getProjeto = new EventEmitter<string>();

  constructor(private formBuilder: FormBuilder, private svc: GenericService,
    private router: Router) { }
  dadosPrincipaisForm: FormGroup;
  empresas: Empresa[] = [{ id: 0, nome: 'Selecione' } as Empresa];
  status: Status[] = [];
  sigla: Sigla[] = [];
  diretoria: Diretoria[] = [];
  superintendencia: Superintendencia[] = [];
  tecnologia: Tecnologia[] = [];

  

  ngOnInit() {
    this.projeto = new Projeto();
    this.filtrar();
    
    this.gerarFormProjeto();
  }
  OpenView(projeto: Projeto) {
    this.projeto = projeto;
    this.carregarDadosForm();
  }
  gerarFormProjeto(objProjeto?: Projeto) {

    objProjeto = objProjeto || new Projeto();

    this.dadosPrincipaisForm = this.formBuilder.group(
      {
        'nomeProjeto': [objProjeto.nome, Validators.required],
        'codProjeto': [objProjeto.codigoProjeto, Validators.required],
        'ext': [objProjeto.ext, Validators.required],
        'empresaId': [objProjeto.empresaId, Validators.required],
        'dataInicio': [objProjeto.dataInicio, Validators.required],
        'dataRecebida': [objProjeto.dataRecebida, Validators.required],
        'dataPrevista': [objProjeto.dataPrevista, Validators.required],
        'dataProposta': [objProjeto.dataPrevista, Validators.required],
        'duracao': [objProjeto.duracao, Validators.required],
        'tecnologiaId': [objProjeto.tecnologiaId, Validators.required],
        'siglaId': [objProjeto.siglaId, Validators.required],
        'diretoriaId': [objProjeto.diretoriaId, Validators.required],
        'superintendenciaId': [objProjeto.superintendenciaId, Validators.required],
        'qtdHorasServico1': [objProjeto.qtdHorasServico1],
        'qtdHorasServico2': [objProjeto.qtdHorasServico2],
        'qtdHorasServico3': [objProjeto.qtdHorasServico3],
        'escopoProjeto': [objProjeto.escopoProjeto, Validators.required],
        'foraEscopoProjeto': [objProjeto.foraEscopoProjeto, Validators.required],
        'premissas': [objProjeto.premissas, Validators.required],
        'tipoDemanda': [objProjeto.tipoDemanda, Validators.required],
        'tamanho': [objProjeto.tamanho, Validators.required],
        'statusProjetoId': [objProjeto.statusId, Validators.required],
        'statusProposta': [objProjeto.statusProposta, Validators.required],
        'tarifa': [objProjeto.tarifa, Validators.required]
      }
    );
  }


  private obterDadosForm() {
    let values = this.dadosPrincipaisForm.value;
    this.projeto.nome = values.nomeProjeto;
    this.projeto.empresaId = values.empresaId;
    this.projeto.dataInicio = values.dataInicio;
    this.projeto.dataPrevista = values.dataPrevista;
    this.projeto.qtdHorasServico1 = values.qtdHorasServico1;
    this.projeto.qtdHorasServico2 = values.qtdHorasServico2;
    this.projeto.qtdHorasServico3 = values.qtdHorasServico3;
    this.projeto.escopoProjeto = values.escopoProjeto;
    this.projeto.foraEscopoProjeto = values.foraEscopoProjeto;
    this.projeto.premissas = values.premissas;
    this.projeto.statusId = values.statusProjetoId;
    this.projeto.superintendenciaId = values.superintendenciaId;
    this.projeto.diretoriaId = values.diretoriaId;
    this.projeto.siglaId = values.siglaId;
    this.projeto.tipoDemanda = values.tipoDemanda;
    this.projeto.tamanho = values.tamanho;
    this.projeto.tecnologiaId = values.tecnologiaId;
    this.projeto.ext = values.ext;
    this.projeto.dataProposta = values.dataProposta;
    this.projeto.dataRecebida = values.dataRecebida;
    this.projeto.duracao = values.duracao;
    this.projeto.statusProposta = values.statusProposta;
    this.projeto.codigoProjeto = values.codProjeto;
    this.projeto.tarifa = values.tarifa;
  }

  private carregarDadosForm() {
    this.dadosPrincipaisForm.get("nomeProjeto").setValue(this.projeto.nome);
    this.dadosPrincipaisForm.get("empresaId").setValue(this.projeto.empresaId);
    this.dadosPrincipaisForm.get("dataInicio").setValue(this.projeto.dataInicio);
    this.dadosPrincipaisForm.get("dataPrevista").setValue(this.projeto.dataPrevista);
    this.dadosPrincipaisForm.get("qtdHorasServico1").setValue(this.projeto.qtdHorasServico1);
    this.dadosPrincipaisForm.get("qtdHorasServico2").setValue(this.projeto.qtdHorasServico2);
    this.dadosPrincipaisForm.get("qtdHorasServico3").setValue(this.projeto.qtdHorasServico3);
    this.dadosPrincipaisForm.get("escopoProjeto").setValue(this.projeto.escopoProjeto);
    this.dadosPrincipaisForm.get("foraEscopoProjeto").setValue(this.projeto.foraEscopoProjeto);
    this.dadosPrincipaisForm.get("premissas").setValue(this.projeto.premissas);
    this.dadosPrincipaisForm.get("statusProjetoId").setValue(this.projeto.statusId);
    this.dadosPrincipaisForm.get("superintendenciaId").setValue(this.projeto.superintendenciaId);
    this.dadosPrincipaisForm.get("diretoriaId").setValue(this.projeto.diretoriaId);
    this.dadosPrincipaisForm.get("siglaId").setValue(this.projeto.siglaId);
    this.dadosPrincipaisForm.get("tipoDemanda").setValue(this.projeto.tipoDemanda);
    this.dadosPrincipaisForm.get("tamanho").setValue(this.projeto.tamanho);
    this.dadosPrincipaisForm.get("tecnologiaId").setValue(this.projeto.tecnologiaId);
    this.dadosPrincipaisForm.get("ext").setValue(this.projeto.ext);
    this.dadosPrincipaisForm.get("dataProposta").setValue(this.projeto.dataProposta);
    this.dadosPrincipaisForm.get("codProjeto").setValue(this.projeto.codigoProjeto);
    this.dadosPrincipaisForm.get("statusProposta").setValue(this.projeto.statusProposta);
    this.dadosPrincipaisForm.get("duracao").setValue(this.projeto.duracao);
    this.dadosPrincipaisForm.get("dataRecebida").setValue(this.projeto.dataRecebida);
    this.dadosPrincipaisForm.get("tarifa").setValue(this.projeto.tarifa);
  }

  Adicionar() {
    this.obterDadosForm();
    if (this.projeto.id > 0) {
      this.svc.salvar(this.projeto, Projeto)
        .toPromise().then((data: any) => {
          switch (data.codigo) {
            case 200:
              window.alert('Projeto adicionado com sucesso!');
              this.getProjeto.emit(JSON.stringify(this.projeto));
              break;
            default:
              window.alert('erro: ' + data.mensagem);
              break;
          }
        },
          error => {
            alert('Erro ao tentar adicionar.');
          });
    } else {
      this.getProjeto.emit(JSON.stringify(this.projeto));
    }
  }

  cancelar() {
    this.router.navigate(['/projetos/']);
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
            this.empresas.unshift({ id: 0, nome: 'Selecione' } as Empresa);
          }
        }
      }
    );

    this.svc.listar(Tecnologia, null, "ObterTodos").toPromise().then(
      s => {
        if (s.sucesso) {
          if (s.data != null && s.data !== undefined) {
            this.tecnologia = s.data;
          }
        }
      }
    );

    this.svc.listar(Diretoria, null, "ObterTodos").toPromise().then(
      s => {
        if (s.sucesso) {
          if (s.data != null && s.data !== undefined) {
            this.diretoria = s.data;
            console.log(this.diretoria)
            console.log("Data: " + s);
          }
        }
      }
    );

    this.svc.listar(Sigla, null, "ObterTodos").toPromise().then(
      s => {
        if (s.sucesso) {
          if (s.data != null && s.data !== undefined) {
            this.sigla = s.data;
          }
        }
      }
    );

    

    

    this.svc.listar(Superintendencia, null, "ObterTodos").toPromise().then(
      s => {
        if (s.sucesso) {
          if (s.data != null && s.data !== undefined) {
            this.superintendencia = s.data;
          }
        }
      }
    );
    this.svc.listar(Status, null, "ObterTodos").toPromise().then(
      s => {
        if (s.sucesso) {
          if (s.data != null && s.data !== undefined) {
            this.status = s.data;
          }
        }
      }
    );
  }
}
