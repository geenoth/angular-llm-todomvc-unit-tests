import { render, screen, fireEvent } from '@testing-library/angular';
import { ToggleAllCheckboxComponent } from './toggle-all-checkbox.component';
import '@testing-library/jest-dom';

describe('ToggleAllCheckboxComponent', () => {
  /**
   * Helper function to render the component with specific properties.
   * @param props - Component properties to set.
   * @returns The testing library render result.
   */
  const setup = async (props: Partial<ToggleAllCheckboxComponent> = {}) => {
    return render(ToggleAllCheckboxComponent, {
      componentProperties: props,
    });
  };

  test('should render the component and its elements correctly', async () => {
    await setup();

    // Check for the checkbox using data-testid
    const checkbox = screen.getByTestId('toggle-all-checkbox');
    expect(checkbox).toBeInTheDocument();

    // Check for the label associated with the checkbox
    const label = screen.getByText('Toggle All Input');
    expect(label).toBeInTheDocument();
  });

  test('should be unchecked by default when isChecked is not provided', async () => {
    await setup();
    const checkbox: HTMLInputElement = screen.getByTestId('toggle-all-checkbox');
    expect(checkbox.checked).toBe(false);
  });

  test('should be unchecked when isChecked input is false', async () => {
    await setup({ isChecked: false });
    const checkbox: HTMLInputElement = screen.getByTestId('toggle-all-checkbox');
    expect(checkbox.checked).toBe(false);
  });

  test('should be checked when isChecked input is true', async () => {
    await setup({ isChecked: true });
    const checkbox: HTMLInputElement = screen.getByTestId('toggle-all-checkbox');
    expect(checkbox.checked).toBe(true);
  });

  test('should toggle from unchecked to checked when clicked', async () => {
    const { fixture } = await setup({ isChecked: false });
    const checkbox: HTMLInputElement = screen.getByTestId('toggle-all-checkbox');
    const componentInstance = fixture.componentInstance;

    expect(checkbox.checked).toBe(false);
    expect(componentInstance.isChecked).toBe(false);

    // Simulate a user click
    await fireEvent.click(checkbox);
    fixture.detectChanges();

    expect(checkbox.checked).toBe(true);
    expect(componentInstance.isChecked).toBe(true);
  });

  test('should toggle from checked to unchecked when clicked', async () => {
    const { fixture } = await setup({ isChecked: true });
    const checkbox: HTMLInputElement = screen.getByTestId('toggle-all-checkbox');
    const componentInstance = fixture.componentInstance;

    expect(checkbox.checked).toBe(true);
    expect(componentInstance.isChecked).toBe(true);

    // Simulate a user click
    await fireEvent.click(checkbox);
    fixture.detectChanges();

    expect(checkbox.checked).toBe(false);
    expect(componentInstance.isChecked).toBe(false);
  });

  test('should call toggleAll() method and log to console on change', async () => {
    const { fixture } = await setup({ isChecked: false });
    const componentInstance = fixture.componentInstance;
    const checkbox = screen.getByTestId('toggle-all-checkbox');

    // Spy on the component method and console.log
    const toggleAllSpy = jest.spyOn(componentInstance, 'toggleAll');
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

    await fireEvent.click(checkbox);

    expect(toggleAllSpy).toHaveBeenCalledTimes(1);
    expect(consoleLogSpy).toHaveBeenCalledWith('Toggle all:', true);

    // Click again to test the other state
    await fireEvent.click(checkbox);
    expect(toggleAllSpy).toHaveBeenCalledTimes(2);
    expect(consoleLogSpy).toHaveBeenCalledWith('Toggle all:', false);

    // Clean up spies
    toggleAllSpy.mockRestore();
    consoleLogSpy.mockRestore();
  });

  test('should reflect changes when isChecked input property is updated dynamically', async () => {
    const { fixture } = await setup({ isChecked: false });
    const checkbox: HTMLInputElement = screen.getByTestId('toggle-all-checkbox');

    // Check initial state
    expect(checkbox.checked).toBe(false);

    // Update the component's input property
    fixture.componentInstance.isChecked = true;
    fixture.detectChanges();

    // Check if the DOM has updated
    expect(checkbox.checked).toBe(true);

    // Update the property back to false
    fixture.componentInstance.isChecked = false;
    fixture.detectChanges();

    // Check if the DOM has updated again
    expect(checkbox.checked).toBe(false);
  });
});