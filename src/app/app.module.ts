import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FacilitiesComponent } from './components/facilities/facilities.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from  '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from '@angular/material/form-field';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteDialogComponent } from './components/facilities/delete-dialog/delete-dialog.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { EditDialogComponent } from './components/facilities/edit-dialog/edit-dialog.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NewDialogComponent } from './components/facilities/new-dialog/new-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FacilitiesComponent,
    DeleteDialogComponent,
    EditDialogComponent,
    NewDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    FlexLayoutModule,
    MatTableModule,
    HttpClientModule,
    DataTablesModule,
    MatDialogModule,
    MatPaginatorModule,
    MatCheckboxModule,
    ReactiveFormsModule,
  ],  
  entryComponents: [
    DeleteDialogComponent,
    EditDialogComponent,
    NewDialogComponent,
  ],
  exports: [
    MatCheckboxModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
