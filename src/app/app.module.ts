import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentDashbordComponent } from './student-dashbord/student-dashbord.component';
import { SignupComponent } from './signup/signup.component';
import { LogInComponent } from './log-in/log-in.component';
import { ConfigService } from './services/config.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DeleteComponent } from './shared/delete/delete.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DashbordComponent } from './dashbord/dashbord.component';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BookComponent } from './book/book.component';
import {MatTableModule} from '@angular/material/table';
import {MatListModule} from '@angular/material/list';
import { MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { IssueBookComponent } from './issue-book/issue-book.component';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { SubmitComponent } from './submit/submit.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
 
import { PractiseComponent } from './practise/practise.component';
import { BookDetailsComponent } from './book/book-details/book-details.component'
import { CustomService } from './services/custom.service';
import { StudentDetailsComponent } from './student-dashbord/student-details/student-details.component';
import { FilterpipePipe } from './services/filterpipe.pipe';
import { TestComponent } from './test/test.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { MatSelectModule} from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatStepperModule} from '@angular/material/stepper';
import { IssueRecordComponent } from './issue-record/issue-record.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatMenuModule} from '@angular/material/menu'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { GuardsGuard } from './services/guards.guard';
import {NgxPrintModule} from 'ngx-print';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { MatStepper } from '@angular/material/stepper';
import { OTPformComponent } from './shared/otpform/otpform.component';
import { CountdownModule } from 'ngx-countdown';
import { NgxSimpleCountdownModule } from 'ngx-simple-countdown';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddBookComponent } from './book/add-book/add-book.component';
 


@NgModule({
  declarations: [
    AppComponent,
    StudentDashbordComponent,
    SignupComponent,
    LogInComponent,
    DeleteComponent,
     DashbordComponent,
     BookComponent,
     IssueBookComponent,
     SubmitComponent,
    PractiseComponent, 
    BookDetailsComponent,
    StudentDetailsComponent,
    FilterpipePipe,
    TestComponent,
    IssueRecordComponent,
    OTPformComponent,
    AddBookComponent  

    
        
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    NgbModule,
    MatDialogModule,
    MdbCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule ,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatAutocompleteModule,
    FormsModule,
    NgxUiLoaderModule,
    MatSelectModule,
    MatToolbarModule,
    MatStepperModule,
    MatSidenavModule,
   MatMenuModule ,
   MatProgressSpinnerModule,
   MatBadgeModule,
   MatSlideToggleModule,
   NgxPrintModule ,
   MatStepperModule,
   FontAwesomeModule,
   NgxSimpleCountdownModule,
   
  ],
  providers: [ConfigService,LogInComponent,CustomService,StudentDashbordComponent,GuardsGuard
     ,{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi:true
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
