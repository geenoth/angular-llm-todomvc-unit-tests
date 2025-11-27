// remaining-counter.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RemainingCounterComponent } from './remaining-counter.component';
import { By } from '@angular/platform-browser';

describe('RemainingCounterComponent', () => {
  let component: RemainingCounterComponent;
  let fixture: ComponentFixture<RemainingCounterComponent>;
  let counterElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemainingCounterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RemainingCounterComponent);
    component = fixture.componentInstance;
    counterElement = fixture.debugElement.query(By.css('[data-testid="remaining-counter"]')).nativeElement;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render correctly with default count of 0', () => {
    fixture.detectChanges(); // Trigger initial data binding
    expect(counterElement.textContent).toContain('0 items left');
    expect(counterElement.querySelector('strong')?.textContent).toBe('0');
  });

  it('should display the singular "item" when count is 1', () => {
    component.count = 1;
    fixture.detectChanges();
    expect(component.getLabel()).toBe('item');
    expect(counterElement.textContent).toContain('1 item left');
    expect(counterElement.querySelector('strong')?.textContent).toBe('1');
  });

  it('should display the plural "items" when count is 0', () => {
    component.count = 0;
    fixture.detectChanges();
    expect(component.getLabel()).toBe('items');
    expect(counterElement.textContent).toContain('0 items left');
    expect(counterElement.querySelector('strong')?.textContent).toBe('0');
  });

  it('should display the plural "items" when count is greater than 1', () => {
    component.count = 5;
    fixture.detectChanges();
    expect(component.getLabel()).toBe('items');
    expect(counterElement.textContent).toContain('5 items left');
    expect(counterElement.querySelector('strong')?.textContent).toBe('5');
  });

  it('should update the view when the count input property changes', () => {
    // Initial state
    component.count = 3;
    fixture.detectChanges();
    expect(counterElement.textContent).toContain('3 items left');

    // Change the count
    component.count = 1;
    fixture.detectChanges();
    expect(counterElement.textContent).toContain('1 item left');

    // Change the count again
    component.count = 10;
    fixture.detectChanges();
    expect(counterElement.textContent).toContain('10 items left');
  });
});