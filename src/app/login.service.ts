import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface User {
  username: string,
  role: string
  valid: boolean;
  groupAdminRole: boolean;
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

  // login
  login(inputUsername: string, inputPassword: string) {
    return this.http.post<User>(this.url + "/api/login", { inputUsername, inputPassword })
  }

  // USERS ROUTES
  // adding a user route
  addUsers(inputUsername: string, inputPassword: string, inputEmail: string, inputRole: string) {
    return this.http.post(this.url + "/api/addUsers", { inputUsername, inputPassword, inputEmail, inputRole })
  }

  // deleting a user route
  deleteUser(deleteUsername: string) {
    return this.http.post(this.url + "/api/deleteUsers", {deleteUsername})
  }

  // retrieving all users route
  getUsers() {
    return this.http.get<User>(this.url + "/api/getUser")
  }

  // add a user to a group route
  addGroupsUsers(inviteGroupName: string, inviteGroupUsername: string) {
    return this.http.post<User>(this.url + "/api/addGroupsUsers", { inviteGroupName, inviteGroupUsername })
  }

  // delete a user from group route
  deleteUsersGroups (deleteGroupFromUser: string, deleteGroupUserGroup: string) {
    return this.http.post(this.url + "/api/deleteUsersGroups", { deleteGroupFromUser, deleteGroupUserGroup })
  }

  // delete a user from channels route
  deleteUsersChannels (removeChannelUsername: string, removeChannelGroupName: string, removeChannelFromUser: string) {
    return this.http.post(this.url + "/api/deleteUsersChannels", { removeChannelUsername, removeChannelGroupName, removeChannelFromUser })
  }

  // GROUPS ROUTES
  // retrieves all groups route
  getGroups() {
    return this.http.get<Group>(this.url + "/api/getGroups");
  }

  // deletes a group route
  deleteGroups(deleteGroupName: string) {
    return this.http.post(this.url + "/api/deleteGroups", { deleteGroupName })
  }

  // adds a group route
  addGroups (groupname: string) {
    return this.http.post(this.url + "/api/addGroups", { groupname })
  }

  // CHANNELS ROUTES
  // adds a channel route
  addChannels (inputGroup: string, inputChannel: string) {
    return this.http.post<Group>(this.url + "/api/addChannels", { inputGroup, inputChannel })
  }

  // delete a channel route
  deleteChannels (deleteChannelGroupName: string, deleteChannelName: string) {
    return this.http.post(this.url + "/api/deleteChannels", { deleteChannelGroupName, deleteChannelName })
  }

  // add a user to channel route
  addUsersChannels (inviteUsername: string, inviteGroup: string, inviteChannel: string) {
    return this.http.post(this.url + "/api/addUsersChannels", { inviteUsername, inviteGroup, inviteChannel })
  }
}



