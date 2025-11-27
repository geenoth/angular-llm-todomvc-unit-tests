import { render, screen, fireEvent } from '@testing-library/angular';
import { Todo, TodoListComponent } from './todo-list.component';

describe('TodoListComponent', () => {
  const mockTodos: Todo[] = [
    { id: '1', title: 'Learn Angular', completed: false },
    { id: '2', title: 'Write Jest tests', completed: true },
    { id: '3', title: 'Deploy application', completed: false },
  ];

  test('should not render the list when todos array is empty', async () => {
    await render(TodoListComponent, {
      componentProperties: { todos: [] },
    });

    const todoList = screen.queryByTestId('todo-list');
    expect(todoList).not.toBeInTheDocument();
  });

  test('should render the list of todos correctly', async () => {
    await render(TodoListComponent, {
      componentProperties: { todos: mockTodos },
    });

    const todoList = screen.getByTestId('todo-list');
    expect(todoList).toBeInTheDocument();

    const todoItems = screen.getAllByRole('listitem');
    expect(todoItems).toHaveLength(mockTodos.length);

    expect(screen.getByText('Learn Angular')).toBeInTheDocument();
    expect(screen.getByText('Write Jest tests')).toBeInTheDocument();
    expect(screen.getByText('Deploy application')).toBeInTheDocument();
  });

  test('should apply the "completed" class to completed todos', async () => {
    await render(TodoListComponent, {
      componentProperties: { todos: mockTodos },
    });

    const completedTodo = screen.getByText('Write Jest tests').closest('li');
    const incompleteTodo = screen.getByText('Learn Angular').closest('li');

    expect(completedTodo).toHaveClass('completed');
    expect(incompleteTodo).not.toHaveClass('completed');
  });

  test('should have checkboxes checked for completed todos', async () => {
    await render(TodoListComponent, {
      componentProperties: { todos: mockTodos },
    });

    const completedCheckbox = screen
      .getByText('Write Jest tests')
      .previousElementSibling?.querySelector('input[type="checkbox"]');
    const incompleteCheckbox = screen
      .getByText('Learn Angular')
      .previousElementSibling?.querySelector('input[type="checkbox"]');

    expect(completedCheckbox).toBeChecked();
    expect(incompleteCheckbox).not.toBeChecked();
  });

  test('should call toggleTodo when a checkbox is clicked', async () => {
    const { fixture } = await render(TodoListComponent, {
      componentProperties: { todos: [...mockTodos] },
    });

    const componentInstance = fixture.componentInstance;
    const toggleTodoSpy = jest.spyOn(componentInstance, 'toggleTodo');
    const consoleLogSpy = jest.spyOn(console, 'log');

    const todoToToggle = mockTodos[0];
    const checkbox = screen
      .getByText(todoToToggle.title)
      .previousElementSibling?.querySelector('input[type="checkbox"]');

    expect(checkbox).not.toBeNull();
    if (checkbox) {
      await fireEvent.click(checkbox);
    }

    expect(toggleTodoSpy).toHaveBeenCalledWith(todoToToggle);
    expect(todoToToggle.completed).toBe(true);
    expect(consoleLogSpy).toHaveBeenCalledWith('Toggled todo:', todoToToggle);

    toggleTodoSpy.mockRestore();
    consoleLogSpy.mockRestore();
  });

  test('should call removeTodo when the destroy button is clicked', async () => {
    const { fixture } = await render(TodoListComponent, {
      componentProperties: { todos: mockTodos },
    });

    const componentInstance = fixture.componentInstance;
    const removeTodoSpy = jest.spyOn(componentInstance, 'removeTodo');
    const consoleLogSpy = jest.spyOn(console, 'log');


    const todoToRemove = mockTodos[1];
    const destroyButton = screen
      .getByText(todoToRemove.title)
      .nextElementSibling;

    expect(destroyButton).not.toBeNull();
    if (destroyButton) {
      await fireEvent.click(destroyButton);
    }

    expect(removeTodoSpy).toHaveBeenCalledWith(todoToRemove);
    expect(consoleLogSpy).toHaveBeenCalledWith('Removing todo:', todoToRemove);

    removeTodoSpy.mockRestore();
    consoleLogSpy.mockRestore();
  });

  test('should update the component view when todo state changes', async () => {
    const todos: Todo[] = [{ id: '1', title: 'Test reactivity', completed: false }];
    const { fixture } = await render(TodoListComponent, {
      componentProperties: { todos },
    });

    const todoItem = screen.getByText('Test reactivity').closest('li');
    const checkbox = screen.getByRole('checkbox');

    expect(todoItem).not.toHaveClass('completed');
    expect(checkbox).not.toBeChecked();

    // Simulate the toggle
    await fireEvent.click(checkbox);
    fixture.detectChanges(); // Manually trigger change detection

    expect(todoItem).toHaveClass('completed');
    expect(checkbox).toBeChecked();
  });
});