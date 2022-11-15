import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsAttributionComponent } from './details-attribution.component';

describe('DetailsAttributionComponent', () => {
  let component: DetailsAttributionComponent;
  let fixture: ComponentFixture<DetailsAttributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsAttributionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsAttributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
