import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Client } from '../../../shared/interfaces/client.interface';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-client-item',
  standalone: true,
  imports: [NgClass],
  templateUrl: './client-item.component.html',
  styleUrl: './client-item.component.scss'
})
export class ClientItemComponent {
  clientDetails: Client = {};
  isHoverable: boolean = true;

  @Input() set client (value: Client) {
    this.clientDetails = value;
  }

  @Input() set hoverable (value: boolean) {
    this.isHoverable = value;
  }

  @Output() cardClickled: EventEmitter<Client> = new EventEmitter();

  cardClicked() {
    this.cardClickled.emit(this.clientDetails);
  }
}
