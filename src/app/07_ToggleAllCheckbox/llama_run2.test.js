import { render, fireEvent } from '@angular/core/testing';
import { ToggleAllCheckboxComponent } from './toggle-all-checkbox.component';

describe('ToggleAllCheckboxComponent', () => {
  beforeEach(async () => {
    await render(ToggleAllCheckboxComponent, {
      componentProperties: {
        isChecked: false,
      },
    });
  });

  it('should render the toggle all checkbox correctly', () => {
    expect(screen.getByTestId('toggle-all-checkbox')).toBeInTheDocument();
    expect(screen.getByTestId('toggle-all-checkbox')).not.toBeChecked();
  });

  it('should render the toggle all checkbox as checked when isChecked is true', async () => {
    await render(ToggleAllCheckboxComponent, {
      componentProperties: {
        isChecked: true,
      },
    });
    expect(screen.getByTestId('toggle-all-checkbox')).toBeChecked();
  });

  it('should toggle the checkbox when changed', () => {
    const checkbox = screen.getByTestId('toggle-all-checkbox');
    fireEvent.change(checkbox, { target: { checked: true } });
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith('Toggle all:', true);
    expect(checkbox).toBeChecked();
  });

  it('should toggle the checkbox state when the toggleAll function is called', () => {
    const { componentInstance } = render(ToggleAllCheckboxComponent);
    componentInstance.toggleAll();
    expect(componentInstance.isChecked).toBe(true);
  });
});