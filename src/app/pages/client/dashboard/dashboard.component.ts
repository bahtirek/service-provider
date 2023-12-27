import { Component } from '@angular/core';
import { ProviderCardComponent } from '../../../components/provider-card/provider-card.component';
import { Provider } from '../../../shared/interfaces/provider.interface';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ProviderCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
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
