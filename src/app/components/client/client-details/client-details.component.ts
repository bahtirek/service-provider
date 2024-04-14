import { Component, Input } from '@angular/core';
import { Client } from '../../../shared/interfaces/client.interface';

@Component({
  selector: 'app-client-details',
  standalone: true,
  imports: [],
  templateUrl: './client-details.component.html',
  styleUrl: './client-details.component.scss'
})
export class ClientDetailsComponent {
  clientDetails: Client = {};

  @Input() set clientProfile (value: Client) {
    this.clientDetails = value;
  }
}
