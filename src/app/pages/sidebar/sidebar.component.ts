import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  examId:string = ''
  constructor(private router: Router, public data: DataService) { }
  @Output() exam = new EventEmitter<string>();


  ngOnInit(): void {
    // document.body.style.backgroundColor = "#000000";
    // document.body.style.maxWidth = "100%";
    // document.body.style.overflowX = "hidden";

  }

  getExamId(id:string){
    // alert(id)
    this.examId = id
  }

  editExam(id:string){
    // alert(id)
    this.exam.emit(id)
    $('#createExamModal').modal('show');
    
  }
  deleteExam(){
    // alert(this.examId)
    let index = 0;
    this.data.userDB.admin.exam.forEach((element: any) => {
      // alert(element.examId+":"+this.examId +":"+index)
      if (element.examId == this.examId) {
        // alert("inside if")
        this.data.userDB.admin.exam.splice(index, 1);
        this.data.pushData();
        $('#examDeleteModal').modal('hide');
        $('.toast6').toast('show');
      }
      index++;
    });
  }

}
