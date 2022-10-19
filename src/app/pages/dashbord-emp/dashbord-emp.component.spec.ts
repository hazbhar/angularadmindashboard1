import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordEmpComponent } from './dashbord-emp.component';

describe('DashbordEmpComponent', () => {
  let component: DashbordEmpComponent;
  let fixture: ComponentFixture<DashbordEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashbordEmpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashbordEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
