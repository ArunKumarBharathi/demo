import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
// import { LogoutComponent } from './login/logout.component';
import { AuthGuard } from './services/auth.guard';
import { ErrorModalComponent } from './shared/error-modal/error-modal.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
 
  // {path:'user',component:UserComponent, canActivate:[AuthGuard],
  // {path:"user/:id",component:UserDetailsComponent},
  // {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent},
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
