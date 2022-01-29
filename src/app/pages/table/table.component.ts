import { DataService } from './../../services/data.service';
import { Router } from '@angular/router';
import { Component, OnInit,  Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() search = '';
   item = '';
  constructor(private router: Router, public data: DataService) { }

  ngOnInit(): void {
  }

}
