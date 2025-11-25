import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-toggle-all-checkbox',
  templateUrl: './toggle-all-checkbox.component.html',
})
export class ToggleAllCheckboxComponent {
  @Input() isChecked: boolean = false;

  toggleAll() {
    this.isChecked = !this.isChecked;
    console.log('Toggle all:', this.isChecked);
  }
}
