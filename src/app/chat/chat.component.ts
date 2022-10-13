import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private router: Router, private socketService: SocketService, private loginService: LoginService) { }

  username = JSON.parse(localStorage.getItem('username') || '{}');
  role = JSON.parse(localStorage.getItem('role') || '{}');
  messagecontent: string = "";
  messages: string[] = [];
  ioConnection: any;
  manageLoggedIn: boolean = false;
  users: any;
  groups: any;
  selectedGroup: any;
  selectedGroupChannels = [];
  selectedChannel: string = "";
  roomnotice: string = "";

  ngOnInit(): void {
    this.socketService.initSocket();
    this.socketService.getMessage().subscribe((message: any) => {
      this.messages.push(message);
    });

    this.checkRole();
    this.getUserInfo();
  }

  // sends message data from user input to list of messages
  public chat(){
    if(this.messagecontent) {
      this.socketService.send(this.messagecontent);
      this.messagecontent = "";
    } else {
      console.log("no message")
    }
  }

  // checks role of current user logged in
  checkRole() {
    if(this.role === "superadmin" || this.role === "groupadmin") {
      this.manageLoggedIn = true;
    }
  }

  // gets users' group data
  getUserInfo() {
    this.loginService.getUsers().subscribe(data => {
      this.users = data
      console.log(data);
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].username === this.username) {
          this.groups = this.users[i].groups;
        }
      }
      console.log(this.groups);
    })
  }
  
  // stores name of group selected by user
  selectGroup(name: any) {
    this.selectedGroup = name;
    console.log(this.selectedGroup)
    this.selectChannels();
  }

  // list of channels user is a part of
  selectChannels() {
    for (var i = 0; i < this.groups.length; i++) {
      if (this.selectedGroup === this.groups[i].name) {
        this.selectedGroupChannels = this.groups[i].channels;
      }
    }
    console.log(this.selectedGroupChannels);
  }

  // stores name of channel selected by user
  chosenChannel(channel: any) {
    // this.socketService.leaveroom(this.selectedGroup, this.selectedChannel, this.username);
    this.messages = [];
    this.selectedChannel = channel;
    // this.socketService.joinroom(this.selectedGroup, this.selectedChannel, this.username)
    console.log(this.selectedChannel);
  }


  // private initIoConnection() {
  //   this.socketService.initSocket();
  //   this.ioConnection = this.socketService.getMessages().subscribe((message) => {
  //     this.messages.push(message)
  //   })
  // }


}
