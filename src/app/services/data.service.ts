import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseUrl: string = 'https://631ee3db22cefb1edc3ced68.mockapi.io/'

  constructor(private _http: HttpClient) { }



  public get(endpoint: string){
    return this._http.get(this.baseUrl + endpoint)

  }

  public post(endpoint: string,jsonData: any) {
    return this._http.post(this.baseUrl + endpoint, jsonData)
  }

  public put(endpoint: string, id: number, jsonData: any) {
    return this._http.put(this.baseUrl + endpoint +'/'+id, jsonData)

  }

  public delete(endpoint: string){
    return this._http.delete(this.baseUrl + endpoint)
  }

}
