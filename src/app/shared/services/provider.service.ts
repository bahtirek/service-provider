import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Provider } from '../interfaces/provider.interface';
import { ProviderSearch } from '../interfaces/provider-search.interface';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  private url = environment.apiUrl;
  private http = inject(HttpClient);

  getMyProviders() {
    return this.http.get<Provider[]>(this.url + '/providers/my-providers');
  }

  providerSearch(searchQuery: ProviderSearch) {
    return this.http.post<Provider[]>(this.url + '/providers/provider-search', searchQuery);;
  }
}
