import { Component, WritableSignal, inject } from '@angular/core';
import { MessageToolbarComponent } from './message-toolbar/message-toolbar.component';
import { MessageComponent } from './message/message.component';
import { MessageService } from '../../shared/services/message.service';
import { BackButtonComponent } from '../../components/back-button/back-button.component';
import { ActivatedRoute } from '@angular/router';
import { Message } from '../../shared/interfaces/message.interface';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [MessageToolbarComponent, MessageComponent, BackButtonComponent, DatePipe],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent {
  private messageService = inject(MessageService);
  private route = inject(ActivatedRoute);

  messages: WritableSignal<Message[]> = this.messageService.messages;
  chunkNum: number = 1;

  ngOnInit(){
    this.getMessages()
  }
  getMessages() {
    this.messageService.resetMessages();
    const subjectId = this.route.snapshot.paramMap.get('subjectId');
    if(!subjectId) return
    this.messageService.getMessages(subjectId, this.chunkNum).subscribe({
      next: (response) => {
        this.messageService.addMessages(response);
        this.chunkNum++
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  displayDate(index: number, UTC?: string){
    if(index == this.messages.length - 1) return false;
    return this.getLocalDate(UTC) != this.getLocalDate(this.messages()[index+1]?.createdAt);
  }

  getLocalDate(UTC?: string) {
    if(!UTC) return;
    return new Date(UTC).toLocaleDateString()
  }

}
