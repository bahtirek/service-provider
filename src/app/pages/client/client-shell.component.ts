import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatService } from '../../shared/services/chat.service';

@Component({
  selector: 'app-client-shell',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './client-shell.component.html',
  styleUrl: './client-shell.component.scss'
})
export class ClientShellComponent implements OnInit {

  private chatService = inject(ChatService);

  ngOnInit(){
    this.chatService.connect();
  }
}
