// filter-link-all.component.spec.ts
import { render, fireEvent, waitFor } from '@testing-library/angular';
import { FilterLinkAllComponent } from './filter-link-all.component';

describe('FilterLinkAllComponent', () => {
  it('renders correctly', async () => {
    const { getByTestId } = await render(FilterLinkAllComponent, {
      componentProperties: { isSelected: false },
    });
    expect(getByTestId('filter-link-all')).toBeInTheDocument();
  });

  it('displays "All" text', async () => {
    const { getByText } = await render(FilterLinkAllComponent, {
      componentProperties: { isSelected: false },
    });
    expect(getByText('All')).toBeInTheDocument();
  });

  it('adds "selected" class when isSelected is true', async () => {
    const { getByTestId } = await render(FilterLinkAllComponent, {
      componentProperties: { isSelected: true },
    });
    expect(getByTestId('filter-link-all')).toHaveClass('selected');
  });

  it('calls selectFilter when clicked', async () => {
    const selectFilterSpy = jest.spyOn(FilterLinkAllComponent.prototype, 'selectFilter');
    const { getByTestId } = await render(FilterLinkAllComponent, {
      componentProperties: { isSelected: false },
    });
    const link = getByTestId('filter-link-all');
    fireEvent.click(link);
    expect(selectFilterSpy).toHaveBeenCalledTimes(1);
  });
});