import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-edit-todo-input',
  imports: [FormsModule],
  templateUrl: './edit-todo-input.component.html',
})
export class EditTodoInputComponent {
  @Input() initialValue: string = '';

  editTitle = '';

  ngOnInit() {
    this.editTitle = this.initialValue;
  }

  updateTodo() {
    if (this.editTitle.trim()) {
      console.log('Todo updated:', this.editTitle);
    }
  }

  handleBlur() {
    console.log('Edit finished');
  }
}
