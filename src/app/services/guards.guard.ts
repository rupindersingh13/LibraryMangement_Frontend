import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';
import { CustomService } from './custom.service';

@Injectable({
  providedIn: 'root'
})
export class GuardsGuard implements CanActivate {
  constructor(private srv:ConfigService,private route:Router){}
  canActivate():boolean
  {
    if(this.srv.IsloggedIn())
    {
      return true;
      
    }
    else{
      this.route.navigate(['/logIn'])
      return false;

    }
   
  }
  
}
