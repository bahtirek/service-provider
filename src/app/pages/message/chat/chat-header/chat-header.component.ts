import { Component, Input, inject } from '@angular/core';
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

  @Input() receiver: Receiver = {};
  @Input() subject: SubjectType = {};

  goBack(): void {
    this.messageSwitchService.messageSwitchSource.next(false);
  }
}
