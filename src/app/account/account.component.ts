import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  getUsername = localStorage.getItem('username')
  username = this.getUsername?.replace(/['"]+/g, '');

  constructor(private router: Router, private loginService: LoginService) { }


  ngOnInit(): void {
  }

  
  logout() {
    localStorage.setItem('username', '');
    localStorage.setItem('email', '');
    localStorage.setItem('role', '');
    this.router.navigateByUrl("/");
  }
}
