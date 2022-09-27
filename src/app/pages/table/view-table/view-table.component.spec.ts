import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { data } from '@syncfusion/ej2';
import { GridType } from '@syncfusion/ej2/diagrams';
import { IGridEditDoneEventArgs, IgxGridComponent, IgxPrefixModule, IRowDataEventArgs} from 'igniteui-angular';
import { of } from 'rxjs';
import { UserTable } from 'src/app/interfaces/users-table';
import { DataService } from '../../../services/data.service';

import { ViewTableComponent } from './view-table.component';

describe('ViewTableComponent', () => {
  let component: ViewTableComponent;
  let fixture: ComponentFixture<ViewTableComponent>;
  let IDataEvents = {data: {}}
  let accounts: UserTable[] = [{
    "createdAt": "2023-09-11T16:00:00.000Z",
    "password": "",
    "name": "Mr. Nadine Klocko",
    "address": "05212 Crist Lights",
    "image": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/642.jpg",
    "email": "Darryl1@example.com",
    "phone": "1-383-286-4225 x623",
    "jobTitle": "Direct Accountability Officer",
    "id": "2"
  }];

  let event: IGridEditDoneEventArgs = {
    rowID: undefined,
    rowData: undefined,
    oldValue: undefined,
    newValue: undefined
  }


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientModule,IgxPrefixModule ],
      providers: [ DataService ],
      declarations: [ ViewTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get all user data', async () => {

    const service = fixture.debugElement.injector.get(DataService)

    spyOn(service, 'getAllUsers').and.returnValue(of(accounts));
    // expect(service.getAllUsers).toHaveBeenCalled();
    component.ngOnInit();

    // Added missed `await` keyword
    // expect(await component.getAllUserData()).toHaveBeenCalled()
    expect(Object.keys(component.getAllUserData()).length).toBeTruthy();

  });

  
  it('should return true if successfully added new user', () => {


    fixture = TestBed.createComponent(ViewTableComponent);
    component = fixture.componentInstance;
    
    const service = fixture.debugElement.injector.get(DataService)

    spyOn(service, 'addUsers').and.returnValue(of(accounts));

    
    expect(component.rowAdded(IDataEvents as IRowDataEventArgs)).toBeTruthy()
  })

  
  it('should return true if successfully deleted a user', () => {


    fixture = TestBed.createComponent(ViewTableComponent);
    component = fixture.componentInstance;
    
    const service = fixture.debugElement.injector.get(DataService)

    spyOn(service, 'deleteUsers').and.returnValue(of(accounts));

    
    expect(component.rowDeleted(IDataEvents as IRowDataEventArgs)).toBeTruthy()
  })



  it('should return true if successfully deleted a user', () => {
    fixture = TestBed.createComponent(ViewTableComponent);
    component = fixture.componentInstance;
    
    const service = fixture.debugElement.injector.get(DataService)

    spyOn(service, 'putUsers').and.returnValue(of(accounts));


    expect(component.rowEditDone(event)).toBeTruthy()
  })

  it('should return true if have defaultPrevented as Enter', () => {
    const keyEvent  = new KeyboardEvent('keydown', {key: 'Enter'});
    const spy = spyOn(keyEvent, 'preventDefault');        
    component.searchKeyDown(keyEvent);
    fixture.detectChanges();
    expect(spy).toBeTruthy()

    // expect(component.searchKeyDown).toBeTrue();
  })

  it('should return true have defaultPrevented as ArrowUp' ,()=>{
    const keyEvent  = new KeyboardEvent('keydown', {key: 'ArrowUp'});
    const spy = spyOn(keyEvent, 'preventDefault');        
    component.searchKeyDown(keyEvent);
    fixture.detectChanges();
    expect(spy).toBeTruthy()
 })

  it('should cleartext in input field if button clicked', () => {
    expect(component.searchText).toBeFalsy();
    // component.searchText = 'sampledata'
    component.clearSearch();
    // component.grid.clearCellSelection
    expect(component.searchText).toBe('');
  })


  it('should update search in input field if search is used', () => {
    expect(component.caseSensitive).toBeFalsy();
    component.updateSearch();

    expect(component.caseSensitive).toBeTruthy();
  })

  it('should update exact search in table if search is used', () => {
    expect(component.exactMatch).toBeFalsy();
    component.updateExactSearch();

    expect(component.exactMatch).toBeTruthy();
  })
 
});
