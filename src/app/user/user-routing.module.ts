import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { AuthGuard } from '../services/auth.guard';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { UserComponent } from './user.component';

const routes: Routes = [
 
    // {path:'user',component:UserComponent, canActivate:[AuthGuard],
    // {path:"user/:id",component:UserDetailsComponent},
    
    {path:'',component:UserComponent, canActivate:[AuthGuard]},
    {path:":id",component:UserDetailsComponent,canActivate:[AuthGuard]},
   
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class UserRoutingModule { }
  