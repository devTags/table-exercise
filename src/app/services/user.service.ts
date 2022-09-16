import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { UserTable } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private name: string = '';
  private email: string = '';
  private job: string = '';
  private image: string = '';
  private phone: number = 0;
  private address: string = '';

  constructor() { }


}
