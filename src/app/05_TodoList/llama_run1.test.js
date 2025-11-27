import { render, fireEvent } from '@angular/core/testing';
import { TodoListComponent } from './todo-list.component';

describe('TodoListComponent', () => {
  it('should render the todo list when todos are provided', async () => {
    const todos: Todo[] = [
      { id: '1', title: 'Todo 1', completed: false },
      { id: '2', title: 'Todo 2', completed: true },
    ];
    await render(TodoListComponent, {
      componentProperties: {
        todos,
      },
    });
    expect(screen.getByTestId('todo-list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it('should not render the todo list when todos are empty', async () => {
    await render(TodoListComponent, {
      componentProperties: {
        todos: [],
      },
    });
    expect(screen.queryByTestId('todo-list')).not.toBeInTheDocument();
  });

  it('should call the removeTodo function when the destroy button is clicked', async () => {
    const todos: Todo[] = [
      { id: '1', title: 'Todo 1', completed: false },
      { id: '2', title: 'Todo 2', completed: true },
    ];
    await render(TodoListComponent, {
      componentProperties: {
        todos,
      },
    });
    const destroyButton = screen.getAllByRole('button')[0];
    fireEvent.click(destroyButton);
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith('Removing todo:', todos[0]);
  });

  it('should call the toggleTodo function when the toggle button is clicked', async () => {
    const todos: Todo[] = [
      { id: '1', title: 'Todo 1', completed: false },
      { id: '2', title: 'Todo 2', completed: true },
    ];
    await render(TodoListComponent, {
      componentProperties: {
        todos,
      },
    });
    const toggleButton = screen.getAllByRole('checkbox')[0];
    fireEvent.click(toggleButton);
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith('Toggled todo:', todos[0]);
  });
});