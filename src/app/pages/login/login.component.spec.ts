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
  let mockRouter;

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
    mockRouter = { navigate: jasmine.createSpy('navigate') };
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule,
        RouterTestingModule.withRoutes(
          [{ path: 'table', component: TableComponent }]
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

  // it('should filter user data when submit', () => {
  //   fixture = TestBed.createComponent(LoginComponent);
  //   component = fixture.componentInstance;

  //   spyOn(component, 'filterAccounts').and.callThrough();
  //   const service = fixture.debugElement.injector.get(DataService)

  //   component.signin();

  //   spyOn(service, 'getAllUsers').and.returnValue(of(accounts));
  // })
  it('should return true', () => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    const service = fixture.debugElement.injector.get(DataService)

    spyOn(service, 'getAllUsers').and.returnValue(of(accounts));


    expect(component.signin()).toBeTruthy()
  })


  it('should filter user data when submit', async () => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    const service = fixture.debugElement.injector.get(DataService)

    spyOn(service, 'getAllUsers').and.returnValue(of(accounts));
    // expect(service.getAllUsers).toHaveBeenCalled();

    // Added missed `await` keyword
    expect(await component.getUsers()).toBeTruthy()
  });

  // it('should have password', ()=> {
  //   spyOn(component, 'pageTransit').and.callThrough();
  //   const service = fixture.debugElement.injector.get(DataService)
  //   const accounts: UserTable[] = [];

  //   component.signin();

  //   spyOn(service, 'getAllUsers').and.returnValue(of(accounts));

  //  })

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
    component.loginForm.setValue({
      "email": "bobby@bobby.com",
      "password": "Email me a soda please."
    });

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

  it('should navigate to table page when login success', async() => {
    // fixture.whenStable().then(() => {
    jasmine.clock().install();
    component.isLoggedin = true;
    component['pageTransit'](accounts);
    spyOn(router, 'navigate').and.callThrough();
 
      fixture.detectChanges();
      expect(router.navigate).toHaveBeenCalledWith(['table'], { queryParams: { accounts: "2" } });
 
    jasmine.clock().tick(1500);
    expect(component.isLoggedin).toBeFalsy();
    jasmine.clock().uninstall();
    // })
  });

});
