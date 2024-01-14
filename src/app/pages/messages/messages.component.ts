import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, Signal, ViewChild, WritableSignal, computed, inject } from '@angular/core';
import { MessageToolbarComponent } from './message-toolbar/message-toolbar.component';
import { MessageComponent } from './message/message.component';
import { MessageService } from '../../shared/services/message.service';
import { BackButtonComponent } from '../../components/back-button/back-button.component';
import { ActivatedRoute } from '@angular/router';
import { Message } from '../../shared/interfaces/message.interface';
import { DatePipe, NgClass } from '@angular/common';
import { NavigationService } from '../../shared/services/navigation.service';
import { SubjectService } from '../../shared/services/subject.service';
import { IdleService } from '../../shared/services/idle.service';
import { Subscription } from 'rxjs';
import { ChatService } from '../../shared/services/chat.service';
import { AuthService } from '../../shared/services/auth.service';


@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [MessageToolbarComponent, MessageComponent, BackButtonComponent, DatePipe, NgClass],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent implements OnInit {
  private messageService = inject(MessageService);
  private subjectService = inject(SubjectService);
  private navigation = inject(NavigationService);
  private chatService = inject(ChatService);
  private auth = inject(AuthService);


  user = this.auth.user();
  messages: WritableSignal<Message[]> = this.messageService.messages;
  chunkNum: number = 1;
  containerBorder: boolean = false;

  @ViewChild('messageContainer') messageContainer!: ElementRef<HTMLDivElement>;

  ngOnInit(){
    this.getMessages();
  }

  getMessages():void {
    this.messageService.resetMessages();
    const subject = this.subjectService.getSubjectFromLocal()
    if(!subject) this.navigation.back();
    this.messageService.getMessages(subject.subjectId, this.chunkNum).subscribe({
      next: (response) => {
        this.messageService.addMessages(response);
        this.chunkNum++
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  displayDate(index: number, UTC?: string):boolean {
    if(index == this.messages.length - 1) return false;
    return this.getLocalDate(UTC) != this.getLocalDate(this.messages()[index+1]?.createdAt);
  }

  getLocalDate(UTC?: string):string {
    return UTC ? new Date(UTC).toLocaleDateString() : '';
  }

  onMessageIntersect(messageId: number):void {
    console.log(messageId);

    const messageDetails = {
      accessToken: this.user?.accessToken,
      messageId: messageId
    }
    this.chatService.sendViewedMessageConfirmation(messageDetails)
  }

  containerHighlight(){
    console.log('hhh');

    //if(this.messages()[0].toUserId == this.auth.user().user?.userId) return;
    this.containerBorder = true;
    setTimeout(() => {
      this.containerBorder = false;
    }, 500)
  }

}
