import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CustomService } from 'src/app/services/custom.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit,AfterViewInit {

  constructor(private custmSrv:CustomService) { }

  ngOnInit(): void {
    
  }
  tableData?:any;
  ngAfterViewInit(): void {
    this.custmSrv.bookTableData.subscribe(data=>{
      this.tableData=data;
    })
  }
    
}
