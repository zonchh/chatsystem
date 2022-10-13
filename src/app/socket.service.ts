import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import io from 'socket.io-client';

const url = "http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket: any;

  constructor() { }

  initSocket() {
    this.socket = io(url);
    return()=>{this.socket.disconnect();}
  }

  // for sending the message to chat
  send(message: string): void {
    this.socket.emit('message', message);
  }

  // gets the messages
  getMessage() {
    return new Observable(observer => {
      this.socket.on('message', (data: any) => {
        observer.next(data)
      });
    });
  }

  // joinroom(selectedGroup: string, selectedChannel: string, username: string) {
  //   this.socket.emit("joinRoom", selectedGroup, selectedChannel, username)
  // }

  // leaveroom(selectedGroup: string, selectedChannel: string, username: String) {
  //   this.socket.emit("leaveRoom", selectedGroup, selectedChannel, username);
  // }

  // notice(next: any){
  //   this.socket.on('notice', (res: any) => next(res))
  // }

  // joined(next: any){
  //   this.socket.on('joined', (res: any) => next(res));
  // }
}
