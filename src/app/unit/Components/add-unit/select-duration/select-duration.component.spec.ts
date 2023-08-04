import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectDurationComponent } from './select-duration.component';

describe('SelectDurationComponent', () => {
  let component: SelectDurationComponent;
  let fixture: ComponentFixture<SelectDurationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectDurationComponent]
    });
    fixture = TestBed.createComponent(SelectDurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
