import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-back-arrow-button',
  standalone: true,
  imports: [],
  templateUrl: './back-arrow-button.component.html',
  styleUrl: './back-arrow-button.component.scss'
})
export class BackArrowButtonComponent {
  private location = inject(Location);

  goBack(): void {
    this.location.back();
  }
}
