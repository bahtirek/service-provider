import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private url = environment.apiUrl;
  private http = inject(HttpClient);

  messages = signal<any[]>([])

  addMessage(message: any){

    this.messages.update((state) => ([
      message,
      ...state,
  ]))
    console.log(this.messages());
  }

  createSubject(subjectDetails: any){
    return this.http.post<any>(this.url + '/messages/subject', subjectDetails);;

  }
}
