import { Component, Input } from '@angular/core';

export interface Todo {
  id?: string;
  title: string;
  completed: boolean;
}

@Component({
  standalone: true,
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
})
export class TodoListComponent {
  @Input() todos: Todo[] = [];

  removeTodo(todo: Todo) {
    console.log('Removing todo:', todo);
  }

  toggleTodo(todo: Todo) {
    todo.completed = !todo.completed;
    console.log('Toggled todo:', todo);
  }
}
