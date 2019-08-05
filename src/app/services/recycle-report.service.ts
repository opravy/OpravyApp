import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { RecycleReport } from '../models/recycle.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecycleReportService {
  private recycleReportsCollection: AngularFirestoreCollection<RecycleReport>;
  private recycleReports: Observable<RecycleReport[]>;

  constructor(
    private db: AngularFirestore
  ) {
    this.recycleReportsCollection = db.collection<RecycleReport>('RecycleReports');

    this.recycleReports = this.recycleReportsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getRecycleReports() {
    this.recycleReportsCollection = this.db.collection('RecycleReports', ref => ref.where('status', '==', 'pending'));
    this.recycleReports = this.recycleReportsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );

    return this.recycleReports;
  }

  addRecycleReport(recycleReport: RecycleReport) {
    return this.recycleReportsCollection.add(recycleReport);
  }
}
