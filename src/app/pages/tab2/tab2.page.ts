import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Report } from 'src/app/models/report.model';
import { Geolocation } from "@ionic-native/geolocation";
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  providers: [DataService]
})
export class Tab2Page implements OnInit {

  private reports: Report[];
  private minLatitude;
  private maxLatitude;
  private minLongitude;
  private maxLongitude;

  constructor(
    private _dataService: DataService,
    private alert: AlertController
  ) { }

  ngOnInit() {
    Geolocation.getCurrentPosition().then(res => {
      this.minLatitude = res.coords.latitude - 0.03;
      this.maxLatitude = res.coords.latitude + 0.03;
      this.minLongitude = res.coords.longitude - 0.03;
      this.maxLongitude = res.coords.longitude + 0.03;

      this._dataService.getReports(this.minLongitude, this.maxLongitude, this.minLatitude, this.maxLatitude).subscribe(res => {
        this.reports = res;
        console.log(this.reports);
      });
    }).catch(error => {
      this.showAlert('Location', 'Unable to find your current location', 'Try again');
      console.log('Error: ' + error);
    });
  }

  showAlert(header, message, buttons) {
    this.alert.create({
      header: header,
      message: message,
      buttons: [buttons]
    })
  }

}
