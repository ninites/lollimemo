import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteThemeItemComponent } from './delete-theme-item.component';

describe('DeleteThemeItemComponent', () => {
  let component: DeleteThemeItemComponent;
  let fixture: ComponentFixture<DeleteThemeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteThemeItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteThemeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
