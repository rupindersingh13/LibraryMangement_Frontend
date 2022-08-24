import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { interval } from 'rxjs';
import { ConfigService } from 'src/app/services/config.service';
import { CustomService } from 'src/app/services/custom.service';
import { NgxSimpleCountdownModule } from 'ngx-simple-countdown';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otpform',
  templateUrl: './otpform.component.html',
  styleUrls: ['./otpform.component.css']
})
export class OTPformComponent implements OnInit {
  
  hidevalue: boolean | undefined;
  display: any;
  msg: any;

  constructor(private srv:ConfigService,
              public dialog: MatDialog,
              private custm:CustomService,
              private snack:MatSnackBar,
              private nav:Router
   ) { }
    
  ngOnInit(): void {
     this.timer(3)
    
  }

  maxtime: any=30

  otp="";
  Email:any;
  show=false;
  hide=true;

  ValidateOTP=new FormGroup({
    first:new FormControl("",Validators.required),
    second:new FormControl("",Validators.required),
    third:new FormControl("",Validators.required),
    fourth:new FormControl("",Validators.required)  })

    signup=new FormGroup({
      Email:new FormControl("",[Validators.required,Validators.email]),
      Password:new FormControl("",[Validators.required]),
      ConfirmPassword:new FormControl("",Validators.required)
       
  
    });

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

  changed(index:number,event:any){
   
    if(event.keyCode==8)
    { 
        if(index==2)
      {
        document.getElementById('first')?.focus();
        
      }
      else if(index==3)
      {
        document.getElementById('second')?.focus();
       
      }
      else if(index==4)
      {
        document.getElementById('third')?.focus();
        
      }
    }
    else
    {
      if(index==1)
      {
        
        document.getElementById('second')?.focus();
      
      }
      else if(index==2)
      {
        document.getElementById('third')?.focus();
        
      }
      else if(index==3)
      {
        document.getElementById('fourth')?.focus();
       
      }
      else if(index==4)
      {
        document.getElementById('fourth')?.focus();
        
      }
    }
   
    
   
  }
  timer(minute:any) {
    // let minute = 1;
    let seconds: number = minute * 60;
    let textSec: any = "0";
    let statSec: number = 60;

    const prefix = minute < 10 ? "0" : "";

    const timer = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = "0" + statSec;
      } else textSec = statSec;

      this.display = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;

      if (seconds == 0) {
        console.log("finished");
        clearInterval(timer);
      }
    }, 1000);
  }
  
  validate()
  {
     
    this.custm.Email.subscribe(res=>{
      this.Email=res;
    })

    this.otp+= this.ValidateOTP.value.first;
    this.otp+=this.ValidateOTP.value.second;
    this.otp+= this.ValidateOTP.value.third;
    this.otp+=this.ValidateOTP.value.fourth;
    console.warn(this.otp);
    this.srv.ValidateOTP(this.Email,this.otp).subscribe(r=>{
      if(r.respStatus)
      {

         this.snack.open(r.respMsg,"okay")
         this.show=true;
         this.hide=false;
      }
      else{
        this.snack.open(r.respMsg,"okay")
      }
     
    }),(error:any)=>{
          this.snack.open("Something Went Wrong","okay",{
          duration:3000
        })
      
     this.dialog.closeAll();
    } 
  }
 
  resetpass()
  {
    var values= this.signup.value;
    this.signup.controls['Email'].setValue(this.Email);
    this.srv.updatePassword(values).subscribe(r=>{
     if( r.respStatus)
     {
      this.snack.open("Password Changed Successfully","okay",{
        duration:3000
         
      })
      setTimeout(()=>{                           //<<<---using ()=> syntax
        window.location.reload();
   }, 2000);
     }
     else
     {
      this.snack.open("Something Went Wrong","okay",{
        duration:3000
      })
     }
    })
    
  }
 
}
