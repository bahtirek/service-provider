import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderNavMenuComponent } from './header-nav-menu/header-nav-menu.component';
import { HeaderUserMenuComponent } from './header-user-menu/header-user-menu.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [HeaderNavMenuComponent, HeaderUserMenuComponent, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
