import { render, screen, fireEvent } from '@testing-library/angular';
import '@testing-library/jest-dom';
import { AddTodoInputComponent } from './add-todo-input.component';

describe('AddTodoInputComponent', () => {
  test('renders correctly with placeholder', async () => {
    await render(AddTodoInputComponent);

    const inputElement = screen.getByTestId('add-todo-input');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('placeholder', 'What needs to be done?');
    expect(inputElement).toHaveClass('new-todo');
  });

  test('binds input value with [(ngModel)]', async () => {
    const { fixture } = await render(AddTodoInputComponent);
    const inputElement = screen.getByTestId('add-todo-input');

    fireEvent.input(inputElement, { target: { value: 'New Task' } });
    expect(fixture.componentInstance.title).toBe('New Task');
  });

  test('does not call addTodo() if input is empty', async () => {
    const { fixture } = await render(AddTodoInputComponent);
    const inputElement = screen.getByTestId('add-todo-input');
    jest.spyOn(console, 'log');

    fireEvent.input(inputElement, { target: { value: '' } });
    fireEvent.keyUp(inputElement, { key: 'Enter', code: 'Enter' });

    expect(console.log).not.toHaveBeenCalled();
    expect(fixture.componentInstance.title).toBe('');
  });

  test('calls addTodo() and clears input when Enter key is pressed', async () => {
    const { fixture } = await render(AddTodoInputComponent);
    const inputElement = screen.getByTestId('add-todo-input');
    jest.spyOn(console, 'log');

    fireEvent.input(inputElement, { target: { value: 'New Task' } });
    fireEvent.keyUp(inputElement, { key: 'Enter', code: 'Enter' });

    expect(console.log).toHaveBeenCalledWith('Todo added:', 'New Task');
    expect(fixture.componentInstance.title).toBe('');
    expect(inputElement.value).toBe('');
  });

  test('trims input value before adding todo', async () => {
    const { fixture } = await render(AddTodoInputComponent);
    const inputElement = screen.getByTestId('add-todo-input');
    jest.spyOn(console, 'log');

    fireEvent.input(inputElement, { target: { value: '   Extra Spaces   ' } });
    fireEvent.keyUp(inputElement, { key: 'Enter', code: 'Enter' });

    expect(console.log).toHaveBeenCalledWith('Todo added:', 'Extra Spaces');
    expect(fixture.componentInstance.title).toBe('');
    expect(inputElement.value).toBe('');
  });
});