import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { SignupComponent } from './signup/signup.component';
import { StudentDashbordComponent } from './student-dashbord/student-dashbord.component';
import{ DashbordComponent}from './dashbord/dashbord.component';
import{IssueBookComponent}from './issue-book/issue-book.component'
 
import { BlockScrollStrategy } from '@angular/cdk/overlay';
import { BookComponent } from './book/book.component';
 
import { SubmitComponent } from './submit/submit.component';
 
import { PractiseComponent } from './practise/practise.component';
import { TestComponent } from './test/test.component';
import { IssueRecordComponent } from './issue-record/issue-record.component';
import { GuardsGuard } from './services/guards.guard';
import { AddBookComponent } from './book/add-book/add-book.component';

const routes: Routes = [
  {path:'',redirectTo:'logIn',pathMatch:'full'},
  {path:'logIn',component:LogInComponent },
  {path:'signup',component:SignupComponent },
  {path:'studash',component:StudentDashbordComponent,canActivate:[GuardsGuard]},
  {path:'dash',component:DashbordComponent,canActivate:[GuardsGuard]},
  {path:'book',component:BookComponent,canActivate:[GuardsGuard]},
  {path:'issue',component:IssueBookComponent,canActivate:[GuardsGuard]},
 {path:'record',component:IssueRecordComponent,canActivate:[GuardsGuard]},
  {path:'submit',component:SubmitComponent,canActivate:[GuardsGuard]},
  {path:'pract',component:PractiseComponent},
  {path:'test',component:TestComponent},
  {path:'addbook',component:AddBookComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
