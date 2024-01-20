import { Injectable, inject, signal } from '@angular/core';
import {io} from 'socket.io-client';
import { Observable, lastValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Message } from '../interfaces/message.interface';
import { MessageService } from './message.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socketUrl = environment.socketUrl;
  private socket = io(this.socketUrl);
  private messageService = inject(MessageService);
  private subjectId?: number;
  private auth = inject(AuthService);

  sendMessage(messageDetails: Message){
    if(this.socket.connected) {
      this.socket.emit('outgoingMessage', messageDetails);
      console.log("outgoingMessage", messageDetails)
    } else {
      console.log('reconnecting');
      this.connect(this.subjectId)
    }
  }

  sendViewedMessageConfirmation(messageDetails: Message){
    this.socket.emit('viewedMessage', messageDetails)
  }

  async connect(subjectId?: number){
    this.subjectId = subjectId;
    if(this.socket.connected) return;
    if(this.auth.isTokenExpired()) {
      const user$ = this.auth.refreshToken();
      const user = await lastValueFrom(user$);
      this.auth.setUser(user);
    }
    const accessToken = this.auth.user().accessToken;
    this.socket.on("connect", () => {
      this.socket.emit('initiateSession', {
        "accessToken": accessToken
      })
    });

    this.socket.on("incomingMessage", (message: Message) => {
      console.log("incomingMessage", message)
      if(message.subjectId == this.subjectId) {
        this.messageService.addMessage(message)
      } else {
        //push to subjects
        //push to provider or client
      }
    });

    this.socket.on("returnMessage", (message: Message) => {
      console.log("returnMessage", message, this.subjectId)
      if(message.subjectId == this.subjectId) {
        this.messageService.addMessage(message)
      }
    });

    this.socket.on('viewConfirmation', (data) => {
      console.log(data);
      this.messageService.updateViewedStatus(data.messageId)
    })

    this.socket.on('disconnect', () => {
      console.log('disconnected');
    })
  }

}
