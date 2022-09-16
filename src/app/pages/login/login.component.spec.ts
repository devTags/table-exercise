import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { UserTable } from 'src/app/interfaces';
import { DataService } from 'src/app/services/data.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: DataService;
  let authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
  authServiceSpy.login.and.returnValue(of());
  let login:LoginComponent

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule],
      providers: [DataService],
      declarations: [LoginComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter user data when submit', () => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    spyOn(component, 'filterAccounts').and.callThrough();
    const service = fixture.debugElement.injector.get(DataService)
    const accounts: UserTable[] = [{
      "createdAt": "2023-09-11T16:00:00.000Z",
      "password": "",
      "name": "Mr. Nadine Klocko",
      "address": "05212 Crist Lights",
      "image": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/642.jpg",
      "email": "Darryl1@example.com",
      "phone": "1-383-286-4225 x623",
      "jobTitle": "Direct Accountability Officer",
      "id": "2"
    },
    {
      "createdAt": "2022-09-11T08:58:16.654Z",
      "password": "",
      "name": "Bessie Spencer",
      "address": "505 Rey Street",
      "image": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/927.jpg",
      "email": "Carole_Crooks76@example.com",
      "phone": "(821) 885-8760 x87741",
      "jobTitle": "Dynamic Research Officer",
      "id": "3"
    }];

    spyOn(service, 'getAllUsers').and.returnValue(of(accounts));
    component.signin();
  })


  it('should filter user accounts ', () => {

    const accounts: UserTable[] = [{
      "createdAt": "2023-09-11T16:00:00.000Z",
      "password": "",
      "name": "Mr. Nadine Klocko",
      "address": "05212 Crist Lights",
      "image": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/642.jpg",
      "email": "Darryl1@example.com",
      "phone": "1-383-286-4225 x623",
      "jobTitle": "Direct Accountability Officer",
      "id": "2"
    },
    {
      "createdAt": "2022-09-11T08:58:16.654Z",
      "password": "",
      "name": "Bessie Spencer",
      "address": "505 Rey Street",
      "image": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/927.jpg",
      "email": "Carole_Crooks76@example.com",
      "phone": "(821) 885-8760 x87741",
      "jobTitle": "Dynamic Research Officer",
      "id": "3"
    }];

    spyOn(component, 'filterAccounts') // spy first
    component.filterAccounts(accounts)
    expect(component.filterAccounts).toHaveBeenCalledWith(accounts);
  })


  it('should require valid email', () => {
    component.loginForm.setValue({
      "email": "invalidemail",
      "password": "",
    });

    expect(component.loginForm.valid).toEqual(false);
  })

  it('should be valid if form value is valid', () => {
    component.loginForm.setValue({
      "email": "bobby@bobby.com",
      "password": "Email me a soda, please."
    });

    expect(component.loginForm.valid).toEqual(true);
  });


  it('should not allow user to log in', () => {
    const formData = {
      "email": "invalidemail",
      "password": "8938ndisn@din"
    };
    component.loginForm.setValue(formData);
    component.signin();

    expect(component.loginForm.invalid).toEqual(true);
    expect(authServiceSpy.login).toHaveBeenCalledTimes(0);
  });


  it('should require valid email', () => {
    component.loginForm.setValue({
      "email": "invalidemail",
      "password": "",
    });

    expect(component.loginForm.valid).toEqual(false);
    component.getUsers()
  })

  it('should return true ', () => {

    spyOn(component, 'signin').and.callThrough()

    component.signin()

  })


});
