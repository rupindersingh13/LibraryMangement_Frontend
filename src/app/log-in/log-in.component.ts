import { DOCUMENT } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import{FormGroup,FormBuilder,FormControl, Validators} from '@angular/forms'
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ConfigService } from '../services/config.service';
import { CustomService } from '../services/custom.service';
import { OTPformComponent } from '../shared/otpform/otpform.component';

 
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor(private custmSrv:CustomService, 
    private srv:ConfigService,
    private nav:Router,
    private snckbar:MatSnackBar,
    private ngx:NgxUiLoaderService,
    private dialog:MatDialog,
    public cust:CustomService) { }

  ngOnInit(): void {
       
        console.log( this.passResetForm)
        
  }
  OTPForm=false;
  Logform=true;
  passResetForm=false;
  ifLogin=false;
  str="singh"; 
  token:any;
  loginform=new FormGroup({
    Email:new FormControl("",[Validators.required, Validators.email]),
    Password:new FormControl,

  })
  // get x
  get x()
  {
    return this.loginform.controls

  }
   login()
   {
     var self=this;
     if(this.loginform.valid)
     {
      self.srv.login(this.loginform.value).subscribe((m:any)=>{
       if(m.respStatus)
       {
         this.custmSrv.authenticate.next(true);
         localStorage.setItem('token',m.respMsg);
        this.nav.navigateByUrl("/dash");
          
       }
       else
       {
          this.snckbar.open("Please Enter valid Email or Password","okay",{
          duration:3000
          })
       }
       },(error:any)=>{
          this.snckbar.open("Something Went Wrong","okay",{
          duration:3000
        })
       })   
     }
   }

    ResetPassword()
    {
      let Email= this.loginform.value.Email;
      let self=this;
      this.ngx.start();
      self.srv.ResetPasswordRequest(Email).subscribe(res=>{       
         this.ngx.stop(); 
       
       if(res.respStatus)
       {
        this.dialog.open(OTPformComponent,{
          width:'500px'
        })
        this.cust.Email.next(Email);
        this.snckbar.open(res.respMsg,"okay",{
          duration:2000
        });
       }
       else
       {
        this.snckbar.open(res.respMsg,"okay",{
          duration:2000
        });
       }
       });
       

       
       
    }

    ChangeValue(data:boolean)
    {
      if(data)
      {
        this.Logform=false;
        this.passResetForm=true;
      }
    }
    refresh()
    {
      window.location.reload();
    }
    validateOTP()
    {
     // document.getElementById()
    }
}
