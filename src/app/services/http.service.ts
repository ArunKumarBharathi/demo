import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AsyncSubject, BehaviorSubject, Observable, ReplaySubject, Subject, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { login } from '../login/login';
import { LoginResponse } from '../login/loginResponse';
import { UserData } from '../login/UserData';

import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  subject=new AsyncSubject()
  
  userSubject = new BehaviorSubject<UserData>(null);

  private user: BehaviorSubject<Observable<firebase.User>> = new BehaviorSubject<Observable<firebase.User>>(null);
  user$ = this.user
    .asObservable()
    .pipe(switchMap((user: Observable<firebase.User>) => user));

  constructor(private http: HttpClient,public router :Router,private fireAuth:AngularFireAuth) { 
    this.subject.subscribe((data) =>{console.log(data)})
    this.subject.next('AKK');
    this.user.next(this.fireAuth.authState)
    console.log(this.user,this.user$)
  }
  httpOptions: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }

  googleLogin(){
    this.fireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((res) =>{
      console.log(res.user);
      const user = new UserData(res.user.email,res.user.getIdToken.toString(),res.user.providerId,new Date(new Date().getTime()+50000000000000000000000000000000000000))
    console.log(user);
    this.userSubject.next(user);
    localStorage.setItem('userCredentials',JSON.stringify(user));  
    }).catch((err)=>{
        this.errorHandler
      })
  }

  postClient(email, password) {
  return this.http.post<LoginResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAGOk91TwY-MBCV2X_5oreTsMQkkNxHONA', { email, password, returnSecureToken: true })
    .pipe(catchError(this.errorHandler), tap(this.handleResponse.bind(this)));
  }

  login(email, password) {
    this.fireAuth.signInWithEmailAndPassword(email, password).then((res)=>{console.log(res)}).catch((err)=>{console.log(err)})
    return this.http.post<LoginResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAGOk91TwY-MBCV2X_5oreTsMQkkNxHONA', { email, password, returnSecureToken: true })
      .pipe(catchError(this.errorHandler), tap(this.handleResponse.bind(this)));
  }
  getClient() {
    return this.http.get('https://awesome-51635-default-rtdb.firebaseio.com/posts.json')
  }
  deleteClient() {
    return this.http.delete('https://awesome-51635-default-rtdb.firebaseio.com/posts.json')
  }
  errorHandler(err: HttpErrorResponse) {
    let errorMsg = 'Erron occurred'
    if (!err.error || !err.error.error) {
      return throwError(errorMsg)
    }
    switch (err.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMsg = 'Email already exists'
        break;
      case 'EMAIL_NOT_FOUND':
        errorMsg = 'Invalid email'
        break;
      case 'INVALID_PASSWORD':
        errorMsg = 'Invalid Password'
        break;
      default:
        break;
    }
    return throwError(errorMsg)
  }
  handleResponse(res: LoginResponse) {
    let expire = new Date(new Date().getTime() + +res.expiresIn * 1000)
    // console.log(res.email,res.idToken,res.localId,expire)
    const user = new UserData(res.email,res.idToken,res.localId,expire)
    console.log(user);
    this.userSubject.next(user);
    localStorage.setItem('userCredentials',JSON.stringify(user));
    this.autoLogout(+res.expiresIn * 1000)
  }

  logout(){
    this.userSubject.next(null);
    localStorage.removeItem('userCredentials');
    this.router.navigate(['/'])
  }

  autoLogin(){
    let user:{email:string,idToken:string,localId:string,expiresIn:string}=JSON.parse(localStorage.getItem('userCredentials'));
    if(!user){
      return
    }
    let userData=new UserData(user.email,user.idToken,user.localId,new Date(user.expiresIn));
    if(userData.token){
      this.userSubject.next(userData)
    }
    let date=new Date().getTime();
    this.autoLogout(new Date(user.expiresIn).getTime()-date)
  }
  autoLogout(expire){
    console.log(expire)
    setTimeout(()=>{
      this.logout();
    },expire)
  }
  signOut(){
    this.fireAuth.signOut()
  }
}
