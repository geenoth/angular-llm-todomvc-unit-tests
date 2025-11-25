import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-filter-link-completed',
  templateUrl: './filter-link-completed.component.html',
})
export class FilterLinkCompletedComponent {
  @Input() isSelected: boolean = false;

  selectFilter() {
    console.log('Completed filter selected');
  }
}
