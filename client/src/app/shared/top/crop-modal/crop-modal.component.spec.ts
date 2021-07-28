import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropModalComponent } from './crop-modal.component';

describe('CropModalComponent', () => {
  let component: CropModalComponent;
  let fixture: ComponentFixture<CropModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CropModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CropModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
