import { Component } from '@angular/core';
import { SubjectsComponent } from '../../../../components/subjects/subjects.component';
import { Subject } from '../../../../shared/interfaces/subject.interface';

@Component({
  selector: 'app-provider',
  standalone: true,
  imports: [SubjectsComponent],
  templateUrl: './provider.component.html',
  styleUrl: './provider.component.scss'
})
export class ProviderComponent {
  subjects: Subject[] = [
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
