import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserTable } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseUrl: string = 'https://631ee3db22cefb1edc3ced68.mockapi.io/';

  constructor(private _http: HttpClient) { }



  public  getUsers(){
    return this._http.get<UserTable[]>(this.baseUrl + 'getDataTable' );

  }

  public postUsers(endpoint: string, userData: UserTable[]){
    return this._http.post<UserTable[]>(this.baseUrl + 'getDataTable', userData)
  }

  public putUsers(endpoint: string, id: number, userData: UserTable[]) {
    return this._http.put<UserTable[]>(`${this.baseUrl}/getDataTable/${id}`, userData)

  }

  public deleteUsers(id: number){
    return this._http.delete<UserTable[]>(`${this.baseUrl}/${id}`)
  }

}
