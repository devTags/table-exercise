import { AfterViewInit, Component, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Sale } from 'src/app/interfaces/sales';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {

  public primaryXAxis!: Object;
  public primaryYAxis!: Object;
  public chartData: Sale[] = [];
  public title!: string;


  constructor(private ds: DataService) { }

  ngOnInit(): void {
    // Data for chart series
    this.getSaleData()
    this.primaryXAxis = {
      valueType: 'Category'
    };
    this.primaryYAxis = {
      labelFormat: 'PHP{value}k'
    }
    this.title = 'Sales Analysis';
   
  }


  async getSaleData(): Promise<void> {
    await firstValueFrom(this.ds.getSales()).then((res: Sale[]) => (this.chartData = res), console.error)
  }

}
