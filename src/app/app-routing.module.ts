import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path:'dashboard', canActivate:[AuthGuard], component:DashboardComponent},
  { path:'login' ,component:LoginComponent},
  { path:'navbar', canActivate:[AuthGuard],component:NavbarComponent},
  { path:'sidebar', canActivate:[AuthGuard],component:SidebarComponent},
  {path: '',   redirectTo: '/dashboard', pathMatch: 'full' },
  { path:'**',redirectTo: '/dashboard'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
