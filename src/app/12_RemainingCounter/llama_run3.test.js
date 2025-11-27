import { render, waitFor } from '@angular/core/testing';
import { RemainingCounterComponent } from './remaining-counter.component';

describe('RemainingCounterComponent', () => {
  it('renders correctly with count 0', () => {
    const { getByText, getByTestId } = render(RemainingCounterComponent, {
      componentProperties: {
        count: 0,
      },
    });
    expect(getByText('0')).toBeInTheDocument();
    expect(getByText('items left')).toBeInTheDocument();
    expect(getByTestId('remaining-counter')).toBeInTheDocument();
  });

  it('renders correctly with count 1', () => {
    const { getByText, getByTestId } = render(RemainingCounterComponent, {
      componentProperties: {
        count: 1,
      },
    });
    expect(getByText('1')).toBeInTheDocument();
    expect(getByText('item left')).toBeInTheDocument();
    expect(getByTestId('remaining-counter')).toBeInTheDocument();
  });

  it('renders correctly with count 2', () => {
    const { getByText, getByTestId } = render(RemainingCounterComponent, {
      componentProperties: {
        count: 2,
      },
    });
    expect(getByText('2')).toBeInTheDocument();
    expect(getByText('items left')).toBeInTheDocument();
    expect(getByTestId('remaining-counter')).toBeInTheDocument();
  });

  it('updates label when count changes', () => {
    const { component, getByText } = render(RemainingCounterComponent, {
      componentProperties: {
        count: 1,
      },
    });
    expect(getByText('item left')).toBeInTheDocument();
    component.count = 2;
    waitFor(() => expect(getByText('items left')).toBeInTheDocument());
  });
});