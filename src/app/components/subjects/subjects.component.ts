import { Component, Input, Provider } from '@angular/core';
import { SubjectCardComponent } from '../../components/subject-card/subject-card.component';
import { Subject } from '../../shared/interfaces/subject.interface';

@Component({
  selector: 'app-subjects',
  standalone: true,
  imports: [SubjectCardComponent],
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.scss'
})
export class SubjectsComponent {
  @Input() subjects: Subject[] = [];
}
