import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// PrimeNG
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button'
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import {AvatarModule} from 'primeng/avatar';

// Imported syncfusion Grid module from grids package
import { GridAllModule } from '@syncfusion/ej2-angular-grids';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { ChartModule } from '@syncfusion/ej2-angular-charts';

import {
  CategoryService, LineSeriesService, StepLineSeriesService, SplineSeriesService, StackingLineSeriesService, DateTimeService,
  SplineAreaSeriesService, MultiColoredLineSeriesService, ParetoSeriesService, ColumnSeriesService, AccumulationChartModule
} from '@syncfusion/ej2-angular-charts';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';

// Ignite UI
import {
  IgxActionStripModule,
  IgxGridModule,
  IgxFocusModule,
  IgxButtonModule,
  IgxIconModule,
  IgxInputGroupModule,
  IgxRippleModule,
  IgxChipsModule
} from "igniteui-angular";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './pages/table/table.component';
import { ViewTableComponent } from './pages/table/view-table/view-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './pages/profile/profile.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    ViewTableComponent,
    LoginComponent,
    ProfileComponent,
    AnalyticsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    GridModule,
    ButtonModule,
    GridAllModule,
    BrowserAnimationsModule,
    IgxGridModule,
    IgxFocusModule,
    IgxActionStripModule,
    IgxButtonModule,
    IgxIconModule,
    IgxInputGroupModule,
    IgxRippleModule,
    IgxChipsModule,
    CardModule,
    ButtonModule,
    PasswordModule,
    InputTextModule,
    AccumulationChartModule,
    ChartModule,
    ProgressBarModule,
    ToastModule,
    AvatarModule

  ],
  providers: [DateTimeService, CategoryService, LineSeriesService, StepLineSeriesService, SplineSeriesService, StackingLineSeriesService, DateTimeService,
    SplineAreaSeriesService, MultiColoredLineSeriesService, ParetoSeriesService, ColumnSeriesService],
  entryComponents: [],
  schemas: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
