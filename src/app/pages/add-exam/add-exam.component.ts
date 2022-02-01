import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDragHandle,
} from '@angular/cdk/drag-drop';
import { MatTable } from '@angular/material/table';
import { v4 as uuid } from 'uuid';
import { validate as uuidValidate } from 'uuid';
import { NgxSpinnerService } from 'ngx-spinner';

declare var $: any;


@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.scss']
})
export class AddExamComponent implements OnInit, OnChanges {

  // @Input() examName:any = ''
  examName:any = ''
  @Input() examId:any = ''
  // @Input() tableData:any
  search='';
  @Output() searchKey = new EventEmitter<string>();

  tableData:any
  @ViewChild('table') table!: MatTable<any>;
  displayedColumns: string[] = ['question'];
  idArray: string[]= []
  dataSource:any = []

  panelNum = 1;
  form: FormGroup;
  constructor(private router: Router, public data: DataService,private formBuilder: FormBuilder,private spinner: NgxSpinnerService) {
    // alert(this.examId)
    if(this.tableData == undefined || null){
      this.tableData = this.data.userDB.admin.questions
    }
    this.data.userDB.admin.exam.forEach((element:any) => {
      if(this.examId == element.examId){
        this.examName = element.examName
        this.idArray = element.questions
      }
    });
    console.log(this.tableData);
    
    this.form = this.formBuilder.group({
      website: this.formBuilder.array([], [Validators.required])
    })
   }

  ngOnChanges(changes: SimpleChanges): void {

    console.log("changes:",this.examId,"\n" ,changes);

    $('#examFormDiv').ready(() => {   //same as: $(function() { 
      // alert("hi 1");
      // console.log((<HTMLInputElement>document.getElementById(element)));
      // (<HTMLInputElement>document.getElementById(element)).checked = true;

    this.updateChanges()


 });
    // this.updateChanges()
    
  }

  updateChanges(){
    let idPresent = false
    this.spinner.show()

    this.data.userDB.admin.exam.forEach((element:any) => {
      // this.spinner.show()
      if(this.examId == element.examId){
        this.panelNum = 1
        this.search = ''
        this.examName = element.examName
        this.idArray = element.questions
        idPresent = true
        // alert(true)
        this.spinner.hide()
      } 
    });

    if(!idPresent){
      // alert(false)
        this.examName = ''
        this.search = ''
        this.idArray = []
        this.panelNum = 1
        this.spinner.hide()
    }

  }

  ngOnInit(): void {
  }

  onCheckboxChange(e:any) {
    console.log("e:",e);
    
    // console.log(this.form);
    // console.log(this.formBuilder);
    
    
    const website: FormArray = this.form.get('website') as FormArray;
   
    if (e.target.checked) {
      if(this.idArray.includes(e.target.value)){
        // alert(true)
      }
      else{
        // alert(false)
        this.idArray.push(e.target.value)
        website.push(new FormControl(e.target.value));
      }
    } else {
       const index = this.idArray.findIndex(x => x === e.target.value);
       console.log("abc:",index);
       
       this.idArray.splice(index,1);
    }


    // document.getElementById('next2')?.ariaDisabled
    // this.idArray = this.form.value.website
    // console.log(this.form.value.website.length);
    // console.log(this.form.value);

  }

  next() { 
    if (this.panelNum < 5) this.panelNum++; else this.panelNum = 1;
   }
   
   prev() {
    if (this.panelNum > 1) this.panelNum--;
    if(this.panelNum == 2){
      console.log(this.form.value.website.length);
      this.idArray = []
      this.dataSource.forEach((element:any) => {
        this.idArray.push(element.id)
      });
      // this.form.value.website?.forEach((element:any) => {
      this.idArray?.forEach((element:any) => {
        console.log(element);
        // setInterval(()=>{
        //   console.log((<HTMLInputElement>document.getElementById(element)));
        
        //   (<HTMLInputElement>document.getElementById(element)).checked = true;
        // },1000)
        
        $(element).ready(function() {   //same as: $(function() { 
          // alert("hi 1");
          console.log((<HTMLInputElement>document.getElementById(element)));
          (<HTMLInputElement>document.getElementById(element)).checked = true;


     });
  
      });
    }
   }

