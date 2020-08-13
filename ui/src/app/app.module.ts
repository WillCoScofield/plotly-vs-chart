import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartBarChartComponent } from './visualization-packages/chart/chart-bar-chart/chart-bar-chart.component';
import { ChartBubbleChartComponent } from './visualization-packages/chart/chart-bubble-chart/chart-bubble-chart.component';
import { ChartDoughnutChartComponent } from './visualization-packages/chart/chart-doughnut-chart/chart-doughnut-chart.component';
import { ChartLineChartComponent } from './visualization-packages/chart/chart-line-chart/chart-line-chart.component';
import { ChartPieChartComponent } from './visualization-packages/chart/chart-pie-chart/chart-pie-chart.component';
import { ChartRadarChartComponent } from './visualization-packages/chart/chart-radar-chart/chart-radar-chart.component';
import { PlotlyBarchartComponent } from './visualization-packages/plotly/plotly-barchart/plotly-barchart.component';

@NgModule({
  declarations: [
    AppComponent,
    PlotlyBarchartComponent,
    ChartBarChartComponent,
    ChartBubbleChartComponent,
    ChartLineChartComponent,
    ChartPieChartComponent,
    ChartRadarChartComponent,
    ChartDoughnutChartComponent
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
