import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-todo-label',
  templateUrl: './todo-label.component.html',
})
export class TodoLabelComponent {
  @Input() text: string = '';
  @Input() isCompleted: boolean = false;

  startEdit() {
    console.log('Edit started');
  }
}
