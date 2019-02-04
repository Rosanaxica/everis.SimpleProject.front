import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '../../../../../../../../node_modules/@angular/forms';
import { Router } from '@angular/router';
import { Projeto } from '../../../../../../_models/projeto.model';
import { GenericService } from '../../../../../../_services/generic.service';
import { Empresa } from '../../../../../../_models/empresa.model';
import { Status } from '../../../../../../_models/status.model';
import { DateFormatPipe } from '../../../../../../shared/util/date-format-pipe';
import { Tecnologia } from '../../../../../../_models/tecnologia.model';
import { Sigla } from '../../../../../../_models/sigla.model';
import { Superintendencia } from '../../../../../../_models/superintendencia.model';
import { Diretoria } from '../../../../../../_models/diretoria.model';


@Component({
  selector: 'app-dados-principais',
  templateUrl: './dados-principais.component.html',
  styleUrls: ['./dados-principais.component.css']
})
export class DadosPrincipaisComponent implements OnInit {
  projeto: Projeto;
  @Output() getProjeto = new EventEmitter<string>();

  constructor(private formBuilder: FormBuilder, private svc: GenericService,
    private router: Router, private formatDate: DateFormatPipe) { }
  dadosPrincipaisForm: FormGroup;
  empresas: Empresa[] = [{ id: 0, nome: 'Selecione' } as Empresa];
  status: Status[] = [{ id: 0, descricao: 'Selecione' } as Status];
  sigla: Sigla[] = [{ id: 0, descricao: 'Selecione' } as Sigla];
  diretoria: Diretoria[] = [{ id: 0, descricao: 'Selecione' } as Diretoria];
  superintendencia: Superintendencia[] = [{ id: 0, descricao: 'Selecione' } as Superintendencia];
  tecnologia: Tecnologia[] = [{ id: 0, nome: 'Selecione' } as Tecnologia];



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
        'ext': [objProjeto.ext],
        'empresaId': [objProjeto.empresaId, Validators.required],
        'dataInicio': [objProjeto.dataInicio],
        'dataRecebida': [objProjeto.dataRecebida, Validators.required],
        'dataProposta': [objProjeto.dataProposta],
        'dataFinal': [objProjeto.dataFinal],
        'duracao': new FormControl(objProjeto.duracao, {
          validators: Validators.compose([Validators.max(99999), Validators.min(1), Validators.required]),
          updateOn: "change"
        }),
        'qtdHorasServico1': new FormControl(objProjeto.qtdHorasServico1, {
          validators: Validators.compose([Validators.max(9999999999), Validators.min(0)]),
          updateOn: "change"
        }),
        'qtdHorasServico2': new FormControl(objProjeto.qtdHorasServico2, {
          validators: Validators.compose([Validators.max(9999999999), Validators.min(0)]),
          updateOn: "change"
        }),
        'qtdHorasServico3': new FormControl(objProjeto.qtdHorasServico3, {
          validators: Validators.compose([Validators.max(9999999999), Validators.min(0)]),
          updateOn: "change"
        }),
        'tecnologiaId': [objProjeto.tecnologiaId, Validators.required],
        'siglaId': [objProjeto.siglaId, Validators.required],
        'diretoriaId': [objProjeto.diretoriaId, Validators.required],
        'superintendenciaId': [objProjeto.superintendenciaId, Validators.required],
        'escopoProjeto': [objProjeto.escopoProjeto],
        'foraEscopoProjeto': [objProjeto.foraEscopoProjeto],
        'premissas': [objProjeto.premissas],
        'tipoDemanda': [objProjeto.tipoDemanda, Validators.required],
        'tamanho': [objProjeto.tamanho, Validators.required],
        'statusProjetoId': [objProjeto.statusId, Validators.required],
        'statusProposta': [objProjeto.statusProposta],
        'tarifa': new FormControl(objProjeto.tarifa, {
          validators: Validators.compose([Validators.max(999999999), Validators.min(1), Validators.required]),
          updateOn: "change"
        })
      }
    );
  }

   setMaxValue(itemFormControlName) {
    let item = this.dadosPrincipaisForm.get(itemFormControlName);
    if (item.errors && item.errors.max) {
      item.setValue(item.errors.max.max);
      item.updateValueAndValidity();
    }
    if (item.errors && item.errors.min) {
      item.setValue(item.errors.min.min);
      item.updateValueAndValidity();
    }
    return;
  }


   obterDadosForm() {
    let values = this.dadosPrincipaisForm.value;
    this.projeto.nome = values.nomeProjeto;
    this.projeto.empresaId = values.empresaId;
    this.projeto.dataInicio = values.dataInicio;
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
    this.projeto.dataFinal = values.dataFinal;
  };


   carregarDadosForm() {
    this.dadosPrincipaisForm.get("nomeProjeto").setValue(this.projeto.nome);
    this.dadosPrincipaisForm.get("empresaId").setValue(this.projeto.empresaId);
    this.dadosPrincipaisForm.get("dataInicio").setValue(this.formatDate.transform(this.projeto.dataInicio));
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
    this.dadosPrincipaisForm.get("dataProposta").setValue(this.formatDate.transform(this.projeto.dataProposta));
    this.dadosPrincipaisForm.get("codProjeto").setValue(this.projeto.codigoProjeto);
    this.dadosPrincipaisForm.get("statusProposta").setValue(this.projeto.statusProposta);
    this.dadosPrincipaisForm.get("duracao").setValue(this.projeto.duracao);
    this.dadosPrincipaisForm.get("dataRecebida").setValue(this.formatDate.transform(this.projeto.dataRecebida));
    this.dadosPrincipaisForm.get("tarifa").setValue(this.projeto.tarifa);
    this.dadosPrincipaisForm.get("dataFinal").setValue(this.formatDate.transform(this.projeto.dataFinal));
  }


  validaDataRecebida() {
    var dataRecebida = this.dadosPrincipaisForm.get('dataRecebida');
    
    if (dataRecebida.value == null || dataRecebida.value == undefined || dataRecebida.value == '') {
      window.alert("Favor informar uma data de recebida");
      dataRecebida.setErrors({ 'incorrect': true });
      dataRecebida.reset();
      return;
    }
  }

  validaDataFinal() {
    var dataRecebida = this.dadosPrincipaisForm.get('dataRecebida');
    var dataInicio = this.dadosPrincipaisForm.get('dataInicio');
    var dataProposta = this.dadosPrincipaisForm.get('dataProposta');
    var dataFinal = this.dadosPrincipaisForm.get('dataFinal');

    if (dataRecebida.value == null || dataRecebida.value == undefined || dataRecebida.value == '') {
      window.alert("Favor informar uma data de início");
      dataFinal.reset();
      return;
    }

    if (dataInicio.value == null || dataInicio.value == undefined || dataInicio.value == '') {
      window.alert("Favor informar uma data de início");
      dataFinal.reset();
      return;
    }

    if (dataProposta.value == null || dataProposta.value == undefined || dataProposta.value == '') {
      window.alert("Favor informar uma data proposta");
      dataFinal.reset();
      return;
    }

    if (dataFinal.value < dataRecebida.value) {
      window.alert("Favor informar uma data final posterior a data recebida");
      dataFinal.reset();
      return;
    }

    if (dataFinal.value < dataInicio.value) {
      window.alert("Favor informar uma data final posterior a data de início");
      dataFinal.reset();
      return;
    }

    if (dataFinal.value < dataProposta.value) {
      window.alert("Favor informar uma data final posterior a data de proposta");
      dataFinal.reset();
      return;
    }
  }

  Adicionar() {
    this.obterDadosForm();
    if (this.projeto.id > 0) {
      this.svc.salvar(this.projeto, Projeto)
        .toPromise().then((data: any) => {
          switch (data.codigo) {
            case 200:
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
            this.tecnologia.unshift({ id: 0, nome: 'Selecione' } as Tecnologia);
          }
        }
      }
    );

    this.svc.listar(Diretoria, null, "ObterTodos").toPromise().then(
      s => {
        if (s.sucesso) {
          if (s.data != null && s.data !== undefined) {
            this.diretoria = s.data;
            this.diretoria.unshift({ id: 0, descricao: 'Selecione' } as Diretoria);
          }
        }
      }
    );

    this.svc.listar(Sigla, null, "ObterTodos").toPromise().then(
      s => {
        if (s.sucesso) {
          if (s.data != null && s.data !== undefined) {
            this.sigla = s.data;
            this.sigla.unshift({ id: 0, descricao: 'Selecione' } as Sigla);
          }
        }
      }
    );
    this.svc.listar(Superintendencia, null, "ObterTodos").toPromise().then(
      s => {
        if (s.sucesso) {
          if (s.data != null && s.data !== undefined) {
            this.superintendencia = s.data;
            this.superintendencia.unshift({ id: 0, descricao: 'Selecione' } as Superintendencia);
          }
        }
      }
    );
    this.svc.listar(Status, null, "ObterTodos").toPromise().then(
      s => {
        if (s.sucesso) {
          if (s.data != null && s.data !== undefined) {
            this.status = s.data;
            this.status.unshift({ id: 0, descricao: 'Selecione' } as Status);
          }
        }
      }
    );
  }
}
