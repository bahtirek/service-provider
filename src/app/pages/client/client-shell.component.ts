import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-client-shell',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './client-shell.component.html',
  styleUrl: './client-shell.component.scss'
})
export class ClientShellComponent {

}
