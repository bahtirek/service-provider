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
      viewed: true,
      type: 'out',
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt consequatur ipsa aut? Illo doloribus, omnis architecto officia ipsum vitae soluta illum fuga ad aliquid quis ut! Repellat quod officia est."
    },
    {
      viewed: true,
      type: 'out',
      text: "message"
    },
    {
      viewed: true,
      type: 'in',
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt consequatur ipsa aut? Illo doloribus, omnis architecto officia ipsum vitae soluta illum fuga ad aliquid quis ut! Repellat quod officia est."
    },
    {
      viewed: true,
      type: 'out',
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt consequatur ipsa aut? Illo doloribus, omnis architecto officia ipsum vitae soluta illum fuga ad aliquid quis ut! Repellat quod officia est."
    },
    {
      viewed: true,
      type: 'out',
      text: "message"
    },
    {
      viewed: true,
      type: 'in',
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt consequatur ipsa aut? Illo doloribus, omnis architecto officia ipsum vitae soluta illum fuga ad aliquid quis ut! Repellat quod officia est."
    },
    {
      viewed: true,
      type: 'out',
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt consequatur ipsa aut? Illo doloribus, omnis architecto officia ipsum vitae soluta illum fuga ad aliquid quis ut! Repellat quod officia est."
    },
    {
      viewed: true,
      type: 'out',
      text: "message"
    },
    {
      viewed: true,
      type: 'in',
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt consequatur ipsa aut? Illo doloribus, omnis architecto officia ipsum vitae soluta illum fuga ad aliquid quis ut! Repellat quod officia est."
    },
    {
      viewed: true,
      type: 'out',
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt consequatur ipsa aut? Illo doloribus, omnis architecto officia ipsum vitae soluta illum fuga ad aliquid quis ut! Repellat quod officia est."
    },
    {
      viewed: true,
      type: 'out',
      text: "message"
    },
    {
      viewed: true,
      type: 'in',
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt consequatur ipsa aut? Illo doloribus, omnis architecto officia ipsum vitae soluta illum fuga ad aliquid quis ut! Repellat quod officia est."
    },
    {
      viewed: true,
      type: 'out',
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt consequatur ipsa aut? Illo doloribus, omnis architecto officia ipsum vitae soluta illum fuga ad aliquid quis ut! Repellat quod officia est."
    },
    {
      viewed: true,
      type: 'out',
      text: "message"
    },
    {
      viewed: true,
      type: 'in',
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt consequatur ipsa aut? Illo doloribus, omnis architecto officia ipsum vitae soluta illum fuga ad aliquid quis ut! Repellat quod officia est."
    },
    {
      viewed: true,
      type: 'out',
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt consequatur ipsa aut? Illo doloribus, omnis architecto officia ipsum vitae soluta illum fuga ad aliquid quis ut! Repellat quod officia est."
    },
    {
      viewed: true,
      type: 'out',
      text: "message"
    },
    {
      viewed: true,
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
