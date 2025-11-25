import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-todo-item-checkbox',
  templateUrl: './todo-item-checkbox.component.html',
})
export class TodoItemCheckboxComponent {
  @Input() isChecked: boolean = false;

  toggleCheckbox() {
    this.isChecked = !this.isChecked;
    console.log('Checkbox toggled:', this.isChecked);
  }
}
