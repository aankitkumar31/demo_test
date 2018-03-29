import { ManageFileService } from './manage-file.service';
import { EmailValidation } from './../validators/emailValid';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { Component, OnInit } from '@angular/core';
import { Url } from '../common/serverurl.class';
const UrlFile = `${Url.url}/uploadFile`;

@Component({
  selector: 'app-manage-files',
  templateUrl: './manage-files.component.html',
  styleUrls: ['./manage-files.component.css']
})
export class ManageFilesComponent implements OnInit {

  sendEmailForm: FormGroup;
  filesArray = [];
  successMsg:string;
  isSuccess:boolean = true;
  errorMsg:string;
  isError:boolean = true;
  isLoading:boolean = true;

  // public uploader:FileUploader = new FileUploader({url: URL});
  
  public uploader:FileUploader = new FileUploader({url: UrlFile, itemAlias: 'avatar'});
  constructor(private fb:FormBuilder, private manageFileService: ManageFileService) { }

  ngOnInit() {
    this.uploader.onBeforeUploadItem=(file)=> { debugger;}
    this.uploader.onAfterAddingFile = (file)=> { debugger;file.withCredentials = false;
      this.uploader.options.additionalParameter = {
      businessEmail: localStorage.getItem('businessEmail')
    };
    }

    this.sendEmailForm = this.fb.group({
      'guestEmail':['',[Validators.required,EmailValidation.emailValid]],
      'password':[''],
    })    

    this.manageFileService.getAllFiles().subscribe(
      res=>{
        console.log(res);
        this.isLoading = false;
        this.filesArray = res;
      },
      err=>{
        this.isLoading =false;
        this.errorMsg ="Some Error Occured";
        this.showError();
      }
    )
  }

  get guestEmail()  { 
    return this.sendEmailForm.controls.guestEmail
  }

  get password()  { 
    return this.sendEmailForm.controls.password
  }
  submit(){
    debugger;
    this.uploader.uploadAll();
  }

  sendEmail(formValues,file,target){debugger;
    formValues.name = file.name;
    formValues.path = file.path;
    this.isLoading = true;
    console.log(formValues);
    this.manageFileService.shareFile(formValues).subscribe(
      res=>{
        console.log(res);
        this.isLoading = false;
        this.successMsg="Email Sent with the link."
        this.showSuccess();
        target.parentElement.parentElement.style.display = 'none';
         this.sendEmailForm.reset();
      },
      err=>{
        this.isLoading = false;
        this.errorMsg = "Some Error Occured";
        this.showSuccess();
      }
    )
  }

  triggerUplaod(file){
    file.click();
  }

  showEmailBox(ref){
     ref.style.display = 'block';
  }

  close(target){
    target.parentElement.parentElement.style.display = 'none';
    this.sendEmailForm.reset();
  }

  dateFormat(date){
    let temp1 = date
    let temp = new Date(temp1);
    let year = temp.getFullYear();
    let month = temp.getMonth();
    let dated = temp.getDate();
    let hours = temp.getHours();
    let min = temp.getMinutes();
    date = month+'/'+dated+'/'+year;
    return date;
  }

  showSuccess(){
    window.scrollTo(500, 0);
    this.isSuccess =  false;
    setTimeout(() => {
      this.isSuccess = true; 
    }, 2000);
  }

  showError(){
    window.scrollTo(500, 0);
    this.isError =  false;
    setTimeout(() => {
      this.isError = true; 
    }, 2000);
  }

}
