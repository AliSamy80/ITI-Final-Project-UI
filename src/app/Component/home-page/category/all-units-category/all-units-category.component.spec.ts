import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllUnitsCategoryComponent } from './all-units-category.component';

describe('AllUnitsCategoryComponent', () => {
  let component: AllUnitsCategoryComponent;
  let fixture: ComponentFixture<AllUnitsCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllUnitsCategoryComponent]
    });
    fixture = TestBed.createComponent(AllUnitsCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
