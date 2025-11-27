import { render, screen, fireEvent } from '@testing-library/angular';
import { Todo, TodoListComponent } from './todo-list.component';

describe('TodoListComponent', () => {
  const mockTodos: Todo[] = [
    { id: '1', title: 'Learn Jest', completed: false },
    { id: '2', title: 'Learn Testing Library', completed: true },
    { id: '3', title: 'Build an app', completed: false },
  ];

  test('should not render the todo list when todos array is empty', async () => {
    await render(TodoListComponent, {
      componentProperties: { todos: [] },
    });

    const list = screen.queryByTestId('todo-list');
    expect(list).not.toBeInTheDocument();
  });

  test('should render the todo list when todos array is not empty', async () => {
    await render(TodoListComponent, {
      componentProperties: { todos: mockTodos },
    });

    const list = screen.getByTestId('todo-list');
    const listItems = screen.getAllByRole('listitem');

    expect(list).toBeInTheDocument();
    expect(listItems).toHaveLength(mockTodos.length);
  });

  test('should render todo titles correctly', async () => {
    await render(TodoListComponent, {
      componentProperties: { todos: mockTodos },
    });

    expect(screen.getByText('Learn Jest')).toBeInTheDocument();
    expect(screen.getByText('Learn Testing Library')).toBeInTheDocument();
    expect(screen.getByText('Build an app')).toBeInTheDocument();
  });

  test('should correctly set the completed class on list items', async () => {
    await render(TodoListComponent, {
      componentProperties: { todos: mockTodos },
    });

    const todo1 = screen.getByText('Learn Jest').closest('li');
    const todo2 = screen.getByText('Learn Testing Library').closest('li');

    expect(todo1).not.toHaveClass('completed');
    expect(todo2).toHaveClass('completed');
  });

  test('should correctly set the checked state of checkboxes', async () => {
    await render(TodoListComponent, {
      componentProperties: { todos: mockTodos },
    });

    const checkbox1 = screen.getAllByRole('checkbox')[0] as HTMLInputElement;
    const checkbox2 = screen.getAllByRole('checkbox')[1] as HTMLInputElement;

    expect(checkbox1.checked).toBe(false);
    expect(checkbox2.checked).toBe(true);
  });

  test('should call toggleTodo when a checkbox is clicked', async () => {
    const { fixture } = await render(TodoListComponent, {
      componentProperties: { todos: [...mockTodos] },
    });
    const componentInstance = fixture.componentInstance;

    // Spy on the method and console.log
    const toggleTodoSpy = jest.spyOn(componentInstance, 'toggleTodo');
    const consoleLogSpy = jest.spyOn(console, 'log');

    const firstTodoCheckbox = screen.getAllByRole('checkbox')[0];
    await fireEvent.click(firstTodoCheckbox);

    // Check if the component method was called with the correct argument
    expect(toggleTodoSpy).toHaveBeenCalledWith(mockTodos[0]);
    expect(toggleTodoSpy).toHaveBeenCalledTimes(1);

    // Check the console log output from the method
    expect(consoleLogSpy).toHaveBeenCalledWith('Toggled todo:', {
      ...mockTodos[0],
      completed: true, // It should be toggled
    });

    toggleTodoSpy.mockRestore();
    consoleLogSpy.mockRestore();
  });

  test('should update the completed state when toggleTodo is called', async () => {
    const { fixture } = await render(TodoListComponent, {
      componentProperties: { todos: [...mockTodos] },
    });

    const componentInstance = fixture.componentInstance;
    const firstTodo = componentInstance.todos[0];
    expect(firstTodo.completed).toBe(false);

    // Call the method directly to test its logic
    componentInstance.toggleTodo(firstTodo);
    fixture.detectChanges(); // Manually trigger change detection

    expect(firstTodo.completed).toBe(true);

    const firstListItem = screen.getByText('Learn Jest').closest('li');
    expect(firstListItem).toHaveClass('completed');
  });

  test('should call removeTodo when the destroy button is clicked', async () => {
    const { fixture } = await render(TodoListComponent, {
      componentProperties: { todos: mockTodos },
    });
    const componentInstance = fixture.componentInstance;

    // Spy on the method and console.log
    const removeTodoSpy = jest.spyOn(componentInstance, 'removeTodo');
    const consoleLogSpy = jest.spyOn(console, 'log');

    const destroyButtons = screen.getAllByRole('button', { name: '' });
    const secondDestroyButton = destroyButtons[1]; // for "Learn Testing Library"

    await fireEvent.click(secondDestroyButton);

    // Check if the component method was called with the correct argument
    expect(removeTodoSpy).toHaveBeenCalledWith(mockTodos[1]);
    expect(removeTodoSpy).toHaveBeenCalledTimes(1);

    // Check the console log output from the method
    expect(consoleLogSpy).toHaveBeenCalledWith('Removing todo:', mockTodos[1]);

    removeTodoSpy.mockRestore();
    consoleLogSpy.mockRestore();
  });
});