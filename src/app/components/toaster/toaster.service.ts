import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, filter, Observable, Subject } from 'rxjs';
import { Toast, ToastType } from '../../shared/interfaces/toaster.interface';


@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  subject: BehaviorSubject<Toast>;
  toast$: Observable<Toast>;

  constructor() {
    this.subject = new BehaviorSubject<Toast>({} as Toast);
    this.toast$ = this.subject.asObservable()
      .pipe(filter(toast => toast !== null));
  }

  toasts = signal<Toast[]>([]);

  show(type: ToastType, title?: string, body?: string, delay?: number) {
    const toast = { type, title, body, delay };
    const toasts = [toast, ...this.toasts()];

    this.toasts.set(toasts);
  }
  removeToast(index: number) {
    this.toasts().splice(index, 1);
  }
  removeLastToast() {
    this.toasts().pop();
  }
}
