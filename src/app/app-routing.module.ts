import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { LoginComponent } from './pages/login/login.component';
import { TableComponent } from './pages/table/table.component';
import { ViewTableComponent } from './pages/table/view-table/view-table.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},

  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'main/:id',
    component: TableComponent,

    children: [
      {path: '', component: ViewTableComponent },
      {path: 'chart', component: AnalyticsComponent},
      {path: '', redirectTo: '', pathMatch: 'full'},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