   next1() { 
    if (this.panelNum < 2) this.panelNum++;

    // this.form.value.website?.forEach((element:any) => {
      this.idArray?.forEach((element:any) => {
      console.log(element);
      // setInterval(()=>{
      //   console.log((<HTMLInputElement>document.getElementById(element)));
      
      //   (<HTMLInputElement>document.getElementById(element)).checked = true;
      // },1000)
      
      $(element).ready(function() {   //same as: $(function() { 
        // alert("hi 1");
        console.log((<HTMLInputElement>document.getElementById(element)));
        (<HTMLInputElement>document.getElementById(element)).checked = true;


   });

    });
    
    
   }

   next2() { 
    if (this.panelNum < 3) this.panelNum++;
    this.dataSource = []
    // this.data.userDB.admin.questions.forEach((element:any) => {
    //   this.idArray.forEach((element1:any) => {
    //     if(element.id == element1){
    //       if(this.dataSource.includes(element)){}
    //       else{
    //       this.dataSource.push(element)
    //       }
    //     }
    //   });
    // });
    this.idArray.forEach((element:any) => {
      this.data.userDB.admin.questions.forEach((element1:any) => {
        if(element == element1.id){
          if(this.dataSource.includes(element1)){}
          else{
          this.dataSource.push(element1)
          }
        }
      });
    });

    console.log(this.dataSource);

  }
   
   prev1() {
    if (this.panelNum > 1) this.panelNum--;
   }

   submit(){
     let arrayOfQuestionId: any = []
     this.dataSource.forEach((element:any) => {
      arrayOfQuestionId.push(element.id)
     });
    let b:any = {}
    let a,idPresent = false;
   if(this.examId == ''){
    a = uuid();
    let d = uuidValidate(a)
    if(d){
      // alert("inside d")
      b.examId = a;
      b.examName = this.examName
      b.questions = arrayOfQuestionId
      this.data.userDB.admin.exam.push(b); 
    }
   } else if(this.examId != ''){
    b.examId = this.examId;
    b.examName = this.examName
    b.questions = arrayOfQuestionId
    let index = 0;
    this.data.userDB.admin.exam.forEach((element: any) => {
        if (element.examId === this.examId) {
          idPresent = true;
          this.data.userDB.admin.exam[index] = b;
        }
        index++;
      })
      if(!idPresent){
        alert('Record you want to update is deleted!!!')
      }
   }
   this.data.pushData();
   this.examName = ''
   this.examId = ''
   this.idArray = []
   this.panelNum = 1
  //  location.reload()
  // this.reloadFlag.emit(!this.reloadFlag);
  // alert(this.reloadFlag)
  //  console.log(this.addQuestionform.value);
    $('#createExamModal').modal('hide');
    $('.toast5').toast('show');

   }

   dropTable(event: CdkDragDrop<any>) {
    const prevIndex = this.dataSource.findIndex((d:any) => d === event.item.data);
    moveItemInArray(this.dataSource, prevIndex, event.currentIndex);
    this.table.renderRows();
    // console.log(this.table);

    console.log(this.dataSource);
  }

  searchData(){
    console.log(this.search);
    this.searchKey.emit(this.search)

    this.idArray?.forEach((element:any) => {
      console.log(element);
      // setInterval(()=>{
      //   console.log((<HTMLInputElement>document.getElementById(element)));
      
      //   (<HTMLInputElement>document.getElementById(element)).checked = true;
      // },1000)
      
      $(element).ready(function() {   //same as: $(function() { 
        // alert("hi 1");
        console.log((<HTMLInputElement>document.getElementById(element)));
        (<HTMLInputElement>document.getElementById(element)).checked = true;


   });
  })

  }

}
