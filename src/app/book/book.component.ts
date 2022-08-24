import { style } from '@angular/animations';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DashbordComponent } from '../dashbord/dashbord.component';
import { ConfigService } from '../services/config.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DeleteComponent } from '../shared/delete/delete.component';
import { MatFormField } from '@angular/material/form-field';
import {MatSort, Sort} from '@angular/material/sort';
import { BookDetailsComponent } from './book-details/book-details.component';
import { CustomService } from '../services/custom.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
 


export interface Iheaders{
  Author:string,
  Book_Name:string,
  Book_Id:string,
  Price:string,
  
}

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})

export class BookComponent implements OnInit {
  response: any;
  list:any;
  dataSource = new MatTableDataSource();
  show =false;  
  checksize=false;
  selected = 'option2';
  constructor(  private modelService:NgbModal,private srv:ConfigService,private snackbar:MatSnackBar,
    private matdialog:MatDialogRef<DashbordComponent>,private Popup:MatDialog,private custmSrv:CustomService ,private ngx:NgxUiLoaderService) { }

  ngOnInit(): void 
  {
    this.getbook();
    this.ngx.start(); 
   
    setTimeout(() => {
      this.ngx.stop(); 
    }, 100);
  }
 // @ViewChild(MatSort)sort: MatSort;
  ngAfterViewInit() {
  //  this.dataSource.sort = this.sort;
  }

  displayedColumns:string[]=['book_Id','book_Name','author','price','qty','action'];
 
  openBookDetails(val:any)
  {
    this.custmSrv.bookTableData.next(val);
     
    this.Popup.open(BookDetailsComponent,{
      width:'1000px',
      height:'650px'
    })
  }
  onNoclick()
  {
    this.matdialog.close();
  }

 
  open(content:any,Istrue:any)
  {
    if(Istrue)
    {
      this.show=true;
    }
    else{
      this.show=false
    }
    this.addbook.reset();
    this.modelService.open(content).result.then((result:any) => {
      result.closeResult = `Closed with: ${result}`;
    }, (reason:any) => {
      // reason.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    
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

  addbook= new FormGroup({
    Book_Id:new FormControl(0),  
    Author:new FormControl("",Validators.required),  
    Book_Name:new FormControl("",Validators.required),
    Price:new FormControl("",Validators.required),
    Quantity:new FormControl("",Validators.required),
    Description:new FormControl(""),
    Image:new FormControl('')
  })

  uploadImage(e:any) 
  {

    let data=this.addbook.value;
    {
      let data = this.addbook.value;
      if(e)
      {
        var file: File = e.files[0];
        console.warn("filesize"+file.size);
        if(file.size<=200000)
        {
          this.checksize=false;
          var myReader: FileReader = new FileReader();
          myReader.onloadend = (e) => {
          let a: any = myReader.result;
          data.image = a;
          this.addbook.controls['Image'].setValue(a);
          }
          myReader.readAsDataURL(file);
        }
        else
        {
            this.checksize=true;
        }
      }
    }    
  }

  get x()
  {
    return this.addbook.controls;
  }
   

  
  onsubmit()
  {
    let self=this;   
    let add=this.addbook.value;
    add.Book_Id=0;
    

    console.log("form data",JSON.stringify(add));
    self.srv.postbook(add).subscribe((m:any)=>{
      this.response=m.respMsg ;
    
      this.getbook();
      if(m.respStatus)
      {
        this.addbook.reset();
       this.modelService.dismissAll();
        this. snackbar.open(m.respMsg,'okay',{
          duration:3000,

        }); 
      }
      else{
        this.modelService.dismissAll();
        this.snackbar.open(m.respMsg,'okay',{
          duration:3000,}); 
      }
      
    })
   
  } 
  getbook()
  {
    let self=this;
    this.srv.getAllbooks().subscribe((m:any)=>{
      self.list= m.lstModel;
    self.dataSource=new MatTableDataSource(self.list)
      console.warn("datasource"+self.dataSource);
       
    })
  }
  
  applysearch(event:Event)
  {
 
    
    const filterValue = (event.target as HTMLInputElement).value;
    
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    
    
  }
  

  //  onsubmit()
  //  {
  //     let self=this;
  //      let add=this.addbook.value;
  //      console.log("form data",JSON.stringify(add));
  //      self.srv.postbook(add).subscribe((m:any)=>{
  //        if(m.status)
  //        {
  //          this.modelService.dismissAll();
  //         this.snackbar.open(m.result,'okay',{
  //           duration:3000
  //         })
  //        }
  //        this.addbook.reset();
  //      })

  //  }
  @HostListener('click') myclick(){
    this.checksize=false;
    console.warn("hostworks");
  }
 
  close()
  {
    this.modelService.dismissAll();
    this.addbook.reset();
   
  }
  
  openDeletedialog(data:any)
   {
    const dialogref= this.Popup.open(DeleteComponent,{
    width:'400px'
    })
    dialogref.afterClosed().subscribe((result:any)=>{
      if(result==true)
      {
       let self=this;
       self.srv.deletebook(data).subscribe((m:any)=>{
         if(m.respStatus)
         {
          this.getbook();
           this.snackbar.open('book deleted successfully','okay',{
             duration:3000,
           })
         }
       })
      }
    })
   }
   Updatebook()
   {
     let self=this;
     let data=this.addbook.value;
     console.warn("data"+data);
     self.srv.updatebook(data).subscribe((m:any)=>{
       if(m.respStatus)
        {
          this.getbook();
          self.snackbar.open('Book Updated Successfully','okay',{
            duration:3000
          })  
        }
        this.addbook.reset();
        this.modelService.dismissAll();
     })
   }

   onupdate(data:any)
   {
     
     this.addbook.controls['Book_Id'].setValue(data.book_Id)
     this.addbook.controls['Author'].setValue(data.author)
     this.addbook.controls['Book_Name'].setValue(data.book_Name)
     this.addbook.controls['Price'].setValue(data.price)
     this.addbook.controls['Description'].setValue(data.description)
     this.addbook.controls['Quantity'].setValue(data.quantity)
     


   }
   testdata(row:any){
     console.warn(row);
   }
   
  }
  
 
