import { Component, EventEmitter, Input, Output} from '@angular/core';
import { Provider } from '../../shared/interfaces/provider.interface';

@Component({
  selector: 'app-provider-card',
  standalone: true,
  imports: [],
  templateUrl: './provider-card.component.html',
  styleUrl: './provider-card.component.scss'
})
export class ProviderCardComponent {
  providerDetails: Provider = {};

  @Input() set provider (value: Provider) {
    this.providerDetails = value;
  }

  @Output() cardClickled: EventEmitter<number> = new EventEmitter();

  cardClicked() {
    this.cardClickled.emit(this.providerDetails.providerId)
  }

}
