import { TestBed } from '@angular/core/testing';
import { DataService } from './data.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { HttpClientModule, HttpResponse } from '@angular/common/http';
import { UserTable } from '../interfaces';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule, HttpClientTestingModule],
      providers: [ DataService ]
    });


    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should retrive users from API via GET', () => {
    const dummyUsers: UserTable[] = [{
      "createdAt": "2023-09-11T16:00:00.000Z",
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
      "name": "Bessie Spencer",
      "address": "505 Rey Street",
      "image": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/927.jpg",
      "email": "Carole_Crooks76@example.com",
      "phone": "(821) 885-8760 x87741",
      "jobTitle": "Dynamic Research Officer",
      "id": "3"
      }];

      service.getUsers().subscribe(users => {
        expect(users.length).toBe(2);
        expect(users).toEqual(dummyUsers);
      })

    const request = httpMock.expectOne(`${service.baseUrl}getDataTable`);

    expect(request.request.method).toBe('GET');

    request.flush(dummyUsers)
  });

  it('should add users from API via POST', () => {
      const newUser: UserTable[] = [{
        "createdAt": "",
        "name": "Donald Trump",
        "address": "505 Rey Street",
        "image": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/927.jpg",
        "email": "Carole_Crooks76@example.com",
        "phone": "(821) 885-8760 x87741",
        "jobTitle": "Dynamic Research Officer",
        "id": ""
      }];

      service.addUsers(newUser).subscribe(user => {
        expect(user).toEqual(newUser, 'should return the user');
      })

      const request = httpMock.expectOne(`${service.baseUrl}getDataTable`);
      expect(request.request.method).toEqual('POST');
      expect(request.request.body).toEqual(newUser);

      const expectedResponse = new HttpResponse({ status: 201, statusText: 'Created', body: newUser });
      request.event(expectedResponse);
    })

  //   it('should update users from API via PUT', () => {
  //     const newUser: UserTable[] = [{
  //       "createdAt": "",
  //       "name": "Donald Trump",
  //       "address": "505 Rey Street",
  //       "image": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/927.jpg",
  //       "email": "Carole_Crooks76@example.com",
  //       "phone": "(821) 885-8760 x87741",
  //       "jobTitle": "Dynamic Research Officer",
  //       "id": ""
  //     }];

  //     service.putUsers(2,newUser).subscribe(user => {
  //       expect(user).toEqual(newUser, 'should return the user');
  //     })

  //     const request = httpMock.expectOne(`${service.baseUrl}getDataTable/`+ 2);
  //     expect(request.request.method).toEqual('PUT');
  //     expect(request.request.body).toEqual(newUser);

  //     const expectedResponse = new HttpResponse({ status: 201, statusText: 'Created', body: newUser });
  //     request.event(expectedResponse);
  //   })


  //   it('should delete users from API via DELETE', () => {
    
  //     service.deleteUsers(10).subscribe(user => {
        
  //     })

   
  //     const request = httpMock.expectOne(`${service.baseUrl}getDataTable`);

  //     expect(request.request.method).toBe('DELETE');
  
  //     request.flush(null)
  //   })

});
