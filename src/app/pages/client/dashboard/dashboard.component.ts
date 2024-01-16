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
    this.providers = this.providerService.myProviders
    if (this.providers.length > 0) return;
    this.providerService.getMyProviders().subscribe({
      next: (response) => {
        this.providers = response;
        this.providerService.myProviders = response
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  foundProviders(searchResults: any){
    this.providerService.foundProviders = searchResults.providers
    this.providerService.searchDetails = searchResults.searchDetails
    this.router.navigate([`/search/providers/results`]);
  }

  cardClicked(provider: Provider){
    this.providerService.saveProviderToLocal(provider)
    this.router.navigate([`/client/my-provider`]);
  }

}
