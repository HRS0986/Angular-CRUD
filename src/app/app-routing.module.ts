import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FacilitiesComponent } from './components/facilities/facilities.component';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
  { path:'login', component:LoginComponent },
  { path:'facilities', component:FacilitiesComponent },
  { path:'', redirectTo:'login', pathMatch:'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
