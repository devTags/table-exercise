import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import * as _ from 'lodash';

import { Router } from '@angular/router';
import { UserTable } from 'src/app/interfaces';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  value1: string = '';
  isLoggedin: boolean = false;
  usersTable: UserTable[] = [];

  constructor(private fb: FormBuilder, private ds: DataService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: new FormControl('', Validators.email),
      password: new FormControl('', Validators.minLength(2)),
    })
  }

  async signin(): Promise<void> {
    try {
      if(!this.loginForm.valid)
      
        throw new Error('Form is not valid!!');
      await firstValueFrom(this.ds.getAllUsers()).then((res: UserTable[]) =>this.filterAccounts(res));
    } catch (error: any) {
      alert(error.message)
    }
  }
 /**
  * @param res 
  * @param _email 
  * @param _password 
  */
  private filterAccounts(res: UserTable[]) {
    this.isLoggedin = true;
    const _email = this.loginForm.get('email')?.value;
    const _password = this.loginForm.get('password')?.value;
    const account = _.filter(res, (e) => (e.email === _email && e.password === _password));
    (account && _.size(account)) ? this.pageTransit(account) : alert("Account not Found!");
  }
  /** 
   * @param account 
   */
  private pageTransit(account: UserTable[]) {
    // this._us.setUser(account[0]);
    setTimeout(() =>{
      this.isLoggedin = false;
      this.router.navigate(['/table'], {queryParams: {accounts: account[0].id}});
    },1500)
  }

 }
