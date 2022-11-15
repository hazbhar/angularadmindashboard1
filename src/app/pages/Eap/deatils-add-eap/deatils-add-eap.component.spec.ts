import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeatilsAddEapComponent } from './deatils-add-eap.component';

describe('DeatilsAddEapComponent', () => {
  let component: DeatilsAddEapComponent;
  let fixture: ComponentFixture<DeatilsAddEapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeatilsAddEapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeatilsAddEapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
