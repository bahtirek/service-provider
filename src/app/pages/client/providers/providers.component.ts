import { Component } from '@angular/core';
import { Provider } from '../../../shared/interfaces/provider.interface';
import { ProviderCardComponent } from '../../../components/provider-card/provider-card.component';

@Component({
  selector: 'app-providers',
  standalone: true,
  imports: [ProviderCardComponent],
  templateUrl: './providers.component.html',
  styleUrl: './providers.component.scss'
})
export class ProvidersComponent {
  providers: Provider[] = [
    {
      firstName: 'John',
      lastName: 'Doe',
      id: '1',
      email: 'john.doe@example.com'
    },
    {
      firstName: 'Jane',
      lastName: 'Doe',
      id: '2',
      email: 'jane.doe@example.com'
    }
  ]
}
