import { Router } from '@angular/router';
import { RegisterService } from './register.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { EmailValidation } from '../validators/emailValid';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  successMsg:string;
  isSuccess:boolean = true;
  errorMsg:string;
  isError:boolean = true;
  isLoading:boolean = false;

  constructor(private fb:FormBuilder, private registerService: RegisterService,
    private route:Router) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      
      'fullName': ['', Validators.required],
      'password':['',Validators.required],
      'mobile':['',Validators.required],
      'email':['',[Validators.required,EmailValidation.emailValid]],
    })
  }
  
  get fullName()  { 
    return this.registerForm.controls.fullName
  }

  get password() {
    return this.registerForm.controls.fullName
  }

  get mobile()  { 
    return this.registerForm.controls.mobile
  }

  get email()  { 
    return this.registerForm.controls.email
  }

  register(formValues){
    console.log(formValues);
    this.isLoading = true;
    this.registerService.postregister(formValues).subscribe(
      res=>{
        setTimeout(() => {
          this.route.navigate(['./login'])
        }, 2000);
      },
      err=>{
        
      }
    )
  }


}
