import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { IRowDataEventArgs, IGridEditDoneEventArgs } from 'igniteui-angular';
import { IgxGridComponent } from 'igniteui-angular';
import { UserTable } from 'src/app/interfaces/users-table';
import * as _ from 'lodash';
import { ActivatedRoute } from '@angular/router';

/**
 * The header component
 */

@Component({
  selector: 'app-view-table',
  templateUrl: './view-table.component.html',
  styleUrls: ['./view-table.component.scss']
})
export class ViewTableComponent implements OnInit {

  /**
 * The header component
 * @param {IgxGridComponent} grid igxGrid variable
 * @param {string} searchText For search value holder
 * @param {boolean} caseSensitive checks if similar value
 * @param {boolean } exactMatch   checks if similar value
 * @param {UserTable } usersTable Usertable Object
 */

  @ViewChild('grid1', { static: true }) public grid!: IgxGridComponent;

  public searchText: string = '';
  public caseSensitive: boolean = false;
  public exactMatch: boolean = false;
  usersTable: UserTable[] = [];

  /**
   * @param {DataService} ds Data Service for http requests
   */

  constructor(private ds: DataService) { }


  /**
   * This function is used to getAllUserData formgroup
   */

  ngOnInit(): void {
    this.getAllUserData()
  }

  /**
   * This function is used to getAllUserData for http request
   * @return {Promise}
   */
  async getAllUserData(): Promise<void> {
    await firstValueFrom(this.ds.getAllUsers()).then((res: UserTable[]) => {
      this.usersTable = res;
    }, console.error);
  }


  /**
   * This function is used to add users in table using http request
   * @param {IRowDataEventArgs} event Data holder
   * @return {Promise}
   */
  async rowAdded(event: IRowDataEventArgs): Promise<void> {
    // console.log(event)
    await firstValueFrom(this.ds.addUsers(event.data)).then((res: UserTable[]) => console.log, console.error);
  }

  /**
 * This function is used to delete users in table using http request
 * @param {IRowDataEventArgs} event Data holder
 * @return {Promise} Data holder
 */

  async rowDeleted(event: IRowDataEventArgs): Promise<void> {

    await firstValueFrom(this.ds.deleteUsers(event.data.id)).then((res: UserTable[]) => console.log, console.error);
  }

  /**
 * This function is used to add edit in table using http request
 * @param {IGridEditDoneEventArgs} event Data holder
 * @return {Promise}
 */
  async rowEditDone(event: IGridEditDoneEventArgs): Promise<void> {

    await firstValueFrom(this.ds.putUsers(event.rowID, event.newValue)).then((res: UserTable[]) => this.getAllUserData(), console.error);

  }

  /**
* This function is used to clear search in user input
* @return {void}
*/

  public clearSearch(): void {
    this.searchText = '';
    // this.grid.clearSearch();
  }


  /**
   * This function is used to clear search in search input
   * @param {KeyboardEvent} searchKeyDown gets called when one the keys been used
   */

  public searchKeyDown(ev: KeyboardEvent): void {

    if (!_.indexOf(['Enter', 'ArrowDown', 'ArrowRight'], ev.key)) {
      // ev.preventDefault();
      // this.grid.findNext(this.searchText, this.caseSensitive, this.exactMatch);
    } else if (!_.indexOf(['ArrowUp', 'ArrowLeft'], ev.key)) {
      // ev.preventDefault();
      // this.grid.findPrev(this.searchText, this.caseSensitive, this.exactMatch);
    }
  }

  /**
   * This function getis used when new updateSearch from search input
   * @return {void} gets called when one the keys been used
   */

  public updateSearch(): void {
    this.caseSensitive = !this.caseSensitive;
    // this.grid.findNext(this.searchText, this.caseSensitive, this.exactMatch);
  }

  /**
   * This function gets used when new updateSearch from search input
   * @return {void} gets called when one the keys been used
   */

  public updateExactSearch(): void {
    this.exactMatch = !this.exactMatch;
    // this.grid.findNext(this.searchText, this.caseSensitive, this.exactMatch);
  }
}
