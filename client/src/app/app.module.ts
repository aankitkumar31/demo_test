
import { ManageFileService } from './manage-files/manage-file.service';

import { LoginService } from './login/login.service';
import { RegisterService } from './register/register.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PagesComponent } from './pages/pages.component';

import { FileUploadComponent } from './file-upload/file-upload.component';
import { ClickOutsideModalModule } from 'click-outside-modal/click-oustide-modal.module';
import { FileUploadModule } from 'ng2-file-upload';
import { ManageFilesComponent } from './manage-files/manage-files.component';
import { HeaderComponent } from './header/header.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PagesComponent,
    FileUploadComponent,
    ManageFilesComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,AngularFontAwesomeModule,HttpModule,ClickOutsideModalModule,
    AppRoutingModule,ReactiveFormsModule,FormsModule,FileUploadModule
  ],
  providers: [RegisterService,LoginService, ManageFileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
