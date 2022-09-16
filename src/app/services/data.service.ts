import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserTable } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseUrl = environment.baseUrl;

  constructor(private _http: HttpClient) { }



  public  getUsers(): Observable<UserTable[]>{
    return this._http.get<UserTable[]>(this.baseUrl + 'getDataTable' );

  }

  public addUsers(userData: UserTable[]): Observable<UserTable[]>{
    return this._http.post<UserTable[]>(this.baseUrl + 'getDataTable', userData)
  }

  // public putUsers(id: number, userData: UserTable[]): Observable<UserTable[]>{
  //   return this._http.put<UserTable[]>(`${this.baseUrl}/getDataTable/${id}`, userData)

  // }

  // public deleteUsers(id: number): Observable<UserTable[]>{
  //   return this._http.delete<UserTable[]>(`${this.baseUrl}/getDataTable/${id}`)
  // }

}
