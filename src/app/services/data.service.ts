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
          password:'Abc@123',
          loggedIn: false
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
