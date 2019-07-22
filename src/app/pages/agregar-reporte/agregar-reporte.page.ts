import { Component, OnInit } from '@angular/core';
import { Geolocation } from "@ionic-native/geolocation";
import * as L from 'leaflet'
import { AlertController } from '@ionic/angular';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-agregar-reporte',
  templateUrl: './agregar-reporte.page.html',
  styleUrls: ['./agregar-reporte.page.scss'],
})
export class AgregarReportePage implements OnInit {

  ltd: number = 14.634915;
  lng: number = -90.506882;

  constructor(private alert: AlertController) { }

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
}
