import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import {IRowDataEventArgs, IGridEditDoneEventArgs} from 'igniteui-angular';
import { IgxGridComponent} from 'igniteui-angular';
import { UserTable } from 'src/app/interfaces';



@Component({
  selector: 'app-view-table',
  templateUrl: './view-table.component.html',
  styleUrls: ['./view-table.component.scss']
})
export class ViewTableComponent implements OnInit {
  @ViewChild('grid1', { static: true }) public grid!: IgxGridComponent;

  public searchText = '';
  public caseSensitive = false;
  public exactMatch = false;
  usersTable: UserTable[] = [];

  dataTable: [] = []

  constructor(private _ds: DataService) { }

  ngOnInit(): void {
    this.getData()
  }

  async getData(){

    await firstValueFrom(this._ds.get('getDataTable'))?.then((res: UserTable[]) => {

    this.usersTable = res;
    console.log(this.usersTable[0]['email'])

   }, err => {

    console.log(err)

   })
  }


  async rowAdded(event: IRowDataEventArgs){
    await firstValueFrom(this._ds.post('getDataTable', event.data)).then((res: UserTable[]) => {
      
      console.log(res)
     }, err => {
  
      console.log(err)
  
     }) 
  }

  async rowDeleted(event: IRowDataEventArgs){
    await firstValueFrom(this._ds.delete(`getDataTable/${event.data.id}`)).then((res: UserTable[]) => {
      
      console.log(res)
     }, err => {
  
      console.log(err)
  
     })

  }

  async rowEditDone(event: IGridEditDoneEventArgs){

    await firstValueFrom(this._ds.put('getDataTable', event.rowID, event.newValue)).then((res: UserTable[]) => {
       
      this.getData()
     }, err => {
  
      console.log(err)
  
     })

  }
  


    public clearSearch() {
      this.searchText = '';
      this.grid.clearSearch();
  }

  public searchKeyDown(ev: KeyboardEvent):void {
      if (ev.key === 'Enter' || ev.key === 'ArrowDown' || ev.key === 'ArrowRight') {
          ev.preventDefault();
          this.grid.findNext(this.searchText, this.caseSensitive, this.exactMatch);
      } else if (ev.key === 'ArrowUp' || ev.key === 'ArrowLeft') {
          ev.preventDefault();
          this.grid.findPrev(this.searchText, this.caseSensitive, this.exactMatch);
      }
  }

  public updateSearch() {
      this.caseSensitive = !this.caseSensitive;
      this.grid.findNext(this.searchText, this.caseSensitive, this.exactMatch);
  }

  public updateExactSearch() {
      this.exactMatch = !this.exactMatch;
      this.grid.findNext(this.searchText, this.caseSensitive, this.exactMatch);
  }
}
