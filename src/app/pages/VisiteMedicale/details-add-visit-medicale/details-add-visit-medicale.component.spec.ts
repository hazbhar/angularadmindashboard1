import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsAddVisitMedicaleComponent } from './details-add-visit-medicale.component';

describe('DetailsAddVisitMedicaleComponent', () => {
  let component: DetailsAddVisitMedicaleComponent;
  let fixture: ComponentFixture<DetailsAddVisitMedicaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsAddVisitMedicaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsAddVisitMedicaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
