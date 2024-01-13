import { Injectable, inject, signal } from '@angular/core';
import {io} from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Message } from '../interfaces/message.interface';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socketUrl = environment.socketUrl;
  private socket = io(this.socketUrl);
  private messageService = inject(MessageService)

  //lastIncominMessage = signal<Message>({})


  sendMessage(messageDetails: any){
    this.socket.emit('outgoingMessage', messageDetails);
    console.log("outgoingMessage", messageDetails)
  }

  connect(accessToken?: string){
    if(!accessToken) return;
    this.socket.on("connect", () => {
      this.socket.emit('initiateSession', {
        "accessToken": accessToken
      })
    });

    this.socket.on("incomingMessage", (message: Message) => {
      console.log("incomingMessage", message)
      this.messageService.addMessage(message)
    });

    this.socket.on("returnMessage", (message: Message) => {
      console.log("returnMessage", message)
      this.messageService.addMessage(message)
    });
  }

}
