import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { UserTable } from 'src/app/interfaces';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  
  avatar: string = '';

  constructor(private ds: DataService, private routeActive: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeActive.queryParams
    .subscribe((params) => {
      this.getOneUser(params['accounts'])
    });
  }

  async getOneUser(id: number): Promise<void> {
    await firstValueFrom(this.ds.getOneUser(id)).then((res: UserTable[]) => 
    {
      // let data = JSON.stringify(res)
      // console.log(data[0])
    }
    , console.error);
  }

}
