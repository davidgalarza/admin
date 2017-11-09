import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class StorageService {
  private basePath:String = '/uploads';
  private uploadTask: firebase.storage.UploadTask;
  constructor() { }
  uploadImage(img:File, path:string, fileName:string){
    let storageRef = firebase.storage().ref( this.basePath + '/' + path + '/' + fileName);
    let task = storageRef.put(img);
    return task;
  }
  removeImage(path:string, fileName:string){
    firebase.storage().ref(this.basePath + '/' + path + '/' + fileName).delete();
  }
}
