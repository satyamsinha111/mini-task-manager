import { Task } from './../task.models';
import { taskReducer, initialState, TaskState } from './task.reducer';
import * as TaskActions from './task.actions';

describe('Task Reducer', () => {
  const task: Task = {
    id: '123',
    title: 'Test task',
    category: 'Work',
    completed: false,
  };

  it('should return initial state', () => {
    const action = { type: '[Unknown Action]' } as any;
    const state = taskReducer(undefined, action);
    expect(state).toEqual(initialState);
  });

  it('should add a task', () => {
    const state = taskReducer(initialState, TaskActions.addTask({ task }));
    expect(state.tasks.length).toBe(1);
    expect(state.tasks[0]).toEqual(task);
  });

  it('should toggle task', () => {
    const preloaded: TaskState = { tasks: [task] };
    const state = taskReducer(preloaded, TaskActions.toggleTask({ id: task.id || '' }));
    expect(state.tasks[0].completed).toBe(true);
  });

  it('should reorder tasks', () => {
    const task2 = { ...task, id: '456', title: 'Second' };
    const state = taskReducer({ tasks: [task, task2] }, TaskActions.reorderTasks({ tasks: [task2, task] }));
    expect(state.tasks[0].id).toBe('456');
  });
});
