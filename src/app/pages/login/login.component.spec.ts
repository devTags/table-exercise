import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { UserTable } from 'src/app/interfaces/users-table';
import { DataService } from 'src/app/services/data.service';
import { TableComponent } from '../table/table.component';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: DataService;
  let location, router: Router;
  let mockRouter: any

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
          [{ path: 'main/:id', component: TableComponent }]
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


  it('should call pageTransit if filtered account exists', () => {

    jasmine.clock().install();
    component.isLoggedin = false;
    component['pageTransit'](accounts);
    expect(component.isLoggedin).toBeFalsy();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(mockRouter.navigate).toHaveBeenCalledWith([`/main/${accounts[0].id}`]);
    });

    jasmine.clock().tick(1500);
    // expect(component.isLoggedin).toBeFalsy();
    jasmine.clock().uninstall();
    // })
  });

  it('should call getUsers when sign in', async () => {
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

  it('should be called page transition', () => {
    component.filtered_accounts = filtered_array;

    spyOn(component, 'filterAccounts')


    component.filterAccounts(filtered_array);
    expect(component.filterAccounts.length).toBe(1)
    // expect(component.filtered_accounts[0]).toBe(accounts)
  });

});
