import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { async, of } from 'rxjs';
import { UserTable } from 'src/app/interfaces';
import { DataService } from 'src/app/services/data.service';

import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
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
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [ DataService],
      declarations: [ ProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should get user profile if id exists', async () => {

    // const mySpy = spyOn(component, 'pageTransit')
    component.getUserProfile(1)

    const service = fixture.debugElement.injector.get(DataService)

    spyOn(service, 'getOneUser').and.returnValue(of(accounts));

    // component.filtered_accounts = accounts
    // expect(service.getAllUsers).toHaveBeenCalled();
    // spyOn(component, 'pageTransit').withArgs(of(accounts)).and.returnValue(of(accounts))

    // Added missed `await` keyword
    // expect(mySpy).toHaveBeenCalledTimes(1)
    expect(await component.getUserProfile(1)).toBe()
  });

});
