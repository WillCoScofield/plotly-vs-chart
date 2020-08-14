import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plotly-scatterplot',
  templateUrl: './plotly-scatterplot.component.html',
  styleUrls: ['./plotly-scatterplot.component.scss']
})
export class PlotlyScatterplotComponent implements OnInit {
  public graph = {
    data: [
      { x: [1, 2, 3], y: [2, 6, 3], type: 'scatter', mode: 'lines+points', marker: { color: 'red' } },
      { x: [1, 2, 3], y: [2, 5, 3], type: 'scatter' },
    ],
    layout: { height: 400, title: 'A Scatter Plot / Line+Scatter Plot' }
  };

  constructor() { }

  ngOnInit(): void {
  }

}
