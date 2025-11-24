import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-add-todo-input',
  imports: [FormsModule],
  templateUrl: './add-todo-input.component.html',
})
export class AddTodoInputComponent {
  title = '';

  addTodo() {
    if (this.title.trim()) {
      console.log('Todo added:', this.title);
      this.title = '';
    }
  }
}
