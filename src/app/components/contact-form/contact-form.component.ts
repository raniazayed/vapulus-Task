import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactFormService } from 'src/app/services/contact-form.service';
import { UserResponse } from 'src/app/models/user-response';
import { User } from 'src/app/models/user';
import { UploadImgService } from 'src/app/services/upload-img.service';
import { CancelComponent } from 'src/app/modals/cancel/cancel.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;
  default: string="assets/images/user.png"
  selectedImge: File = null;
  res:UserResponse
  constructor(private router:Router, private contactFormSer:ContactFormService, private uploadimgser:UploadImgService,public dialog: MatDialog) { }

async  ngOnInit() {
    this.contactForm = new FormGroup({
      email: new FormControl(null, [Validators.required, this.validateEmail]),
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      image: new FormControl(null,[Validators.required]),
      mobileNumber: new FormControl(null, [Validators.required,this.phoneCheck])
    });
  await  this.contactFormSer.getContact();
  }
  get email() {
    return this.contactForm.get("email");
  }
  get firstName() {
    return this.contactForm.get("firstName");
  }
  get lastName() {
    return this.contactForm.get("lastName");
  }
  get image() {
    return this.contactForm.get("image");
  }
  get mobileNumber() {
    return this.contactForm.get("mobileNumber");
  }
  
  // phoneCheck validation
  phoneCheck(control: FormControl): { [s: string]: boolean } {
    const pattdig = new RegExp('^[0-9]+$');
    if (pattdig.test(control.value) == true) {
      if (control.value.toString().length !== 11) {
        return { 'Phoneerror': true } //non-valid
      }
      else {
        return null; //valid
      }
    }else{
      return { 'Phoneerror': true } //non-valid
    }
  }
  //VALIDATE EMAIL
  validateEmail(control: FormControl): { [s: string]: boolean } {
    var valid = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (valid.test(control.value)) {
      console.log(control.value)
      return null; // vaild
    }
    return { 'validationError': true } //invalid
  }
  //CANCEL FORM
  cancelForm(){
    const dialogRef = this.dialog.open(CancelComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
    });
  }
  //SELECT IMAGE
  onFileSelected(file:FileList){
    console.log(file)
    this.selectedImge = file.item(0);
    console.log(this.selectedImge)
    var reader = new FileReader();
    reader.onload = (event: any) => {
        this.default = event.target.result;
        console.log(this.default)
      
    }
    reader.readAsDataURL(this.selectedImge)
  }
 async onSubmit(form){
  await this.uploadimgser.upload(this.selectedImge);
  form.value.image= await this.uploadimgser.imageUrl
    this.contactFormSer.newarr=this.contactFormSer.contacts;
    this.contactFormSer.newarr.push(form.value)
    this.router.navigate(["/contactList"])
  }
}
