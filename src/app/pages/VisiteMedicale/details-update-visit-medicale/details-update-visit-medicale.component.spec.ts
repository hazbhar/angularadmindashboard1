import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsUpdateVisitMedicaleComponent } from './details-update-visit-medicale.component';

describe('DetailsUpdateVisitMedicaleComponent', () => {
  let component: DetailsUpdateVisitMedicaleComponent;
  let fixture: ComponentFixture<DetailsUpdateVisitMedicaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsUpdateVisitMedicaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsUpdateVisitMedicaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
