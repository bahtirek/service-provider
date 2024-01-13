import { DatePipe, NgClass } from '@angular/common';
import { Component, Input, computed, inject } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [NgClass, DatePipe],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent {
  private auth = inject(AuthService);
  message: any = {};
  user = this.auth.user();
  messageType: string = "";

  @Input() set message$ (value: any) {
    this.message = value;
    this.messageType = this.auth.user()?.user?.userId == this.message.createdBy ? 'out' : "in";
  }

}
