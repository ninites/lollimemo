import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayedItemComponent } from './played-item.component';

describe('PlayedItemComponent', () => {
  let component: PlayedItemComponent;
  let fixture: ComponentFixture<PlayedItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayedItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayedItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
