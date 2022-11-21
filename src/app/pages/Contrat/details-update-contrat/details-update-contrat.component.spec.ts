import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsUpdateContratComponent } from './details-update-contrat.component';

describe('DetailsUpdateContratComponent', () => {
  let component: DetailsUpdateContratComponent;
  let fixture: ComponentFixture<DetailsUpdateContratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsUpdateContratComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsUpdateContratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
