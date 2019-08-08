import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { Router } from '@angular/router';
import { User } from "../../models/user.model";
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  providers:[UserService]
})
export class SignupPage implements OnInit {
  private status = false;
  private errMessage: string;
  private user:User={
    nombre:'',
    direccion:'',
    imagen:'',       
    status: ''
  }
  constructor(
    private authService: AuthentificationService,
    private router: Router,
    public toastController: ToastController
  ) { }

  ngOnInit() {
  }

  async presentToast(message: string, button) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      buttons: [
        button
      ]
    });
    
    toast.present()
  }

  public logearse() {
    this.router.navigate(['login']);
  }

  async signUp(form) {
    await this.authService.signUp(form.value.email, form.value.password)
      .then(value => {
        this.status = true;
      }, err => {
        this.status = false;
        this.errMessage = err.message;
      })

    if (this.status) {
      this.authService.logIn(form.value.email, form.value.password);
      this.authService.getCurrentUser().then(user => {
        if (user) {
          user.uid //PRULULULULU
        }
     })




     /*  await this.presentToast('Registro correcto, se puede logear.',
        {
          side: 'end',
          icon: 'log-in',
          text: 'Login',
          handler: () => {
            this.router.navigate(['login'])
          }
        }); */
    } else {
      this.presentToast(this.errMessage,
        {
          text: 'Aceptar'
        })
    }

  }

}
