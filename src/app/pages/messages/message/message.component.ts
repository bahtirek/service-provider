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
  user = this.auth.user()

/*   messageType = computed(() => {
    console.log(this.auth.user()?.user?.userId == this.message.createdBy ? 'out' : "in");
    console.log(this.auth.user());
    console.log(this.message);
    return this.auth.user()?.user?.userId == this.message.createdBy ? 'out' : "in";
  }) */

  messageType: string = "";

  @Input() set message$ (value: any) {
    this.message = value;
    this.messageType = this.auth.user()?.user?.userId == this.message.createdBy ? 'out' : "in";
  }

  ngOnInit(){
    console.log();

  }

/*   if(this.auth.user()?.user?.isClient) {
    console.log('client', this.auth.user()?.user?.clientId, this.message.createdBy);
    console.log(this.auth.user()?.user?.clientId == this.message.createdBy ? 'out' : "in");
    return this.auth.user()?.user?.clientId == this.message.createdBy ? 'out' : "in";
  } else {
    console.log('provider',this.auth.user()?.user?.providerId, this.message.createdBy);
    console.log(this.auth.user()?.user?.providerId == this.message.createdBy ? 'out' : "in");
    console.log(this.message);


    return this.auth.user()?.user?.providerId == this.message.createdBy ? 'out' : "in";
  } */

}
