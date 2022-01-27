import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path:'dashboard',component:DashboardComponent},
  { path:'login',component:LoginComponent},
  { path:'navbar',component:NavbarComponent},
  { path:'sidebar',component:SidebarComponent},
  {path: '',   redirectTo: '/dashboard', pathMatch: 'full' },
  { path:'**',redirectTo: '/dashboard'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
