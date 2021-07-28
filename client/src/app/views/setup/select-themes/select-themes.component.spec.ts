import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectThemesComponent } from './select-themes.component';

describe('SelectThemesComponent', () => {
  let component: SelectThemesComponent;
  let fixture: ComponentFixture<SelectThemesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectThemesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectThemesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
