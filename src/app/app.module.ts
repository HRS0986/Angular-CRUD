import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from  '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from '@angular/material/form-field';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav'; 
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoginComponent } from './components/login/login.component';
import { FacilitiesComponent } from './components/facilities/facilities.component'
import { DeleteDialogComponent } from './components/facilities/delete-dialog/delete-dialog.component';
import { EditDialogComponent } from './components/facilities/edit-dialog/edit-dialog.component';
import { NewDialogComponent } from './components/facilities/new-dialog/new-dialog.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthInterceptor } from './helpers/auth.interceptor';
import { AuthService } from './services/auth.service';
import { FacilitiesService } from './services/facilities.service';
import { TokenStorageService } from "./services/token-storage.service";
import { ShareDataService } from "./services/share-data.service";
import { UserService } from "./services/user.service";
import { FacilityAuthGuard } from "./guards/facility-auth.guard";
import { LoginAuthGuard } from "./guards/login-auth.guard";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FacilitiesComponent,
    DeleteDialogComponent,
    EditDialogComponent,
    NewDialogComponent,
    RegisterComponent,
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
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule
  ],  
  entryComponents: [
    DeleteDialogComponent,
    EditDialogComponent,
    NewDialogComponent,
  ],
  exports: [
    MatCheckboxModule,
    MatSidenavModule,
  ],
  providers: [
    AuthService,
    UserService,
    FacilitiesService,
    ShareDataService,
    TokenStorageService,
    FacilityAuthGuard,
    LoginAuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
