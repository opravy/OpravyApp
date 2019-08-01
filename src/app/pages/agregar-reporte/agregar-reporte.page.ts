import { Component, OnInit } from '@angular/core';
import { Geolocation } from "@ionic-native/geolocation";
import * as L from 'leaflet'
import { AlertController, LoadingController, ActionSheetController, NavController } from '@ionic/angular';
import { Report } from "../../models/report.model";
import { DataService } from 'src/app/services/data.service';
import { ImagePicker } from "@ionic-native/image-picker/ngx";
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { image } from './image'

@Component({
  selector: 'app-agregar-reporte',
  templateUrl: './agregar-reporte.page.html',
  styleUrls: ['./agregar-reporte.page.scss'],
  providers: [DataService]
})
export class AgregarReportePage implements OnInit {

  private  ltd: number = 14.634915;
  private lng: number = -90.506882;
  private latLong;

  private report: Report = {
    title: '',
    description: '',
    priority: 0,
    labels: [{
      label: 'Elctricidad',
      color: 'warning',
      icon: 'flash'
    },
    {
      label: 'Drenajes',
      color: 'primary',
      icon: 'water'
    },
    {
      label: 'Carreteras',
      color: 'success',
      icon: 'car'
    },
    {
      label: 'Infraestructura',
      color: 'tertiary',
      icon: 'business'
    },
    {
      label: 'Otros',
      color: 'black',
      icon: 'hammer'
    }],
    image: image,
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
    private imagePicker: ImagePicker,
    private _dataService: DataService,
    private camera: Camera,
    private nav: NavController
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
    });
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

  //MAP CODE
  loadMap(latitude, longitude) {
    var mymap = L.map('mapid').setView([latitude, longitude], 17);
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

  removeLabel(label) {
    for (let i = 0; i < this.report.labels.length; i++) {
      if (this.report.labels[i].label === label) {
        this.report.labels.splice(i, 1);
      }
    }
  }

  //IMAGE CODE
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
    const base64: string = await this.captureImage();
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
                this.encodeImageUri(result[i], (image64) => {
                  this.report.image = image64;
                })
              }
            }, (err) => console.log(err)
          );
        }
      }, (err) => {
        console.log(err);
      });
  }

  encodeImageUri(imageUri, callback) {
    var c = document.createElement('canvas');
    var ctx = c.getContext("2d");
    var img = new Image();
    img.onload = function () {
      var aux: any = this;
      c.width = aux.width;
      c.height = aux.height;
      ctx.drawImage(img, 0, 0);
      var dataURL = c.toDataURL("image/jpeg");
      callback(dataURL);
    };
    img.src = imageUri;
  }

  //FIREBASE CODE
  async saveReport() {
    const loading = await this.loading.create({
      spinner: 'circles',
      message: 'Guardando...'
    })
    await loading.present();

    this.report.location.longitude = this.lng;
    this.report.location.latitude = this.ltd;
    
    this._dataService.addReport(this.report).then((data) => {
      this.loading.dismiss();
      this.nav.back();
    });
  }
}
