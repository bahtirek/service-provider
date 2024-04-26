import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectType } from '../../../shared/interfaces/subject.interface';
import { EnevelopeComponent } from '../../enevelope/enevelope.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-subject',
  standalone: true,
  imports: [EnevelopeComponent, NgClass],
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.scss'
})
export class SubjectComponent {
  isSubjectActive: boolean = false;

  @Output() onSubjectClick$ = new EventEmitter<SubjectType>();
  @Input() subject: SubjectType = {};
  @Input() set activeSubjectIdProp (value: number) {
    if(this.subject.subjectId == value) {
      this.isSubjectActive = true;
    } else {
      this.isSubjectActive = false;
    }
  }

  onSubjectClick(){
    this.onSubjectClick$.emit(this.subject)
  }

}
