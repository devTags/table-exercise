import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom, Subscription } from 'rxjs';
import * as _ from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';
import { UserTable } from 'src/app/interfaces/users-table';
import { DataService } from 'src/app/services/data.service';

/**
 * The header component
 */

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  /**
   * This variables are used for login and filtering user data
   * @property loginForm Login form holder
   * @param {FormGroup} loginForm loginForm Group holder
   * @param {boolean} isLoggedin For loading screen
   * @param {UserTable[]} UserTable User Table Interface
   * @param {UserTable[]} filtered_accounts User Table Interface for filtering
   */

  loginForm!: FormGroup;
  isLoggedin: boolean = false;
  usersTable: UserTable[] = [];
  filtered_accounts: UserTable[] = [];


  /**
 * This constructor initializes injectable components 
 * @param {FormBuilder} fb Form Builder for input forms
 * @param {DataService} ds Data Service for http requests
 * @param {Router} router Router for navigation
 * @param {ActivatedRoute} _routeActive ActivatedRoute for passing data in url
 */

  constructor(public fb: FormBuilder, public ds: DataService, public router: Router, private _routeActive: ActivatedRoute) { }



  /**
   * This function is used to initialize formgroup
   * And calls isLoggined method
   * @param loginForm.email Email holder
   * @param loginForm.password Email holder
   */

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(2)]),
    })

    if (this.isLoggined()) {
      this.router.navigate(['login']);
    }
  }

  /**
* This function is used to check if user is signed in
* @return isLoggedin
*/
  isLoggined(): Subscription {
    let isLogged = this._routeActive.queryParams
      .subscribe((_params) => { });
    return isLogged
  }

  /**
 * This function is used to get users data when the signIn function is called
 */
  async getUsers(): Promise<void> {
    await firstValueFrom(this.ds.getAllUsers()).then((res: UserTable[]) => this.filterAccounts(res));
  }

  /**
   * This function is used to login when the submit buttons was clicked
   * @return {Promise} 
   */
  async signin(): Promise<void> {
    try {
      if (!this.loginForm.valid)
        throw new Error('Form is not valid!!');
      this.getUsers();
    } catch (error: any) {
      alert(error.message)
    }
  }

  /**
   * This function is used to filter accounts upon login
   * @param res Res is the payload object for filtering accounts
   */
  filterAccounts(res: UserTable[]): void {
    this.isLoggedin = true;
    const { email, password } = this.loginForm.value;

    this.filtered_accounts = _.filter(res, { email: email, password: password });

    this.isLoggedin = false;

    if (this.filtered_accounts) {
      this.pageTransit(this.filtered_accounts);
      this.isLoggedin = true;
    }
  }
  /** 
   * This function is used to navigate to table page after login
   * @param account Account is the payload object after filtering accounts
   */
  pageTransit(account: UserTable[]): void {
    // this._us.setUser(account[0]);
    setTimeout(() => {
      this.isLoggedin = false;
      this.router.navigate(['/main', account[0].id]);
    }, 1500)
  }

}
