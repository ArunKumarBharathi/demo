import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  User:{id:string,name:string,stream:string}
  id:string;
  param:string
  constructor(private route:Router,private ActivateRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.ActivateRoute.params.subscribe((data:Params)=>{
      this.User={id:data['id'],name:'A',stream:'Ak'};
    })
    this.ActivateRoute.queryParams.subscribe(param=>{this.param=param['name']})
  }

}
