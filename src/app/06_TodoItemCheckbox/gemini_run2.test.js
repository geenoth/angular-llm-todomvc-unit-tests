// todo-item-checkbox.component.spec.ts
import { render, screen, fireEvent } from '@testing-library/angular';
import { TodoItemCheckboxComponent } from './todo-item-checkbox.component';

describe('TodoItemCheckboxComponent', () => {
  /**
   * Renders the component with optional initial properties.
   * @param {object} componentProperties - The properties to pass to the component.
   * @returns {Promise<object>} - The render result from @testing-library/angular.
   */
  const setup = async (componentProperties = {}) => {
    return render(TodoItemCheckboxComponent, {
      componentProperties,
    });
  };

  test('should create the component and render the checkbox', async () => {
    await setup();
    const checkbox = screen.getByTestId('todo-item-checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute('type', 'checkbox');
  });

  test('should be unchecked by default when isChecked is not provided', async () => {
    await setup();
    const checkbox = screen.getByTestId('todo-item-checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
  });

  test('should be unchecked when isChecked input is false', async () => {
    await setup({ isChecked: false });
    const checkbox = screen.getByTestId('todo-item-checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
  });

  test('should be checked when isChecked input is true', async () => {
    await setup({ isChecked: true });
    const checkbox = screen.getByTestId('todo-item-checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  test('should toggle from unchecked to checked on click', async () => {
    const { fixture } = await setup({ isChecked: false });
    const component = fixture.componentInstance;
    const checkbox = screen.getByTestId('todo-item-checkbox') as HTMLInputElement;

    // Verify initial state
    expect(checkbox.checked).toBe(false);
    expect(component.isChecked).toBe(false);

    // Perform click
    await fireEvent.click(checkbox);
    fixture.detectChanges();

    // Verify toggled state
    expect(checkbox.checked).toBe(true);
    expect(component.isChecked).toBe(true);
  });

  test('should toggle from checked to unchecked on click', async () => {
    const { fixture } = await setup({ isChecked: true });
    const component = fixture.componentInstance;
    const checkbox = screen.getByTestId('todo-item-checkbox') as HTMLInputElement;

    // Verify initial state
    expect(checkbox.checked).toBe(true);