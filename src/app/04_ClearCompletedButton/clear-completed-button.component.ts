import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-clear-completed-button',
  templateUrl: './clear-completed-button.component.html',
})
export class ClearCompletedButtonComponent {
  @Input() isVisible: boolean = true;

  clearCompleted() {
    console.log('Completed todos cleared');
  }
}
