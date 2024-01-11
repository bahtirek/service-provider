import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  private route = inject(ActivatedRoute);
  @Input() subject: Subject = {};

  goToMessages() {
    this.router.navigate([`./messages/${this.subject.subjectId}`], { relativeTo: this.route });
  }
}
