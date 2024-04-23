import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageShellComponent } from './message-shell.component';

describe('MessageShellComponent', () => {
  let component: MessageShellComponent;
  let fixture: ComponentFixture<MessageShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageShellComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MessageShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
