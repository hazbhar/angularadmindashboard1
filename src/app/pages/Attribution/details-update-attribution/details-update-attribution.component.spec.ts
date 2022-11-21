import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsUpdateAttributionComponent } from './details-update-attribution.component';

describe('DetailsUpdateAttributionComponent', () => {
  let component: DetailsUpdateAttributionComponent;
  let fixture: ComponentFixture<DetailsUpdateAttributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsUpdateAttributionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsUpdateAttributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
