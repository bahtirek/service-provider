import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from '../../shared/interfaces/subject.interface';

@Component({
  selector: 'app-subject',
  standalone: true,
  imports: [],
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.scss'
})
export class SubjectComponent {
  private router = inject(Router);
  @Input() subject: Subject = {};

  goToMessages() {
    this.router.navigate([`client/messages/${this.subject.subjectId}`]);
  }
}
