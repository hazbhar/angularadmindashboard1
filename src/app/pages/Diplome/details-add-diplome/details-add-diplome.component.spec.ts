import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsAddDiplomeComponent } from './details-add-diplome.component';

describe('DetailsAddDiplomeComponent', () => {
  let component: DetailsAddDiplomeComponent;
  let fixture: ComponentFixture<DetailsAddDiplomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsAddDiplomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsAddDiplomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
