import { Task } from './../task.models';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { addTask, reorderTasks, toggleTask, loadTasks, loadTasksSuccess } from './task.actions';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class TaskEffects {
  constructor(private actions$: Actions) {}

  saveToLocalStorage$ = createEffect(
    () =>
      this.actions$?.pipe(
        ofType(addTask, toggleTask, reorderTasks),
        tap(({ type, ...payload }) => {
          const existing = JSON.parse(localStorage.getItem('tasks') || '[]') as Task[];

          let updated: Task[] = [];

          if (type === '[Task] Add Task') {
            if ('task' in payload) {
              updated = [payload.task, ...existing];
            }
          } else if (type === '[Task] Toggle Task') {
            if ('id' in payload) {
              updated = existing.map((t) =>
                t.id === payload.id ? { ...t, completed: !t.completed } : t
              );
            }
          } else if (type === '[Task] Reorder Tasks') {
            if ('tasks' in payload) {
              updated = payload.tasks;
            }
          }
          try {
             localStorage.setItem('tasks', JSON.stringify(updated));
          } catch (error) {
            console.error(error)
          }

        })
      ),
    { dispatch: false }
  );

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTasks),
      map(() => {
        const saved = JSON.parse(localStorage.getItem('tasks') || '[]') as Task[];
        return loadTasksSuccess({ tasks: saved });
      })
    )
  );
}
