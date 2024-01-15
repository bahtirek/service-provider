import { Component, OnInit, inject } from '@angular/core';
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
export class DashboardComponent implements OnInit {
  private router = inject(Router);
  private providerService = inject(ProviderService);

  providers: Provider[] = [];

  ngOnInit(){
    this.getMyProviders()
  }

  getMyProviders() {
    console.log('myp');

    this.providerService.getMyProviders().subscribe({
      next: (response) => {
        this.providers = response
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  foundProviders(providers: Provider[]){
    this.providerService.foundProviders = providers
    this.router.navigate([`/search/providers/results`]);

  }

  cardClicked(provider: Provider){
    this.providerService.saveProviderToLocal(provider)

    this.router.navigate([`/client/my-provider`]);
  }

}
