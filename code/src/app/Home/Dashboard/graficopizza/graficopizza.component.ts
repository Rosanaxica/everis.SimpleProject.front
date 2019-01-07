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
        data:[
          {
            name: 'Empréstimos e Financiamentos',
            y: 4.41,
             },
          {
            name: 'Fundos e Previdência',
            y: 10.41,},
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
      // colorByPoint: true,
      type: 'pie',
      data:
        [{
          name: 'Crédito',
          y: 40,
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
