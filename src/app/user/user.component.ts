import { Component, OnDestroy, OnInit } from '@angular/core';
import { from, interval, Observable, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit,OnDestroy {
  sub= new Subject<any>();

  constructor() { }

  ngOnInit(): void {  
    // let obs=new Observable((data)=>{
//     data.next(1);
//     data.next(2)
//     data.next(3);
//     setTimeout(()=>{
//       data.next(4)
//     },3000)
//  })
let obs=interval(1000)
 obs.pipe(takeUntil(this.sub)).subscribe((data: any)=>{
  console.log(data)
 },
 (err)=>{console.log(err)},
 ()=>{console.log('completed')})
  }
  users=[
    {
        "id": 1,
        "name": "HTML 5",
        "stream": "JAVA"
    },
    {
        "id": 2,
        "name": "CSS 3",
        "stream": "JAVA"
    },
    {
        "id": 3,
        "name": "Java Script",
        "stream": "JAVA"
    },
    {
        "id": 4,
        "name": "VB.Net",
        "stream": "MS"
    },
    {
        "id": 5,
        "name": "Asure",
        "stream": "MS"
    },
    {
        "id": 6,
        "name": "C#",
        "stream": "MS"
    },
    {
        "id": 7,
        "name": "Python",
        "stream": "MS"
    }
];
ngOnDestroy(): void {
    console.log("destroy")
    this.sub.next()
    this.sub.unsubscribe()
  }


}
