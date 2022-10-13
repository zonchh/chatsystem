import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService, User } from '../login.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private router: Router, private loginService: LoginService) { }
  
  superLoggedIn: boolean = false;
  groupAdmin: boolean = false;
  getUsername = localStorage.getItem('username');
  getRole = localStorage.getItem('role');
  username = this.getUsername?.replace(/['"]+/g, '');
  role = this.getRole?.replace(/['"]+/g, '');

  inputUsername: any;
  inputPassword: any;
  inputEmail: any;
  inputRole: any;
  inputGroup: any;
  inputChannel: any;
  groupname: any;
  groups: any;
  inviteGroupUsername: any;
  inviteGroupName: any;
  inviteGroup: any;
  inviteChannel: any;
  inviteUsername: any;
  selectedGroupChannels = [];
  userdata: any;
  alluserdata: any;
  inviteError: any;
  deleteGroupName: any;
  deleteChannelGroupName: any;
  deleteChannelName: any;
  deleteSelectedGroupChannels: any;
  assisUserList: any;
  isAssisUser: any;
  userAssisGroups: Array<String> = [];
  removeChannelUsername: any;
  removeChannelGroupName: any;
  removeChannelFromUser: any;
  removeGroupNamePossibilities: Array<String> = [];
  removeChannelNamePossibilities: Array<String> = [];
  deleteGroupFromUser: any;
  deleteGroupUserGroup: any;
  deleteGroupFromUserPossibilities = [];
  deleteUsername: any;
  error: any;

  // checks role of user logged in
  checkRole() {
    if(this.role === "superadmin") {
      this.superLoggedIn = true;
      this.groupAdmin = true;
    } else if (this.role === "groupadmin") {
      this.groupAdmin = true;
    }
  }

  // adds a user to user collection
  addUser() {
    this.loginService.addUsers(this.inputUsername, this.inputPassword, this.inputEmail, this.inputRole).subscribe(data => {
      if(data === true) {
        alert("User Added");
        this.ngOnInit();
      } else if(data === false) {
        alert("User already exists");
      }
    })
  }

  // adds a group
  clickAddGroup() {
    this.loginService.addGroups(this.groupname).subscribe(data => {
      if(data === true) {
        alert("Added Group: " + this.groupname);
        this.ngOnInit();
      } else if (data === false) {
        alert("Failed to add group");
      }
    })
  }

  // retrieves all groups
  getGroups() {
    this.loginService.getGroups().subscribe(data => {
      this.groups = data;
      console.log(this.groups);
    })
  }

  // retrieve all users
  getUsers() {
    this.loginService.getUsers().subscribe(data => {
      this.userdata = data;
      console.log(data);
      console.log(this.userdata);
    })
  }

  // adds a channel to a group
  addChannels() {
    this.loginService.addChannels(this.inputGroup, this.inputChannel).subscribe(data => {
      if (data) {
        alert("Added Channel: " + this.inputChannel + " in group " + this.inputGroup)
        this.ngOnInit();
      }
    })
  }

  // deletes a user
  clickDeleteUser() {
    this.loginService.deleteUser(this.deleteUsername).subscribe(data => {
      if(data === true) {
        alert("User Deleted");
      }
    })
  }

  // deletes group from users and groups collection
  deleteGroups() {
    this.loginService.deleteGroups(this.deleteGroupName).subscribe(data => {
      if (data === true) {
        alert("Group deleted successfully")
        this.ngOnInit();
      }
    })
  }

  // deletes a channel from group
  deleteChannels() {
    this.loginService.deleteChannels(this.deleteChannelGroupName, this.deleteChannelName).subscribe(data => {
      this.selectedGroupChannels = [];
      this.ngOnInit();
    })
  }

  // adds users to a channel
  addUsersChannels() {
    this.loginService.addUsersChannels(this.inviteGroup, this.inviteChannel, this.inviteUsername).subscribe(data => {
      if (data === false) {
        this.inviteError = "User already in channel";
      } else if (data === true) {
        this.inviteError = "Added user to channel";
      }
    })
  }

  // list of channel options
  channelOptions() {
    for (let i in this.groups) {
      if (this.inviteGroup === this.groups[i].name) {
        this.selectedGroupChannels = this.groups[i].channels
      }
    }
  }

  // deletes group options
  deleteChannelOptions() {
    for (let i in this.groups) {
      if (this.deleteChannelGroupName === this.groups[i].name) {
        this.deleteSelectedGroupChannels = this.groups[i].channels
      }
    }
  }

  // list of group options
  groupOptions() {
    for (let i in this.userdata) {
      if (this.removeChannelUsername === this.userdata[i].username) {
        this.removeGroupNamePossibilities = this.userdata[i].groups;
      }
    }
  }

  // deletes group options
  deleteGroupOptions() {
    for (let i in this.userdata) {
      if (this.deleteGroupFromUser === this.userdata[i].username) {
        this.deleteGroupFromUserPossibilities = this.userdata[i].groups;
      }
    }
  }

  // removes channel options
  removeChannelOptions() {
    for (let i in this.userdata) {
      if (this.removeChannelUsername === this.userdata[i].username) {
        for (let y in this.userdata[i].groups) {
          if (this.removeChannelGroupName === this.userdata[i].groups[y].name) {
            this.removeChannelNamePossibilities = this.userdata[i].groups[y].channels
          }
        }
      }
    }
    console.log(this.removeChannelNamePossibilities)
  }

  //remove a user from a channel
  deleteUsersChannels() {
    this.loginService.deleteUsersChannels(this.removeChannelUsername, this.removeChannelGroupName, this.removeChannelFromUser).subscribe(data => {
      this.ngOnInit();
    })
  }

  // invite a user to a group
  inviteUserToGroup() {
    this.loginService.addGroupsUsers(this.inviteGroupName, this.inviteGroupUsername).subscribe(data => {
      console.log(data);
      this.ngOnInit();
    })
  }

  // Delete users from group then notify that it has been deleted
  deleteUsersGroups() {
    this.loginService.deleteUsersGroups(this.deleteGroupFromUser, this.deleteGroupUserGroup).subscribe(data => {
      alert("Deleted");
      this.ngOnInit();
    })
  }

  resetVariables() {
    this.inputUsername = undefined;
    this.inputRole = undefined;
    this.inputEmail = undefined;
    this.inputGroup = undefined;
    this.inputChannel = undefined;
    this.groupname = undefined;
    this.inviteGroupUsername = undefined;
    this.inviteGroupName = undefined;
    this.inviteGroup = undefined;
    this.inviteChannel = undefined;
    this.inviteUsername = undefined;
    this.selectedGroupChannels = [];
    this.inviteError = undefined;
    this.deleteUsername = undefined;
    this.deleteGroupName = undefined;
    this.deleteChannelName = undefined;
    this.deleteSelectedGroupChannels = [];
    this.userAssisGroups = [];
    this.removeChannelUsername = undefined;
    this.removeChannelGroupName = undefined;
    this.removeChannelFromUser = undefined;
    this.removeGroupNamePossibilities = [];
    this.removeChannelNamePossibilities = [];
    this.deleteGroupFromUser = undefined;
    this.deleteGroupUserGroup = undefined;
    this.deleteGroupFromUserPossibilities = [];

  }

  ngOnInit() {
    this.checkRole();
    this.getUsers();
    this.getGroups();
    this.resetVariables();
  } 

  ngOnChanges() {
    this.getGroups();
  }

}