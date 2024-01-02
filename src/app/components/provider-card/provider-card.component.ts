import { Component, EventEmitter, Input, Output, inject} from '@angular/core';
import { Provider } from '../../shared/interfaces/provider.interface';
import { ProviderService } from '../../shared/services/provider.service';

@Component({
  selector: 'app-provider-card',
  standalone: true,
  imports: [],
  templateUrl: './provider-card.component.html',
  styleUrl: './provider-card.component.scss'
})
export class ProviderCardComponent {
  private providerService = inject(ProviderService)
  providerDetails: Provider = {};

  @Input() set provider (value: Provider) {
    this.providerDetails = value;
  }

  @Output() cardClickled: EventEmitter<number> = new EventEmitter();

  cardClicked() {
    this.cardClickled.emit(this.providerDetails.providerId);
    this.providerService.provider = this.providerDetails
  }

}
