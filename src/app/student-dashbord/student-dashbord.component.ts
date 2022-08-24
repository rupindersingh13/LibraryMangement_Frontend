import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl} from '@angular/forms';
import { ConfigService } from '../services/config.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from '../shared/delete/delete.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { CustomService } from '../services/custom.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';


@Component({
  selector: 'app-student-dashbord',
  templateUrl: './student-dashbord.component.html',
  styleUrls: ['./student-dashbord.component.css']
})
export class StudentDashbordComponent implements OnInit {
  fromvalue !: FormGroup;
  response: any;
  list: any;
  show = false;
  checksize=false;
  searchname?:string;
  notAllowedNames=['rupinder','amarjit']

  constructor(
    private srv: ConfigService,
    private _snackbar: MatSnackBar,
    private nav: Router, private modalService: NgbModal,
    public deletePopup: MatDialog,
    private dialog: MatDialog,
    private custm: CustomService,
    private ngx:NgxUiLoaderService) { }

  ngOnInit()
   {this.showStudentdata();
    this.ngx.start(); 
   
    setTimeout(() => {
      this.ngx.stop(); 
    }, 100);
  }

    addStudent = new FormGroup({
    Student_Id: new FormControl(0),
    Name: new FormControl("", [Validators.required]),
    Class: new FormControl("", Validators.required),
    Mobile_no: new FormControl("", [Validators.maxLength(10), Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    Email: new FormControl("", [Validators.email, Validators.required]),
    Incharge: new FormControl("", Validators.required),
    Image: new FormControl("")


  })
  Nanames(control:FormControl)
  {
      if(this.notAllowedNames.indexOf(control.value)!==-1)
      {
        return {'names not allowed':true}  
      }
      return null;
 }

  get x() 
  { 
    return this.addStudent.controls
  }

  uploadImage(e: any) 
  {
    let data = this.addStudent.value;
    if(e)
    {
      var file: File = e.files[0];
      if(file.size<=200000)
      {
        var myReader: FileReader = new FileReader();
        myReader.onloadend = (e) => {
        let a: any = myReader.result;
        data.image = a;
        this.addStudent.controls['Image'].setValue(a);
        }
        myReader.readAsDataURL(file);
      }
      else
      {
          this.checksize=true;
      }
    }
      
  }

  openStudentDetails(data: any) 
  {
    this.custm.studentDetail.next(data)
    this.dialog.open(StudentDetailsComponent, {
    height: '450px',
    width: '800px'
    })
  }

    addStudents() {
    let self = this;
    this.addStudent.controls['Student_Id'].setValue(1)
    let add = this.addStudent.value;
    console.log(add);
    self.srv.poststudent(add).subscribe((m: any) => 
    {  
      if (m.respStatus) {
        this.modalService.dismissAll();
        this.showStudentdata();
        this._snackbar.open(m.respMsg, 'okay', {
        duration: 3000,
        });
        self.srv.SendRegistrEmail(add).subscribe(res=>{

        })
      }
      else 
      {
        this.modalService.dismissAll();
        this._snackbar.open('something went wrong', 'okay', {
        duration: 3000,
        });
      }
      this.addStudent.reset();
    })
  }

 GetstudentData()
 {
   this.custm.studentDetails.subscribe(data=>{
     this.list=data;
   })
 }

  showStudentdata() {
    let self = this;
    self.srv.getallstudentdata().subscribe((m: any) => {
      if (m.respStatus) {
        self.list = m.lstModel   
      }
    })
  }


  openDialog(data: any): void {
    const dialogref = this.deletePopup.open(DeleteComponent, {
      width: '400px'
    });
    dialogref.afterClosed().subscribe((result: any) => {
      if (result == true) {
        this.srv.deleteRecord(data).subscribe((m) => {
          if (m.respStatus == true) {
            this._snackbar.open('Record Deleted Successfully', "okay", {
              duration: 3000
            });
            this.showStudentdata();
          }
        })
      }
    })
  }


  open(content: any, data: any) {
    if (data) {
      this.show = true;
    }
    else {
      this.show = false;
    }
    this.addStudent.reset();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result: any) => {
      result.closeResult = `Closed with: ${result}`;
    }, (reason: any) => {
      reason.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  updateStudents() {
    let self = this;
    let update = this.addStudent.value;
    self.srv.updateStudent(update).subscribe((m) => {
      if (m.respStatus) {
        this.modalService.dismissAll();
        this._snackbar.open('Record Updated Successfully', "okay", {
          duration: 3000
        });
        this.showStudentdata();
      }
      else {
        this.modalService.dismissAll();
        this._snackbar.open('Record not Found', 'okay', {
          duration: 3000,
        });
      }
      this.addStudent.reset();
    })
  }
   
  closeModel()
  {
    this.modalService.dismissAll();
  }

  onedit(data: any)
   {
    this.addStudent.controls['Name'].setValue(data.name);
    this.addStudent.controls['Email'].setValue(data.email);
    this.addStudent.controls['Incharge'].setValue(data.incharge);
    this.addStudent.controls['Mobile_no'].setValue(data.mobile_no);
    this.addStudent.controls['Student_Id'].setValue(data.student_Id);
    this.addStudent.controls['Class'].setValue(data.class);
  }
}
