import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsUpdateFormationComponent } from './details-update-formation.component';

describe('DetailsUpdateFormationComponent', () => {
  let component: DetailsUpdateFormationComponent;
  let fixture: ComponentFixture<DetailsUpdateFormationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsUpdateFormationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsUpdateFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
