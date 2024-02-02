import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SubjectType } from '../interfaces/subject.interface';
import { Message } from '../interfaces/message.interface';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private url = environment.apiUrl;
  private http = inject(HttpClient);
  subjects = signal<SubjectType[]>([]);

  createSubject(subjectDetails: any){
    return this.http.post<any>(this.url + '/messages/subject', subjectDetails);
  }

  getProviderSubjectsAPI(providerId: number){
    const params = new HttpParams().set('providerId', providerId);
    return this.http.get<SubjectType[]>(this.url + '/messages/client-provider-subjects', {params})
  }

  getClientSubjectsAPI(providerId: number){
    const params = new HttpParams().set('clientId', providerId);
    return this.http.get<SubjectType[]>(this.url + '/messages/provider-client-subjects', {params})
  }

  saveSubjectToLocal(subject: SubjectType){
    window.localStorage.setItem('subject', JSON.stringify(subject))
  }

  getSubjectFromLocal(){
    const subject = window.localStorage.getItem('subject')
    return subject ? JSON.parse(subject) : null
  }

  getProviderSubjects(providerId: number){
    this.subjects.set([]);
    this.getProviderSubjectsAPI(providerId).subscribe({
      next: (response: SubjectType[]) => {
        this.subjects.set(response);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  getClientSubjects(clientId: number){
    this.getClientSubjectsAPI(clientId).subscribe({
      next: (response: SubjectType[]) => {
        this.subjects.set(response);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  updateSubjects(message: Message){
    this.subjects.update(subjects =>
      subjects.map(subject => subject.subjectId === message.subjectId ? {...subject, newMessageCount: subject.newMessageCount!+1} : subject)
    );
  }
}
