import { Injectable } from '@angular/core';
import{HttpClient }from '@angular/common/http'
import { HttpService } from './http.service';
import { map } from 'rxjs/operators';
// import { AnyRecord } from 'dns';
@Injectable({
  providedIn: 'root'
})
export class ConfigService  {

  constructor(private http:HttpService) { }
   
  poststudent(data:any) {
    return this.http.post('Student/RegisterStudentDetail',data);
  }

  getallstudentdata( ) {
    return this.http.get("Student/Getallrecords");
  }
  

  deleteRecord(id:number) {
    return this.http.delete('Student/DeleteStudent'+id);
  }

  updateStudent(data:any) {
    return this.http.put("Student/UpdateMyDetails",data);
  }
  getStudentBookDetails()
  {
    return this.http.get("Teacher/Getall_Record");
  }
  issuebook(data:any)
  {
    return this.http.post("Teacher/Issue_Book",data);
  }
  getname(data:any)
  {
    return this.http.getall("Student/GetMyDetail",data);
  }
  getbook(data:any)
  {
    return this.http.getall("Book/Getbook",data);
  }
  getAllbooks()
  {
    return this.http.get("Book/Getall_Books");
  }
  postbook(data:any)
  {
    return this.http.post("Book/InsertBook",data);
  }
  submitNotifi()
  {
    return this.http.get("Teacher/checkfine");
  }
  deletebook(id:any)
  {
    return this.http.delete("Book/DeleteBook"+id)
  }
  updatebook(id:any)
  {
    return this.http.put("Book/UpdateBook",id)
  }
  getStudentbookrecord(id:any)
  {
    return this.http.getall("Teacher/Get_Record",id);
  }

  getstudentbookDetails(std_id:any)
  {
   return this.http.get("Teacher/Get_Record"+std_id)  
  }
  login(data:any)
  {
    return this.http.post("Login/Login",data);
  }
  signup(data:any)
  {
    return this.http.post("Login/SingIn",data)
  }
  submitbook(data:any)
  {
    return this.http.post("Teacher/submitBook",data);
  }
  getstudentbyid(data:any)
  {
    return this.http.getall("Student/GetMyDetail",data)
  }
  getToken()
  {
    return localStorage.getItem('token');
  }
  IsloggedIn()
  {
    return !!localStorage.getItem('token');
  }
  loggedOut()
  {
    return localStorage.removeItem('token');
  }
  SendRegistrEmail(email:any)
  {
    return this.http.post("Student/SendRegistrationEmail",email)
  }
  ResetPasswordRequest(email:string)
  {
    return this.http.post("Login/ResetPasswordRequest?Email="+email,null);
     
  }
  ValidateOTP(email:string,otp:string)
  {
    return this.http.post("Login/ValidateOTP?Email="+email+"&otp="+otp,null);
  }
  updatePassword(data:any)
  {
    return this.http.post("Login/updatepassword",data)
  }
}
