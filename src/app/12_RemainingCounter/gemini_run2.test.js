// remaining-counter.component.spec.ts
import { render, screen } from '@testing-library/angular';
import { RemainingCounterComponent } from './remaining-counter.component';

describe('RemainingCounterComponent', () => {
  // Test case 1: Check if the component renders without crashing
  test('should create the component', async () => {
    const { container } = await render(RemainingCounterComponent);
    expect(container).toBeTruthy();
  });

  // Test case 2: Test rendering with a count of 0
  test('should display "0 items left" when count is 0', async () => {
    await render(RemainingCounterComponent, {
      componentProperties: { count: 0 },
    });

    const counter = screen.getByTestId('remaining-counter');
    expect(counter.textContent).toContain('0 items left');
    const strongElement = counter.querySelector('strong');
    expect(strongElement?.textContent).toBe('0');
  });

  // Test case 3: Test rendering with a count of 1
  test('should display "1 item left" when count is 1', async () => {
    await render(RemainingCounterComponent, {
      componentProperties: { count: 1 },
    });

    const counter = screen.getByTestId('remaining-counter');
    expect(counter.textContent).toContain('1 item left');
    const strongElement = counter.querySelector('strong');
    expect(strongElement?.textContent).toBe('1');
  });

  // Test case 4: Test rendering with a count greater than 1
  test('should display "5 items left" when count is 5', async () => {
    await render(RemainingCounterComponent, {
      componentProperties: { count: 5 },
    });

    const counter = screen.getByTestId('remaining-counter');
    expect(counter.textContent).toContain('5 items left');
    const strongElement = counter.querySelector('strong');
    expect(strongElement?.textContent).toBe('5');
  });

  // Test case 5: Test that the component updates correctly when the input property changes
  test('should update the display when the count input changes', async () => {
    const { rerender } = await render(RemainingCounterComponent, {
      componentProperties: { count: 3 },
    });

    // Initial state check
    const counter = screen.getByTestId('remaining-counter');
    expect(counter.textContent).toContain('3 items left');

    // Rerender with a new count value
    await rerender({ componentProperties: { count: 1 } });
    expect(counter.textContent).toContain('1 item left');

    // Rerender again with another value
    await rerender({ componentProperties: { count: 10 } });
    expect(counter.textContent).toContain('10 items left');
  });

  // Test case 6: Test getLabel method directly for singular case
  test('getLabel() should return "item" when count is 1', () => {
    const component = new RemainingCounterComponent();
    component.count = 1;
    expect(component.getLabel()).toBe('item');
  });

  // Test case 7: Test getLabel method directly for plural case
  test('getLabel() should return "items" when count is not 1', () => {
    const component = new RemainingCounterComponent();

    component.count = 0;
    expect(component.getLabel()).toBe('items');

    component.count = 2;
    expect(component.getLabel()).toBe('items');

    component.count = -1; // Edge case
    expect(component.getLabel()).toBe('items');
  });
});