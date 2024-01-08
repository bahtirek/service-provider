import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Message } from '../interfaces/message.interface';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private url = environment.apiUrl;
  private http = inject(HttpClient);

  messages = signal<Message[]>([])

  addMessage(message: Message){
    this.messages.update((state) => ([
      message,
      ...state,
    ]))
    console.log(this.messages());
  }
  addMessages(messages: Message[]){
    this.messages.update((state) => (state.concat(messages)))
    console.log(this.messages());
  }

  createSubject(subjectDetails: any){
    return this.http.post<any>(this.url + '/messages/subject', subjectDetails);
  }

  postMessage(messageDetails: Message){
    return this.http.post<any>(this.url + '/messages/message', messageDetails);
  }

  getMessages(subjectId: string, chunkNum: number){
    const params = new HttpParams()
    .set('subjectId', subjectId)
    .set('chunkCount', 100)
    .set('chunkNum', chunkNum)
    return this.http.get<Message[]>(this.url + '/messages/subject-messages', {params});
  }

  resetMessages() {
    this.messages.update((state) => ([]))
  }
}
/* messages = signal<any[]>([
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
]) */
