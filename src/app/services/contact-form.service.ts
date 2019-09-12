import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserResponse } from '../models/user-response';
import { User } from '../models/user';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactFormService {
  contacts: User[];
  newarr:any

  constructor(private  http:HttpClient) {
   }
   async getContact(): Promise<any>{
    const res = await this.http.get<UserResponse>("assets/recent-contact.json").toPromise(); 
    
    this.contacts = res.data
    console.log(this.contacts)

   return new Promise(resolve => {
     resolve(this.contacts);
   });
 }

}
