import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserTable } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseUrl: string = 'https://631ee3db22cefb1edc3ced68.mockapi.io/';

  constructor(private _http: HttpClient) { }



  public  get(endpoint: string){
    return this._http.get<UserTable[]>(this.baseUrl + endpoint);

  }

  public post(endpoint: string, userData: UserTable[]){
    return this._http.post<UserTable[]>(this.baseUrl + endpoint, userData)
  }

  public put(endpoint: string, id: number, userData: UserTable[]) {
    return this._http.put<UserTable[]>(`${this.baseUrl}${endpoint}/${id}`, userData)

  }

  public delete(endpoint: string){
    return this._http.delete<UserTable[]>(this.baseUrl + endpoint)
  }

}
