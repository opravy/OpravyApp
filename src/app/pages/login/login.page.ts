import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private alertController: AlertController,
    private loadingController: LoadingController,
    private authService: AuthentificationService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async showAlert(header, subheader, message, buttons) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subheader,
      message: message,
      buttons: [buttons]
    });

    await alert.present();
  }

  async login(form) {
    const loading = await this.loadingController.create({
      spinner: 'circles'
    });
    await loading.present();

    this.authService.logIn(form.value.email, form.value.password);

    this.goToHome();
  }

  goToHome() {
    this.router.navigate(['']);
  }

  public registro() {
    this.router.navigate(['signup']);
  }

}
