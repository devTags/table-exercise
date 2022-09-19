import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserTable } from '../interfaces';
import { Sale } from '../interfaces/sales';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }


  public  getOneUser(id: number): Observable<UserTable[]>{
    return this.http.get<UserTable[]>(`${this.baseUrl}getDataTable/${id}`);
  }

  public  getAllUsers(): Observable<UserTable[]>{
    return this.http.get<UserTable[]>(this.baseUrl + 'getDataTable' );
  }

  public addUsers(userData: UserTable[]): Observable<UserTable[]>{
    return this.http.post<UserTable[]>(this.baseUrl + 'getDataTable', userData)
  }

  public putUsers(id: number, userData: UserTable[]): Observable<UserTable[]>{
    return this.http.put<UserTable[]>(`${this.baseUrl}/getDataTable/${id}`, userData)

  }

  public deleteUsers(id: number): Observable<UserTable[]>{
    return this.http.delete<UserTable[]>(`${this.baseUrl}/getDataTable/${id}`)
  }


  public getSales(): Observable<Sale[]> {
    return this.http.get<Sale[]>(this.baseUrl + 'getChartData ' );
  }

}
