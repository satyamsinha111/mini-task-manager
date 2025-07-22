import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AddTaskFormComponent } from './components/add-task-form/add-task-form.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFilterComponent } from './components/task-filter/task-filter.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        AddTaskFormComponent,
        TaskListComponent,
        TaskFilterComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create TaskPageComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should start with no tasks', () => {
    expect(component.tasks()).toEqual([]);
  });

  it('should add a task', () => {
    const initialCount = component.tasks().length;
    component.addTask({ title: 'Test Task', category: 'Work' });

    const updatedTasks = component.tasks();
    expect(updatedTasks.length).toBe(initialCount + 1);
    expect(updatedTasks[0].title).toBe('Test Task');
    expect(updatedTasks[0].category).toBe('Work');
  });

  it('should toggle task completion', () => {
    component.addTask({ title: 'Task 1', category: '' });
    const taskId = component.tasks()[0].id;
    if (taskId)
      component.toggleTask(taskId);
    expect(component.tasks()[0].completed).toBeTrue();
    if (taskId)
      component.toggleTask(taskId);
    expect(component.tasks()[0].completed).toBeFalse();
  });

  it('should filter tasks correctly', () => {
    component.addTask({ title: 'Completed Task', category: '' });
    const id = component.tasks()[0].id;
    if (id)
      component.toggleTask(id); // mark as completed

    component.setFilter('completed');
    const filtered = component.filteredTasks;
    expect(filtered.length).toBe(1);
    expect(filtered[0].completed).toBeTrue();

    component.setFilter('incomplete');
    expect(component.filteredTasks.length).toBe(0);

    component.setFilter('all');
    expect(component.filteredTasks.length).toBe(1);
  });
});
