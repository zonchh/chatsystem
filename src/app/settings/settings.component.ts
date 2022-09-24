import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  inputUsername = "";
  inputEmail = "";
  inputRole = "";
  deleteUsername = "";
  error: any;
  getRole = localStorage.getItem('role');
  role = this.getRole?.replace(/['"]+/g, '');

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit() {
  } 

  clickAddUser() {
    this.loginService.addUser(this.inputUsername, this.inputEmail, this.inputRole).subscribe(data => {
      if(data === false) {
        alert("User already exists");
      } else if(data === true) {
        alert("User Added");
      }
    })
  }

  clickDeleteUser() {
    this.loginService.deleteUser(this.deleteUsername).subscribe(data => {
      if(data === true) {
        alert("User Deleted");
      }
    })
  }



}