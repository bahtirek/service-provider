import { Component, EventEmitter, Input, Output, Provider } from '@angular/core';
import { SubjectCardComponent } from '../subject-card/subject-card.component';
import { Subject } from '../../../shared/interfaces/subject.interface';
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

  @Output() onSubjectClick$ = new EventEmitter<Subject>();

  onSubjectClick(subject: Subject){
    this.onSubjectClick$.emit(subject)
  }
}
