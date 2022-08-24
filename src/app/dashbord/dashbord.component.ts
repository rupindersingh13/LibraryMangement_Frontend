import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookComponent } from '../book/book.component';
import { ConfigService } from '../services/config.service';
import { IssueBookComponent } from '../issue-book/issue-book.component';
import { SubmitComponent } from '../submit/submit.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { IssueRecordComponent } from '../issue-record/issue-record.component';
import { CustomService } from '../services/custom.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { cwd } from 'process';
  
@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {

  constructor(public bookPopup:MatDialog,private nav:Router,private modelService:NgbModal,private srv:ConfigService,private issueDialgog:MatDialog
    ,private submitDialog:MatDialog,private ngx:NgxUiLoaderService,private custmSrv:CustomService ,private snack:MatSnackBar) { }

  ngOnInit(): void {
    this.submitNotifications();
    this.ngx.start(); 
    this.GetStudentdata() ;
   
    setTimeout(() => {
      this.ngx.stop(); 
    }, 100);
  }
  noti=0;
  msg:any;
  notilists:any;
  date!:Date;
  images = "";
  isChecked=true;
 GetStudentdata() {
    let self = this;
    self.srv.getallstudentdata().subscribe((m: any) => {
      if (m.respStatus) { 
        self.custmSrv.studentDetails.next(m.lstModel)
      }
    })
  }
  submitFine(){
    this.snack.open("Fine Added","okay",{
      duration:2000
    })
    this.onclose(); 
  }
   openDialog()
   {
     const dialogref=this.bookPopup.open(BookComponent,{
       width:'1500px',
       height:'700px'
     });
     dialogref.afterClosed().subscribe(result=>{
       if(result=="ok")
       {
        this.nav.navigateByUrl("\dasboard");
       }
     })
   }
   openIssuedialog()
   {
      this.issueDialgog.open(IssueBookComponent,{
       width:'1150px',
       height:'800px'
     })
   }
   openSubmitdialog()
   {
      this.submitDialog.open(SubmitComponent,{
      width:'1000px',
      height:'700px'
     })
   }
   openRecorddialog()
   {
     this.submitDialog.open(IssueRecordComponent,{
      width:'1500px',
      height:'700px'
     })
   }
   
   onclose()
   {
    this.modelService.dismissAll();
   }

   open(content:any)
   {
     this.noti=0;
     this.modelService.open(content) 
   }
    

   submitNotifications()
   {
     let self=this;
     self.srv.submitNotifi().subscribe((m:any)=>{
      self.notilists=m.lstModel;
       this.noti= self.notilists.length;   
       if(self.notilists!=null)
       {
          self.msg=m.respMsg;
          console.log(self.msg);
          this.date = new Date();
          this.date.setDate( this.date.getDate() + 1 );
         this.date.setDate  = self.msg;
       }   
     })
   } 
   loggedOut(){
    this.srv.loggedOut();
     
   } 
}
