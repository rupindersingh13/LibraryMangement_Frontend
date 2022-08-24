import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CustomService } from 'src/app/services/custom.service';
import {MatButtonModule} from '@angular/material/button';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { StudentDashbordComponent } from '../student-dashbord.component';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit, AfterViewInit{

  constructor(private custm:CustomService,private modelsrv:NgbModal,private dialog:MatDialog) { }
  studentData:any;

  ngOnInit(): void {
  }
  
    ngAfterViewInit(): void 
    { 
      this.custm.studentDetail.subscribe(data=>{
      this.studentData=data;
      console.log(this.studentData);
    })
    }
//@ViewChild(StudentDashbordComponent)comp:StudentDashbordComponent | undefined 
  close()
   {
   this.dialog.closeAll();
   }
}
