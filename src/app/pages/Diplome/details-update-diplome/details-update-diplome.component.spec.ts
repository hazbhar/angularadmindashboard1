import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsUpdateDiplomeComponent } from './details-update-diplome.component';

describe('DetailsUpdateDiplomeComponent', () => {
  let component: DetailsUpdateDiplomeComponent;
  let fixture: ComponentFixture<DetailsUpdateDiplomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsUpdateDiplomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsUpdateDiplomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
