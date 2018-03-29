

import { ManageFilesComponent } from './manage-files/manage-files.component';
import { PagesComponent } from './pages/pages.component';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FileUploadComponent } from './file-upload/file-upload.component';

const routes: Routes = [
  {path:'',redirectTo: 'login', pathMatch: 'full'},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'fileUpload',component:FileUploadComponent},
  {
    path: 'pages',
    component:PagesComponent,
    children: [
      { path: '', redirectTo: 'manageFiles', pathMatch: 'full' },
      {path:'manageFiles',component:ManageFilesComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
