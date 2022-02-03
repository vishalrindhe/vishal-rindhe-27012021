import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  loggedIn: boolean | undefined;
  userDB: any;

  constructor() { 
    if(localStorage.getItem('userDB') !== null){
      this.userDB = JSON.parse(localStorage.getItem('userDB') || '');
      this.loggedIn = this.userDB.admin.loggedIn;
    } else{
      let db = {
        "admin":{
          email:'abc@abc.com',
          password:'abcd1234',
          loggedIn: false,
          questions: [
            {
              "question": "what is your name?",
              "option1": "rahul",
              "option2": "vishal",
              "option3": "rushal",
              "option4": "rakesh",
              "answer": "option 2",
              "id": "c23f4f9a-0aa1-4723-93e0-02a040a02d29"
            },
            {
              "question": "what comes after c?",
              "option1": "d",
              "option2": "e",
              "option3": "f",
              "option4": "g",
              "answer": "option 1",
              "id": "a59ab74f-487c-47af-a15c-ced0696f337a"
            },
            {
              "question": "biggest number among following numbers",
              "option1": "one",
              "option2": "two",
              "option3": "eight",
              "option4": "four",
              "answer": "option 3",
              "id": "12a3d9ae-9933-4ac1-89e3-6a4f8dd4d9de"
            },
            {
              "question": "smallest number?",
              "option1": "four",
              "option2": "three",
              "option3": "two",
              "option4": "one",
              "answer": "option 4",
              "id": "94478af9-0f94-49d1-8a2f-9235eb851b39"
            },
            {
              "question": "2^2 = ?",
              "option1": "0",
              "option2": "7",
              "option3": "4",
              "option4": "8",
              "answer": "option 3",
              "id": "694082f9-9d56-4c67-9fe3-f6fe34ea3cee"
            }
          ],
          "exam": [
            {
              "examId": "0c46f531-1c78-4933-b149-93149850efa6",
              "examName": "Maths",
              "questions": [
                "694082f9-9d56-4c67-9fe3-f6fe34ea3cee",
                "94478af9-0f94-49d1-8a2f-9235eb851b39",
                "c23f4f9a-0aa1-4723-93e0-02a040a02d29",
                "a59ab74f-487c-47af-a15c-ced0696f337a",
                "12a3d9ae-9933-4ac1-89e3-6a4f8dd4d9de"
              ]
            },
            {
              "examId": "ab6e9b07-16ec-43ae-9eaf-72b3324c8e2b",
              "examName": "Science",
              "questions": [
                "12a3d9ae-9933-4ac1-89e3-6a4f8dd4d9de",
                "c23f4f9a-0aa1-4723-93e0-02a040a02d29",
                "a59ab74f-487c-47af-a15c-ced0696f337a",
                "694082f9-9d56-4c67-9fe3-f6fe34ea3cee",
                "94478af9-0f94-49d1-8a2f-9235eb851b39"
              ]
            }
          ]
        }
      }
      this.userDB = db;
      localStorage.setItem('userDB',JSON.stringify(db));
      this.loggedIn = this.userDB.admin.loggedIn;
    }
    console.log(this.userDB);
    console.log(this.loggedIn);
    
    
  }

  pushData(){
    localStorage.setItem('userDB',JSON.stringify(this.userDB));
  }
}
