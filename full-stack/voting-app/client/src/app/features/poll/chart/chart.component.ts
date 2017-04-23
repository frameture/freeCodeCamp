import { Component, Input, OnInit } from '@angular/core';

import { Poll } from '../../../models/poll';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: [ './chart.component.scss' ]
})
export class ChartComponent implements OnInit {

  @Input() poll: Poll;
  pieChartOptions;

  ngOnInit() {
    this.convertData();
  }

  private convertData() {
    const votes = [];
    for (let i = 0; i < this.poll.votes.length; i++) {
      const vote = this.poll.votes[ i ];
      if (votes[ vote.option ]) {
        votes[ vote.option ]++;
      } else {
        votes[ vote.option ] = 1;
      }
    }

    const data = [ [ 'Vote', 'Votes per option' ] ];
    for (let i = 0; i < this.poll.options.length; i++) {
      const option = this.poll.options[ i ];
      data.push([ option, votes[ option ] ]);
    }

    this.pieChartOptions = {
      chartType: 'PieChart',
      dataTable: data,
      options: { 'title': this.poll.name }
    };
  }

}

