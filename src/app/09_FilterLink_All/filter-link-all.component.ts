import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-filter-link-all',
  templateUrl: './filter-link-all.component.html',
})
export class FilterLinkAllComponent {
  @Input() isSelected: boolean = false;

  selectFilter() {
    console.log('All filter selected');
  }
}
