import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartPageComponent } from './pages/chart-page/chart-page.component';
import { PlotlyPageComponent } from './pages/plotly-page/plotly-page.component';


const routes: Routes = [
  {
    path: 'plotlyjs',
    component: PlotlyPageComponent
  },
  {
    path: 'chartjs',
    component: ChartPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
