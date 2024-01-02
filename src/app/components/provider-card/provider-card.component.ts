import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Provider } from '../../shared/interfaces/provider.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-provider-card',
  standalone: true,
  imports: [],
  templateUrl: './provider-card.component.html',
  styleUrl: './provider-card.component.scss'
})
export class ProviderCardComponent {
  private router = inject(Router);
  providerDetails: Provider = {};
  showFullDetails: boolean = false;

  @Input() set fullDetails (value: boolean) {
    this.showFullDetails = value;
  }

  @Input() set provider (value: Provider) {
    this.providerDetails = value;
  }

  @Output() cardClickled: EventEmitter<number> = new EventEmitter();

  cardClicked() {
    this.cardClickled.emit(this.providerDetails.providerId)
  }

}
