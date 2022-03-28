import {Component, Input, OnInit} from '@angular/core';
import {Lesson} from "../../../interfaces/lessons-interfaces";

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit {

  @Input() lesson!: Lesson;

  constructor() { }

  ngOnInit(): void {
  }

}
