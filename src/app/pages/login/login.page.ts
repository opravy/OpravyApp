import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private authService: AuthentificationService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login(form) {
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
