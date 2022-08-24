import { Injectable } from '@angular/core';
import{HttpClient }from '@angular/common/http'
import { identifierModuleUrl } from '@angular/compiler';
// import { AnyRecord } from 'dns';
@Injectable({
  providedIn: 'root'
})
export class HttpService  {

  constructor(private http:HttpClient) { }
  url = 'https://localhost:44332/api/';

  get(u:any)
  {
    return this.http.get<any>(this.url+ u)
  }

  getall(u:any,data:any) 
  {
  return this.http.get<any>(this.url+u+data);
} 
get2(u:any)
{
  return this.http.get<any>(this.url+u)
}
  post(u:any, data:any)
  {
     return this.http.post<any>(this.url+u,data)
  }

  delete(u:any)
  {
     return this.http.delete<any>(this.url+u)
  }

  put(u:any, data:any)
  {
     return this.http.put<any>(this.url+u,data)
  }
  
}
