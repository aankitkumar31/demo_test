import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm: FormGroup
  errorMsg:string;
  isError:boolean = true;
  isLoading:boolean = false;

  constructor(private fb:FormBuilder, private loginService: LoginService,
    private route:Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      'email':['',Validators.required],
      'password':['',Validators.required],
    })
  }

  get email()  { 
    return this.loginForm.controls.email
  }

  get password()  { 
    return this.loginForm.controls.password
  }

  login(formValues){
    console.log(formValues);
    this.isLoading = true;
    this.loginService.postLogin(formValues).subscribe(
      res=>{
        this.isLoading = false;
        this.route.navigate(['./pages'])
        // this.route.navigate(['./login'])
        debugger;
        localStorage.email = res['email'];
      },
      err=>{
        this.isLoading = false;
        this.errorMsg = "Some Error Occured";
        this.showError();
      }
    )
  }

  showError(){
    window.scrollTo(500, 0);
    this.isError =  false;
    setTimeout(() => {
      this.isError = true; 
    }, 2000);
  }

}
