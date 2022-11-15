import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeatilsAddContratComponent } from './deatils-add-contrat.component';

describe('DeatilsAddContratComponent', () => {
  let component: DeatilsAddContratComponent;
  let fixture: ComponentFixture<DeatilsAddContratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeatilsAddContratComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeatilsAddContratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
