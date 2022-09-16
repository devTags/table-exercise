import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataService } from '../../services/data.service';

import { ViewTableComponent } from './view-table.component';

describe('ViewTableComponent', () => {
  let component: ViewTableComponent;
  let fixture: ComponentFixture<ViewTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
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
  it('should return users data via GET Funtion', () => {
    expect(component.usersTable).toBeFalsy();
    component.getData();
    
    expect(component.usersTable).toBeTruthy();
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
    // check other values in expect block accordingly
 })

  it('should cleartext in input field if button clicked', () => {
    expect(component.searchText).toBeFalsy();
    component.clearSearch();
    component.grid.clearSearch();
    expect(component.searchText).toBeTruthy();
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
