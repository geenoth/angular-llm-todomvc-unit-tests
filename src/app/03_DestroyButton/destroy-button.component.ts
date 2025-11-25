import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-destroy-button',
  templateUrl: './destroy-button.component.html',
})
export class DestroyButtonComponent {
  removeTodo() {
    console.log('Todo removed');
  }
}
