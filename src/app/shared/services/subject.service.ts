import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from '../interfaces/subject.interface';
import { Provider } from '../interfaces/provider.interface';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private url = environment.apiUrl;
  private http = inject(HttpClient);

  createSubject(subjectDetails: any){
    console.log(subjectDetails);

    return this.http.post<any>(this.url + '/messages/subject', subjectDetails);
  }

  getProviderSubjects(providerId: number){
    const params = new HttpParams().set('providerId', providerId);
    return this.http.get<Subject[]>(this.url + '/messages/client-provider-subjects', {params})
  }
  getClientSubjects(providerId: number){
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
}
