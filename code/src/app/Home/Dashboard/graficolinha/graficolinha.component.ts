import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-graficolinha',
  templateUrl: './graficolinha.component.html',
  styleUrls: ['./graficolinha.component.css']
})
export class GraficolinhaComponent implements OnInit {

  chartLinha = new Chart({
    chart: {
      type: 'line'
    },
    title: {
      text: 'Faturamento por Comunidades'
    },
    xAxis: {
      categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
    },
    yAxis: {
      title: {
        text: 'Faturamento em R$'
      }
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true
        },
        enableMouseTracking: false
      }
    }, 	series: [{
      name: 'Empréstimos e Financiamentos',
      data: [13, 15, 82, 34, 73, 71, 96, 61, 36, 67, 69, 28]
    }, {
      name: 'Fundos e Previdência',
      data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
    }
      , {
        name: 'Crédito e Garantias',
      data: [2, 88, 36, 10, 56, 54, 41, 45, 20, 6, 50, 50]
    }, {
      name: 'Integração Digital',
      data: [49, 23, 17, 83, 26, 59, 93, 33, 73, 39, 46, 30]
    }, {
      name: 'Produtos e Serviços de Tesouraria',
      data: [25, 52, 58, 20, 62, 14, 40, 59, 93, 31, 57, 96]
    }, {
      name: 'Dados',
      data: [96, 26, 36, 25, 20, 42, 85, 39, 12, 92, 76, 79]
    }, {
      name: 'Canais',
      data: [25, 46, 78, 76, 16, 11, 6, 73, 80, 73, 24, 13]
    }, {
      name: 'Finanças',
      data: [82, 99, 25, 18, 76, 42, 63, 14, 84, 69, 90, 92]
    }]
  });



  constructor() { }

  ngOnInit() {
  }

}
