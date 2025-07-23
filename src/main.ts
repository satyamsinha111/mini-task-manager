import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { taskReducer } from './app/store/task.reducer';
import { TaskEffects } from './app/store/task.effects';
import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';


bootstrapApplication(AppComponent, {
  providers: [
    provideStore({ tasks: taskReducer }),
    provideEffects([TaskEffects]),
  ],
});
