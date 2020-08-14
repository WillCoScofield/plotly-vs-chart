import { Component, OnInit, ViewChild } from '@angular/core';
import * as Plotly from 'plotly.js';

@Component({
  selector: 'app-plotly-barchart',
  templateUrl: './plotly-barchart.component.html',
  styleUrls: ['./plotly-barchart.component.scss']
})
export class PlotlyBarchartComponent implements OnInit {
  @ViewChild('plot') plot: any;
  public graph = {
    data: [
      // { x: [1, 2, 3], y: [2, 6, 3], type: 'scatter', mode: 'lines+points', marker: { color: 'red' } },
      { x: [1, 2, 3], y: [2, 5, 3], type: 'bar' },
    ],
    layout: { height: 375, title: 'Bar Chart' }
  };

  constructor() { }

  ngOnInit(): void {
    // Plotly.newPlot(this.plot, (this.graph.data as any), this.graph.layout);
  }

}
