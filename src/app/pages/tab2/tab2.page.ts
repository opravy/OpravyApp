import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Report } from 'src/app/models/report.model';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  providers: [DataService]
})
export class Tab2Page implements OnInit {

  private reports: Report[];

  constructor(private _dataService: DataService) { }

  ngOnInit() {
    this._dataService.getReports().subscribe(res => {
      this.reports = res;
    });
  }

}
