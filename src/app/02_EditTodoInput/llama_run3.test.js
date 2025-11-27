import { render, fireEvent, waitFor } from '@angular/core/testing';
import { EditTodoInputComponent } from './edit-todo-input.component';

describe('EditTodoInputComponent', () => {
  beforeEach(async () => {
    await render(EditTodoInputComponent, {
      componentProperties: {
        initialValue: 'Initial todo title',
      },
    });
  });

  it('should render the component correctly', () => {
    expect(screen.getByTestId('edit-todo-input')).toBeInTheDocument();
  });

  it('should display the initial value', () => {
    expect(screen.getByTestId('edit-todo-input')).toHaveValue('Initial todo title');
  });

  it('should update the todo title on blur', async () => {
    const inputElement = screen.getByTestId('edit-todo-input');
    inputElement.value = 'New todo title';
    fireEvent.blur(inputElement);
    await waitFor(() => expect(console.log).toHaveBeenCalledTimes(1));
    expect(console.log).toHaveBeenCalledWith('Edit finished');
  });

  it('should update the todo title on enter press', async () => {
    const inputElement = screen.getByTestId('edit-todo-input');
    inputElement.value = 'New todo title';
    fireEvent.keyPress(inputElement, { key: 'Enter' });
    await waitFor(() => expect(console.log).toHaveBeenCalledTimes(1));
    expect(console.log).toHaveBeenCalledWith('Todo updated:', 'New todo title');
  });

  it('should not update the todo title if input is empty', async () => {
    const inputElement = screen.getByTestId('edit-todo-input');
    inputElement.value = '';
    fireEvent.keyPress(inputElement, { key: 'Enter' });
    await waitFor(() => expect(console.log).not.toHaveBeenCalled());
  });

  it('should update the component state on input change', async () => {
    const inputElement = screen.getByTestId('edit-todo-input');
    inputElement.value = 'New todo title';
    fireEvent.input(inputElement);
    expect(inputElement.value).toBe('New todo title');
  });

  it('should pass the initial value to the component', async () => {
    const { componentInstance } = await render(EditTodoInputComponent, {
      componentProperties: {
        initialValue: 'Initial todo title',
      },
    });
    expect(componentInstance.editTitle).toBe('Initial todo title');
  });
});