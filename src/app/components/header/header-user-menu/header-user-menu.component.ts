import { Component, computed, inject } from '@angular/core';
import { HeaderNavMenu } from '../../../shared/interfaces/header-nav-menu.interface';
import { AuthService } from '../../../shared/services/auth.service';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { HeaderUserDropMenuComponent } from '../header-user-drop-menu/header-user-drop-menu.component';

@Component({
  selector: 'app-header-user-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, HeaderUserDropMenuComponent],
  templateUrl: './header-user-menu.component.html',
  styleUrl: './header-user-menu.component.scss'
})
export class HeaderUserMenuComponent {
  private auth = inject(AuthService);

  loggedIn = computed(() =>
    this.auth.isLoggedIn()
  );

  logout = () => {
    this.auth.logout('home');
  }

  loggedOutMenuItems: HeaderNavMenu[] = [
    /* {
      name: 'Login',
      url: 'auth/login'
    },
    {
      name: 'Sign up',
      url: 'auth/registration'
    } */
  ]
}
