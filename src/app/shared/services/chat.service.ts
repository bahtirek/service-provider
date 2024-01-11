import { Injectable, inject } from '@angular/core';
import {io} from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socketUrl = environment.socketUrl;
  private socket = io(this.socketUrl);


  sendMessage(messageDetails: any){
    this.socket.emit('outgoingMessage', messageDetails);
  }

  getMessage() {
    this.socket.on('incomingMessage', (value) => {
      console.log(value);

    })
  }

  getMessages() {
    let observable = new Observable<{ user: String, message: String }>(observer => {
      this.socket.on('new-message', (data: any) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); };
    });
    return observable;
  }

  connect(accessToken?: string){
    if(!accessToken) return;
    this.socket.on("connect", () => {
      this.socket.emit('initiateSession', {
        "accessToken": accessToken
      })
    });
  }

}
