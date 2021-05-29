import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyProfileLandingComponent } from './modify-profile-landing.component';

describe('ModifyProfileLandingComponent', () => {
  let component: ModifyProfileLandingComponent;
  let fixture: ComponentFixture<ModifyProfileLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyProfileLandingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyProfileLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
