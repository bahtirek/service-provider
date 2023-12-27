import { Component } from '@angular/core';
import { Provider } from './../../shared/interfaces/provider.interface';
import { ProviderCardComponent } from './../../components/provider-card/provider-card.component';

@Component({
  selector: 'app-provider-list',
  standalone: true,
  imports: [ProviderCardComponent],
  templateUrl: './provider-list.component.html',
  styleUrl: './provider-list.component.scss'
})
export class ProviderListComponent {
  providerList: Provider[] = [
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
