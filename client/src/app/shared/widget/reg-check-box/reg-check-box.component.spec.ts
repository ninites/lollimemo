import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegCheckBoxComponent } from './reg-check-box.component';

describe('RegCheckBoxComponent', () => {
  let component: RegCheckBoxComponent;
  let fixture: ComponentFixture<RegCheckBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegCheckBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegCheckBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
