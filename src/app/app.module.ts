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
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SortPipe } from './pipe/sort.pipe';
import { AddExamComponent } from './pages/add-exam/add-exam.component';
import {MatTableModule} from '@angular/material/table'; 
import {DragDropModule} from '@angular/cdk/drag-drop';


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
    SortPipe,
    AddExamComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    MatTableModule,
    DragDropModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far);
  }
 }
