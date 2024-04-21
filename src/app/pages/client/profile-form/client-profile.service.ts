import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { Client } from '../../../shared/interfaces/client.interface';
import { Success } from '../../../shared/interfaces/success.interface';



@Injectable({
  providedIn: 'root',
})

export class ClientProfileService {
  private url = environment.apiUrl;
  private http = inject(HttpClient);

  postClientProfileDetails(clientProfileDetails: Client) {
    return this.http.post<Success>(this.url + '/client/details', clientProfileDetails);
  }

  getClientProfileDetails() {
    return this.http.get(this.url + '/client/details');
  }
}
