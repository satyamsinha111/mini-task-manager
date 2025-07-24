import { Task } from './../task.models';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { TaskEffects } from './task.effects';
import * as TaskActions from './task.actions';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

describe('TaskEffects', () => {
  let actions$: Observable<any>;
  let effects: TaskEffects;
let mockStorage: Record<string, string>;

  beforeEach(() => {
    mockStorage = {};

  spyOn(window.localStorage, 'getItem').and.callFake((key: string) => {
    return mockStorage[key] ?? null;
  });

  spyOn(window.localStorage, 'setItem').and.callFake((key: string, value: string) => {
    mockStorage[key] = value;
  });

  spyOn(window.localStorage, 'clear').and.callFake(() => {
    mockStorage = {};
  });
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),            // ✅ bootstraps NgRx store
        EffectsModule.forRoot([TaskEffects]) // ✅ registers effects
      ],
      providers: [
        provideMockActions(() => actions$)  // ✅ mock the actions stream
      ]
    });

    effects = TestBed.inject(TaskEffects);
    // localStorage.clear(); // optional cleanup

  });

  it('should load tasks from localStorage', (done) => {
    const storedTask: Task = {
      id: '1',
      title: 'From LocalStorage',
      completed: false,
    };
    localStorage.setItem('tasks', JSON.stringify([storedTask]));

    actions$ = of(TaskActions.loadTasks());

    effects.loadTasks$.subscribe((action) => {
      expect(action).toEqual(TaskActions.loadTasksSuccess({ tasks: [storedTask] }));
      done();
    });
  });

// it('should write to localStorage when addTask is dispatched', (done) => {
//   const task: Task = { id: '123', title: 'Test task', completed: false };

//   spyOn(localStorage, 'getItem').and.returnValue('[]');
//   const setItemSpy = spyOn(localStorage, 'setItem');

//   actions$ = of(TaskActions.addTask({ task }));
//   effects = new TaskEffects(actions$); // create fresh instance with mock actions$

//   effects.loadTasks$.subscribe({
//     complete: () => {
//       expect(setItemSpy).toHaveBeenCalledWith(
//         'tasks',
//         jasmine.stringMatching('"Test task"')
//       );
//       done();
//     }
//   });
// });


});
