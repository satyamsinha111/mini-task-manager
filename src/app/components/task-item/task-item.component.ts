import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../task.models';


@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: [],
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() toggle = new EventEmitter<string>();
}
