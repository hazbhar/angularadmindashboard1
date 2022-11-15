import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeatilsAddFormationComponent } from './deatils-add-formation.component';

describe('DeatilsAddFormationComponent', () => {
  let component: DeatilsAddFormationComponent;
  let fixture: ComponentFixture<DeatilsAddFormationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeatilsAddFormationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeatilsAddFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
