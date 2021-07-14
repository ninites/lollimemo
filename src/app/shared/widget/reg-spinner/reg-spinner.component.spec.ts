import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegSpinnerComponent } from './reg-spinner.component';

describe('RegSpinnerComponent', () => {
  let component: RegSpinnerComponent;
  let fixture: ComponentFixture<RegSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegSpinnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
