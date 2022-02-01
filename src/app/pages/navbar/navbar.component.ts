import { DataService } from 'src/app/services/data.service';
import { Component, Input, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  clickedOnAddQuestion: boolean = false
  search='';
  @Input() editExamId = ''
  @Output() newItemEvent = new EventEmitter<boolean>();
  @Output() searchKey = new EventEmitter<string>();

  constructor(private data:DataService) { 
    console.log(this.search);
  }

  ngOnInit(): void {
  }

  addNewItem() {
    this.clickedOnAddQuestion = !this.clickedOnAddQuestion;
    this.newItemEvent.emit(this.clickedOnAddQuestion);
  }

  exam(){
    this.editExamId = ''
    // alert(this.editExamId)
    
    // setTimeout(()=>{
      $('#createExamModal').modal('show');
    // },2000)

    
  }
  searchData(){
    console.log(this.search);
    this.searchKey.emit(this.search)
  }

  signOut(){
    this.data.userDB.admin.loggedIn = false
    this.data.pushData()
    location.reload()
    $('.toast7').toast('show');
  }
}
