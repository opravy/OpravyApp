import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersCollection: AngularFirestoreCollection<User>;
  private users: Observable<User[]>;
  public user: Observable<firebase.User>;

  constructor(
    private db: AngularFirestore,
    private firebaseAuth: AngularFireAuth
  ) { 

    this.usersCollection = db.collection<User>('Users');

    this.users = this.usersCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
  getUsers() {
    this.usersCollection = this.db.collection('Users', ref => ref.where('status', '==', 'pending'));
    this.users = this.usersCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    return this.users;
  }
  adduser(user: User) {
    return this.db.collection("Users").doc("la").set(user)
/*     return this.usersCollection.add(user);
 */  }
}
