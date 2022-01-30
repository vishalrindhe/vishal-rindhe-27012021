import { FilterPipe } from './../../pipe/filter.pipe';
import { DataService } from './../../services/data.service';
import { Router } from '@angular/router';
import { Component, OnInit, Input, Pipe, OnChanges, SimpleChanges } from '@angular/core';
import * as fs from 'file-saver';
import { Workbook } from 'exceljs';
import { FormControl, FormGroup, Validators } from '@angular/forms';




@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers:[FilterPipe]
})
export class TableComponent implements OnInit, OnChanges {
  @Input() search = '';
   item = '';
   items: object[] | undefined;
  fieldNames: string[] = [];
  pageIndex!: number;
  pageSize!: number;
  count:any = 0;
  tableData = this.pipe.transform(this.data.userDB.admin.questions,this.search,'question');
  constructor(private router: Router, public data: DataService, private pipe : FilterPipe) { 
    this.pageIndex = 0;
    this.pageSize = 5;
    this.items = this.data.userDB.admin.questions
    this.count = this.tableData?.length;
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.tableData = this.pipe.transform(this.data.userDB.admin.questions,this.search,'question');
    this.count = this.tableData?.length;

  }

  ngOnInit(): void {
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
      { header: 'Answer', key: 'answer', width: 10, style: { font: { name: 'Arial Black', size:10} } },
    ];
   
    this.tableData.forEach((e:any) => {
      worksheet.addRow({id: e.id, question: e.question, option1:e.option1,option2:e.option2,option3:e.option3,option4:e.option4, answer:e.answer},"n");
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
      { header: 'Answer', key: 'answer', width: 10, style: { font: { name: 'Arial Black', size:10} } },
    ];
   
    this.tableData.forEach((e:any) => {
      worksheet.addRow({id: e.id, question: e.question, option1:e.option1,option2:e.option2,option3:e.option3,option4:e.option4, answer:e.answer},"n");
    });
   
    workbook.csv.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'text/csv' });
      fs.saveAs(blob, 'ProductData.csv');
    })
  }

}
