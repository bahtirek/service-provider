import { Component, EventEmitter, Input, Output } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Toast } from '../../../shared/interfaces/toaster.interface';

@Component({
  selector: 'app-toaster-details',
  standalone: true,
  imports: [],
  templateUrl: './toaster-details.component.html',
  styleUrl: './toaster-details.component.scss',
  animations: [
    trigger('toasterState', [
      state('inactive', style({
        opacity: 0
      })),
      state('active', style({
        opacity: 1
      })),
      transition('inactive => active', animate('500ms ease-in')),
      transition('active => inactive', animate('500ms ease-out'))
    ])
  ]

})
export class ToasterDetailsComponent {
  @Input() toast!: Toast;
  @Input() i!: number;

  @Output() remove = new EventEmitter<number>();

  ngOnInit() {
    setTimeout(() => this.removeToast(), this.toast.delay || 60000);
  }

  removeToast() {
    this.remove.emit(this.i)
  }
}
