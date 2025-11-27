// filter-link-completed.component.spec.ts
import { render, fireEvent, waitFor } from '@testing-library/angular';
import { FilterLinkCompletedComponent } from './filter-link-completed.component';

describe('FilterLinkCompletedComponent', () => {
  it('renders correctly', async () => {
    const { getByTestId } = await render(FilterLinkCompletedComponent, {
      componentProperties: { isSelected: false },
    });
    expect(getByTestId('filter-link-completed')).toBeInTheDocument();
  });

  it('displays "Completed" text', async () => {
    const { getByText } = await render(FilterLinkCompletedComponent, {
      componentProperties: { isSelected: false },
    });
    expect(getByText('Completed')).toBeInTheDocument();
  });

  it('adds "selected" class when isSelected is true', async () => {
    const { getByTestId } = await render(FilterLinkCompletedComponent, {
      componentProperties: { isSelected: true },
    });
    expect(getByTestId('filter-link-completed')).toHaveClass('selected');
  });

  it('calls selectFilter when clicked', async () => {
    const selectFilterSpy = jest.spyOn(FilterLinkCompletedComponent.prototype, 'selectFilter');
    const { getByTestId } = await render(FilterLinkCompletedComponent, {
      componentProperties: { isSelected: false },
    });
    const link = getByTestId('filter-link-completed');
    fireEvent.click(link);
    expect(selectFilterSpy).toHaveBeenCalledTimes(1);
  });

  it('href attribute is correct', async () => {
    const { getByTestId } = await render(FilterLinkCompletedComponent, {
      componentProperties: { isSelected: false },
    });
    const link = getByTestId('filter-link-completed');
    expect(link.getAttribute('href')).toBe('#/completed');
  });
});