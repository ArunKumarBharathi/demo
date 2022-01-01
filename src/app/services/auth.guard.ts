import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService:AuthService,private route:Router, private http:HttpService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // let status=this.authService.isLoggedIn();
    // if(status){
    //   return true;
    // }else{
    //   this.route.navigateByUrl('/login');
    //   return false;
    // }
    // let status=false;
      return this.http.userSubject.pipe(take(1),map((user) =>{
        if(!user){
          return this.route.createUrlTree(['/login'])
        }
        return true
      }))
  }
  
}
