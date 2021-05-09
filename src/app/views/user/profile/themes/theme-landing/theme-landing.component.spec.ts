import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeLandingComponent } from './theme-landing.component';

describe('ThemeLandingComponent', () => {
  let component: ThemeLandingComponent;
  let fixture: ComponentFixture<ThemeLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThemeLandingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
