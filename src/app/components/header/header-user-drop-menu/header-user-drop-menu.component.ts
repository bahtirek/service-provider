import { Component, computed, inject } from '@angular/core';
import { HeaderNavMenu } from '../../../shared/interfaces/header-nav-menu.interface';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-header-user-drop-menu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header-user-drop-menu.component.html',
  styleUrl: './header-user-drop-menu.component.scss'
})
export class HeaderUserDropMenuComponent {

  private auth = inject(AuthService);

  loggedIn = computed(() =>
    this.auth.isLoggedIn()
  );

  logout = () => {
    this.auth.logout('home');
  }

  userSubMenuItems: HeaderNavMenu[] = [
    {
      name: 'My providers',
      url: 'client/dashboard',
    },
    {
      name: 'Account',
      url: '/account'
    },

  ]
}
