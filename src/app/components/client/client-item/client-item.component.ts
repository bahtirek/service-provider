import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Client } from '../../../shared/interfaces/client.interface';

@Component({
  selector: 'app-client-item',
  standalone: true,
  imports: [],
  templateUrl: './client-item.component.html',
  styleUrl: './client-item.component.scss'
})
export class ClientItemComponent {
  clientDetails: Client = {};

  @Input() set client (value: Client) {
    this.clientDetails = value;
  }

  @Output() cardClickled: EventEmitter<Client> = new EventEmitter();

  cardClicked() {
    this.cardClickled.emit(this.clientDetails);
  }
}
