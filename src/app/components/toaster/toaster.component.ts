import { Component, inject } from '@angular/core';
import { ToasterDetailsComponent } from './toaster-details/toaster-details.component';
import { Toast } from '../../shared/interfaces/toaster.interface';
import { ToasterService } from './toaster.service';

@Component({
  selector: 'app-toaster',
  standalone: true,
  imports: [ToasterDetailsComponent],
  templateUrl: './toaster.component.html',
  styleUrl: './toaster.component.scss'
})
export class ToasterComponent {
  toastService = inject(ToasterService);
  toasts: Toast[] = [];

  private toaster = inject(ToasterService);

  ngOnInit() {
    this.toaster.toast$
      .subscribe(toast => {
        this.toasts = [toast, ...this.toasts];
        setTimeout(() => this.toasts.pop(), toast.delay || 6000);
      });
  }

  remove(index: number) {
    this.toasts = this.toasts.filter((v, i) => i !== index);
  }
}
