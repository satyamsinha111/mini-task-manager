import { Task } from './../task.models';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addTask,
  reorderTasks,
  toggleTask,
  loadTasks,
  loadTasksSuccess,
} from './task.actions';
import { map, tap, filter } from 'rxjs/operators';

@Injectable()
export class TaskEffects {
  constructor(private actions$: Actions) {
    console.log('TaskEffects initialized',actions$);
  }

  saveToLocalStorage$ = createEffect(
  () =>
    this.actions$?.pipe(
      ofType(addTask, toggleTask, reorderTasks),
      tap((action) => {
        const existing: Task[] = this.safelyParse(localStorage.getItem('tasks'));

        let updated: Task[] = [];

        switch (action.type) {
          case addTask.type:
            updated = [action.task, ...existing];
            break;

          case toggleTask.type:
            updated = existing.map((t) =>
              t.id === action.id ? { ...t, completed: !t.completed } : t
            );
            break;

          case reorderTasks.type:
            updated = action.tasks;
            break;
        }

        try {
          localStorage.setItem('tasks', JSON.stringify(updated));
        } catch (error) {
          console.error('Failed to save tasks to localStorage:', error);
        }
      })
    ),
  { dispatch: false }
);

// ✅ Utility function to safely parse JSON
private safelyParse(json: string | null): Task[] {
  try {
    const parsed = JSON.parse(json || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}


  loadTasks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadTasks),
      map(() => {
        let saved: Task[] = [];
        try {
          saved = JSON.parse(localStorage.getItem('tasks') || '[]');
        } catch {
          saved = [];
        }
        return loadTasksSuccess({ tasks: saved });
      })
    );
  });
}
