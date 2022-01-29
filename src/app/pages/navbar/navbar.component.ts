import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  clickedOnAddQuestion: boolean = false
  search='';
  @Output() newItemEvent = new EventEmitter<boolean>();
  @Output() searchKey = new EventEmitter<string>();

  constructor() { 
    console.log(this.search);
  }

  ngOnInit(): void {
  }

  addNewItem() {
    this.clickedOnAddQuestion = !this.clickedOnAddQuestion;
    this.newItemEvent.emit(this.clickedOnAddQuestion);
  }

  searchData(){
    console.log(this.search);
    this.searchKey.emit(this.search)
  }
}
