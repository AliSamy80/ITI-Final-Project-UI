import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitDetailsComponent } from './unit-details.component';

describe('UnitDetailsComponent', () => {
  let component: UnitDetailsComponent;
  let fixture: ComponentFixture<UnitDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnitDetailsComponent]
    });
    fixture = TestBed.createComponent(UnitDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
