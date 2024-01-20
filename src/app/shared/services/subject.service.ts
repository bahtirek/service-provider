import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from '../interfaces/subject.interface';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private url = environment.apiUrl;
  private http = inject(HttpClient);
  subjects = signal<Subject[]>([]);

  createSubject(subjectDetails: any){
    return this.http.post<any>(this.url + '/messages/subject', subjectDetails);
  }

  getProviderSubjectsAPI(providerId: number){
    const params = new HttpParams().set('providerId', providerId);
    return this.http.get<Subject[]>(this.url + '/messages/client-provider-subjects', {params})
  }

  getClientSubjectsAPI(providerId: number){
    const params = new HttpParams().set('clientId', providerId);
    return this.http.get<Subject[]>(this.url + '/messages/provider-client-subjects', {params})
  }

  saveSubjectToLocal(subject: Subject){
    window.localStorage.setItem('subject', JSON.stringify(subject))
  }

  getSubjectFromLocal(){
    const subject = window.localStorage.getItem('subject')
    return subject ? JSON.parse(subject) : null
  }

  getProviderSubjects(providerId: number){
    this.getProviderSubjectsAPI(providerId).subscribe({
      next: (response) => {
        this.subjects.update(state => state.concat(response));
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  getClientSubjects(clientId: number){
    this.getClientSubjectsAPI(clientId).subscribe({
      next: (response) => {
        this.subjects.update(state => state.concat(response));
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
