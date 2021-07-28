import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinBoxComponent } from './win-box.component';

describe('WinBoxComponent', () => {
  let component: WinBoxComponent;
  let fixture: ComponentFixture<WinBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WinBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WinBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
