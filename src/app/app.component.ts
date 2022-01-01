import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {BehaviorSubject, combineLatest, concat, forkJoin, interval, merge, Observable, of, race, Subject, Subscription, zip} from 'rxjs'
import {concatMap, debounceTime, distinct, distinctUntilChanged, exhaustMap, max, mergeMap, reduce, scan, switchMap, take} from 'rxjs/operators'
import { HttpService } from './services/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit,OnDestroy{
  title = 'Demo';
  isAvailable=true
  value = {$implicit:"Awesome",name:'Arun'}
  sub:Subscription
 
  constructor(public router :Router,private http:HttpService){}

  ngOnInit(): void {
   this.http.autoLogin();

   this.http.subject.subscribe((data)=>{
     console.log('app '+data)
   })
   this.http.subject.next('appData')
  
   let obs=new Observable((data)=>{
    setTimeout(()=>{
      data.next(0)
    },3000)
      data.next(1);
      data.next(2)
      data.next(3);
      setTimeout(()=>{
        data.next(4)
        data.complete()
      },5000)
    
   })
   let obs2=new Observable((data)=>{
    setTimeout(()=>{
      data.next(20)
    },3000)
      data.next(10);
      // data.next(2)
      // data.next(3);
      setTimeout(()=>{
        data.next(40)
        data.complete()
      },5000)
    
   })
//map examples
  // this.sub= obs.pipe(scan(ob=>{
  //   console.log('val'+ob);
  //   return obs2})).subscribe((data: any)=>{
  //   console.log(data)
  //  },
  //  (err)=>{console.log(err)},
  //  ()=>{console.log('completed')})

  }
  gotoUser(){
    this.router.navigate(['/user']);
  }
  logout(){
    this.http.logout();
    // this.router.navigate(['/'])
  }
  default(event:Event){
    event.preventDefault()
  }

  ngOnDestroy(): void {
    console.log("destroy")
    this.sub.unsubscribe()
  }

}
