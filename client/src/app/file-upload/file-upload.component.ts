import { Component, OnInit } from '@angular/core';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { Url } from '../common/serverurl.class';
const UrlFile = `${Url.url}/uploadFile`;
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  
  public uploader:FileUploader = new FileUploader({url: UrlFile, itemAlias: 'avatar'});
  constructor() { }

  ngOnInit() {
    this.uploader.onBeforeUploadItem=(file)=> { debugger;}
    this.uploader.onAfterAddingFile = (file)=> { debugger;file.withCredentials = false;
    this.uploader.options.additionalParameter = {
      email: localStorage.getItem('email')
    }; }
  }
  submit(){
    debugger;
    this.uploader.uploadAll();
  }
}
