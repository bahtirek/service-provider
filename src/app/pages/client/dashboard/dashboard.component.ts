import { Component, inject } from '@angular/core';
import { ProviderCardComponent } from '../../../components/provider/provider-card/provider-card.component';
import { Provider } from '../../../shared/interfaces/provider.interface';
import { ProviderService } from '../../../shared/services/provider.service';
import { ProviderSearchComponent } from '../../../components/provider/provider-search/provider-search.component';
import { ProviderListComponent } from '../../../components/provider/provider-list/provider-list.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ProviderListComponent, ProviderSearchComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  private router = inject(Router);
  private providerService = inject(ProviderService);

  providers: Provider[] = [];

  ngOnInint(){}

  foundProviders(providers: Provider[]){
    this.providers = providers;
  }

  cardClicked(provider: Provider){
    this.providerService.saveProviderToLocal(provider)

    this.router.navigate([`/client/my-provider`]);
  }

}
