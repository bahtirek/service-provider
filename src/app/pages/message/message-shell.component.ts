import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatComponent } from './chat/chat.component';

@Component({
  selector: 'app-message-shell',
  standalone: true,
  imports: [RouterOutlet, ChatComponent],
  templateUrl: './message-shell.component.html',
  styleUrl: './message-shell.component.scss'
})
export class MessageShellComponent {

}
