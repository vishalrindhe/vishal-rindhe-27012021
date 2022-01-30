import { DataService } from './../../services/data.service';
import { AfterViewInit, Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { v4 as uuid } from 'uuid';
import { validate as uuidValidate } from 'uuid';
import { NgxSpinnerService } from "ngx-spinner";

declare var $:any;

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss'],
})
export class AddQuestionComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() questionId = '';
  @Output() reloadFlag = new EventEmitter<boolean>(false);

  id=''
  question=''
  option1 =''
  option2 =''
  option3 =''
  option4 =''
  answer='0'

  addQuestionform = new FormGroup({
    question: new FormControl(this.question, [Validators.required]),
    option1: new FormControl(this.option1, [Validators.required]),
    option2: new FormControl(this.option2, [Validators.required]),
    option3: new FormControl(this.option3, [Validators.required]),
    option4: new FormControl(this.option4, [Validators.required]),
    answer: new FormControl(this.answer, [Validators.required]),
  });
  constructor(private data: DataService,private spinner: NgxSpinnerService) {
    console.log(this.addQuestionform.value);
    console.log(document.getElementById('question'));
    // this.addQuestionform = new FormGroup({
    //   question: new FormControl(this.question, [Validators.required]),
    //   option1: new FormControl(this.option1, [Validators.required]),
    //   option2: new FormControl(this.option2, [Validators.required]),
    //   option3: new FormControl(this.option3, [Validators.required]),
    //   option4: new FormControl(this.option4, [Validators.required]),
    //   answer: new FormControl(this.answer, [Validators.required]),
    // });
  }
  ngAfterViewInit(): void {
    // alert(true)
    // this.spinner.show()
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    // this.spinner.show()
    this.setValues()
    // setTimeout(() =>{
      // this.spinner.hide()
    // },3000)
    
  }




  setValues(){
    this.data.userDB.admin.questions.forEach((element: any) => {
    this.spinner.show()
      if (element.id === this.questionId) {
        this.id = this.questionId
        // this.questionId = ''
        alert(this.id)

        // this.addQuestionform.reset(this.answer);
        this.question = element.question;
        this.option1 = element.option1;
        this.option2 = element.option2;
        this.option3 = element.option3;
        this.option4 = element.option4;
        this.answer = element.answer;
        this.addQuestionform.value.question = element.question;
        this.addQuestionform.value.option1 = element.option1;
        this.addQuestionform.value.option2 = element.option2;
        this.addQuestionform.value.option3 = element.option3;
        this.addQuestionform.value.option4 = element.option4;
        this.addQuestionform.value.answer = element.answer;
        
        (<HTMLInputElement>document.getElementById("options")).value = this.answer;

        // alert(this.answer)
      }
    })
    this.spinner.hide()
    // console.log(this.addQuestionform.value);
    console.log(document.getElementById('question'));

  }
  

  ngOnInit(): void {
    // this.spinner.show()
    this.addQuestionform = new FormGroup({
      question: new FormControl(this.question, [Validators.required]),
      option1: new FormControl(this.option1, [Validators.required]),
      option2: new FormControl(this.option2, [Validators.required]),
      option3: new FormControl(this.option3, [Validators.required]),
      option4: new FormControl(this.option4, [Validators.required]),
      answer: new FormControl(this.answer, [Validators.required]),
    });
  }

  submit(){
   console.log(this.addQuestionform.value);
   let b = this.addQuestionform.value
   let a,idPresent = false;
   if(this.questionId == ''){
    a = uuid();
    let d = uuidValidate(a)
    if(d){
      alert("inside d")
      b.id = a;
      this.data.userDB.admin.questions.push(b); 
    }
   } else if(this.questionId != ''){
    b.id = this.questionId;
    let index = 0;
    this.data.userDB.admin.questions.forEach((element: any) => {
        if (element.id === this.questionId) {
          idPresent = true;
          this.data.userDB.admin.questions[index] = b;
        }
        index++;
      })
      if(!idPresent){
        alert('Record you want to update is deleted!!!')
      }
   }
   this.data.pushData();
   $('.toast3').toast('show');
   this.addQuestionform.reset(this.answer);
   this.answer = '0'
   $('#options').val("0");
   this.addQuestionform.value.answer = '0'
  //  location.reload()
  this.reloadFlag.emit(!this.reloadFlag)
   console.log(this.addQuestionform.value);
  }
}
