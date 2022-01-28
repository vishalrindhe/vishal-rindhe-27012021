import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  clickedOnAddQuestion: boolean = false
  @Output() newItemEvent = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }

  addNewItem() {
    this.clickedOnAddQuestion = !this.clickedOnAddQuestion;
    this.newItemEvent.emit(this.clickedOnAddQuestion);
  }
}
