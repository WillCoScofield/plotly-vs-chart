import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlotlyViaCDNModule, PlotlyViaWindowModule } from 'angular-plotly.js';
import { ChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartBarChartComponent } from './visualization-packages/chart.js/chart-bar-chart/chart-bar-chart.component';
import { ChartBubbleChartComponent } from './visualization-packages/chart.js/chart-bubble-chart/chart-bubble-chart.component';
import { ChartDoughnutChartComponent } from './visualization-packages/chart.js/chart-doughnut-chart/chart-doughnut-chart.component';
import { ChartLineChartComponent } from './visualization-packages/chart.js/chart-line-chart/chart-line-chart.component';
import { ChartPieChartComponent } from './visualization-packages/chart.js/chart-pie-chart/chart-pie-chart.component';
import { ChartRadarChartComponent } from './visualization-packages/chart.js/chart-radar-chart/chart-radar-chart.component';
import { PlotlyBarchartComponent } from './visualization-packages/plotly.js/plotly-barchart/plotly-barchart.component';
import { PlotlyScatterplotComponent } from './visualization-packages/plotly.js/plotly-scatterplot/plotly-scatterplot.component';
import { PlotlyPageComponent } from './pages/plotly-page/plotly-page.component';
import { ChartPageComponent } from './pages/chart-page/chart-page.component';
import { PlotlyBubblechartComponent } from './visualization-packages/plotly.js/plotly-bubblechart/plotly-bubblechart.component';
import { HowToComponent } from './pages/how-to/how-to.component';
import { PlotlyPiechartComponent } from './visualization-packages/plotly.js/plotly-piechart/plotly-piechart.component';

// PlotlyModule.plotlyjs = PlotlyJS;
PlotlyViaCDNModule.plotlyVersion = '1.49.4';


@NgModule({
  declarations: [
    AppComponent,
    PlotlyBarchartComponent,
    ChartBarChartComponent,
    ChartBubbleChartComponent,
    ChartLineChartComponent,
    ChartPieChartComponent,
    ChartRadarChartComponent,
    ChartDoughnutChartComponent,
    PlotlyScatterplotComponent,
    PlotlyPageComponent,
    ChartPageComponent,
    PlotlyBubblechartComponent,
    HowToComponent,
    PlotlyPiechartComponent
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    AppRoutingModule,
    CommonModule,
    PlotlyViaCDNModule,
    BrowserAnimationsModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
