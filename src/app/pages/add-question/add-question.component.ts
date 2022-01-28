import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { v4 as uuid } from 'uuid';

declare var $:any;

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss'],
})
export class AddQuestionComponent implements OnInit {
  addQuestionform: FormGroup;

  constructor(private data: DataService) {
    this.addQuestionform = new FormGroup({
      question: new FormControl('', [Validators.required]),
      option1: new FormControl('', [Validators.required]),
      option2: new FormControl('', [Validators.required]),
      option3: new FormControl('', [Validators.required]),
      option4: new FormControl('', [Validators.required]),
      answer: new FormControl('0', [Validators.required]),
    });
  }

  

  ngOnInit(): void {}

  submit(){
   console.log(this.addQuestionform.value);
   let b = this.addQuestionform.value
   let a = uuid();
   b.id = a;
   console.log(b);
   this.data.userDB.admin.questions.push(b);  
   this.data.pushData();
   $('.toast0').toast('show');
  //  this.addQuestionform.reset();
    // this.data.userDB.admin.questions
  }
}
