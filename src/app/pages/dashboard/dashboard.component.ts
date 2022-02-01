import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  addQuestionButton:boolean = false;
  search = '';
  editQuestionId = '';
  reloadFlag: any;
  editExamId = ''

  constructor(private data: DataService, private router: Router,private spinner: NgxSpinnerService) { 
    // if(!this.data.loggedIn){
    //   this.router.navigateByUrl('/login');
    // }

    // console.log(this.addQuestionButton);
    
  }

  ngOnInit(): void {
    // document.body.style.maxWidth = "100%";
    // document.body.style.overflowX = "hidden";
  }

  addItem(newItem: any) {
    this.addQuestionButton = newItem
    this.editQuestionId = ''
  }

  editExam(newItem: any) {
    this.editExamId = newItem
  }

  questionId(id:any){
    // alert(id)
    this.editQuestionId = id;
    this.addQuestionButton = false;
    this.spinner.show()
    setTimeout(()=>{
      this.spinner.hide()
      this.addQuestionButton = true;

    },1000)
    // console.log(id);
    
  }


  searchKey(key:any){
    // console.log(key);
    this.search = key; 
  }

  reload(reload:any){
    this.reloadFlag = reload
  }

}
