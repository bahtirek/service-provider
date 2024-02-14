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
  subjectId: string = '';
  chunkNum: number = 1;

  addMessage(message: Message){
    if(this.messages().some(item => item.messageId == message.messageId)){
      this.updateMessage(message)
    } else {
      this.messages.update(state => {
        state.unshift(message)
        return state
      });
    }
  }

  updateMessage(message: Message) {
    this.messages.update(state => {
      const index = state.findIndex(m => m.messageId == message.messageId)
      if(index != -1) {
        if(state[index].totalUploads) message.totalUploads = state[index].totalUploads! - 1;
        state[index] = message;
      }
      return state
    });
  }

  addMessages(messages: Message[]){
    this.messages.update(state => state.concat(messages));
  }

  createSubject(subjectDetails: any){
    return this.http.post<any>(this.url + '/messages/subject', subjectDetails);
  }

  postMessage(messageDetails: Message){
    return this.http.post<any>(this.url + '/messages/message', messageDetails);
  }

  postAttachmentMessage(messageDetails: Message){
    return this.http.post<any>(this.url + '/messages/attachment-message', messageDetails);
  }

  getMessages(subjectId: string){
    this.subjectId = subjectId;
    const params = new HttpParams()
    .set('subjectId', subjectId)
    .set('chunkCount', 5)
    .set('chunkNum', this.chunkNum)
    this.chunkNum++
    return this.http.get<Message[]>(this.url + '/messages/subject-messages', {params});
  }

  resetMessages() {
    this.messages.update(() => ([]))
  }

  updateViewedStatus(messageId: number) {
    this.messages.update(messages =>
      messages.map(message => message.messageId === messageId ? {...message, viewed: true} : message)
    )
  }

  uploadFile(messageDetails: any){
    return this.http.post<any>(this.url + '/attachments/upload', messageDetails);
  }

  getAttachmentUrl(messageAttachmentId: number) {
    const params = new HttpParams()
    .set('messageAttachmentId', messageAttachmentId)
    return this.http.get<any>(this.url + '/attachments/attachment-url', {params});
  }

  updateMessageScrollIntoViewProperty(id: number) {
    const index = this.messages().findIndex(message => message.messageId == id)
    if(index != -1) {
      this.messages()[index].scrollIntoView = true;
      this.messages.set(this.messages());
      setTimeout(() => {
        this.messages()[index].scrollIntoView = false;
        this.messages.set(this.messages());
      }, 2000);
    } else {
      this.getMessages(this.subjectId).subscribe({
        next: (response) => {
          this.addMessages(response);
          setTimeout(() => {
            this.updateMessageScrollIntoViewProperty(id)
          });
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
  }

  loadNewChunkOfMessages(){
    this.getMessages(this.subjectId).subscribe({
      next: (response) => {
        this.addMessages(response);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

}
