import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsUpdateEapComponent } from './details-update-eap.component';

describe('DetailsUpdateEapComponent', () => {
  let component: DetailsUpdateEapComponent;
  let fixture: ComponentFixture<DetailsUpdateEapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsUpdateEapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsUpdateEapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
