import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  status=false;
  constructor() { }
  isLoggedIn():boolean{
    return this.status;
  }

}
