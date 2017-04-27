import { Injectable } from '@angular/core';

declare var google: any;

@Injectable()
export class ChartService {

  createChart() {
    google.charts.load('current', { 'packages': [ 'line' ] });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {

      const data = new google.visualization.arrayToDataTable([
        [ 'Day', 'a', 'b', 'c' ],
        [ 1, 37.8, 80.8, 41.8 ],
        [ 2, 30.9, 69.5, 32.4 ],
        [ 3, 25.4, 57, 25.7 ]
      ]);

      const options = {
        chart: {
          title: 'Box Office Earnings in First Two Weeks of Opening',
          subtitle: 'in millions of dollars (USD)'
        },
        width: 600,
        height: 500
      };

      const chart = new google.charts.Line(document.getElementById('line_chart'));

      chart.draw(data, google.charts.Line.convertOptions(options));
    }
  }
}
