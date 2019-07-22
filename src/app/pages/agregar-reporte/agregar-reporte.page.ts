import { Component, OnInit } from '@angular/core';
import { Geolocation } from "@ionic-native/geolocation";
import * as L from 'leaflet'
import { AlertController, LoadingController, ActionSheetController } from '@ionic/angular';
import { Report } from "../../models/report.model";
import { DataService } from 'src/app/services/data.service';
import { ImageService } from 'src/app/services/image.service';
import { AngularFireUploadTask } from '@angular/fire/storage';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

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
    },
    status: 'pending'
  };
  progress: any;

  constructor(
    private alert: AlertController,
    private loading: LoadingController,
    private actionSheet: ActionSheetController,
    private _dataService: DataService,
    private _imageService: ImageService,
    private task: AngularFireUploadTask,
    private camera: Camera,
    private imagePicker
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

  async showActionSheet() {
    const actionSheet = await this.actionSheet.create({
      header: 'Opciones de imagen',
      buttons: [{
        text: 'Tomar foto',
        icon: 'camera',
        handler: () => {
          this.takePicture();
        }
      }, {
        text: 'Seleccionar de la galería',
        icon: 'image',
        handler: () => {
          this.openImagePicker();
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
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
      message: 'Guardando...'
    })
    await loading.present();

    this._dataService.uploadImage(this.report.image).then((result: any) => {
      this.task = result;
      let uploadedImage = result.downloadURL;
      this.report.image = uploadedImage;

      this._dataService.addReport(this.report).then((data) => {
        this.loading.dismiss();
      });
    });
  }

  async captureImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA
    }

    return await this.camera.getPicture(options)
  }

  async takePicture() {
    const base64 = await this.captureImage();
    this.report.image = base64;
  }

  openImagePicker() {
    this.imagePicker.hasReadPermission().then(
      (result) => {
        if (result == false) {
          this.imagePicker.requestReadPermission();
        }
        else if (result == true) {
          this.imagePicker.getPictures({
            maximumImagesCount: 1
          }).then(
            (results) => {
              for (var i = 0; i < results.length; i++) {
                this._dataService.uploadImage(results[i]);
              }
            }, (err) => console.log(err)
          );
        }
      }, (err) => {
        console.log(err);
      });
  }

}
