import { render, fireEvent, waitFor } from '@testing-library/angular';
import { screen } from '@testing-library/dom';
import { AddTodoInputComponent } from './add-todo-input.component';

describe('AddTodoInputComponent', () => {
  it('renders correctly', async () => {
    await render(AddTodoInputComponent);
    expect(screen.getByText('todos')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('What needs to be done?')).toBeInTheDocument();
  });

  it('calls addTodo when enter key is pressed', async () => {
    await render(AddTodoInputComponent);
    const input = screen.getByTestId('add-todo-input');
    fireEvent.input(input, { target: { value: 'new todo' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith('Todo added:', 'new todo');
  });

  it('clears input value after adding todo', async () => {
    await render(AddTodoInputComponent);
    const input = screen.getByTestId('add-todo-input');
    fireEvent.input(input, { target: { value: 'new todo' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    await waitFor(() => expect(input.value).toBe(''));
  });

  it('does not call addTodo when input value is empty', async () => {
    await render(AddTodoInputComponent);
    const input = screen.getByTestId('add-todo-input');
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(console.log).not.toHaveBeenCalled();
  });
});