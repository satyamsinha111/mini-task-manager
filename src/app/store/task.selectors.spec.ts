import { Task } from './../task.models';
import { selectAllTasks } from './task.selectors';
import { TaskState } from './task.reducer';

describe('Task Selectors', () => {
  it('should select all tasks', () => {
    const task: Task = { id: '123', title: 'Do it', completed: false };
    const state: { tasks: TaskState } = {
      tasks: {
        tasks: [task],
      },
    };

    const result = selectAllTasks.projector(state.tasks);
    expect(result.length).toBe(1);
    expect(result[0].id).toBe('123');
  });
});
