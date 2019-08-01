import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Report } from '../models/report.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private reportsCollection: AngularFirestoreCollection<Report>;
  private reports: Observable<Report[]>;

  constructor(
    private db: AngularFirestore,
    private afStorage: AngularFireStorage
  ) {
    this.reportsCollection = db.collection<Report>('Reports');

    this.reports = this.reportsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getReports(minLng, maxLng, minLtd, maxLtd) {
    this.reportsCollection = this.db.collection('Reports', ref => ref.where('location.latitude', '>=', minLtd)
    .where('location.latitude', '<=', maxLtd));

    this.reports = this.reportsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    )

    return this.reports;
  }

  addReport(report: Report) {
    return this.reportsCollection.add(report);
  }

  uploadImage(image) {
    const filePath = `report_image_${new Date().getTime()}.jpg`
    image = 'data:image/jpg;base64,' + image;
    return this.afStorage.ref(filePath).putString(image, 'data_url');
  }
}
