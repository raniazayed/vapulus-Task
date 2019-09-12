import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFireStorage } from 'angularfire2/storage';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { FilterPipe } from './pipes/filter.pipe';
import { CancelComponent } from './modals/cancel/cancel.component';
import { ContactFormService } from './services/contact-form.service';


@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    ContactFormComponent,
    FilterPipe,
    CancelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,MatIconModule,MatDialogModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyAGxRNzw5iuDZeVWBXZVsktK9r-Q9nI6KM",
      authDomain: "cart-9b31c.firebaseapp.com",
      databaseURL: "https://cart-9b31c.firebaseio.com",
      projectId: "cart-9b31c",
      storageBucket: "cart-9b31c.appspot.com"
    })
  ],
  providers: [AngularFireStorage,ContactFormService],
  bootstrap: [AppComponent],
  entryComponents:[CancelComponent],
})
export class AppModule { }
