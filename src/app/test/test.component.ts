import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ConfigService } from '../services/config.service';
export interface StudentProp{
  student_Id:number; 
  name: string;
  class: string;
  email:string;
  incharge:string;
   image:String;   
}
export interface StudentProp {
  flag: string;
  name: string;
  population: string;
}
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  nameCtrl = new FormControl();
  filteredNames: Observable<StudentProp[]>;

  states: StudentProp[] = [];

  constructor(private srv:ConfigService) {
    this.filteredNames = this.nameCtrl.valueChanges.pipe(
      startWith(''),
      map(StudentProp => (StudentProp ? this._filterNames(StudentProp) : this.states.slice())),
    );
  }
  ngOnInit(): void {
   this.filterStudentdata()
  }

  private _filterNames(value: string): StudentProp[] {
    const filterValue = value.toLowerCase();

    return this.states.filter(StudentProp => StudentProp.name.toLowerCase().includes(filterValue));
  }
  
  filterStudentdata()
  {
     
    let self=this;
     
   self.srv.getallstudentdata().subscribe(res=>{
      
       this.states=res.lstModel
      
   }) 
  }
}


