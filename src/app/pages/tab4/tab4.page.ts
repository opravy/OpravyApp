import { Component, OnInit } from '@angular/core';
import { RecycleReport } from 'src/app/models/recycle.model';
import { RecycleReportService } from 'src/app/services/recycle-report.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  providers: [RecycleReportService]
})
export class Tab4Page implements OnInit {

  private reports: RecycleReport[];

  constructor(
    private _recycleService: RecycleReportService
  ) { }

  ngOnInit() {
    this._recycleService.getRecycleReports().subscribe(res => {
      this.reports = res;
      console.log(this.reports);
    });
  }

}
