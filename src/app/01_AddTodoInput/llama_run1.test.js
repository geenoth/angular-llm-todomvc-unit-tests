import '@angular/core/testing';
import { render, fireEvent, waitFor } from '@testing-library/angular';
import { AddTodoInputComponent } from './add-todo-input.component';

describe('AddTodoInputComponent', () => {
  it('should render correctly', async () => {
    const { getByText } = await render(AddTodoInputComponent);
    expect(getByText('todos')).toBeInTheDocument();
  });

  it('should update title on input', async () => {
    const { getByTestId } = await render(AddTodoInputComponent);
    const inputElement = getByTestId('add-todo-input');
    fireEvent.input(inputElement, { target: { value: 'New todo' } });
    expect(inputElement.value).toBe('New todo');
  });

  it('should call addTodo on enter key press', async () => {
    const addTodoSpy = jest.spyOn(AddTodoInputComponent.prototype, 'addTodo');
    const { getByTestId } = await render(AddTodoInputComponent);
    const inputElement = getByTestId('add-todo-input');
    fireEvent.input(inputElement, { target: { value: 'New todo' } });
    fireEvent.keyPress(inputElement, { key: 'Enter', code: 13 });
    expect(addTodoSpy).toHaveBeenCalledTimes(1);
    addTodoSpy.mockRestore();
  });

  it('should clear input field after adding todo', async () => {
    const { getByTestId } = await render(AddTodoInputComponent);
    const inputElement = getByTestId('add-todo-input');
    fireEvent.input(inputElement, { target: { value: 'New todo' } });
    fireEvent.keyPress(inputElement, { key: 'Enter', code: 13 });
    await waitFor(() => expect(inputElement.value).toBe(''));
  });
});