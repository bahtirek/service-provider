import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Client } from '../../../shared/interfaces/client.interface';
import { ClientCardComponent } from '../client-card/client-card.component';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [ClientCardComponent],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss'
})
export class ClientListComponent {
  clientList: Client[] = [];

  @Input() set clients (clients: Client[]) {
    this.clientList = clients
    console.log(clients);

  }

  @Output() cardClickled: EventEmitter<number> = new EventEmitter();

  cardClicked(clientId: number) {
    this.cardClickled.emit(clientId)
  }
}
