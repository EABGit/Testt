import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {HttpClientModule} from '@angular/common/http';
import { NgToastModule } from 'ng-angular-popup';
import {NgConfirmModule} from 'ng-confirm-box';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CreateRegistrationComponent } from './create-registration/create-registration.component';

import { RegistrationListComponent } from './registration-list/registration-list.component';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
//import { MatButtonModule } from '@angular/material/button';
import { NgxSpinnerModule } from 'ngx-spinner';
import {MatSidenavModule} from '@angular/material/sidenav';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateRegistrationComponent,
    
    RegistrationListComponent,
         HomeComponent,
         AboutComponent,
         ConfirmationDialogComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgToastModule,
    NgConfirmModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule ,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxSpinnerModule,
    MatSidenavModule,
    NgxMatSelectSearchModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
