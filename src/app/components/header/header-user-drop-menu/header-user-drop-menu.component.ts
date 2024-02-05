import { Component, EventEmitter, Input, Output, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-header-user-drop-menu',
  standalone: true,
  imports: [RouterLink, NgClass],
  templateUrl: './header-user-drop-menu.component.html',
  styleUrl: './header-user-drop-menu.component.scss'
})
export class HeaderUserDropMenuComponent {

  private auth = inject(AuthService);

  modalValue: boolean = false;
  fadeAnim: boolean = false;
  fadeIn: boolean = false;

  @Output() modalChange = new EventEmitter<boolean>();
  hideContainer: boolean = true;

  @Input() get modal(){
    return this.modalValue;
  }

  set modal(val) {
    if (val) {
      this.hideContainer = false;
      this.fadeAnim = true;
      setTimeout(() => {
        this.fadeIn = true;
      });
    } else {
      this.fadeIn = false;
      setTimeout(() => {
        this.fadeAnim = false;
        this.hideContainer = true;
      }, 400);
    }

    this.modalValue = val;
    this.modalChange.emit(this.modalValue);
  }

  closeModal(){
    this.modal = false;
  }
}
