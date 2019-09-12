import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cancel',
  templateUrl: './cancel.component.html',
  styleUrls: ['./cancel.component.scss']
})
export class CancelComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CancelComponent>, private router :Router) { }

  ngOnInit() {
  }
 //DISMISS MODAL
 closeModal(){
  this.dialogRef.close('');
}
//CANCEL
cancelUser(){
  this.router.navigate(["/contactList"])
  this.dialogRef.close('');

}
}
