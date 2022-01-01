import { AfterViewInit, Component, ComponentFactory, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { HostDirective } from '../host.directive';
import { ModalDirective } from '../modal.directive';
import { AuthService } from '../services/auth.service';
import { HttpService } from '../services/http.service';
import { WindowService } from '../services/window.service';
import { ErrorModalComponent } from '../shared/error-modal/error-modal.component';
import { login} from './login'
import { LoginResponse } from './loginResponse';
import firebase from 'firebase/app';
import { AngularFireModule } from '@angular/fire'
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit ,OnDestroy, AfterViewInit{
  User:{name:string,password:string};
  nam;
  formgroup:FormGroup;
  loginValues:any;
  spin=false;
  observ:Observable<LoginResponse>
  error=null;
  modalSub:Subscription;
  @ViewChild('loginForm') loginForm:NgForm;
  @ViewChild(ModalDirective) modalDir:ModalDirective;

  get hobbies(){
    return (this.formgroup.get('formArray') as FormArray).controls
  }
 
  windowRef: any;

  verificationCode: string;

  user1: any;
  phoneNumber:any
  constructor(private authservice:AuthService, private formBuilder:FormBuilder, private http:HttpService, private container:ComponentFactoryResolver,
    private win: WindowService,private fireAuth:AngularFireAuth) { }
  ngAfterViewInit(): void {
    this.windowRef = this.win.windowRef
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container',{
      'size':'normal',
      'callback':(res)=>{}
    })
    this.windowRef.recaptchaVerifier.render()


  }
  ngOnDestroy(): void {
    if(this.modalSub){
      this.modalSub.unsubscribe()
    }
  }

  ngOnInit(): void {
    // firebase.initializeApp(environment.firebaseConfig);
    this.http.subject.subscribe((data)=>{
      console.log('login '+data)
    })
    this.http.subject.complete()

    this.formgroup=this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]],
      // address:this.formBuilder.group({
      //   street:[''],
      //   city:['']
      // }),
      // formArray:new FormArray([])
    });
    // this.formgroup.setValue({
    //   name:'Arun',
    //   password:'Aru',
    //   address:{street:'east',city:'namakkal'},
    //   FormArray:['']
    // })

    this.http.userSubject.subscribe((response) =>{
      // console.log(response)
    },(err) =>{
      console.log(err)
    })
    
  }

  validateEmail(c:FormControl){
    if(c.value==='Arun'){
      return null
    } else{
      return {passwordError:{err:'wrong password'}}
    } 
  }

  // login(){
  //   this.authservice.status=true;
  // }
  
  // logout(){
  //   this.authservice.status=false;
  // }

  onSubmit(){
    this.spin=true;
    this.error=''
    this.http.postClient(this.formgroup.value.email,this.formgroup.value.password).subscribe((data) =>{
      this.spin=false;
      console.log(data)
    },(err) =>{
      this.spin=false;
      this.error=err;
      this.showError(err);
    })
    // this.User={
    //   name:this.loginForm.control.value.name,
    //   password:this.loginForm.control.value.password
    // }
    // console.log(this.User)
  }

  addLogin(){
    // const array=new FormControl('');
    // (this.formgroup.get('formArray') as FormArray).push(array);
    this.spin=true;
    this.error=''
    this.http.login(this.formgroup.value.email,this.formgroup.value.password).subscribe((data) =>{
      this.spin=false;
      console.log(data)
    },(err) =>{
      this.spin=false;
      console.log(err)
      this.error=err;
      this.showError(err);
    })
  }

  getdetails(){
    this.http.getClient().pipe(map((res)=>{
      let details=[]
      for(let key in res){
        details.push({...res[key]})
      }
      return details
    }))
    .subscribe((data) =>{
      this.loginValues=data
    },(err) =>{console.log(err)})
  }

  deletedetails(){
    this.http.deleteClient().subscribe((data) =>{
      this.getdetails();
    },(err) =>{console.log(err)})
  }
  showError(error){
    const modal=this.container.resolveComponentFactory(ErrorModalComponent);
    let modalCont=this.modalDir.ViewContainer.createComponent(modal);
    modalCont.instance.error=error;
    this.modalSub=modalCont.instance.close.subscribe(()=>{
      console.log('closed')
      this.modalSub.unsubscribe();
    this.modalDir.ViewContainer.clear();
    })
  }
  googleLogin(){
    this.http.googleLogin();
  }

  
  sendLoginCode() {

    const appVerifier = this.windowRef.recaptchaVerifier;

    const num = `+91`+this.phoneNumber;

    firebase.auth().signInWithPhoneNumber(num, appVerifier)
            .then(result => {

                this.windowRef.confirmationResult = result;

            })
            .catch( error => console.log(error) );

  }

  verifyLoginCode() {
    this.windowRef.confirmationResult
                  .confirm(this.verificationCode)
                  .then( result => {
                    console.log(result)
    })
    .catch( error => console.log(error, "Incorrect code entered?"));
  }

  signOut(){
    this.http.signOut();
  }
}
