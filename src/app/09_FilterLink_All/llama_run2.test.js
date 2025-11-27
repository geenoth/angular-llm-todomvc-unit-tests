import { render, fireEvent, waitFor } from '@angular/core/testing';
import { FilterLinkAllComponent } from './filter-link-all.component';

describe('FilterLinkAllComponent', () => {
  it('renders correctly', () => {
    const { getByText, getByTestId } = render(FilterLinkAllComponent, {
      componentProperties: {
        isSelected: false,
      },
    });
    expect(getByText('All')).toBeInTheDocument();
    expect(getByTestId('filter-link-all')).not.toHaveClass('selected');
  });

  it('renders correctly when selected', () => {
    const { getByText, getByTestId } = render(FilterLinkAllComponent, {
      componentProperties: {
        isSelected: true,
      },
    });
    expect(getByText('All')).toBeInTheDocument();
    expect(getByTestId('filter-link-all')).toHaveClass('selected');
  });

  it('calls selectFilter on click', () => {
    const selectFilterSpy = jest.spyOn(console, 'log');
    const { getByTestId } = render(FilterLinkAllComponent, {
      componentProperties: {
        isSelected: false,
      },
    });
    fireEvent.click(getByTestId('filter-link-all'));
    expect(selectFilterSpy).toHaveBeenCalledTimes(1);
    expect(selectFilterSpy).toHaveBeenCalledWith('All filter selected');
  });

  it('updates isSelected state on click', () => {
    const { getByTestId, component } = render(FilterLinkAllComponent, {
      componentProperties: {
        isSelected: false,
      },
    });
    fireEvent.click(getByTestId('filter-link-all'));
    expect(component.isSelected).toBe(true);
  });
});