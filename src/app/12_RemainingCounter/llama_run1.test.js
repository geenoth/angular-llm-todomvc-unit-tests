// remaining-counter.component.spec.ts
import '@testing-library/jest-dom';
import { render, fireEvent, waitFor } from '@testing-library/angular';
import { RemainingCounterComponent } from './remaining-counter.component';

describe('RemainingCounterComponent', () => {
  it('renders correct count and label', async () => {
    const { getByTestId } = await render(RemainingCounterComponent, {
      componentProperties: { count: 2 },
    });

    expect(getByTestId('remaining-counter')).toHaveTextContent('2 items left');
  });

  it('renders singular label when count is 1', async () => {
    const { getByTestId } = await render(RemainingCounterComponent, {
      componentProperties: { count: 1 },
    });

    expect(getByTestId('remaining-counter')).toHaveTextContent('1 item left');
  });

  it('renders plural label when count is greater than 1', async () => {
    const { getByTestId } = await render(RemainingCounterComponent, {
      componentProperties: { count: 5 },
    });

    expect(getByTestId('remaining-counter')).toHaveTextContent('5 items left');
  });

  it('updates count when input changes', async () => {
    const { getByTestId, component } = await render(RemainingCounterComponent, {
      componentProperties: { count: 2 },
    });

    component.count = 3;
    await waitFor(() => getByTestId('remaining-counter'));

    expect(getByTestId('remaining-counter')).toHaveTextContent('3 items left');
  });
});