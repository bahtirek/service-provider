import { Component, Input } from '@angular/core';
import { Provider } from '../../shared/interfaces/provider.interface';

@Component({
  selector: 'app-provider-card',
  standalone: true,
  imports: [],
  templateUrl: './provider-card.component.html',
  styleUrl: './provider-card.component.scss'
})
export class ProviderCardComponent {

  @Input() provider: Provider = {};

}
