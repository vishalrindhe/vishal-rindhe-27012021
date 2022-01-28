import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private data: DataService, private router: Router) { 
    // if(!this.data.loggedIn){
    //   this.router.navigateByUrl('/login');
    // }
  }

  ngOnInit(): void {
  }

}
