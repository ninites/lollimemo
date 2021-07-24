import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayedMainComponent } from './played-main.component';

describe('PlayedMainComponent', () => {
  let component: PlayedMainComponent;
  let fixture: ComponentFixture<PlayedMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayedMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayedMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
