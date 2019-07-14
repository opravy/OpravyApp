import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  public user: Observable<firebase.User>;

  constructor(private firebaseAuth: AngularFireAuth) {
    this.user = firebaseAuth.authState;
  }

  public getCurrentUser() {
    return new Promise<any>((resolve, reject) => {
      var user = firebase.auth().onAuthStateChanged(user => {
        if (user) {
          resolve(user);
        } else {
          reject('No esta logeado')
        }
      })
    })
  }

  public signUp(email: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      this.firebaseAuth
        .auth
        .createUserWithEmailAndPassword(email, password)
        .then(res => {
          resolve(res);
        }, err => reject(err))
    })
  }

  public logIn(email: string, password: string): any {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        return { message: 'Inicio de sesion correcto!', content: value }
      })
      .catch(error => {
        return { message: 'Algo salio mal!', content: error }
      });
  }

  public logOut() {
    this.firebaseAuth.auth.signOut();
  }
}
