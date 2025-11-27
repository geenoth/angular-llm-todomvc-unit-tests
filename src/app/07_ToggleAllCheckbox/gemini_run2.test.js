import { render, screen, fireEvent } from '@testing-library/angular';
import { ToggleAllCheckboxComponent } from './toggle-all-checkbox.component';

describe('ToggleAllCheckboxComponent', () => {
  // Test 1: Check if the component renders correctly with default props.
  test('should render the component with the checkbox unchecked by default', async () => {
    await render(ToggleAllCheckboxComponent);

    // Using data-testid to find the checkbox element
    const checkbox = screen.getByTestId('toggle-all-checkbox');
    const label = screen.getByText('Toggle All Input');

    expect(checkbox).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  // Test 2: Check if the component renders correctly with isChecked prop set to true.
  test('should render the checkbox as checked when isChecked input is true', async () => {
    await render(ToggleAllCheckboxComponent, {
      componentProperties: { isChecked: true },
    });

    const checkbox = screen.getByTestId('toggle-all-checkbox');
    expect(checkbox).toBeChecked();
  });

    // Test 3: Check if the component renders correctly with isChecked prop set to false.
    test('should render the checkbox as unchecked when isChecked input is false', async () => {
        await render(ToggleAllCheckboxComponent, {
          componentProperties: { isChecked: false },
        });

        const checkbox = screen.getByTestId('toggle-all-checkbox');
        expect(checkbox).not.toBeChecked();
      });


  // Test 4: Simulate a user click to toggle the checkbox state.
  test('should toggle the checkbox state on click', async () => {
    await render(ToggleAllCheckboxComponent);

    const checkbox = screen.getByTestId('toggle-all-checkbox');

    // Initially, it should be unchecked
    expect(checkbox).not.toBeChecked();

    // First click, should become checked
    await fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    // Second click, should become unchecked again
    await fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  // Test 5: Verify that the component's internal state (isChecked property) is updated.
  test('should update the isChecked property when the checkbox is toggled', async () => {
    const { fixture } = await render(ToggleAllCheckboxComponent);
    const componentInstance = fixture.componentInstance;
    const checkbox = screen.getByTestId('toggle-all-checkbox');

    // Initial state check
    expect(componentInstance.isChecked).toBe(false);

    // Simulate click and check component property
    await fireEvent.click(checkbox);
    fixture.detectChanges(); // Manually trigger change detection
    expect(componentInstance.isChecked).toBe(true);

    // Simulate another click and check property again
    await fireEvent.click(checkbox);
    fixture.detectChanges();
    expect(componentInstance.isChecked).toBe(false);
  });

  // Test 6: Verify the toggleAll method is called on the 'change' event.
  test('should call the toggleAll method on change event', async () => {
    const { fixture } = await render(ToggleAllCheckboxComponent);
    const componentInstance = fixture.componentInstance;
    const checkbox = screen.getByTestId('toggle-all-checkbox');

    // Spy on the toggleAll method
    const toggleAllSpy = jest.spyOn(componentInstance, 'toggleAll');

    // Trigger the change event
    await fireEvent.click(checkbox);

    // Expect the method to have been called once
    expect(toggleAllSpy).toHaveBeenCalledTimes(1);

    // Trigger it again
    await fireEvent.click(checkbox);
    expect(toggleAllSpy).toHaveBeenCalledTimes(2);

    // Clean up the spy
    toggleAllSpy.mockRestore();
  });
});