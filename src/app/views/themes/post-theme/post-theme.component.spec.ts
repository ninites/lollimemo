import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostThemeComponent } from './post-theme.component';

describe('PostThemeComponent', () => {
  let component: PostThemeComponent;
  let fixture: ComponentFixture<PostThemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostThemeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
