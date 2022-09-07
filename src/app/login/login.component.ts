import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  inputUsername = "";
  inputPassword = "";
  error: any;
  getUsername = localStorage.getItem('username')
  username = this.getUsername?.replace(/['"]+/g, '');

  constructor(private router: Router, private loginService: LoginService) { }
  ngOnInit(): void {
  }

  itemClicked() {
    this.loginService.login(this.inputUsername, this.inputPassword).subscribe(data => {
      console.log(data);
      if (data.valid === true) {
        localStorage.setItem('username', JSON.stringify(data.username));
        localStorage.setItem('email', JSON.stringify(data.email));
        localStorage.setItem('role', JSON.stringify(data.role));
        this.router.navigateByUrl("/account");

      } else if (data.valid === false) {
        this.error = "Password Incorrect";
      } else if (data.valid === null) {
        this.error = "Username Not Found";
      }
    })
  }

}

