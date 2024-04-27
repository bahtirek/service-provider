import { Component, Input, OnInit, inject } from '@angular/core';
import { SubjectComponent } from '../../../../components/subject/subject/subject.component';
import { SubjectType } from '../../../../shared/interfaces/subject.interface';
import { Location } from '@angular/common';
import { Receiver } from '../../../../shared/interfaces/receiver.interface';
import { MessageSwitchService } from '../../../../shared/services/message-switch.service';

@Component({
  selector: 'app-chat-header',
  standalone: true,
  imports: [SubjectComponent],
  templateUrl: './chat-header.component.html',
  styleUrl: './chat-header.component.scss'
})
export class ChatHeaderComponent {

  private messageSwitchService = inject(MessageSwitchService);
  subject: SubjectType = {};

  @Input() receiver: Receiver = {};
  @Input() set subjectProp(subject: SubjectType){
    this.subject = subject;
  };


  goBack(): void {
    this.messageSwitchService.messageSwitchSource.next(false);
  }
}
