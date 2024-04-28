import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { ConsultationsComponent } from './consultations/consultations.component';
import { MessageSwitchService } from '../../../../shared/services/message-switch.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-my-client',
  standalone: true,
  imports: [ConsultationsComponent, RouterOutlet, NgClass],
  templateUrl: './my-client.component.html',
  styleUrl: './my-client.component.scss'
})
export class MyClientComponent implements OnInit, OnDestroy {
  private readonly _subscription: Subscription = new Subscription();
  private messageSwitchService = inject(MessageSwitchService);
  showMessages: boolean = false;

  ngOnInit(){
    this._subscription.add(
      this.messageSwitchService.messageSwitchSource.subscribe((value) => {
        this.showMessages = value;
      })
    )
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe()
  }
}
