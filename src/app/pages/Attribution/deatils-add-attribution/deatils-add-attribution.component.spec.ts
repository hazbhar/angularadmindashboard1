import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeatilsAddAttributionComponent } from './deatils-add-attribution.component';

describe('DeatilsAddAttributionComponent', () => {
  let component: DeatilsAddAttributionComponent;
  let fixture: ComponentFixture<DeatilsAddAttributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeatilsAddAttributionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeatilsAddAttributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
