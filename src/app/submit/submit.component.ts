import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, timer } from 'rxjs';
import { map, startWith, timeout } from 'rxjs/operators';
import { ConfigService } from '../services/config.service';
import { CustomService } from '../services/custom.service';
export interface StudentProp{
  student_Id:number; 
  name: string;
  class: string;
  email:string;
  incharge:string;
   image:String;   
}
 
@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.css']
})
export class SubmitComponent implements OnInit {
  bKdata: any;

  constructor(private srv:ConfigService,private snackbr:MatSnackBar,private custmSrv:CustomService) {
    this.filteredNames = this.nameCtrl.valueChanges.pipe(
      startWith(''),
      map(StudentProp => (StudentProp ? this._filterNames(StudentProp) : this.states.slice())),
    );
   }

  ngOnInit(): void {
    this.filterStudentdata();
  }
  bookList:any;
  datalist:any;
  name:any;
   noBookfound=false;
  fine:any;
  nameCtrl = new FormControl();
  bookNamectrl=new FormControl();
  filteredNames: Observable<StudentProp[]> | undefined; 
  states: StudentProp[] = [];
  startSpinner=false;
  reciptData:any;
  dueDate:any;
  issueDate:any;
   
  submitbook=new FormGroup({
    Student_Id:new FormControl(0,Validators.required),
    Name:new FormControl("",Validators.required),
    Class:new FormControl("",Validators.required),
    Book_Id:new FormControl(0,Validators.required),
    Book_Name:new FormControl("",Validators.required),
    Submit_Date: new FormControl("",Validators.required),
    Issue_Date:new FormControl("",Validators.required),
    Due_Date: new FormControl("",Validators.required)
  })
  private _filterNames(value: string): StudentProp[] {
    const filterValue = value.toLowerCase();

    return this.states.filter(StudentProp => StudentProp.name.toLowerCase().includes(filterValue));
  }

   

  filterStudentdata()
  {
    let self=this;  
    self.custmSrv.studentDetails.subscribe(res=>{
      this.states=res; 
    })
  // self.srv.getallstudentdata().subscribe(res=>{
  //       this.states=res.lstModel 
  //  }) 
  }
  getval(e: any) {

    this.submitbook.controls['Student_Id'].setValue(e.student_Id);
    this.submitbook.controls['Name'].setValue(e.name);
    this.submitbook.controls['Class'].setValue(e.class);
   this.getStudentbookrecord();
  }
  selectvalue(e: any) {
    this.submitbook.controls['Book_Id'].setValue(e.value[0]);
    this.submitbook.controls['Book_Name'].setValue(e.value[1]);
    this.submitbook.controls['Due_Date'].setValue(e.value[2]);
    this.submitbook.controls['Issue_Date'].setValue(e.value[3]); 
  }
  getStudentbookrecord()
  {
    let self=this;
    let id=this.submitbook.controls['Student_Id'].value;
    self.srv.getstudentbookDetails(id).subscribe((m:any)=>{
      this.bookList=m.lstModel;
      if(this.bookList.length==0)
      {
        this.noBookfound=true;
      }  
      else{
        this.noBookfound=false;
      }  
    })
  }
  onSubmit()
  {
    let self=this;
    this.startSpinner=true;
    if(this.submitbook.valid)
    {
      this.settime();
    }
    if(this.submitbook.valid)
    {
      self.srv.submitbook(this.submitbook.value).subscribe((m:any)=>{
        if(m.respStatus)
        { 
          this.fine=m.respMsg;
          this.snackbr.open("Book Submited Successfully","okay",{
            duration:3000
          })
         
        }
        else
        {
          this.fine=m.respMsg;
        }   
     })
    }
    else{
      this.snackbr.open("Invalid fields","okay",{
        duration:3000
      })
    }
   }
   settime()
   {
    setTimeout(() => {
      this.startSpinner=false;
      this.reciptData=this.submitbook.value;
      this.submitbook.reset();
     }, 2000);
   }
}
