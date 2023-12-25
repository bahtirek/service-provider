import { Component } from '@angular/core';
import { HeaderNavMenuComponent } from './header-nav-menu/header-nav-menu.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [HeaderNavMenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
