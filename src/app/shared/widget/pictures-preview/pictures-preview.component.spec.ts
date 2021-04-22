import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PicturesPreviewComponent } from './pictures-preview.component';

describe('PicturesPreviewComponent', () => {
  let component: PicturesPreviewComponent;
  let fixture: ComponentFixture<PicturesPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PicturesPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PicturesPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
