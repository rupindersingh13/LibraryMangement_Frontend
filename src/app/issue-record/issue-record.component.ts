import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-issue-record',
  templateUrl: './issue-record.component.html',
  styleUrls: ['./issue-record.component.css']
})
export class IssueRecordComponent implements OnInit {

  constructor(private srv:ConfigService) { }

  ngOnInit(): void {
    this.getdata()
  }
  dataSource = new MatTableDataSource();
  displayedColumns:string[]=['Id','Name','Class', 'Book','IssueDate','duedate'];
    

  getdata()
  {
    let self=this;
    self.srv.getStudentBookDetails().subscribe(res=>{
      let data=res.lstModel;
      self.dataSource=new MatTableDataSource(data);     
    })
  }
  applysearch(event:Event)
  {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();  
  }
}
