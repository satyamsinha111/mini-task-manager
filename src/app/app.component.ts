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
import { firstValueFrom, Observable } from 'rxjs';
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
      const status = this.statusFilter();
      const category = this.categoryFilter();

      let result = tasks;

      if (status === 'completed') {
        result = result.filter(t => t.completed);
      } else if (status === 'incomplete') {
        result = result.filter(t => !t.completed);
      }

      if (category) {
        result = result.filter(t => t.category === category);
      }

      return result;
    })
  );
}



  async reorderTasks(event: { previousIndex: number; currentIndex: number }) {
  const filtered = await firstValueFrom(this.filteredTasks);

  // Use full tasks list from store directly if needed
  const all = filtered; // Assuming filtered is same as all in default case

  const draggedTask = filtered[event.previousIndex];
  const droppedTask = filtered[event.currentIndex];

  const draggedIndex = all.findIndex(t => t.id === draggedTask.id);
  const droppedIndex = all.findIndex(t => t.id === droppedTask.id);

  const reordered = [...all];
  moveItemInArray(reordered, draggedIndex, droppedIndex);

  this.store.dispatch(TaskActions.reorderTasks({ tasks: reordered }));
}

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

  // reorderTasks(newOrder: any) {
  //   this.store.dispatch(TaskActions.reorderTasks({ tasks: newOrder }));
  // }
  setFilter(f: TaskFilter) {
    this.filter.set(f);
  }
}
