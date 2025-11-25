import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-filter-link-active',
  templateUrl: './filter-link-active.component.html',
})
export class FilterLinkActiveComponent {
  @Input() isSelected: boolean = false;

  selectFilter() {
    console.log('Active filter selected');
  }
}
