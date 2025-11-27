import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { EditTodoInputComponent } from './edit-todo-input.component';
import { FormsModule } from '@angular/forms';

describe('EditTodoInputComponent', () => {
  // Common setup function to render the component with specific inputs
  const setup = async (initialValue) => {
    return render(EditTodoInputComponent, {
      imports: [FormsModule],
      componentProperties: { initialValue },
    });
  };

  test('should create and render the input with the initial value', async () => {
    const initialText = 'My first todo';
    await setup(initialText);

    const inputElement = screen.getByTestId('edit-todo-input');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue(initialText);
  });

  test('ngOnInit should correctly initialize editTitle from the initialValue @Input', async () => {
    const { fixture } = await setup('Learn Angular');
    const componentInstance = fixture.componentInstance;

    // ngOnInit is called during component initialization by render()
    expect(componentInstance.editTitle).toBe('Learn Angular');
  });

  test('should update internal state (editTitle) when user types in the input', async () => {
    const { fixture } = await setup('Initial');
    const componentInstance = fixture.componentInstance;
    const inputElement = screen.getByTestId('edit-todo-input');
    const newText = 'Updated Text';

    await userEvent.clear(inputElement);
    await userEvent.type(inputElement, newText);

    expect(inputElement).toHaveValue(newText);
    expect(componentInstance.editTitle).toBe(newText);
  });

  test('should call updateTodo() on Enter keypress if input is not empty', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    await setup('A valid todo');
    const inputElement = screen.getByTestId('edit-todo-input');

    await userEvent.type(inputElement, '{enter}');

    expect(consoleSpy).toHaveBeenCalledWith('Todo updated:', 'A valid todo');
    consoleSpy.mockRestore();
  });

  test('should not call updateTodo() on Enter keypress if input is empty', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    await setup('Will be cleared');
    const inputElement = screen.getByTestId('edit-todo-input');

    await userEvent.clear(inputElement);
    await userEvent.type(inputElement, '{enter}');

    expect(consoleSpy).not.toHaveBeenCalledWith(expect.stringContaining('Todo updated:'));
    consoleSpy.mockRestore();
  });

  test('should not call updateTodo() on Enter keypress if input contains only whitespace', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    await setup('Will be cleared');
    const inputElement = screen.getByTestId('edit-todo-input');

    await userEvent.clear(inputElement);
    await userEvent.type(inputElement, '   '); // Typing only spaces
    await userEvent.type(inputElement, '{enter}');

    expect(consoleSpy).not.toHaveBeenCalledWith(expect.stringContaining('Todo updated:'));
    consoleSpy.mockRestore();
  });

  test('should call handleBlur() when the input loses focus', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    await setup();
    const inputElement = screen.getByTestId('edit-todo-input');

    // Focus and then blur the element
    inputElement.focus();
    inputElement.blur();

    expect(consoleSpy).toHaveBeenCalledWith('Edit finished');
    consoleSpy.mockRestore();
  });

  test('should handle user interaction flow: type, enter, blur', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    await setup('Original');
    const inputElement = screen.getByTestId('edit-todo-input');

    // 1. User types a new value
    await userEvent.clear(inputElement);
    await userEvent.type(inputElement, 'New Value');

    // 2. User presses Enter
    await userEvent.type(inputElement, '{enter}');
    expect(consoleSpy).toHaveBeenCalledWith('Todo updated:', 'New Value');

    // 3. User blurs the input
    inputElement.blur();
    expect(consoleSpy).toHaveBeenCalledWith('Edit finished');

    // Ensure spies are called the correct number of times
    expect(consoleSpy).toHaveBeenCalledTimes(2);
    consoleSpy.mockRestore();
  });
});