import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HeaderNavMenuComponent } from './header-nav-menu/header-nav-menu.component';
import { HeaderUserMenuComponent } from './header-user-menu/header-user-menu.component';
import { HeaderUserDropMenuComponent } from './header-user-drop-menu/header-user-drop-menu.component';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [HeaderNavMenuComponent, HeaderUserMenuComponent, RouterLink, HeaderUserDropMenuComponent, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private auth = inject(AuthService);
  toggleMenuModal: boolean = false;

  openMenu(){
    this.toggleMenuModal = true
  }

  closeMenu(){
    this.toggleMenuModal = false
  }

  loggedIn = computed(() =>
    this.auth.isLoggedIn()
  );
}
