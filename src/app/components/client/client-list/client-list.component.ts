import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Client } from '../../../shared/interfaces/client.interface';
import { ClientCardComponent } from '../client-card/client-card.component';
import { ClientItemComponent } from '../client-item/client-item.component';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [ClientCardComponent, ClientItemComponent],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss'
})
export class ClientListComponent {
  clientList: Client[] = [];
  isCard: boolean = true;

  @Input() set clients (clients: Client[]) {
    this.clientList = clients
    console.log(clients);
  }

  @Input() set type (type: string) {
    if (type == 'item') this.isCard = false;
    console.log(type);

  }

  @Output() cardClickled: EventEmitter<Client> = new EventEmitter();

  cardClicked(client: Client) {
    this.cardClickled.emit(client)
  }
}
