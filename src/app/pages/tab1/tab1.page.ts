import { Component } from '@angular/core';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    private authService: AuthentificationService
  ) {}

  cerrarSesion() {
    this.authService.logOut()
  }

}
