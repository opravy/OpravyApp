import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';

@Injectable()
export class DataService {

  constructor(
    private db: AngularFireDatabase,
    private afStorage: AngularFireStorage
  ) { }

  uploadToStorage(information, userID): AngularFireUploadTask{
    let newName = `${new Date().getTime(), userID}.txt`;

    return this.afStorage.ref(`files/${newName}`).putString(information);
  }

  storeInforToDatabase(metaInfo) {
    let toSave = {
      created: metaInfo.created,
      url: metaInfo.downloadURLs[0],
      fullpath: metaInfo.fullpath,
      contentType: metaInfo.contentType
    }

    return this.db.list('files').push(toSave);
  }

}
