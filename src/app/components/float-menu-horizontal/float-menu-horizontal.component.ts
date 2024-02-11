import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FloatMenu } from '../../shared/interfaces/float-menu.interface';

@Component({
  selector: 'app-float-menu-horizontal',
  standalone: true,
  imports: [],
  templateUrl: './float-menu-horizontal.component.html',
  styleUrl: './float-menu-horizontal.component.scss'
})
export class FloatMenuHorizontalComponent {

  @Input() menuItems: FloatMenu[] = [];

  @Output() menuActionEmit = new EventEmitter<string>();

  btnClick(action: string) {
    this.menuActionEmit.emit(action)
  }

}
