import { Injectable } from '@angular/core';

declare var google: any;

@Injectable()
export class ChartService {

  constructor() { }

  createChart(input) {
    google.charts.load('current', { 'packages': [ 'line' ] });
    google.charts.setOnLoadCallback(() => this.drawChart(input));
  }

  private drawChart(input) {
    const data = new google.visualization.arrayToDataTable(input);

    const options = {
      chart: {
        title: 'Daily, close prices of selected stocks',
        subtitle: 'in USD per share'
      }
    };

    const chart = new google.charts.Line(document.getElementById('line_chart'));

    chart.draw(data, google.charts.Line.convertOptions(options));
  }
}
