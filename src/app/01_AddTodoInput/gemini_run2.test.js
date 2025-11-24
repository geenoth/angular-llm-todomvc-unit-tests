import { render, screen, fireEvent } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { AddTodoInputComponent } from './add-todo-input.component';

// Mock the FormsModule that the component imports
// This is often needed when using standalone components in Jest tests
// to ensure ngModel works correctly. `render` from @testing-library/angular
// usually handles this, but explicit imports can be clearer.
import { FormsModule } from '@angular/forms';
import { TestBed } from '@angular/core/testing';

describe('AddTodoInputComponent', () => {
  // Helper function to render the component for each test
  const setup = async () => {
    return render(AddTodoInputComponent, {
      imports: [FormsModule], // Ensure FormsModule is available for [(ngModel)]
    });
  };

  test('should create and render the component correctly', async () => {
    await setup();

    // 1. Check for the main heading
    expect(screen.getByText('todos')).toBeInTheDocument();

    // 2. Check for the input field using its placeholder
    expect(screen.getByPlaceholderText('What needs to be done?')).toBeInTheDocument();

    // 3. Use data-testid to ensure the input is present and initially empty
    const inputElement = screen.getByTestId('add-todo-input');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement.value).toBe('');
  });

  test('should update component state `title` when user types in the input', async () => {
    const { fixture } = await setup();
    const componentInstance = fixture.componentInstance;
    const inputElement = screen.getByTestId('add-todo-input');

    // Simulate user typing
    await userEvent.type(inputElement, 'New Todo Item');

    // Assert that both the input's value and the component's property are updated
    expect(inputElement.value).toBe('New Todo Item');
    expect(componentInstance.title).toBe('New Todo Item');
  });

  test('should call addTodo() and clear the input when user types and presses Enter', async () => {
    const { fixture } = await setup();
    const componentInstance = fixture.componentInstance;

    // Spy on the component's addTodo method to verify it's called
    const addTodoSpy = jest.spyOn(componentInstance, 'addTodo');

    // Spy on console.log to verify the output
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    const inputElement = screen.getByTestId('add-todo-input');

    // 1. Simulate typing a todo title
    await userEvent.type(inputElement, 'Finish Jest tests');
    expect(inputElement.value).toBe('Finish Jest tests');

    // 2. Simulate pressing the "Enter" key
    await fireEvent.keyUp(inputElement, { key: 'Enter', code: 'Enter' });

    // 3. Assert that the addTodo method was called
    expect(addTodoSpy).toHaveBeenCalledTimes(1);

    // 4. Assert that the todo was logged to the console
    expect(consoleLogSpy).toHaveBeenCalledWith('Todo added:', 'Finish Jest tests');

    // 5. Assert that the input field and component state are cleared
    expect(inputElement.value).toBe('');
    expect(componentInstance.title).toBe('');

    // Cleanup spy
    consoleLogSpy.mockRestore();
  });

  test('should NOT add a todo if the input is empty when Enter is pressed', async () => {
    const { fixture } = await setup();
    const componentInstance = fixture.componentInstance;
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const addTodoSpy = jest.spyOn(componentInstance, 'addTodo');

    const inputElement = screen.getByTestId('add-todo-input') ;

    // Ensure input is empty
    expect(inputElement.value).toBe('');

    // Simulate pressing Enter on an empty input
    await fireEvent.keyUp(inputElement, { key: 'Enter', code: 'Enter' });

    // The addTodo method is still called due to the event binding
    expect(addTodoSpy).toHaveBeenCalledTimes(1);

    // But the internal logic should prevent console.log from being called
    expect(consoleLogSpy).not.toHaveBeenCalled();

    // And the input should remain empty
    expect(inputElement.value).toBe('');
    expect(componentInstance.title).toBe('');

    consoleLogSpy.mockRestore();
  });

  test('should NOT add a todo if the input contains only whitespace', async () => {
    const { fixture } = await setup();
    const componentInstance = fixture.componentInstance;
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    const inputElement = screen.getByTestId('add-todo-input');

    // 1. Simulate user typing only spaces
    const whitespaceInput = '   ';
    await userEvent.type(inputElement, whitespaceInput);
    expect(inputElement.value).toBe(whitespaceInput);

    // 2. Simulate pressing Enter
    await fireEvent.keyUp(inputElement, { key: 'Enter', code: 'Enter' });

    // 3. Assert that no todo was logged
    expect(consoleLogSpy).not.toHaveBeenCalled();

    // 4. Assert that the input value remains unchanged because the `if` condition was false
    // and `this.title = ''` was never executed.
    expect(inputElement.value).toBe(whitespaceInput);
    expect(componentInstance.title).toBe(whitespaceInput);

    consoleLogSpy.mockRestore();
  });
});