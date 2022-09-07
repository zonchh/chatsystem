import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(private router: Router, private loginService: LoginService) { }

  userLoggedIn: boolean = false;

  ngOnInit(): void {
  }

  logout() {
    localStorage.setItem('username', '');
    this.router.navigateByUrl("/");
  }

}
