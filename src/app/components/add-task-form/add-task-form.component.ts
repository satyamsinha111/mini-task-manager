import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Task } from '../../task.models';

@Component({
  standalone: true,
  selector: 'app-add-task-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-task-form.component.html',
})
export class AddTaskFormComponent {
  @Output() add = new EventEmitter<Task>();
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      category: ['Work'],
    });
  };

  categories = ['Work', 'Personal', 'Urgent', 'Misc'];

  submit() {
    if (this.form.valid) {
      this.add.emit(this.form.value as any);
      this.form.reset({ category: '' }); // retain default empty category
    }
  }
}
