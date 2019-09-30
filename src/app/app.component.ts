import { Component, OnInit } from '@angular/core';
import { WebSocketService } from './web-socket.service';
import { Observable } from '../../node_modules/rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SocketIOApp';
  user: String;
  room: String;
  messageText: String;
  messageArray: any = [];
  constructor(private webSocket: WebSocketService) {}

  ngOnInit() {
    this.webSocket.newUserJoined().subscribe((data) => {
      this.messageArray.push(data);
    });

    this.webSocket.getNewMsg().subscribe((data) => {
      this.messageArray.push(data);
    });

    this.webSocket.leftRoom().subscribe((data) => {
      this.messageArray.push(data);
    });
  }

  join() {
    this.webSocket.joinChat({ name: this.user, room: this.room });
  }

  leave(){
    this.webSocket.leaveRoom({ name: this.user, room: this.room });
  }

  sendMessage(){
    this.webSocket.sendNewMsg({name : this.user, room : this.room ,msg : this.messageText});
  }
}
