import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { IRowDataEventArgs, IGridEditDoneEventArgs } from 'igniteui-angular';
import { IgxGridComponent } from 'igniteui-angular';
import { UserTable } from 'src/app/interfaces';
import * as _ from 'lodash';



@Component({
  selector: 'app-view-table',
  templateUrl: './view-table.component.html',
  styleUrls: ['./view-table.component.scss']
})
export class ViewTableComponent implements OnInit {
  @ViewChild('grid1', { static: true }) public grid!: IgxGridComponent;

  public searchText: string = '';
  public caseSensitive: boolean = false;
  public exactMatch: boolean = false;
  usersTable: UserTable[] = [];

  constructor(private _ds: DataService) { }

  ngOnInit(): void {
    this.getData()
  }

  async getData(): Promise<void> {
    await firstValueFrom(this._ds.getUsers()).then((res: UserTable[]) => ( this.usersTable = res ), console.error);
  }


  async rowAdded(event: IRowDataEventArgs): Promise<void> {
    await firstValueFrom(this._ds.addUsers(event.data)).then((res: UserTable[]) => console.log , console.error);
  }

  // async rowDeleted(event: IRowDataEventArgs): Promise<void> {
  //   await firstValueFrom(this._ds.deleteUsers(event.data.id)).then((res: UserTable[]) => console.log , console.error);
  // }

  // async rowEditDone(event: IGridEditDoneEventArgs): Promise<void> {

  //   await firstValueFrom(this._ds.putUsers(event.rowID, event.newValue)).then((res: UserTable[]) => this.getData(), console.error);

  // }

  public clearSearch(): void {
    this.searchText = ''; 
    this.grid.clearSearch();
  }

  public searchKeyDown(ev: KeyboardEvent): void {

    if (!_.indexOf(['Enter','ArrowDown','ArrowRight'],  ev.key)) {
      ev.preventDefault();
      this.grid.findNext(this.searchText, this.caseSensitive, this.exactMatch);
    } else if (!_.indexOf(['ArrowUp','ArrowLeft'],  ev.key)) {
      ev.preventDefault();
      this.grid.findPrev(this.searchText, this.caseSensitive, this.exactMatch);
    }
  }

  public updateSearch(): void {
    this.caseSensitive = !this.caseSensitive;
    this.grid.findNext(this.searchText, this.caseSensitive, this.exactMatch);
  }

  public updateExactSearch(): void {
    this.exactMatch = !this.exactMatch;
    this.grid.findNext(this.searchText, this.caseSensitive, this.exactMatch);
  }
}
