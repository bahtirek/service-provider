import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class MessageSwitchService {

  constructor() { }

  messageSwitchSource: Subject<boolean> = new Subject;

}
