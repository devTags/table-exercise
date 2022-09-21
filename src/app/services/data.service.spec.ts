import { TestBed } from '@angular/core/testing';
import { DataService } from './data.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { HttpClientModule, HttpRequest, HttpResponse } from '@angular/common/http';
import { UserTable } from '../interfaces';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;
  const newUser: UserTable[] = [{
    "password": "",
    "createdAt": "",
    "name": "Donald Trump",
    "address": "505 Rey Street",
    "image": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/927.jpg",
    "email": "Carole_Crooks76@example.com",
    "phone": "(821) 885-8760 x87741",
    "jobTitle": "Dynamic Research Officer",
    "id": "2"
  }];

  const dummyUsers: UserTable[] = [{
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [DataService]
    });


    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should fetch all user data from API via GET', () => {
    service.getAllUsers().subscribe(users => {
      expect(users.length).toBe(2);
      expect(users).toEqual(dummyUsers);
    })

    const request = httpMock.expectOne(`${service.baseUrl}getDataTable`);

    expect(request.request.method).toBe('GET');

    request.flush(dummyUsers)
  });

  it('should add users from API via POST', () => {

    service.addUsers(newUser).subscribe(user => {
      expect(user).toBe(newUser);
    })

    const request = httpMock.expectOne(`${service.baseUrl}getDataTable`);
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toBe(newUser);


    const expectedResponse = new HttpResponse({ status: 201, statusText: 'Created', body: newUser });
    request.event(expectedResponse);

    request.flush(newUser);

    httpMock.verify();

  })

  it('should update users from API via PUT', () => {

    service.putUsers(2, newUser).subscribe((user) => {
      expect(user).toBe(newUser);
    })

    const request = httpMock.expectOne(
      `${service.baseUrl}getDataTable/${2}`,
    );

    expect(request.request.method).toBe('PUT');

    request.flush(newUser);

    httpMock.verify();
    // const request = httpMock.expectOne((req: HttpRequest<any>) => req.method === 'PUT').flush(null);

    // service.putUsers(2,newUser).subscribe(user => {
    //   expect(user).toEqual(newUser, 'should return the user');
    // })

    // const request = httpMock.expectOne(`${service.baseUrl}getDataTable/`+ 2);
    // expect(request.method).toEqual('PUT');
    // expect(request.body).toEqual(newUser);

    // const expectedResponse = new HttpResponse({ status: 201, statusText: 'Created', body: newUser });
    // request.event(expectedResponse);
  })


  it('should delete users from API via DELETE', () => {
    service.deleteUsers(3).subscribe((user: any) => {
      expect(user).toBe(3);
    });
  
    const req = httpMock.expectOne(
      `${service.baseUrl}getDataTable/${3}`,
      'delete to api'
    );
    expect(req.request.method).toBe('DELETE');
  
    req.flush(3);
  
    httpMock.verify();


    // const mockPr1 = 20;

    // service.deleteUsers(mockPr1).subscribe()
    // const request = httpMock.expectOne((req: HttpRequest<any>) => req.method === 'DELETE');



    // request.flush(null)
    // const expectedResponse = new HttpResponse({ status: 201, statusText: 'Created', body: newUser });
    // request.event(expectedResponse);
  })

});
