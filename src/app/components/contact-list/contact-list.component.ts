import { User } from 'src/app/models/user';
import { Component, OnInit } from '@angular/core';
import { ContactFormService } from 'src/app/services/contact-form.service';
import { FilterPipe } from '../../pipes/filter.pipe';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  contacts: User[];
  result: { key: string; contacts: any; }[];
  alphabet: string[];
  data: any[];
  lastContacts:any=[];
  constructor(private contactFormSer: ContactFormService) {
 
  }
  async ngOnInit() {
    await this.contactFormSer.getContact();
    if(this.contactFormSer.newarr!=undefined){
      console.log('newarr not empty')
      this.contactFormSer.contacts=this.contactFormSer.newarr
    }
    this.alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    this.contacts = this.contactFormSer.contacts.sort();
    this.contacts.sort((a, b) => (a.firstName > b.firstName) ? 1 : ((b.firstName > a.firstName) ? -1 : 0));
    console.log(this.contacts)
    for(let i =this.contacts.length-1 ; i>=4 ;i--){
      this.lastContacts.push(this.contacts[i]);
    }
    console.log(this.lastContacts)
    const grouped = this.contacts.reduce((groups, contact) => {
      const letter = contact.firstName.charAt(0);
      groups[letter] = groups[letter] || [];
      groups[letter].push(contact);
      return groups;
    }, {});
    console.log(grouped)
    this.result = Object.keys(grouped).map(key => ({ key: key.toUpperCase(), contacts: grouped[key] }));
    console.log(this.result);

  }
  // SCROLL TO LETTERS NAME
  scroll(letter) {
    for (var i = 0; i < document.getElementsByClassName('content').length; i++) {
      if (document.getElementsByClassName('content')[i].innerHTML.toLowerCase() == letter.toLowerCase()) {
        console.log(document.getElementsByClassName('content')[i])
        document.getElementsByClassName('content')[i].scrollIntoView();
      }
    }
  }
}
