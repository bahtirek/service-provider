import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProviderSearchComponent } from '../../../components/provider/provider-search/provider-search.component';
import { ProviderListComponent } from '../../../components/provider/provider-list/provider-list.component';
import { Provider } from '../../../shared/interfaces/provider.interface';
import { ProviderService } from '../../../shared/services/provider.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-providers',
  standalone: true,
  imports: [ProviderListComponent, ProviderSearchComponent],
  templateUrl: './providers.component.html',
  styleUrl: './providers.component.scss'
})
export class ProvidersComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private providerService = inject(ProviderService);
  private location = inject(Location);

  providers: Provider[] = [];
  searched: boolean = false;
  results: boolean =  false;

  ngOnInit(){
    this.results = this.route.snapshot.paramMap.get('results') ? true : false;
    if(this.results) {
      this.providers = this.providerService.foundProviders;
      this.location.replaceState("/search/providers");
    } else {
      console.log(this.providerService.foundProviders);

      this.providers = this.providerService.foundProviders;
    }
  }

  foundProviders(searchResults: any){
    this.providers = searchResults.providers;
    this.searched = true;
    this.results = false;
    this.providerService.searchDetails = undefined;
  }

  cardClicked(provider: Provider){
    this.router.navigate([`/client/my-provider`]);
  }
}
