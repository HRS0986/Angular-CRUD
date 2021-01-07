import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FacilitiesComponent } from './components/facilities/facilities.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginAuthGuard } from "./guards/login-auth.guard";
import { FacilityAuthGuard } from './guards/facility-auth.guard'; 


const routes: Routes = [
  { path:'login', component:LoginComponent, canActivate:[LoginAuthGuard] },
  { path:'register', component:RegisterComponent, canActivate:[LoginAuthGuard] },
  { path:'facilities', component:FacilitiesComponent, canActivate:[FacilityAuthGuard] },
  { path:'', redirectTo:'login', pathMatch:'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
