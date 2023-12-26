import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderUserDropMenuComponent } from './header-user-drop-menu.component';

describe('HeaderUserDropMenuComponent', () => {
  let component: HeaderUserDropMenuComponent;
  let fixture: ComponentFixture<HeaderUserDropMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderUserDropMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderUserDropMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
