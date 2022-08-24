import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ConfigService } from '../services/config.service';
import { StudentDashbordComponent } from '../student-dashbord/student-dashbord.component';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material/dialog';
import { DashbordComponent } from '../dashbord/dashbord.component';
import { CustomService } from '../services/custom.service';
import { MatStepper } from '@angular/material/stepper';
import { CdkStepper } from '@angular/cdk/stepper';

export interface StudentProp {
  student_Id: number;
  name: string;
  class: string;
  email: string;
  incharge: string;
  image: String;
}

@Component({
  selector: 'app-issue-book',
  templateUrl: './issue-book.component.html',
  styleUrls: ['./issue-book.component.css']
})

export class IssueBookComponent implements OnInit {
  nameCtrl = new FormControl();
  filteredNames: Observable<StudentProp[]>;
  states: StudentProp[] = [];
  constructor(private srv: ConfigService,
    private ngx: NgxUiLoaderService, private std: StudentDashbordComponent,
    private matdialog: MatDialogRef<DashbordComponent>, private snack: MatSnackBar,private custmSrv:CustomService) {
    this.filteredNames = this.nameCtrl.valueChanges.pipe(
      startWith(''),
      map(StudentProp => (StudentProp ? this._filterStates(StudentProp) : this.states.slice())),
    );
  }
  
  ngOnInit(): void {
    this.filterbookdata();
    this.filterStudentdata()
  }
  studentformdata: any
  bookformdata: any
  date = new Date;
  duedate: any;
  bookList: any;
  completed = true;
  bookrecordlist: any;
  stepper: MatStepper | undefined;
  issueBook = new FormGroup({
    Student_Id: new FormControl(0, Validators.required),
    Name: new FormControl("", Validators.required),
    Class: new FormControl("", Validators.required),
    Book_Id: new FormControl(0, Validators.required),
    Book_Name: new FormControl("", Validators.required),
    Issue_Date: new FormControl("", Validators.required)
  })
 

  myControl = new FormControl;
  filterNames?: Observable<StudentProp[]>
  names: StudentProp[] = [];
  stdnt: StudentProp[] = [];

  private _filterStates(value: string): StudentProp[] {
    const filterValue = value.toLowerCase();
    console.log(filterValue)
    return this.states.filter(StudentProp => StudentProp.name.toLowerCase().includes(filterValue));
  }
  filterStudentdata() {
    let self = this;
    self.custmSrv.studentDetails.subscribe(data=>{
      this.states=data;
    })
      // self.srv.getallstudentdata().subscribe(res => {
      //  this.states = res.lstModel
      // })
  }

  filterbookdata() {
    let self = this;
    self.srv.getAllbooks().subscribe((m: any) => {
      self.bookList = m.lstModel;
      console.warn(self.bookList);
      this.issueBook.controls['Book_Name'].setValue(self.bookList.book_Name);
    })
  }
  getval(e: any)
  {
    this.issueBook.controls['Student_Id'].setValue(e.student_Id)
    this.issueBook.controls['Name'].setValue(e.name)
    this.issueBook.controls['Class'].setValue(e.class)
    var newDt = new Date();
    this.duedate = newDt.setDate(newDt.getDate() + 15);
    this.studentformdata = e;
  }
  selectvalue(e: any)
  {
    this.issueBook.controls['Book_Id'].setValue(e.value[0]);
    this.issueBook.controls['Book_Name'].setValue(e.value[1]);
    this.bookformdata = e;
    console.warn(this.bookformdata.value[0]);
  }

  onsubmit(stepper:MatStepper) {
    let self = this;
    if (self.issueBook.invalid) {
      this.snack.open("Invalid Form! Please check the form", "okay", {
        duration: 2000
      })
    }
    else {
      this.srv.issuebook(this.issueBook.value).subscribe(res => {
        if(res.respStatus) 
        {
          // this.completed=true;
           stepper.next();    
           this.snack.open("Successfully issue","okay",{
           duration: 3000
          }) 
            
        }
        
           //this.stepper.next();
        else {
          this.snack.open(res.respMsg, "okay", {
            duration: 2000
          })
        }
      })
    }
  }

  onNoclick() {
    this.matdialog.close(); 
  }
  

}
