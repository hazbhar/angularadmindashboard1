import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDiplomeComponent } from './details-diplome.component';

describe('DetailsDiplomeComponent', () => {
  let component: DetailsDiplomeComponent;
  let fixture: ComponentFixture<DetailsDiplomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsDiplomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsDiplomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
