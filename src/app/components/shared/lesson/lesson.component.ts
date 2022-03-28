import {Component, Input, OnInit} from '@angular/core';
import {Lesson} from "../../../interfaces/lessons-interfaces";

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit {

  private _lesson!: Lesson;

  @Input() set lesson(lesson: Lesson) {
    this._lesson = lesson;
    this.isMp3 = lesson.url.includes('mp3');
  }

  get lesson(): Lesson {
    return this._lesson;
  }

  isMp3 = false;

  constructor() { }

  ngOnInit(): void {
  }

  onContextmenu() {
    return false;
  }
}
