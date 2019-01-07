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
      type: 'pie'
    },
    title: {
      text: 'Faturamento por Comunidade'
    },
    credits: {
      enabled: false
    },
    series: [
      {
        colorByPoint: true,
        type: 'pie',
        data:
          [{
            name: 'Crédito',
            y: 61.41,
            sliced: true,
            selected: true
          }, {
            name: 'Investimento',
            y: 11.84
          },
          ],
      }]
  });

  chart2 = new Chart({
    chart: {
      type: 'pie'
    },
    title: {
      text: 'Faturamento por Squads'
    },
    credits: {
      enabled: false
    },
    series: [
      {
        colorByPoint: true,
        type: 'pie',
        data:
          [{
            name: 'Crédito',
            y: 40,
            sliced: true,
            selected: true
          },
          {
            name: 'Insights',
            y: 10
          }, {
            name: 'Crédito 1',
            y: 10
          }, {
            name: 'Crédito 2 e 3',
            y: 10
          }, {
            name: 'Plataformas Comerciais',
            y: 10
          }, {
            name: 'Produtos e Serviços de Tesouraria',
            y: 10
          }, {
            name: 'Nova Plataforma',
            y: 10
          },
          {
            name: 'Pós-Vendas 1 e 2',
            y: 10
          },
          {
            name: 'Front Asset e Liquidação',
            y: 11.84
          },
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
        colorByPoint: true,
        type: 'pie',
        data:
          [{
            name: 'Industrialização',
            y: 61.41,
            sliced: true,
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
