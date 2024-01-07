import { Component, Input, Provider } from '@angular/core';
import { SubjectCardComponent } from '../../components/subject-card/subject-card.component';
import { Subject } from '../../shared/interfaces/subject.interface';
import { SubjectComponent } from '../subject/subject.component';

@Component({
  selector: 'app-subject-list',
  standalone: true,
  imports: [SubjectCardComponent, SubjectComponent],
  templateUrl: './subject-list.component.html',
  styleUrl: './subject-list.component.scss'
})
export class SubjectListComponent {
  @Input() subjectList: Subject[] = [];
  @Input() displayAsCard: boolean = true;
}
