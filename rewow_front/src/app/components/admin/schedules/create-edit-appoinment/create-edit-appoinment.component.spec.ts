import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditAppoinmentComponent } from './create-edit-appoinment.component';

describe('CreateEditAppoinmentComponent', () => {
  let component: CreateEditAppoinmentComponent;
  let fixture: ComponentFixture<CreateEditAppoinmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateEditAppoinmentComponent]
    });
    fixture = TestBed.createComponent(CreateEditAppoinmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
