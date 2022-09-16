import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { TableComponent } from './pages/table/table.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},

  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'table',
    component: TableComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
