import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { UserTable } from '../interfaces';
import { DataService } from '../services/data.service';
import * as _ from 'lodash';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  value1: string = '';
  usersTable: UserTable[] = [];

  constructor(private _fb: FormBuilder, private _ds: DataService, private _us: UserService, private _router: Router) { }

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: new FormControl('', Validators.email),
      password: new FormControl('', Validators.minLength(2)),
    })
  }


  async signin(): Promise<void> {
    await firstValueFrom(this._ds.getUsers()).then((res: UserTable[]) => { 
      let load = res;
      if(this.loginForm.valid){
        load.filter((e) => {
          if(e.email === this.loginForm.get('email')?.value && e.password === this.loginForm.get('password')?.value) {
            console.log('true')
            this._us.setUser(e.name, e.email, e.jobTitle, e.image, Number(e.phone), e.address);
            this._router.navigate(['/table']);
          }
        }) 
      }else{
        console.log('form is not valid')
      }
    } , console.error);
  }

 
 }
