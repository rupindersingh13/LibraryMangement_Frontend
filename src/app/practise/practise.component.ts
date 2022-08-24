import { ObserversModule } from '@angular/cdk/observers';
import { Reference } from '@angular/compiler/src/render3/r3_ast';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { from, fromEvent, interval, Observable, observable, Observer, of, Subscription, timer } from 'rxjs';
import { filter, map, startWith, take, toArray } from 'rxjs/operators';
import { ConfigService } from '../services/config.service';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
 
@Component({
  selector: 'app-practise',
  templateUrl: './practise.component.html',
  styleUrls: ['./practise.component.css']
})
export class PractiseComponent implements OnInit {
  

  isLinear = false;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  check=true;
  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }

  issueBook=new  FormGroup({
    Student_Id:new FormControl(0,Validators.required),
    Name:new FormControl("",Validators.required),
    Class:new FormControl("",Validators.required),
    Book_Id:new FormControl(0,Validators.required),
    Book_Name:new FormControl("",Validators.required),
    Issue_Date: new FormControl("",Validators.required)
  })
//   dataSource: any;

//   constructor(private srv:ConfigService) {


    
//    }
//   @ViewChild('add') add:ElementRef |any
//   videSubscription?:Subscription;
//   msg:any;
//   timer:any; 
//   users=[
//     { name:'rupinder',last:'singh'},
//     {name:'inder',last:'singh' },
//     {name:'pinder',last:'singh'}
//   ]
//   options=["singh","rupimder","sdsfs"]
//   myControl=new FormControl;
//   filterNames?:Observable<StudentProp[]>
//   names:StudentProp[]= [];
//   ngOnInit(): void {
//     // const obs1=from( ['rupinder','singh'] )
//     // obs1.subscribe(r=>{
//     //   console.warn(r );
//     // })
//   //  const vari=from(this.users);
//   //  vari.pipe(take(1), toArray()).subscribe(r=>{
//   //   console.warn(r);
   
//   //   })
//   //  // creating custom observer
//   //   const obser=Observable.create((res:Observer<any>)=>{
//   //     res.next('singh in observer')
//   //   })
//   //   obser.subscribe((data:any) => {
//   //     console.log("Next Number: " + data)   
//   //   });
//   this.filterStudentdata()
//   this.initForm();
//   }
//   ngAfterViewInit(): void {
//     // let count=1;
//     //   fromEvent(this.add.nativeElement,'click').subscribe(res=>{
//     //    var vid= "video"+ count++;
//     //     console.warn( vid);
//     //     this.print( vid);
//     //   })
     
    
//   }
//   issueBook=new  FormGroup({
//     Student_Id:new FormControl(0,Validators.required),
//     Name:new FormControl("",Validators.required),
//     Class:new FormControl("",Validators.required),
     
//   })

//   filterStudentdata()
//   {
     
//     let self=this;
     
//    self.srv.getallstudentdata().subscribe(res=>{
      
//       this.names=res.lstModel;
//       this.options=res.lstModel;;
      
//    }) 
//   }
//   initForm()
//   {
//      this.issueBook.get('Name')?.valueChanges.subscribe(resp=>{
//        console.warn("sds",resp);
//        this._filterStates(resp)
//      })
//   }
//   private _filterStates(value: string): StudentProp[] {
//     const filterValue = value.toLowerCase();
//    console.warn(this.names.filter(state => state.name.toLowerCase().includes(filterValue)));

//     return this.names.filter(state => state.name.toLowerCase().includes(filterValue));
     
//   }
//   filterdata(data:any)
//   {
//     this.options=this.options.filter(item=>{
//       return item.toLowerCase().indexOf(data.toLowerCase())>-1
//     })
//   }
//   show()
//   {
// //     let self=this;
// //     self.srv.getAllbooks().subscribe(data=>{
// //       self.dataSource=data.lstModel;    
// //       const datas=from(self.dataSource)
// //       .pipe(filter(filtr=>filtr.book_Id.length),
// //         toArray())
// //       .subscribe(d=>{
// //        self.dataSource=d;
// //        console.warn(self.dataSource);
// //  })
// //     })
      
//   }
 
//   print(data:any)
//   {
//     let el=document.createElement('li');
//     el.innerText=data
//     document.getElementById('Elcointainer')?.appendChild(el);
//     console.warn(data);
//   }
// start()
// {
//   const broadcast=interval(700);
//   this.videSubscription= broadcast.subscribe(res=>{    //pipe(take(5),toArray()).
//     console.warn(res);
//     this.msg=res;
//     })
      
// }
// stop()
// {
//  this.videSubscription?.unsubscribe(); 
// }
// startTimer()
// {
//    const set=timer(1000,700);
//   this.videSubscription= set.subscribe(res=>{
//    this.timer=res;
//    })
// }
//   stopTimer()
// {
//   this.videSubscription?.unsubscribe(); 
// }
//   //   sendvalue!:string;
//   // selectedProduct:any;
//   //  users:any=[];
//   // getproductval( event:any)
//   // {
//   //     console.warn(event.target.value );
//   //     this.selectedProduct=event.target.value;
//   // }
//   //   adduser(val:any)
//   //   {
//   //     this.users.push({
//   //       name:val.value
//   //     })
//   //     console.warn(val.value);
//   //   }
//   //   remuser(val:any){
//   //    this.users.splice(this.users.length -1)
//   //   }
//   //   removebyid(i:any)
//   //   {
//   //     this.users.splice(i,1);
//   //   }
//   //   sendvalue!:string;
//   // selectedProduct:any;
//   //  users:any=[];
//   // getproductval( event:any)
//   // {
//   //     console.warn(event.target.value );
//   //     this.selectedProduct=event.target.value;
//   // }
//   //   adduser(val:any)
//   //   {
//   //     this.users.push({
//   //       name:val.value
//   //     })
//   //     console.warn(val.value);
//   //   }
//   //   remuser(val:any){
//   //    this.users.splice(this.users.length -1)
//   //   }
//   //   removebyid(i:any)
//   //   {
//   //     this.users.splice(i,1);
//   //   }
  



  
//   //   sendvalue!:string;
//   // selectedProduct:any;
//   //  users:any=[];
//   // getproductval( event:any)
//   // {
//   //     console.warn(event.target.value );
//   //     this.selectedProduct=event.target.value;
//   // }
//   //   adduser(val:any)
//   //   {
//   //     this.users.push({
//   //       name:val.value
//   //     })
//   //     console.warn(val.value);
//   //   }
//   //   remuser(val:any){
//   //    this.users.splice(this.users.length -1)
//   //   }
//   //   removebyid(i:any)
//   //   {
//   //     this.users.splice(i,1);
//   //   }
   

//   //   sendvalue!:string;
//   // selectedProduct:any;
//   //  users:any=[];
   
//   // getproductval( event:any)
//   // {
//   //     console.warn(event.target.value );
//   //     this.selectedProduct=event.target.value;
//   // }
//   //   adduser(val:any)
//   //   {
      
//   //     this.users.push({
//   //       name:val.value
//   //     })
//   //     console.warn(val.value);
     
//   //   }
//   //   remuser(val:any){
//   //    this.users.splice(this.users.length -1)
//   //   }
   
//   //   removebyid(i:any)
//   //   {
//   //     this.users.splice(i,1);
//   //   }
   
}

 

