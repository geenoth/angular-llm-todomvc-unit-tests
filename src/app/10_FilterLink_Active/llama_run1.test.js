// filter-link-active.component.spec.ts
import { render, fireEvent, waitFor } from '@testing-library/angular';
import { FilterLinkActiveComponent } from './filter-link-active.component';

describe('FilterLinkActiveComponent', () => {
  it('renders correctly', async () => {
    const { getByTestId } = await render(FilterLinkActiveComponent, {
      componentProperties: { isSelected: false },
    });
    expect(getByTestId('filter-link-active')).toBeInTheDocument();
  });

  it('displays "Active" text', async () => {
    const { getByText } = await render(FilterLinkActiveComponent, {
      componentProperties: { isSelected: false },
    });
    expect(getByText('Active')).toBeInTheDocument();
  });

  it('adds "selected" class when isSelected is true', async () => {
    const { getByTestId } = await render(FilterLinkActiveComponent, {
      componentProperties: { isSelected: true },
    });
    expect(getByTestId('filter-link-active')).toHaveClass('selected');
  });

  it('calls selectFilter when clicked', async () => {
    const selectFilterSpy = jest.spyOn(FilterLinkActiveComponent.prototype, 'selectFilter');
    const { getByTestId } = await render(FilterLinkActiveComponent, {
      componentProperties: { isSelected: false },
    });
    const link = getByTestId('filter-link-active');
    fireEvent.click(link);
    expect(selectFilterSpy).toHaveBeenCalledTimes(1);
  });

  it('href attribute is correct', async () => {
    const { getByTestId } = await render(FilterLinkActiveComponent, {
      componentProperties: { isSelected: false },
    });
    const link = getByTestId('filter-link-active');
    expect(link.getAttribute('href')).toBe('#/active');
  });
});