import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegSelectComponent } from './reg-select.component';

describe('RegSelectComponent', () => {
  let component: RegSelectComponent;
  let fixture: ComponentFixture<RegSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
