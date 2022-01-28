import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  addQuestionButton:boolean = false;
  constructor(private data: DataService, private router: Router) { 
    // if(!this.data.loggedIn){
    //   this.router.navigateByUrl('/login');
    // }

    console.log(this.addQuestionButton);
    
  }

  ngOnInit(): void {
    document.body.style.maxWidth = "100%";
    document.body.style.overflowX = "hidden";
  }

  addItem(newItem: any) {
    this.addQuestionButton = newItem
  }

}
