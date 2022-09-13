import { Component, OnInit, ViewChild } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import {IRowDataEventArgs, IGridEditDoneEventArgs} from 'igniteui-angular';
import { IgxGridComponent} from 'igniteui-angular';

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
  usersTable: any = [];

  constructor(private _ds: DataService) { }

  ngOnInit(): void {
    this.getData()
  }

  async getData() {
  this._ds.get('getDataTable')?.subscribe({
    next: (v) => this.usersTable = v,
    error: (e) => console.error(e),
    complete: () => console.info('complete') 
    })
  }


  async rowAdded(event: IRowDataEventArgs){
    await firstValueFrom(this._ds.post('getDataTable', event.data)).then((res :any) => {
      
      console.log(res)
     }, err => {
  
      console.log(err)
  
     })
  }

  async rowDeleted(event: IRowDataEventArgs){
    await firstValueFrom(this._ds.delete(`getDataTable/${event.data.id}`)).then((res :any) => {
      
      console.log(res)
     }, err => {
  
      console.log(err)
  
     })

  }

  async rowEditDone(event: IGridEditDoneEventArgs){

    await firstValueFrom(this._ds.put('getDataTable', event.rowID, event.newValue)).then((res :any) => {
      
      this.getData()
     }, err => {
  
      console.log(err)
  
     })

  }
  


    public clearSearch() {
      this.searchText = '';
      this.grid.clearSearch();
  }

  public searchKeyDown(ev: any) {
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
