import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRegistrationComponent } from './create-registration/create-registration.component';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import { RegistrationListComponent } from './registration-list/registration-list.component';


const routes:Routes=[
 // {path:'',redirectTo:'register',pathMatch:'full'}, // if the path is empty default page is this compoennt
 // {path:'register',component:CreateRegistrationComponent},
 {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'about',component:AboutComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
