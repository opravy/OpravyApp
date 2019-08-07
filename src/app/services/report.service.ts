import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Report } from '../models/report.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private reportsCollection: AngularFirestoreCollection<Report>;
  private reports: Observable<Report[]>;

  constructor(
    private db: AngularFirestore
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

  getReports() {
    this.reportsCollection = this.db.collection('Reports', ref => ref.where('status', '==', 'pending'));
    this.reports = this.reportsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    );

    return this.reports;
  }

  addReport(report: Report) {
    return this.reportsCollection.add(report);
  }

  reportsGraphics(){

    this.reportsCollection = this.db.collection('Reports', ref => ref.where('status', '==', 'pending'));
    this.reports = this.reportsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data};
        });
      })
    );

    return this.reports
  }
}
