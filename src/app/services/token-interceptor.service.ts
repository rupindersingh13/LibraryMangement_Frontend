import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private srv:ConfigService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> { 
    let authServ=this.srv.getToken();
    let tokanizedReq=req.clone({
      setHeaders:{
        Authorization:`Bearer ${authServ}` 
      }
    })
    return next.handle(tokanizedReq);
  }
}
