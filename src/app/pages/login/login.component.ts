import { Router } from '@angular/router';
import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


declare var $:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginform: FormGroup;
  userNotExist: boolean | undefined;
  fieldTextType: boolean | undefined;

  toastMessage: String = '';
  constructor(private data: DataService, private router: Router) {
    if(this.data.loggedIn){
      this.router.navigateByUrl('/dashboard');
    }
    this.loginform = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '[^0-9]([a-zA-Z0-9+_.-])+[@]+[a-zA-Z0-9]+[.]+[a-z]{2,4}$'
        ),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern('^(?=.*[0-9])(?=.*[a-z A-Z]).{4,8}$'),
      ]),
    });
  }

  ngOnInit(): void {
    document.body.style.backgroundColor = "#f5f5f5";
    document.body.style.maxWidth = "100%";
    document.body.style.overflowX = "hidden";

    $(".showtoast").click(function(){
      $('.toast').toast('show');
      })
  }


  submit() {
    if (this.data.userDB.admin.email === this.loginform.value.email) {
      if (this.data.userDB.admin.password === this.loginform.value.password) {
        this.data.userDB.admin.loggedIn = true;
        this.data.loggedIn = true;
        this.data.pushData();
        this.toastMessage = 'Login Successful';
        $('.toast1').toast('show');
        this.router.navigateByUrl('/dashboard')
      } else {
        this.toastMessage = 'Password Incorrect';
        $('.toast2').toast('show');
      }
    }
    else {
      this.toastMessage = 'User does not exist.'
      $('.toast0').toast('show');
    }

  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }


}
