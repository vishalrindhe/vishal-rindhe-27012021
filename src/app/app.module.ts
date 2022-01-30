import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import * as $ from "jquery";
import { AddQuestionComponent } from './pages/add-question/add-question.component';
import { TableComponent } from './pages/table/table.component';
import { FilterPipe } from './pipe/filter.pipe';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { PagerComponent } from './pages/pager/pager.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    NavbarComponent,
    SidebarComponent,
    AddQuestionComponent,
    TableComponent,
    FilterPipe,
    PagerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far);
  }
 }
