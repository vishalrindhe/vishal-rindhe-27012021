import { Component, Input, OnInit, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.scss']
})
export class AddExamComponent implements OnInit {

  @Input() examName:any = ''
  @Input() tableData:any
  @ViewChild('table') table!: MatTable<any>;
  displayedColumns: string[] = ['question'];
  idArray= []
  dataSource:any = []

  panelNum = 1;
  form: FormGroup;
  constructor(private router: Router, public data: DataService,private formBuilder: FormBuilder) {
    if(this.tableData == undefined || null){
      this.tableData = this.data.userDB.admin.questions
    }
    console.log(this.tableData);
    
    this.form = this.formBuilder.group({
      website: this.formBuilder.array([], [Validators.required])
    })
   }

  ngOnInit(): void {
  }

  onCheckboxChange(e:any) {
    const website: FormArray = this.form.get('website') as FormArray;
   
    if (e.target.checked) {
      website.push(new FormControl(e.target.value));
    } else {
       const index = website.controls.findIndex(x => x.value === e.target.value);
       website.removeAt(index);
    }


    // document.getElementById('next2')?.ariaDisabled
    this.idArray = this.form.value.website
    console.log(this.form.value.website.length);
    console.log(this.form.value);

  }

  next() { 
    if (this.panelNum < 5) this.panelNum++; else this.panelNum = 1;
   }
   
   prev() {
    if (this.panelNum > 1) this.panelNum--;
    if(this.panelNum == 2){
      console.log(this.form.value.website.length);

      this.form.value.website?.forEach((element:any) => {
        console.log(element);
        console.log((<HTMLInputElement>document.getElementById(element)));
        
      (<HTMLInputElement>document.getElementById(element)).checked = true;
  
      });
    }
   }

   next1() { 
    if (this.panelNum < 2) this.panelNum++;
    
    
   }

   next2() { 
    if (this.panelNum < 3) this.panelNum++;

    this.data.userDB.admin.questions.forEach((element:any) => {
      this.form.value.website.forEach((element1:any) => {
        if(element.id == element1){
          this.dataSource.push({question:element.question})
        }
      });
    });

    console.log(this.dataSource);

  }
   
   prev1() {
    if (this.panelNum > 1) this.panelNum--;
   }

   submit(){

   }

   dropTable(event: CdkDragDrop<any>) {
    const prevIndex = this.dataSource.findIndex((d:any) => d === event.item.data);
    moveItemInArray(this.dataSource, prevIndex, event.currentIndex);
    this.table.renderRows();
    // console.log(this.table);

    console.log(this.dataSource);
  }

}
