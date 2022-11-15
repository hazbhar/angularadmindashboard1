import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsEapComponent } from './details-eap.component';

describe('DetailsEapComponent', () => {
  let component: DetailsEapComponent;
  let fixture: ComponentFixture<DetailsEapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsEapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsEapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
