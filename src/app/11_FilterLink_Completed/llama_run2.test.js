import { render, fireEvent, waitFor } from '@angular/core/testing';
import { FilterLinkCompletedComponent } from './filter-link-completed.component';

describe('FilterLinkCompletedComponent', () => {
  it('renders correctly', () => {
    const { getByText, getByTestId } = render(FilterLinkCompletedComponent, {
      componentProperties: {
        isSelected: false,
      },
    });
    expect(getByText('Completed')).toBeInTheDocument();
    expect(getByTestId('filter-link-completed')).not.toHaveClass('selected');
  });

  it('renders correctly when selected', () => {
    const { getByText, getByTestId } = render(FilterLinkCompletedComponent, {
      componentProperties: {
        isSelected: true,
      },
    });
    expect(getByText('Completed')).toBeInTheDocument();
    expect(getByTestId('filter-link-completed')).toHaveClass('selected');
  });

  it('calls selectFilter on click', () => {
    const selectFilterSpy = jest.spyOn(console, 'log');
    const { getByTestId } = render(FilterLinkCompletedComponent, {
      componentProperties: {
        isSelected: false,
      },
    });
    fireEvent.click(getByTestId('filter-link-completed'));
    expect(selectFilterSpy).toHaveBeenCalledTimes(1);
    expect(selectFilterSpy).toHaveBeenCalledWith('Completed filter selected');
  });

  it('updates isSelected state on click', () => {
    const { getByTestId, component } = render(FilterLinkCompletedComponent, {
      componentProperties: {
        isSelected: false,
      },
    });
    fireEvent.click(getByTestId('filter-link-completed'));
    expect(component.isSelected).toBe(true);
  });
});