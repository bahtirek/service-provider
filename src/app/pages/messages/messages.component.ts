import { Component, HostListener, OnDestroy, OnInit, WritableSignal, inject } from '@angular/core';
import { MessageToolbarComponent } from './message-toolbar/message-toolbar.component';
import { MessageComponent } from './message/message.component';
import { MessageService } from '../../shared/services/message.service';
import { BackButtonComponent } from '../../components/back-button/back-button.component';
import { ActivatedRoute } from '@angular/router';
import { Message } from '../../shared/interfaces/message.interface';
import { DatePipe } from '@angular/common';
import { NavigationService } from '../../shared/services/navigation.service';
import { SubjectService } from '../../shared/services/subject.service';
import { IdleService } from '../../shared/services/idle.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [MessageToolbarComponent, MessageComponent, BackButtonComponent, DatePipe],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent implements OnInit, OnDestroy {
  private messageService = inject(MessageService);
  private subjectService = inject(SubjectService);
  private idleService = inject(IdleService);
  private navigation = inject(NavigationService);


  messages: WritableSignal<Message[]> = this.messageService.messages;
  chunkNum: number = 1;
  idleSubscription?: Subscription;

  ngOnInit(){
    this.getMessages();
    this.idleSubscription = this.idleService.idleState.subscribe((isIdle) => {
      console.log(isIdle);

    })
  }

  ngOnDestroy(): void {
    if(this.idleSubscription) this.idleSubscription.unsubscribe()
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

  @HostListener('document:mousemove')
  @HostListener('document:keypress')
  @HostListener('document:click')
  @HostListener('document:wheel')
  onUserAction(){
    this.idleService.resetTimer()
  }

}
