import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskFilter } from '../../task.models';

@Component({
  standalone: true,
  selector: 'app-task-filter',
  imports: [CommonModule],
  templateUrl: './task-filter.component.html',
})
export class TaskFilterComponent {
  @Input() active: TaskFilter = 'all';
  @Output() change = new EventEmitter<TaskFilter>();

  filters: TaskFilter[] = ['all', 'completed', 'incomplete'];
}
