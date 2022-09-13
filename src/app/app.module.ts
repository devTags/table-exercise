import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// PrimeNG
import { TableModule } from 'primeng/table';

// Imported syncfusion Grid module from grids package
import { GridAllModule } from '@syncfusion/ej2-angular-grids';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

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
import { TableComponent } from './table/table.component';
import { ViewTableComponent } from './table/view-table/view-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    ViewTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GridModule,
    ButtonModule,
    GridAllModule,
    TableModule,
    BrowserAnimationsModule,
    IgxGridModule,
    IgxFocusModule,
    IgxActionStripModule,
    IgxButtonModule,
    IgxIconModule,
    IgxInputGroupModule,
    IgxRippleModule,
    IgxChipsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
