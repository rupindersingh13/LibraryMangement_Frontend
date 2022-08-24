import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import{FormGroup,FormControl, Validators} from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConfigService } from '../services/config.service';
 
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private srv:ConfigService ,private nav:Router,private snack:MatSnackBar ) {}

  ngOnInit(): void {
  }
  
  signup=new FormGroup({
    Email:new FormControl("",[Validators.required,Validators.email]),
    Password:new FormControl("",[Validators.required]),
    ConfirmPassword:new FormControl("",Validators.required)
     

  });
  msg=false;
  //,{
  //   validators:this.customvalidation.passwordMatchValidator("Password","ConfirmPassword")
  // }
  // );
  get x()
  {
      return this.signup.controls;
  }
  
  checkpassword()
  {
     let password= this.signup.value.Password;
     let confirmPassword=this.signup.value.ConfirmPassword;
     if(password!=confirmPassword)
     { 
       this.msg= true;
     }
     else{
       this.msg=false;
     }
  }
   
  sign()
  {
    let self=this;
    self.srv.signup(this.signup.value).subscribe((m:any)=>{
      if(m.respStatus)
      {
       this.nav.navigateByUrl("/logIn")
       this.snack.open("Successfully Signed","okay",{
         duration:3000
       })
      }
    })
  }
 
}
