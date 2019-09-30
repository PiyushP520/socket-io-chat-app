import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from '../../node_modules/rxjs';
import { Subject } from '../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  socket = io('http://10.88.45.200:3000');
  private subject = new Subject<any>();
  private getMsgSubject = new Subject<any>();
  private leftRoomSubject = new Subject<any>();

  joinChat(data) {
    this.socket.emit('join', data);
  }

  newUserJoined() {
    this.socket.on('greeting', (data) => {
      this.subject.next(data);
    });
    return this.subject.asObservable();
  }

  leaveRoom(data) {
    this.socket.emit('leave', data);
  }

  leftRoom() {
    this.socket.on('left room', (data) => {
      this.leftRoomSubject.next(data);
    });
    return this.leftRoomSubject.asObservable();
  }

  sendNewMsg(data) {
    this.socket.emit('sendMsg', data);
  }

  getNewMsg() {
    this.socket.on('receiveMsg', (data) => {
      this.getMsgSubject.next(data);
    });
    return this.getMsgSubject.asObservable();
  }


}
