import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { data } from '@syncfusion/ej2';
import { IGridEditDoneEventArgs, IgxGridComponent, IgxPrefixModule, IRowDataEventArgs} from 'igniteui-angular';
import { of } from 'rxjs';
import { UserTable } from 'src/app/interfaces';
import { DataService } from '../../../services/data.service';

import { ViewTableComponent } from './view-table.component';

describe('ViewTableComponent', () => {
  let component: ViewTableComponent;
  let fixture: ComponentFixture<ViewTableComponent>;
  let deleteEv: IRowDataEventArgs;
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

  // it('should create a new user in table', () => {
  //   const dummyUsers: new IRowDataEventArgs 
  //     ({
  //       "createdAt": "2023-09-11T16:00:00.000Z",
  //       "name": "Mr. Nadine Klocko",
  //       "address": "05212 Crist Lights",
  //       "image": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/642.jpg",
  //       "email": "Darryl1@example.com",
  //       "phone": "1-383-286-4225 ",
  //       "jobTitle": "Direct Accountability Officer",
  //       "id": "2"
  //   })
    
  //   component.rowAdded({data: dummyUsers})
  // })
  // it('should return users data via GET Funtion', () => {
  //   expect(component.usersTable).toBeFalsy();
  //   component.getAllUserData();
    
  //   expect(component.usersTable).toBeTruthy();
  // })


  it('should get all user data', async () => {

    const service = fixture.debugElement.injector.get(DataService)

    spyOn(service, 'getAllUsers').and.returnValue(of(accounts));
    // expect(service.getAllUsers).toHaveBeenCalled();
    component.ngOnInit();

    // Added missed `await` keyword
    // expect(await component.getAllUserData()).toHaveBeenCalled()
    expect(Object.keys(component.getAllUserData()).length).toBeTruthy();

  });

  
  it('should add new user data', async () => {
    fixture.detectChanges();
   
    const service = fixture.debugElement.injector.get(DataService)
    
    spyOn(service, 'addUsers').and.returnValue(of(accounts));
    // expect(service.getAllUsers).toHaveBeenCalled();
    
    // Added missed `await` keyword
    expect(component.rowAdded).toEqual(of(accounts))

  });

  // it('should delete new user data', async () => {
  //   fixture.detectChanges();
   
  //   const service = fixture.debugElement.injector.get(DataService)
    
  //   // spyOn(service, 'addUsers').and.returnValue(of(accounts));
  //   spyOn(service,'deleteUsers').and.returnValue(of(accounts));
  //   // expect(service.getAllUsers).toHaveBeenCalled();
    
  //   // Added missed `await` keyword
  //   expect(component.rowDeleted(deleteEv)).toBeTruthy()

  // });

  
  // it('should return true if delete row', () => {
  //   fixture = TestBed.createComponent(ViewTableComponent);
  //   component = fixture.componentInstance;
    
  //   const service = fixture.debugElement.injector.get(DataService)

  //   spyOn(service, 'deleteUsers').and.returnValue(of(accounts));

    
  //   expect(component.rowDeleted(deleteEv)).toBeTruthy()
  // })


  it('should edit user data', async () => {
    fixture.detectChanges();

    const service = fixture.debugElement.injector.get(DataService)
    
    service.putUsers(event.rowID, event.newValue)
    // expect(service.getAllUsers).toHaveBeenCalled();
    // component.rowEditDone
    // Added missed `await` keyword
    // component.getAllUserData();
    expect(component.rowEditDone(event)).toBeTruthy()

  });

  it('should return true if edit row', () => {
    fixture = TestBed.createComponent(ViewTableComponent);
    component = fixture.componentInstance;
    
    const service = fixture.debugElement.injector.get(DataService)

    spyOn(service, 'putUsers').and.returnValue(of(accounts));


    expect(component.rowEditDone(event)).toBeTruthy()
  })

  it('should return have defaultPrevented as Enter', () => {
    fixture.detectChanges();
    const key = new KeyboardEvent('keydown', {key: 'Enter'});
    component.searchKeyDown(key)
    // expect(component.searchKeyDown).toBeTrue();
  })

  it('should return have defaultPrevented as ArrowUp' ,()=>{
    fixture.detectChanges();
    const key = new KeyboardEvent('keydown', {key: 'ArrowUp'});
    component.searchKeyDown(key)

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
