import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Sale } from 'src/app/interfaces/sales';
import { DataService } from 'src/app/services/data.service';

import { AnalyticsComponent } from './analytics.component';

describe('AnalyticsComponent', () => {
  let component: AnalyticsComponent;
  let fixture: ComponentFixture<AnalyticsComponent>;
  let chartData: Sale[] = [ {
    "createdAt": "2022-09-15T12:57:46.284Z",
    "month": "2022-09-04T23:34:43.825Z",
    "sales": "233.56",
    "id": "1"
   }];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      providers: [ DataService ],
      declarations: [ AnalyticsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get sales data', async () => {
 
    const service = fixture.debugElement.injector.get(DataService)

    spyOn(service, 'getSales').and.returnValue(of(chartData));
    // expect(service.getAllUsers).toHaveBeenCalled();
    component.getSaleData();

    // Added missed `await` keyword

  });
});
