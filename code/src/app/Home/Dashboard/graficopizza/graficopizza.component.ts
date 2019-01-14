import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';


@Component({
  selector: 'app-graficopizza',
  templateUrl: './graficopizza.component.html',
  styleUrls: ['./graficopizza.component.css'],

})





export class GraficopizzaComponent implements OnInit {

  chart = new Chart({
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: 'Faturamento por Comunidade'
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false
        },
        showInLegend: true
      }
    },
    series: [
      {
        // colorbypoint: true,
        type: 'pie',
        data: [
          {
            name: 'Empréstimos e Financiamentos',
            y: 4.41,
          },
          {
            name: 'Fundos e Previdência',
            y: 10.41,
          },
          {
            name: 'Crédito e Garantias',
            y: 1.41,
          },
          {
            name: 'Integração Digital',
            y: 7.41,
          },
          {
            name: 'Produtos e Serviços de Tesouraria',
            y: 9.41,
          },
          {
            name: 'Dados',
            y: 2.41,
          },
          {
            name: 'Canais',
            y: 3.41,
          },
          {
            name: 'Finanças',
            y: 1.41,
          },
        ],
      }]
  });

  chart2 = new Chart({
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: 'Faturamento por Squads'
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false
        },
        showInLegend: true
      }
    },
    series: [
      {
        // colorByPoint: true,
        type: 'pie',
        data:
          [ { name: 'BandoLean ', y: 12 }, { name: 'ChapoLean', y: 12 },
{ name: 'Consignado Convênio e Parâmetros', y: 12 },
{ name: 'Consignado Credenciamento e Comissão', y: 12 },
{ name: 'Custódia Empréstimos Atacado', y: 34 },
{ name: 'Custódia Empréstimos Varejo I', y: 34 },
{ name: 'Custódia Empréstimos Varejo II', y: 34 },
{ name: 'Custódia Empréstimos Varejo III', y: 34 },
{ name: 'Empréstimos e Financiamentos - Averbação I (Pré-Venda I)', y: 34 },
{ name: 'Empréstimos e Financiamentos - Averbação II (Pré-Venda II)', y: 34 },
{ name: 'Evolução Mobile PF / Controlar meu Orçamento', y: 34 },
{ name: 'Evolução Sites abertos', y: 34 },
{ name: 'Finanças', y: 34 },
{ name: 'Front Asset', y: 34 },
{ name: 'Gestão de Análise de Mercado', y: 34 },
{ name: 'Gestão de Carteira', y: 34 },
{ name: 'Gestão de Investimento Do Cliente', y: 34 },
{ name: 'Governança', y: 34 },
{ name: 'Limites PF - A', y: 34 },
{ name: 'Limites PJ', y: 34 },
{ name: 'Liquidação', y: 34 },
{ name: 'Movimentação Caixa', y: 34 },
{ name: 'Operações Consórcio e Custódia Leasing ', y: 34 },
{ name: 'Operações sites abertos', y: 34 },
{ name: 'Plataformas Comerciais', y: 34 },
{ name: 'Plataformas Operacionais', y: 34 },
{ name: 'Processamento I', y: 34 },
{ name: 'Processamento Passivo e Previdência 2', y: 34 },
{ name: 'Projeto Sites', y: 34 },
{ name: 'RT-ACE - Cap. Operação 1', y: 34 },
{ name: 'RT-ACE – Crédito 1 (PF)', y: 34 },
{ name: 'RT-ACE – Crédito 2 (PJ)', y: 34 },
{ name: 'RT-ACE - Crédito 3', y: 34 },
{ name: 'RT-ACE - Crédito 4', y: 34 },
{ name: 'RT-ACE - Crédito 5', y: 34 },
{ name: 'RT-ACE - Crédito 6', y: 34 },
{ name: 'RT-ACE - Prevenção Fraudes', y: 34 },
{ name: 'RT-IN- Insights I', y: 34 },
{ name: 'Serviços de Apoio', y: 34 },
{ name: 'Simples / Dados', y: 34 },
{ name: 'Simples / Empréstimos e Financiamentos - Consignado', y: 34 },
{ name: 'Simples/Empréstimos e Financiamentos - Empréstimos', y: 34 },
{ name: 'Simples/Empréstimos e Financiamentos - Financiamentos', y: 34 },
                     ]
      }]
  });

  chart3 = new Chart({
    chart: {
      type: 'pie'
    },
    title: {
      text: 'Faturamento por Tipo'
    },
    credits: {
      enabled: false
    },
    series: [
      {
        // colorByPoint: true,
        type: 'pie',
        data:
          [{
            name: 'Industrialização',
            y: 61.41,

            selected: true
          }, {
            name: 'Comunidades',
            y: 11.84
          },
          ],
      }]
  });
  constructor() { }

  ngOnInit() {
  }

}
