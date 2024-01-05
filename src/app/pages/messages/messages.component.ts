import { Component } from '@angular/core';
import { MessageToolbarComponent } from './message-toolbar/message-toolbar.component';


@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [MessageToolbarComponent],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent {

}
