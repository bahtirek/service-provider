import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Provider } from '../interfaces/provider.interface';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  private url = environment.apiUrl;
  private http = inject(HttpClient);
  provider: Provider = {};
  foundProviders: Provider[] = [];
  searchDetails: any;
  myProviders: Provider[] = [];

  getMyProviders() {
    return this.http.get<Provider[]>(this.url + '/providers/my-providers');
  }

  providerSearch(searchQuery: any) {
    return this.http.post<Provider[]>(this.url + '/providers/provider-search', searchQuery);
  }

  getProviderProfileDetailsById(providerId: number) {
    const params = new HttpParams().set('providerId', providerId)
    return this.http.get(this.url + '/providers/details-by-provider-id', {params});
  }

  saveProviderToLocal(provider: Provider){
    this.provider = provider;
    window.localStorage.setItem('provider', JSON.stringify(provider))
  }

  getProviderFromLocal(){
    const provider = window.localStorage.getItem('provider')
    return provider ? JSON.parse(provider) : null
  }

  getProvider(){
    if(this.provider.providerId) return this.provider;
    this.provider = this.getProviderFromLocal();
    return this.provider;
  }

  addProvider(provider: Provider) {
    this.myProviders.push(provider);
  }
}
