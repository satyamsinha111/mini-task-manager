import { Task } from './../task.models';
import { createReducer, on } from '@ngrx/store';
import * as TaskActions from './task.actions';

export interface TaskState {
  tasks: Task[];
}

export const initialState: TaskState = {
  tasks: [],
};

export const taskReducer = createReducer(
  initialState,
  on(TaskActions.loadTasksSuccess, (state, { tasks }) => ({ ...state, tasks })),
  on(TaskActions.addTask, (state, { task }) => ({ ...state, tasks: [task, ...state.tasks] })),
  on(TaskActions.toggleTask, (state, { id }) => ({
    ...state,
    tasks: state.tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ),
  })),
  on(TaskActions.reorderTasks, (state, { tasks }) => ({ ...state, tasks })),
);
