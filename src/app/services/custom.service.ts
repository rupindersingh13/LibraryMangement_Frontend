import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
export interface StudentProp {
  student_Id: number;
  name: string;
  class: string;
  email: string;
  incharge: string;
  image: String;
}
@Injectable({
  providedIn: 'root'
})
export class CustomService {

  constructor() { }
  bookTableData=new BehaviorSubject("")
  studentDetail=new BehaviorSubject("")
  Email=new BehaviorSubject("")
   Data: StudentProp[] = [];
   studentDetails=new BehaviorSubject(this.Data)
   authenticate=new BehaviorSubject(false);
}
