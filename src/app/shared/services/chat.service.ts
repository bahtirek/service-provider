import { Injectable, inject, signal } from '@angular/core';
import {io} from 'socket.io-client';
import { Observable, lastValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Message } from '../interfaces/message.interface';
import { MessageService } from './message.service';
import { AuthService } from './auth.service';
import { SubjectService } from './subject.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from './client.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socketUrl = environment.socketUrl;
  private socket = io(this.socketUrl);
  private messageService = inject(MessageService);
  private clientService = inject(ClientService);
  private subjectId?: number;
  private auth = inject(AuthService);
  private subjectService = inject(SubjectService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  attachmentMessageId: unknown;

  setSubjectId(subjectId: number){
    this.subjectId = subjectId;
  }

  sendMessage(messageDetails: Message){
    const accessToken = this.auth.user().accessToken;

    this.socket.emit('outgoingMessage', messageDetails);
    console.log("outgoingMessage", messageDetails);
  }

  updateMessage(messageDetails: Message){
    const accessToken = this.auth.user().accessToken;

    if(this.socket.connected) {
      this.socket.emit('updateMessage', messageDetails);
      console.log("updateMessage", messageDetails)
    }
  }

  sendViewedMessageConfirmation(messageDetails: Message){
    this.socket.emit('viewedMessage', messageDetails)
  }

  async connect(subjectId?: number){
    this.subjectId = subjectId;
    const accessToken = this.auth.user().accessToken;
    if(this.auth.isTokenExpired()) {
      const user$ = this.auth.refreshToken();
      const user = await lastValueFrom(user$);
      this.auth.setUser(user);
    }
    this.socket.on("connect", () => {
      this.socket.emit('initiateSession', {
        "accessToken": accessToken
      })
    });

    this.socket.on("incomingMessage", (message: Message) => {
      console.log("incomingMessage", message)
      if(message.subjectId == this.subjectId) {
        this.messageService.addMessage(message);
      }

      if(!this.router.url.includes('/messages') || this.subjectId != message.subjectId) {
        this.subjectService.updateSubjects(message.subjectId!);
      }

      if(this.router.url.includes('/provider/dashboard')) {
        this.clientService.updateClientsSource.next();
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
      this.messageService.updateViewedStatus(data.messageId);
    })

    this.socket.on('disconnect', () => {
      console.log('disconnected');
    })
  }

  sendAttchmentMessage(attachmentDetails: Message, toUserId: number) {
    const accessToken = this.auth.user().accessToken;
    const messageDetails = {
      accessToken: accessToken,
      toUserId: toUserId,
      message: attachmentDetails
    }
    console.log(messageDetails);

    this.socket.emit('outgoingAttachment', messageDetails);
    console.log("outgoingAttachment", messageDetails)
  }

  disconnect() {
    this.socket.disconnect();
    const accessToken = this.auth.user().accessToken;
    /* this.socket.emit('disconnect', {
      "accessToken": accessToken
    }) */
  }

}
