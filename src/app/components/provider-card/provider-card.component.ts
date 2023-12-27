import { Component, Input, inject } from '@angular/core';
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

  @Input() provider: Provider = {};

  openProviderSuibjects(providerId: string | undefined) {
    console.log(providerId);

    this.router.navigate(['/client/providers', providerId]);
  }

}
