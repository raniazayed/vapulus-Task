import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';

@Injectable({
  providedIn: 'root'
})
export class UploadImgService {

  imageUrl: any;
  // UPLOAD IMG ON FIREBASE
constructor(private afstorage: AngularFireStorage) { }
storageRef: AngularFireStorageReference;
uploadImage: AngularFireUploadTask;
downloadURL: Observable<string>
 async upload(fileToUpload: File) : Promise<any> {
  var filename = fileToUpload.name;
  this.storageRef = this.afstorage.ref('/formImages/' + filename);
  this.storageRef.put(fileToUpload).then(function (result) {
    console.log(result)
  })
  this.downloadURL = this.storageRef.getDownloadURL();
  console.log(this.downloadURL)
const url =    await this.downloadURL.toPromise();
this.imageUrl =   url;
      
    console.log(this.imageUrl)
    return this.imageUrl;

}}
