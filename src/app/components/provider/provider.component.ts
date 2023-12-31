import { Component } from '@angular/core';
import { SubjectListComponent } from './../../components/subject-list/subject-list.component';
import { Subject } from './../../shared/interfaces/subject.interface';

@Component({
  selector: 'app-provider',
  standalone: true,
  imports: [SubjectListComponent],
  templateUrl: './provider.component.html',
  styleUrl: './provider.component.scss'
})
export class ProviderComponent {
  subjectList: Subject[] = [
    {
      'title': 'John',
      id: '1',
    },
    {
      title: 'Jane',
      id: '2',
    }
  ]
}
