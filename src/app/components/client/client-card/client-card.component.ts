import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Client } from '../../../shared/interfaces/client.interface';
import { ClientService } from '../../../shared/services/client.service';

@Component({
  selector: 'app-client-card',
  standalone: true,
  imports: [],
  templateUrl: './client-card.component.html',
  styleUrl: './client-card.component.scss'
})
export class ClientCardComponent {
  private clientService = inject(ClientService)
  clientDetails: Client = {};

  @Input() set client (value: Client) {
    this.clientDetails = value;
  }

  @Output() cardClickled: EventEmitter<number> = new EventEmitter();

  cardClicked() {
    this.cardClickled.emit(this.clientDetails.clientId);
    this.clientService.client = this.clientDetails
  }
}
