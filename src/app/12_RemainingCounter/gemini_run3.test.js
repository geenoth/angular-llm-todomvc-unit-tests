// remaining-counter.component.spec.ts
import { render, screen } from '@testing-library/angular';
import { RemainingCounterComponent } from './remaining-counter.component';

describe('RemainingCounterComponent', () => {
  test('should create the component', async () => {
    const { container } = await render(RemainingCounterComponent);
    expect(container).toBeTruthy();
  });

  test('should render "0 items left" when count is 0', async () => {
    await render(RemainingCounterComponent, {
      componentProperties: { count: 0 },
    });
    const counter = screen.getByTestId('remaining-counter');
    expect(counter.textContent).toContain('0 items left');
  });

  test('should render "1 item left" when count is 1', async () => {
    await render(RemainingCounterComponent, {
      componentProperties: { count: 1 },
    });
    const counter = screen.getByTestId('remaining-counter');
    expect(counter.textContent).toContain('1 item left');
  });

  test('should render "5 items left" when count is 5', async () => {
    await render(RemainingCounterComponent, {
      componentProperties: { count: 5 },
    });
    const counter = screen.getByTestId('remaining-counter');
    expect(counter.textContent).toContain('5 items left');
  });

  test('should render with the default count of 0 if no count is provided', async () => {
    await render(RemainingCounterComponent);
    const counter = screen.getByTestId('remaining-counter');
    expect(counter.textContent).toContain('0 items left');
  });

  test('should update the displayed text when the count input changes', async () => {
    const { rerender } = await render(RemainingCounterComponent, {
      componentProperties: { count: 3 },
    });
    const counter = screen.getByTestId('remaining-counter');
    expect(counter.textContent).toContain('3 items left');

    // Rerender with a new count to test singular label
    await rerender({ componentProperties: { count: 1 } });
    expect(counter.textContent).toContain('1 item left');

    // Rerender with another new count to test plural label again
    await rerender({ componentProperties: { count: 10 } });
    expect(counter.textContent).toContain('10 items left');
  });

  describe('getLabel method', () => {
    let component: RemainingCounterComponent;

    beforeEach(() => {
      component = new RemainingCounterComponent();
    });

    test('should return "item" when count is 1', () => {
      component.count = 1;
      expect(component.getLabel()).toBe('item');
    });

    test('should return "items" when count is 0', () => {
      component.count = 0;
      expect(component.getLabel()).toBe('items');
    });

    test('should return "items" when count is greater than 1', () => {
      component.count = 2;
      expect(component.getLabel()).toBe('items');
    });

    test('should return "items" for negative numbers', () => {
      component.count = -5;
      expect(component.getLabel()).toBe('items');
    });
  });
});