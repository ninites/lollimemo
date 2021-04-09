import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersNameComponent } from './players-name.component';

describe('PlayersNameComponent', () => {
  let component: PlayersNameComponent;
  let fixture: ComponentFixture<PlayersNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayersNameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
