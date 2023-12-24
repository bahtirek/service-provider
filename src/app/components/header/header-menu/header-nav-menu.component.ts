import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HeaderNavMenu } from '../../../interfaces/header-nav-menu.interface';

@Component({
  selector: 'app-header-nav-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header-nav-menu.component.html',
  styleUrl: './header-nav-menu.component.scss'
})
export class HeaderNavMenuComponent {
  menuItems: HeaderNavMenu[] = [
    {
      name: 'Find Providers',
      url: '/search-providers'
    },
    {
      name: 'Find Services',
      url: '/search-services'
    },
    {
      name: 'Login',
      url: '/login'
    }
  ]

}
