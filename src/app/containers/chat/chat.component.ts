import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { UsernameComponent } from '../../components/username/username.component';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [UsernameComponent, NgFor, NgIf, NgClass, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  userName = '';
  message = '';
  messageList: {message: string, userName: string, mine: boolean}[] = [];
  userList: string[] = [];
  socket: any;

  constructor() { }

  userNameUpdate(name: string): void {
    this.socket = io.io(`http://localhost:3000`);
    this.userName = name;

    this.socket.emit('set-user-name', name);

    this.socket.on('user-list', (userList: string[]) => {
      console.log(userList);

      this.userList = userList;
    });

    this.socket.on('message-broadcast', (data: any) => {
      if (data) {
        console.log(data);

        this.messageList.push({message: data.message.message, userName: data.message.userName, mine: false});
      }
    });
  }

  sendMessage(): void {
    this.socket.emit('message', {message:this.message, userName: this.userName});
    this.messageList.push({message: this.message, userName: this.userName, mine: true});
    this.message = '';
  }
}
