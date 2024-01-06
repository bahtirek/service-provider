import { Component, inject } from '@angular/core';
import { MessageToolbarComponent } from './message-toolbar/message-toolbar.component';
import { MessageComponent } from './message/message.component';
import { MessageService } from '../../shared/services/message.service';
import { BackButtonComponent } from '../../components/back-button/back-button.component';


@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [MessageToolbarComponent, MessageComponent, BackButtonComponent],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent {
  private messageService = inject(MessageService);
  messages = this.messageService.messages;

/*   messages: any = [
    {
      type: 'out',
      text: "message"
    },
    {
      type: 'out',
      text: "message"
    },
    {
      type: 'in',
      text: "message"
    },
  ]
 */
}
