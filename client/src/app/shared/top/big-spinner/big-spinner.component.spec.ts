import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BigSpinnerComponent } from './big-spinner.component';

describe('BigSpinnerComponent', () => {
  let component: BigSpinnerComponent;
  let fixture: ComponentFixture<BigSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BigSpinnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BigSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
