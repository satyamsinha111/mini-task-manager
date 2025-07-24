import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { TaskFilter, Task } from './task.models';
import * as TaskActions from './store/task.actions';
import { of } from 'rxjs';
import { selectAllTasks } from './store/task.selectors';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: MockStore;
  const initialTasks: Task[] = [
    { id: '1', title: 'Task 1', completed: false },
    { id: '2', title: 'Task 2', completed: true },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: selectAllTasks,
              value: initialTasks,
            },
          ],
        }),
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    spyOn(store, 'dispatch');
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadTasks on init', () => {
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(TaskActions.loadTasks());
  });

  it('should set status filter', () => {
    component.setStatusFilter('completed');
    expect(component.statusFilter()).toBe('completed');
  });

  it('should set category filter', () => {
    component.setCategoryFilter('Work');
    expect(component.categoryFilter()).toBe('Work');
  });

  it('should dispatch addTask action', () => {
    const newTask = { title: 'New Task', category: 'Work' };
    component.addTask(newTask);

    expect(store.dispatch).toHaveBeenCalledWith(
      jasmine.objectContaining({
        type: '[Task] Add Task',
        task: jasmine.objectContaining({
          title: 'New Task',
          category: 'Work',
          completed: false,
        }),
      })
    );
  });

  it('should dispatch toggleTask action', () => {
    component.toggleTask('123');
    expect(store.dispatch).toHaveBeenCalledWith(
      TaskActions.toggleTask({ id: '123' })
    );
  });

  it('should dispatch reorderTasks action', () => {
    const reordered = [...initialTasks].reverse();
    component.reorderTasks({
      previousIndex:0,currentIndex:1
    });
    expect(store.dispatch).toHaveBeenCalledWith(
      TaskActions.reorderTasks({ tasks: reordered })
    );
  });

  it('should filter completed tasks', (done) => {
    component.statusFilter.set('completed');
    component.filteredTasks.subscribe(filtered => {
      expect(filtered.length).toBe(1);
      expect(filtered[0].completed).toBeTrue();
      done();
    });
  });

  it('should filter incomplete tasks', (done) => {
    component.statusFilter.set('incomplete');
    component.filteredTasks.subscribe(filtered => {
      expect(filtered.length).toBe(1);
      expect(filtered[0].completed).toBeFalse();
      done();
    });
  });

  it('should return all tasks when filter is "all"', (done) => {
    component.statusFilter.set('all');
    component.filteredTasks.subscribe(filtered => {
      expect(filtered.length).toBe(2);
      done();
    });
  });
});
