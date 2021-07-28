import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPopComponent } from './info-pop.component';

describe('InfoPopComponent', () => {
  let component: InfoPopComponent;
  let fixture: ComponentFixture<InfoPopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoPopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoPopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
