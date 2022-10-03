import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDiplomeComponent } from './edit-diplome.component';

describe('EditDiplomeComponent', () => {
  let component: EditDiplomeComponent;
  let fixture: ComponentFixture<EditDiplomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDiplomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDiplomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
