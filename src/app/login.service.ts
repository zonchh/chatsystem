import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface User {
  username: string,
  email: string,
  id: number,
  role: string
  valid: boolean;
}

export interface Group {
  name: string;
  channels: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = "http://localhost:3000";

  constructor(private http:HttpClient) { }

  login(inputUsername: string, inputPassword: string) {
    return this.http.post<User>(this.url + "/api/login", {inputUsername, inputPassword})
  }

  addUser(inputUsername: string, inputEmail: string, inputRole: string) {
    return this.http.post(this.url + "/api/addUser", {inputUsername, inputEmail, inputRole})
  }
}



