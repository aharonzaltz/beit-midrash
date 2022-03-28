import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeminarsBaseComponent } from './seminars-base.component';

describe('SeminarsBaseComponent', () => {
  let component: SeminarsBaseComponent;
  let fixture: ComponentFixture<SeminarsBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeminarsBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeminarsBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
