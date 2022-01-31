import { SortPipe } from './../../pipe/sort.pipe';
import { FilterPipe } from './../../pipe/filter.pipe';
import { DataService } from './../../services/data.service';
import { Router } from '@angular/router';
import { Component, OnInit, Input, Pipe, OnChanges, SimpleChanges, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import * as fs from 'file-saver';
import { Workbook } from 'exceljs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

declare var $: any;



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [FilterPipe, SortPipe]
})
export class TableComponent implements OnInit, OnChanges {
  @ViewChild('exampleModal') exampleModal: any;
  @Input() search = '';
  @Input() reload:any;
  @Output() questionId = new EventEmitter<string>();

  question=''
  option1=''
  option2=''
  option3=''
  option4=''
  answer=''
  order = '';
  item = '';
  items: object[] = this.data.userDB.admin.questions;
  fieldNames: string[] = [];
  pageIndex: number = 0;
  pageSize: number = 5;
  idToBeDelete = '';
  tableData = this.pipe.transform(this.data.userDB.admin.questions, this.search, 'question');
  count: any = this.tableData.length;
  indexVal: any;
  constructor(private router: Router, public data: DataService, private pipe: FilterPipe, private sortPipe:SortPipe) {
    // this.pageIndex = 0;
    // this.pageSize = 5;
    // this.items = this.data.userDB.admin.questions
    // this.count = this.tableData?.length;
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.updateTableData();

  }

  ngOnInit(): void {
  }

  updateTableData(){
    this.tableData = this.tableData.map(function(a) { 
      a.question = a.question.toLowerCase();
      a.option1 = a.option1.toLowerCase();
      a.option2 = a.option2.toLowerCase();
      a.option3 = a.option3.toLowerCase();
      a.option4 = a.option4.toLowerCase();
      a.answer = a.answer.toLowerCase();
      return a;
     });
    this.tableData = this.pipe.transform(this.data.userDB.admin.questions, this.search, 'question');
    this.count = this.tableData?.length;
  }

  exportExcel() {
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('ProductSheet');

    worksheet.columns = [
      { header: 'Id', key: 'id', width: 10 },
      { header: 'Question', key: 'question', width: 32 },
      { header: 'Option 1', key: 'option1', width: 10 },
      { header: 'Option 2', key: 'option2', width: 10 },
      { header: 'Option 3', key: 'option3', width: 10 },
      { header: 'Option 4', key: 'option4', width: 10 },
      { header: 'Answer', key: 'answer', width: 10, style: { font: { name: 'Arial Black', size: 10 } } },
    ];

    this.tableData.forEach((e: any) => {
      worksheet.addRow({ id: e.id, question: e.question, option1: e.option1, option2: e.option2, option3: e.option3, option4: e.option4, answer: e.answer }, "n");
    });

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'ProductData.xlsx');
    })

    // workbook.csv.writeBuffer().then((data) => {
    //   let blob = new Blob([data], { type: 'text/csv' });
    //   fs.saveAs(blob, 'ProductData.csv');
    // })

  }

  exportCsv() {

    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('ProductSheet');

    worksheet.columns = [
      { header: 'Id', key: 'id', width: 10 },
      { header: 'Question', key: 'question', width: 32 },
      { header: 'Option 1', key: 'option1', width: 10 },
      { header: 'Option 2', key: 'option2', width: 10 },
      { header: 'Option 3', key: 'option3', width: 10 },
      { header: 'Option 4', key: 'option4', width: 10 },
      { header: 'Answer', key: 'answer', width: 10, style: { font: { name: 'Arial Black', size: 10 } } },
    ];

    this.tableData.forEach((e: any) => {
      worksheet.addRow({ id: e.id, question: e.question, option1: e.option1, option2: e.option2, option3: e.option3, option4: e.option4, answer: e.answer }, "n");
    });

    workbook.csv.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'text/csv' });
      fs.saveAs(blob, 'ProductData.csv');
    })
  }

  passId(id: string) {
    this.idToBeDelete = id;
  }

  deleteQuestion() {
    let index = 0;
    this.data.userDB.admin.questions.forEach((element: any) => {
      if (element.id === this.idToBeDelete) {
        this.data.userDB.admin.questions.splice(index, 1);
        this.data.pushData();
        $('#exampleModal').modal('hide');
        $('.toast4').toast('show');
      }
      index++;
    });
    this.updateTableData();
  }

  editQuestion(id:string){
    this.questionId.emit(id);
  }


  sort(){
    if(this.order === ''){
      this.tableData = this.sortPipe.transform(this.tableData,"desc","question")
      this.order = 'desc';
    } else if(this.order === 'asc'){
      this.tableData = this.sortPipe.transform(this.tableData,"desc","question")
      this.order = 'desc';
    } else {
      this.tableData = this.sortPipe.transform(this.tableData,"asc","question")
      this.order = 'asc';
    } 
  }

  modalData(data:any,indexVal:any){
    this.indexVal = indexVal
    this.question=data.question
    this.option1=data.option1
    this.option2=data.option2
    this.option3=data.option3
    this.option4=data.option4
    this.answer=data.answer
    // alert(question)
  }
}
