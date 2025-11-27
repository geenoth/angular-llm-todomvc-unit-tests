// remaining-counter.component.spec.ts
import { render, fireEvent, waitFor } from '@testing-library/angular';
import { RemainingCounterComponent } from './remaining-counter.component';

describe('RemainingCounterComponent', () => {
  it('renders correctly with count 0', async () => {
    const { getByTestId } = await render(RemainingCounterComponent, {
      componentProperties: { count: 0 },
    });
    expect(getByTestId('remaining-counter')).toBeInTheDocument();
    expect(getByTestId('remaining-counter')).toHaveTextContent('0 items left');
  });

  it('renders correctly with count 1', async () => {
    const { getByTestId } = await render(RemainingCounterComponent, {
      componentProperties: { count: 1 },
    });
    expect(getByTestId('remaining-counter')).toBeInTheDocument();
    expect(getByTestId('remaining-counter')).toHaveTextContent('1 item left');
  });

  it('renders correctly with count 2', async () => {
    const { getByTestId } = await render(RemainingCounterComponent, {
      componentProperties: { count: 2 },
    });
    expect(getByTestId('remaining-counter')).toBeInTheDocument();
    expect(getByTestId('remaining-counter')).toHaveTextContent('2 items left');
  });

  it('updates label when count changes', async () => {
    const { getByTestId, rerender } = await render(RemainingCounterComponent, {
      componentProperties: { count: 1 },
    });
    expect(getByTestId('remaining-counter')).toHaveTextContent('1 item left');
    await rerender({ count: 2 });
    expect(getByTestId('remaining-counter')).toHaveTextContent('2 items left');
  });
});