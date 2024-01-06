import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private url = environment.apiUrl;
  private http = inject(HttpClient);

  messages = signal<any[]>([
    {
      type: 'out',
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt consequatur ipsa aut? Illo doloribus, omnis architecto officia ipsum vitae soluta illum fuga ad aliquid quis ut! Repellat quod officia est."
    },
    {
      type: 'out',
      text: "message"
    },
    {
      type: 'in',
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt consequatur ipsa aut? Illo doloribus, omnis architecto officia ipsum vitae soluta illum fuga ad aliquid quis ut! Repellat quod officia est."
    },
  ])

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
