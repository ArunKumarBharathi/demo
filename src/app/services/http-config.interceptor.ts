import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpParams
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { exhaustMap, switchMap, take } from 'rxjs/operators';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

  constructor(private http:HttpService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.http.userSubject.pipe(take(1),exhaustMap((data) =>{
      if(!data){
        return next.handle(request)
      }
      let modReq=request.clone({
        params:request.params.append('auth',data.token)
        // headers:request.headers.append('auth',data.token)
       })
      return next.handle(modReq);
    }))
    
      // // headers:new HttpHeaders({name:'Arun'}),
      // headers:request.headers.set('Ak','jyyugyugvv'),
      // params:new HttpParams().set('Ak',"Arun Kumar")
      // params:request.params.set('ttt','ggggg')
   
  }
}
