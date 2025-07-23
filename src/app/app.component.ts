import { EffectsModule } from '@ngrx/effects';
import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { AddTaskFormComponent } from './components/add-task-form/add-task-form.component';
import { TaskFilterComponent } from './components/task-filter/task-filter.component';
import { Task, TaskFilter } from './task.models';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Store } from '@ngrx/store';
import { selectAllTasks } from './store/task.selectors';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as TaskActions from './store/task.actions';



@Component({
  selector: 'app-root',
  imports: [TaskListComponent, AddTaskFormComponent, TaskFilterComponent, FormsModule, CommonModule,EffectsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true

})
export class AppComponent {
  private store = inject(Store);
  tasks$: Observable<any[]> = this.store.select(selectAllTasks);
  tasks = signal<Task[]>([]);
  filter = signal<TaskFilter>('all');
  statusFilter = signal<TaskFilter>('all');
  categoryFilter = signal<string>('');
  categories = ['Work', 'Personal', 'Urgent', 'Misc'];

   ngOnInit() {
    this.store.dispatch(TaskActions.loadTasks());
  }

 get filteredTasks(): Observable<Task[]> {
  return this.tasks$.pipe(
    map((tasks: Task[]) => {
      if (this.statusFilter() === 'completed') return tasks.filter(t => t.completed);
      if (this.statusFilter() === 'incomplete') return tasks.filter(t => !t.completed);
      return tasks;
    })
  );
}


  // reorderTasks(event: { previousIndex: number; currentIndex: number }) {
  //   const filtered = this.filteredTasks;       // currently visible tasks
  //   const all = this.tasks();                  // full list

  //   // Get actual task objects
  //   const draggedTask = filtered[event.previousIndex];
  //   const droppedTask = filtered[event.currentIndex];

  //   const draggedIndex = all.findIndex(t => t.id === draggedTask.id);
  //   const droppedIndex = all.findIndex(t => t.id === droppedTask.id);

  //   const reordered = [...all];
  //   moveItemInArray(reordered, draggedIndex, droppedIndex);

  //   this.tasks.set(reordered);
  // }

  setStatusFilter(filter: TaskFilter) {
    this.statusFilter.set(filter);
  }

  setCategoryFilter(category: string) {
    this.categoryFilter.set(category);
  }


  addTask(data:{title: string, category?: string}) {
    const task: Task = {
      id: crypto.randomUUID(),
      title:data.title,
      category:data.category,
      completed: false
    };
    this.store.dispatch(TaskActions.addTask({ task }));
  }

 toggleTask(id: string) {
    this.store.dispatch(TaskActions.toggleTask({ id }));
  }

  reorderTasks(newOrder: any) {
    this.store.dispatch(TaskActions.reorderTasks({ tasks: newOrder }));
  }
  setFilter(f: TaskFilter) {
    this.filter.set(f);
  }
}
