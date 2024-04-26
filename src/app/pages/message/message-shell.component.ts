import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-message-shell',
  standalone: true,
  imports: [RouterOutlet, ChatComponent],
  templateUrl: './message-shell.component.html',
  styleUrl: './message-shell.component.scss'
})
export class MessageShellComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private location = inject(Location);

  ngOnInit(): void {
    this.navigateToMessages()
  }

  navigateToMessages(){
    const currentPath = this.location.path();
    if(currentPath == '/provider/message') {
      this.router.navigate(['./clients'], { relativeTo: this.route });
    }
    if(currentPath == '/clients/message') {
      this.router.navigate(['./providers'], { relativeTo: this.route });
    }
  }
}
