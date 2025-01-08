import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccomondationFormComponent } from './accomondation-form.component';

describe('AccomondationFormComponent', () => {
  let component: AccomondationFormComponent;
  let fixture: ComponentFixture<AccomondationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccomondationFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccomondationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
