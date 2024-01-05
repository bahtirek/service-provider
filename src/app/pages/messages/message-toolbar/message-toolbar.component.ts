import { Component, Renderer2, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { NgClass } from '@angular/common';
import { MessageService } from '../../../shared/services/message.service';

@Component({
  selector: 'app-message-toolbar',
  standalone: true,
  imports: [FormsModule, NgClass],
  templateUrl: './message-toolbar.component.html',
  styleUrl: './message-toolbar.component.scss'
})
export class MessageToolbarComponent {
  private renderer = inject(Renderer2);
  private messageService = inject(MessageService);
  message: string = "";
  showCursor: boolean = true;

  @ViewChild('textAreaContainer') textAreaContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('textArea') textArea!: ElementRef<HTMLTextAreaElement>;

  onSubmit(){
    const newMessage = this.textAreaContainer.nativeElement.dataset['replicatedValue']?.trim();
    if (!newMessage) return;
    this.messageService.addMessage({type: 'out', text: newMessage})
    this.renderer.setAttribute(this.textAreaContainer.nativeElement, 'data-replicated-value',  "")
    this.textArea.nativeElement.value = "";
    this.showCursor = true;
  }

  onAttach(){

  }

  onBlur(){
    if (this.textArea.nativeElement.value) {
      this.showCursor = false;
    } else {
      this.showCursor = true;
    }
  }

  onFocus(){
    this.showCursor = false;
  }
}
