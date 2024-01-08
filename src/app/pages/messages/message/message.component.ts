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
  message: any = {}

  messageType = computed(() => {
    return this.auth.user()?.user?.userId == this.message.createdBy ? 'out' : "in";
  })

  @Input() set message$ (value: any) {
    this.message = value;
  }

  ngOnInit(){
    console.log();

  }

}
