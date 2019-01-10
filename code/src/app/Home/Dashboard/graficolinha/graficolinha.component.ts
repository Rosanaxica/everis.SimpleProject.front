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
      text: 'Faturamento das Squads'
    },
    xAxis: {
      categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
    },
    yAxis: {
      title: {
        text: 'Faturamento'
      }
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true
        },
        enableMouseTracking: false
      }
    },
    series: [{
      name: 'Tokyo',
      data: [13, 15, 82, 34, 73, 71, 96, 61, 36, 67, 69, 28]
    }, {
      name: 'London',
      data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
    }
      , {
      name: 'London',
      data: [2, 88, 36, 10, 56, 54, 41, 45, 20, 6, 500, 50]
    }, {
      name: 'London',
      data: [49, 23, 17, 83, 26, 59, 93, 33, 73, 39, 46, 300]
    }, {
      name: 'London',
      data: [25, 52, 58, 20, 62, 14,400, 59, 93, 31, 57, 96]
    }, {
      name: 'London',
      data: [96, 26, 36, 25, 20, 42, 85, 39, 12, 92, 76, 79]
    }, {
      name: 'London',
      data: [25, 46, 78, 76, 16, 11, 6, 73, 80, 73, 24, 13]
    }, {
      name: 'London',
      data: [82, 99, 25, 18, 76, 42, 63, 14, 84, 69, 900, 92]
    }, {
      name: 'London',
      data: [52, 17, 87, 46, 86, 8, 200, 97, 43, 20, 5, 74]
    }, {
      name: 'London',
      data: [64, 62, 30, 79,100, 10, 57, 78, 3, 77, 3, 40]
    }, {
      name: 'London',
      data: [70, 12, 81, 30, 27, 4, 41, 200, 36, 98, 53, 47]
    }, {
      name: 'London',
      data: [34, 80, 30, 92, 39, 89, 56, 18, 33, 67, 47, 18]
    }, {
      name: 'London',
      data: [86, 51, 40, 200, 1, 28, 48, 60, 6, 11, 5, 4]
    }]
  });



  constructor() { }

  ngOnInit() {
  }

}
