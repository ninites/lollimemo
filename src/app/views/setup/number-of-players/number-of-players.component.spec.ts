import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberOfPlayersComponent } from './number-of-players.component';

describe('NumberOfPlayersComponent', () => {
  let component: NumberOfPlayersComponent;
  let fixture: ComponentFixture<NumberOfPlayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumberOfPlayersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberOfPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
