import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitBuildingComponent } from './unit-building.component';

describe('UnitBuildingComponent', () => {
  let component: UnitBuildingComponent;
  let fixture: ComponentFixture<UnitBuildingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnitBuildingComponent]
    });
    fixture = TestBed.createComponent(UnitBuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
