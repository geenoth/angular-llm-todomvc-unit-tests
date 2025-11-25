import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-remaining-counter',
  templateUrl: './remaining-counter.component.html',
})
export class RemainingCounterComponent {
  @Input() count: number = 0;

  getLabel() {
    return this.count === 1 ? 'item' : 'items';
  }
}
