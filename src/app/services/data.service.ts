import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserTable } from '../interfaces/users-table';
import { Sale } from '../interfaces/sales';


/**
 * The header component
 */


@Injectable({
  providedIn: 'root'
})
export class DataService {

  /**
   * @param baseUrl used to hold basedURl in Env
   */


  // baseAspUrl = 'https://localhost:7264/api/'

  baseUrl = environment.baseUrl;



  /**
 * This constructor initializes injectable components 
 * @param {HttpClient} http Initialize httpclient module
 */

  constructor(private http: HttpClient) { }

  /**
  * This function gets called when specific user is requested
  * @param {number} id Gets one user id
  */

  public getOneUser(id: number): Observable<UserTable[]> {
    return this.http.get<UserTable[]>(`${this.baseUrl}getDataTable/${id}`);
  }

  /**
 * This function gets called when user loggedin to home
 * @return {Observable<UserTable[]>}
*/

  public getAllUsers(): Observable<UserTable[]> {
    return this.http.get<UserTable[]>(`${this.baseUrl}getDataTable`);
  }

  /**
 * This function gets called when added new user to table 
 * @param {UserTable[]} userData
 * @return {Observable<UserTable[]>} 
*/

  public addUsers(userData: UserTable[]): Observable<UserTable[]> {
    return this.http.post<UserTable[]>(`${this.baseUrl}getDataTable`, userData)
  }


  /**
 * This function gets called when update new user from table 
 * @param {number} id User Id
 * @param {UserTable[]} userData User Data
 * @return {Observable<UserTable[]>} 
*/

  public putUsers(id: number, userData: UserTable[]): Observable<UserTable[]> {
    return this.http.put<UserTable[]>(`${this.baseUrl}getDataTable/${id}`, userData)

  }

  /**
* This function gets called when update new user from table 
* @param {number} id User Id
* @return {Observable<UserTable[]>} 
*/

  public deleteUsers(id: number): Observable<UserTable[]> {
    return this.http.delete<UserTable[]>(`${this.baseUrl}getDataTable/${id}`)
  }


/**
 * This function gets called when user loggedin to home for analytics
 * @return {Observable<Sale[]>} 
*/
  public getSales(): Observable<Sale[]> {
    return this.http.get<Sale[]>(`${this.baseUrl}getChartData`);
  }

}
