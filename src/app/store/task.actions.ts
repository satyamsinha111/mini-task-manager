import { Task } from './../task.models';
import { createAction, props } from '@ngrx/store';

export const loadTasks = createAction('[Task] Load Tasks');

export const loadTasksSuccess = createAction(
  '[Task] Load Tasks Success',
  props<{ tasks: Task[] }>()
);

export const addTask = createAction('[Task] Add Task', props<{ task: Task }>());
export const toggleTask = createAction('[Task] Toggle Task', props<{ id: string }>());
export const reorderTasks = createAction('[Task] Reorder Tasks', props<{ tasks: Task[] }>());
