import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})

export class ProviderProfileService {
  private url = environment.apiUrl;
  private http = inject(HttpClient);
  private router = inject(Router);

  getWeekDays() {
    return this.http.get(this.url + '/providers/lk-week-days');
  }
  getWorkHours() {
    return this.http.get(this.url + '/providers/lk-work-hours');
  }
  getCategory() {
    return this.http.get(this.url + '/providers/lk-category');
  }
}
