import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskItemComponent } from '../task-item/task-item.component';
import { Task } from '../../task.models';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';


@Component({
  standalone: true,
  selector: 'app-task-list',
  imports: [CommonModule, TaskItemComponent, DragDropModule],
  templateUrl: './task-list.component.html',
})
export class TaskListComponent {
  @Input() tasks: any[] = [];
  @Output() toggle = new EventEmitter<string>();
  @Output() reorder = new EventEmitter<{ previousIndex: number; currentIndex: number }>();
  ngOnChanges(){
    console.log(this.tasks)
  }
  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousIndex !== event.currentIndex) {
      this.reorder.emit({
        previousIndex: event.previousIndex,
        currentIndex: event.currentIndex,
      });
    }
  }
}
