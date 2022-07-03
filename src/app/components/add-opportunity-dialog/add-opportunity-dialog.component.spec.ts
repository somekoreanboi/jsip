import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOpportunityDialogComponent } from './add-opportunity-dialog.component';

describe('AddOpportunityDialogComponent', () => {
  let component: AddOpportunityDialogComponent;
  let fixture: ComponentFixture<AddOpportunityDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOpportunityDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOpportunityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
