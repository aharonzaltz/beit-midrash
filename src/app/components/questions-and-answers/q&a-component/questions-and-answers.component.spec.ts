import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsAndAnswersComponent } from './questions-and-answers.component';

describe('QuestaionsAndAnsweresComponent', () => {
  let component: QuestionsAndAnswersComponent;
  let fixture: ComponentFixture<QuestionsAndAnswersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionsAndAnswersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsAndAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
