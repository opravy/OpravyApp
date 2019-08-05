import { Component, OnInit } from '@angular/core';
import { RecycleReport } from 'src/app/models/recycle.model';
import { image } from './image';
import { AlertController, LoadingController, ActionSheetController, NavController } from '@ionic/angular';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { RecycleReportService } from 'src/app/services/recycle-report.service';

@Component({
  selector: 'app-agregar-reciclaje',
  templateUrl: './agregar-reciclaje.page.html',
  styleUrls: ['./agregar-reciclaje.page.scss'],
  providers: [RecycleReportService]
})
export class AgregarReciclajePage implements OnInit {

  private recycleReport: RecycleReport = {
    material: '',
    type: '',
    aproxWeight: 0,
    measurement: '',
    address: '',
    image: image,
    status: 'pending'
  };
  progress: any;

  constructor(
    private alert: AlertController,
    private loading: LoadingController,
    private actionSheet: ActionSheetController,
    private imagePicker: ImagePicker,
    private _recycledataService: RecycleReportService,
    private nav: NavController,
    private camera: Camera
  ) { }

  ngOnInit() { }

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
    this.recycleReport.image = base64;
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
                  this.recycleReport.image = image64;
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
  async saveRecycleReport() {
    const loading = await this.loading.create({
      spinner: 'circles',
      message: 'Guardando...'
    })
    await loading.present();

    this._recycledataService.addRecycleReport(this.recycleReport).then((data) => {
      this.loading.dismiss();
      this.nav.back();
    });
  }

}
