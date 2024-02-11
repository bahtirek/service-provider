import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { Message } from '../interfaces/message.interface';

@Injectable({
  providedIn: 'root'
})
export class ReplyService {
  constructor() { }
  public onMessageReplay: Subject<Message> = new Subject();

  replyToMessage(data: Message){
    this.onMessageReplay.next(data)
  }
}
