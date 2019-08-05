import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { Report } from 'src/app/models/report.model';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  providers: [ReportService]
})
export class Tab2Page implements OnInit {

  private reports: Report[];

  constructor(
    private _reportDataService: ReportService
  ) { }

  ngOnInit() {
    this._reportDataService.getReports().subscribe(res => {
      this.reports = res;
      console.log(this.reports);
    });
  }

}
