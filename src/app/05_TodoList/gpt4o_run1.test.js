import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoListComponent, Todo } from './todo-list.component';
import { By } from '@angular/platform-browser';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  const mockTodos: Todo[] = [
    { id: '1', title: 'Test Todo 1', completed: false },
    { id: '2', title: 'Test Todo 2', completed: true },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render todo list when there are todos', () => {
    component.todos = mockTodos;
    fixture.detectChanges();

    const todoList = fixture.debugElement.query(By.css('[data-testid="todo-list"]'));
    expect(todoList).toBeTruthy();
    const todoItems = todoList.queryAll(By.css('li'));
    expect(todoItems.length).toBe(mockTodos.length);
    expect(todoItems[0].nativeElement.textContent).toContain('Test Todo 1');
    expect(todoItems[1].nativeElement.textContent).toContain('Test Todo 2');
  });

  it('should not render todo list when there are no todos', () => {
    component.todos = [];
    fixture.detectChanges();

    const todoList = fixture.debugElement.query(By.css('[data-testid="todo-list"]'));
    expect(todoList).toBeNull();
  });

  it('should toggle the completed state of a todo when the toggle checkbox is clicked', () => {
    component.todos = [...mockTodos];
    fixture.detectChanges();

    jest.spyOn(component, 'toggleTodo');
    const firstTodoToggle = fixture.debugElement.query(By.css('.todo-list li:first-child .toggle'));
    firstTodoToggle.nativeElement.click();

    expect(component.toggleTodo).toHaveBeenCalledWith(mockTodos[0]);
    expect(component.todos[0].completed).toBe(true);
  });

  it('should call removeTodo when the destroy button is clicked', () => {
    component.todos = [...mockTodos];
    fixture.detectChanges();

    jest.spyOn(component, 'removeTodo');
    const firstTodoDestroyButton = fixture.debugElement.query(By.css('.todo-list li:first-child .destroy'));
    firstTodoDestroyButton.nativeElement.click();

    expect(component.removeTodo).toHaveBeenCalledWith(mockTodos[0]);
  });

  it('should log "Removing todo:" with the correct data when removeTodo is called', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    const todoToRemove = mockTodos[0];
    component.removeTodo(todoToRemove);

    expect(consoleSpy).toHaveBeenCalledWith('Removing todo:', todoToRemove);
    consoleSpy.mockRestore();
  });

  it('should log "Toggled todo:" with the correct data when toggleTodo is called', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    const todoToToggle = mockTodos[0];
    component.toggleTodo(todoToToggle);

    expect(todoToToggle.completed).toBe(true);
    expect(consoleSpy).toHaveBeenCalledWith('Toggled todo:', todoToToggle);
    consoleSpy.mockRestore();
  });
});