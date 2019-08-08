import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  userEmail: string;

  constructor(
    private router: Router,
    private authService: AuthentificationService

  ) {}
  ngOnInit(){
  this.authService.userDetails()
      this.userEmail = this.authService.userDetails().email;
  
  }
  cerrarSesion() {
    this.authService.logOut()
    this.goToLogin()
  }
  goToLogin() {
    this.router.navigate(['login']);
  }

}
