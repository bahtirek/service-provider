import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Provider } from '../../../shared/interfaces/provider.interface';
import { ProviderCardComponent } from '../provider-card/provider-card.component';

@Component({
  selector: 'app-provider-list',
  standalone: true,
  imports: [ProviderCardComponent],
  templateUrl: './provider-list.component.html',
  styleUrl: './provider-list.component.scss'
})
export class ProviderListComponent {
  providerList: Provider[] = [];

  @Input() set providers (providers: Provider[]) {
    this.providerList = providers
  }

  @Output() cardClickled: EventEmitter<Provider> = new EventEmitter();

  cardClicked(provider: Provider) {
    this.cardClickled.emit(provider)
  }
}
