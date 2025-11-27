import { render, fireEvent, waitFor } from '@angular/core/testing';
import { FilterLinkActiveComponent } from './filter-link-active.component';

describe('FilterLinkActiveComponent', () => {
  it('renders correctly', () => {
    const { getByText, getByTestId } = render(FilterLinkActiveComponent, {
      componentProperties: {
        isSelected: false,
      },
    });
    expect(getByText('Active')).toBeInTheDocument();
    expect(getByTestId('filter-link-active')).not.toHaveClass('selected');
  });

  it('renders correctly when selected', () => {
    const { getByText, getByTestId } = render(FilterLinkActiveComponent, {
      componentProperties: {
        isSelected: true,
      },
    });
    expect(getByText('Active')).toBeInTheDocument();
    expect(getByTestId('filter-link-active')).toHaveClass('selected');
  });

  it('calls selectFilter on click', () => {
    const selectFilterSpy = jest.spyOn(console, 'log');
    const { getByTestId } = render(FilterLinkActiveComponent, {
      componentProperties: {
        isSelected: false,
      },
    });
    fireEvent.click(getByTestId('filter-link-active'));
    expect(selectFilterSpy).toHaveBeenCalledTimes(1);
    expect(selectFilterSpy).toHaveBeenCalledWith('Active filter selected');
  });

  it('updates isSelected state on click', () => {
    const { getByTestId, component } = render(FilterLinkActiveComponent, {
      componentProperties: {
        isSelected: false,
      },
    });
    fireEvent.click(getByTestId('filter-link-active'));
    expect(component.isSelected).toBe(true);
  });
});