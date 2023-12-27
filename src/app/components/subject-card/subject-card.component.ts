import { Component, Input } from '@angular/core';
import { Subject } from '../../shared/interfaces/subject.interface';

@Component({
  selector: 'app-subject-card',
  standalone: true,
  imports: [],
  templateUrl: './subject-card.component.html',
  styleUrl: './subject-card.component.scss'
})
export class SubjectCardComponent {
  @Input() subject: Subject = {};
}
