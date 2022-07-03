import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOpportunityDialogComponent } from './edit-opportunity-dialog.component';

describe('EditOpportunityDialogComponent', () => {
  let component: EditOpportunityDialogComponent;
  let fixture: ComponentFixture<EditOpportunityDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditOpportunityDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOpportunityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
