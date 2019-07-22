import { Component, OnInit } from '@angular/core';
import { Geolocation } from "@ionic-native/geolocation";
import * as L from 'leaflet'
import { AlertController, LoadingController } from '@ionic/angular';
import { Report } from "../../models/report.model";
import { DataService } from 'src/app/services/data.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-agregar-reporte',
  templateUrl: './agregar-reporte.page.html',
  styleUrls: ['./agregar-reporte.page.scss'],
  providers: [DataService, ImageService]
})
export class AgregarReportePage implements OnInit {

  ltd: number = 14.634915;
  lng: number = -90.506882;
  private report: Report = {
    title: '',
    description: '',
    priority: 0,
    image: '',
    location: {
      latitude: this.ltd,
      longitude: this.lng
    }
  };

  constructor(
    private alert: AlertController,
    private loading: LoadingController,
    private _dataService: DataService,
    private _imageService: ImageService
  ) { }

  ngOnInit() {
    Geolocation.getCurrentPosition()
      .then(res => {
        this.ltd = res.coords.latitude;
        this.lng = res.coords.longitude;
        this.loadMap(this.ltd, this.lng);
      })
      .catch(error => {
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

  loadMap(latitude, longitude) {
    var mymap = L.map('mapid').setView([latitude, longitude], 13);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiamNoaWNvaiIsImEiOiJjanlkbmhhYmYwcmxwM2VtZms3Zm9yZ2duIn0.o84D0XBR-Noe5ulUFXHJdA', {
      attribution: 'Opravy',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'your.mapbox.access.token'
    }).addTo(mymap);

    var marker = L.marker([latitude, longitude]).addTo(mymap);

    function onMapClick(e) {
      if (marker !== null) {
        mymap.removeLayer(marker);
      }

      marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(mymap);
    }

    mymap.on('click', onMapClick);
  }

  async saveReport() {
    const loading = await this.loading.create({
      spinner: 'circles',
      message: 'Saving...'
    });
    await loading.present();

    this._dataService.uploadImage(this.report.image).then((snapshot: any) => {
      let uploadedImage: any = snapshot.downloadURL;
      this.report.image = uploadedImage;

      this._dataService.addReport(this.report).then((data) => {
        this.loading.dismiss();
      })
    })
  }

  selectImage() {
    this._imageService.selectImage()
      .then((data) => {
        this.report.image = data;
      });
  }

}
