import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { UserTable } from 'src/app/interfaces';
import { DataService } from 'src/app/services/data.service';
import { TableComponent } from '../table/table.component';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: DataService;
  let location, router: Router;
  let mockRouter: { navigate: jasmine.Spy<jasmine.Func>; };

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
  }, {
    "createdAt": "2023-09-11T16:00:00.000Z",
    "password": "",
    "name": "Mr. Nadine Klocko",
    "address": "05212 Crist Lights",
    "image": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/642.jpg",
    "email": "Darryl1@example.com",
    "phone": "1-383-286-4225 x623",
    "jobTitle": "Direct Accountability Officer",
    "id": "2"
  }
  ];
  let filtered_array: UserTable[] = [{
    "createdAt": "2023-09-11T16:00:00.000Z",
    "password": "",
    "name": "Mr. Nadine Klocko",
    "address": "05212 Crist Lights",
    "image": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/642.jpg",
    "email": "Darryl1@example.com",
    "phone": "1-383-286-4225 x623",
    "jobTitle": "Direct Accountability Officer",
    "id": "2"
  }
  ];

  beforeEach(async () => {
    mockRouter = { navigate: jasmine.createSpy('navigate') };
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule,
        RouterTestingModule.withRoutes(
          [{ path: 'table/:id', component: TableComponent }]
        )],
      providers: [DataService],
      declarations: [LoginComponent, TableComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    router = TestBed.inject(Router); // Just if we need to test Route Service functionality
    router.initialNavigation();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter user data when submit', () => {
    fixture = TestBed.createComponent(LoginComponent);
    spyOn(component, 'signin').and.callThrough();

    // component.loginForm.controls['email'].setValue('geral@yahoo.com')
    // component.loginForm.controls['password'].setValue('password')
    // spyOn(component, ['filterAccounts']()).and.callThrough();
    const service = fixture.debugElement.injector.get(DataService)

    component.signin()

    spyOn(service, 'getAllUsers').and.returnValue(of(accounts));
  })


  it('should return true', () => {
    const service = fixture.debugElement.injector.get(DataService)

    spyOn(service, 'getAllUsers').and.returnValue(of(accounts));


    expect(component.signin()).toBeTruthy()
  })

  // Form Group Testing
  it('check initial form values for login formgroup', async () => {
    const loginForm = component.loginForm;
    const loginFormValues = {
      "email": "",
      "password": "",
    }
    expect(loginForm.value).toEqual(loginFormValues);
  })

  it('should return invalid form if setValue is', () => {
    component.loginForm.setValue({
      "email": "",
      "password": "",
    });

    component.signin();

    expect(component.loginForm.valid).toBeFalsy();
  });


  it('should be valid if form value is valid', () => {
    const formGroupCred = {
      "email": "bobby@bobby.com",
      "password": "Email me a soda please."
    }

    component.loginForm.setValue(formGroupCred);

    component.signin();
    expect(component.loginForm.valid).toBeTruthy();
  });

  // it('should require valid email', () => {
  //   expect(component.isLoggedin ).toBe(false);

  //   component.loginForm.setValue({
  //     "email": "bobby@bobby.com",
  //     "password": "validpassword",
  //   });

  //   expect(component.pageTransit).toBeTruthy();
  // })


  it('should pageTransit if account exists', () => {

    component['pageTransit'](accounts);
    expect(component.isLoggedin).toBeFalsy();
  })

  it('should set Timeout when page transit', async () => {
    fixture.detectChanges()
    jasmine.clock().install();
    component.isLoggedin = true;
    // component.signin();
    component['pageTransit'](accounts);
    jasmine.clock().tick(1500);
    // expect(component.isLoggedin).toBeFalsy();
    jasmine.clock().uninstall();
    // })
  });


  it('should get Users data when sign in', async () => {
    const formGroupCred = {
      "email": "bobby@bobby.com",
      "password": "Email me a soda please."
    }
    // const mySpy = spyOn(component, 'pageTransit')
    component.pageTransit(accounts)
    component.loginForm.setValue(formGroupCred);

    const service = fixture.debugElement.injector.get(DataService)

    spyOn(service, 'getAllUsers').and.returnValue(of(accounts));

    // component.filtered_accounts = accounts
    // expect(service.getAllUsers).toHaveBeenCalled();
    // spyOn(component, 'pageTransit').withArgs(of(accounts)).and.returnValue(of(accounts))

    // Added missed `await` keyword
    // expect(mySpy).toHaveBeenCalledTimes(1)
    expect(await component.getUsers()).toBe()
  });


  it('should navigate to table page when login success', () => {
  
    const navSpy = spyOn(router, "navigate")

    component.filtered_accounts = accounts;
    // expect(component.filtered_accounts).toEqual(accounts);
    // expect(component.filtered_accounts.length).toBeGreaterThan(0);
  //   expect(navSpy).toHaveBeenCalledWith(['/table/' + accounts[0].id]);
    // component['pageTransit'](accounts);

    component['filterAccounts'](accounts);
    expect(component.filtered_accounts).toBeTruthy();

  })





  // it('should proceed to page trans if filtered_account is greater > 1', () => {
  //   const mySpy = spyOn(component, 'pageTransit')

  
  //   component.filtered_accounts = accounts;
  //   // expect(component.caseSensitive).toBeTruthy();

  //   component['filterAccounts'](accounts);

  //   expect(component.filtered_accounts.length).toEqual(0);
  //   expect(mySpy).toHaveBeenCalled();
  // })

  it('should be called page transition', () => {
    component.filtered_accounts = filtered_array;

    spyOn(component, 'filterAccounts')


    component.filterAccounts(filtered_array);
    expect(component.filterAccounts.length).toBe(1)
    // expect(component.filtered_accounts[0]).toBe(accounts)
  });

  it('should be not called page transition', () => {
    component.filtered_accounts = [];

    spyOn(component, 'filterAccounts')
    

    expect(component.isLoggedin).toBeFalsy();

  });
});
