import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsVisitMedComponent } from './details-visit-med.component';

describe('DetailsVisitMedComponent', () => {
  let component: DetailsVisitMedComponent;
  let fixture: ComponentFixture<DetailsVisitMedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsVisitMedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsVisitMedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
