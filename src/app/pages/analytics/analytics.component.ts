import { AfterViewInit, Component, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Sale } from 'src/app/interfaces/sales';
import { DataService } from '../../services/data.service';

/**
 * The header component
 */

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})

export class AnalyticsComponent implements OnInit {


  /**
   * This variables are used for analytics
   * @property loginForm Login form holder
   * @param {string} title for title idication
   * @param {Object} primaryXAxis For the chartsXaxis
   * @param {Object} primaryYAxis For the chartsYaxis
   * @param {Sale[]} chartData For storing chartData
   */
  public primaryXAxis!: Object;
  public primaryYAxis!: Object;
  public chartData: Sale[] = [];
  public title!: string;

  /** 
   * This constructor initializes injectable components 
   * @param {DataService} ds Data Service
   */
  constructor(private ds: DataService) { }

  /**
   * This function is used to initialize primaryXAxis, primaryYAxis and title Values
   * @return void call getSalesData Method
  */
  ngOnInit(): void {
    // Data for chart series

    this.getSaleData();
    this.primaryXAxis = {
      valueType: 'Category'
    };
    this.primaryYAxis = {
      labelFormat: 'PHP{value}k'
    }
    this.title = 'Sales Analysis';
  }


  /**
   * This function is used to get the sales data when successfully login
   */

  async getSaleData(): Promise<void> {
    await firstValueFrom(this.ds.getSales()).then((res: Sale[]) => (
      this.chartData = res), console.error)
  }




}
