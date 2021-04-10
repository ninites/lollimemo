import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegInputComponent } from './reg-input.component';

describe('RegInputComponent', () => {
  let component: RegInputComponent;
  let fixture: ComponentFixture<RegInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
