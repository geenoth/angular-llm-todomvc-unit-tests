import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TodoListComponent, Todo } from './todo-list.component';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let mockTodos: Todo[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;

    mockTodos = [
      { id: '1', title: 'Test Todo 1', completed: false },
      { id: '2', title: 'Test Todo 2', completed: true },
      { id: '3', title: 'Test Todo 3', completed: false },
    ];
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should not render the list if todos array is empty', () => {
    component.todos = [];
    fixture.detectChanges();
    const listElement = fixture.debugElement.query(By.css('[data-testid="todo-list"]'));
    expect(listElement).toBeNull();
  });

  it('should render a list of todos', () => {
    component.todos = mockTodos;
    fixture.detectChanges();
    const listItems = fixture.debugElement.queryAll(By.css('li'));
    expect(listItems.length).toBe(3);
  });

  it('should display the correct title for each todo', () => {
    component.todos = mockTodos;
    fixture.detectChanges();
    const labelElements = fixture.debugElement.queryAll(By.css('li label'));
    expect(labelElements.length).toBe(3);
    expect(labelElements[0].nativeElement.textContent).toBe('Test Todo 1');
    expect(labelElements[1].nativeElement.textContent).toBe('Test Todo 2');
    expect(labelElements[2].nativeElement.textContent).toBe('Test Todo 3');
  });

  it('should apply the "completed" class to completed todos', () => {
    component.todos = mockTodos;
    fixture.detectChanges();
    const listItemElements = fixture.debugElement.queryAll(By.css('li'));
    expect(listItemElements[0].nativeElement.classList.contains('completed')).toBe(false);
    expect(listItemElements[1].nativeElement.classList.contains('completed')).toBe(true);
    expect(listItemElements[2].nativeElement.classList.contains('completed')).toBe(false);
  });

  it('should set the checkbox state based on todo.completed status', () => {
    component.todos = mockTodos;
    fixture.detectChanges();
    const checkboxElements = fixture.debugElement.queryAll(By.css('input.toggle'));
    expect(checkboxElements[0].nativeElement.checked).toBe(false);
    expect(checkboxElements[1].nativeElement.checked).toBe(true);
    expect(checkboxElements[2].nativeElement.checked).toBe(false);
  });

  it('should call toggleTodo when a checkbox is clicked', () => {
    jest.spyOn(component, 'toggleTodo');
    component.todos = mockTodos;
    fixture.detectChanges();

    const checkboxElement = fixture.debugElement.query(By.css('li:first-child input.toggle'));
    checkboxElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.toggleTodo).toHaveBeenCalledWith(mockTodos[0]);
  });

  it('should toggle the completed status of a todo', () => {
    component.todos = [
        { title: 'Incomplete Todo', completed: false }
    ];
    fixture.detectChanges();

    const todo = component.todos[0];
    expect(todo.completed).toBe(false);

    component.toggleTodo(todo);
    fixture.detectChanges();

    expect(todo.completed).toBe(true);
    const listItem = fixture.debugElement.query(By.css('li'));
    expect(listItem.nativeElement.classList.contains('completed')).toBe(true);
  });

  it('should call removeTodo when the destroy button is clicked', () => {
    jest.spyOn(component, 'removeTodo');
    component.todos = mockTodos;
    fixture.detectChanges();

    const destroyButton = fixture.debugElement.query(By.css('li:first-child button.destroy'));
    destroyButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.removeTodo).toHaveBeenCalledWith(mockTodos[0]);
  });
  
  it('should log to console when removeTodo is called', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const todoToRemove = mockTodos[1];
    component.removeTodo(todoToRemove);
    expect(consoleSpy).toHaveBeenCalledWith('Removing todo:', todoToRemove);
  });

  it('should log to console when toggleTodo is called', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const todoToToggle = mockTodos[0];
    component.toggleTodo(todoToToggle);
    expect(consoleSpy).toHaveBeenCalledWith('Toggled todo:', todoToToggle);
  });

  it('should re-render when the todos input property changes', () => {
    component.todos = [
        { title: 'Initial Todo', completed: false }
    ];
    fixture.detectChanges();
    let listItems = fixture.debugElement.queryAll(By.css('li'));
    expect(listItems.length).toBe(1);
    expect(listItems[0].nativeElement.textContent).toContain('Initial Todo');

    const newTodos = [
        { title: 'New Todo 1', completed: false },
        { title: 'New Todo 2', completed: true }
    ];
    component.todos = newTodos;
    fixture.detectChanges();

    listItems = fixture.debugElement.queryAll(By.css('li'));
    expect(listItems.length).toBe(2);
    expect(listItems[0].nativeElement.textContent).toContain('New Todo 1');
    expect(listItems[1].nativeElement.textContent).toContain('New Todo 2');
    expect(listItems[1].nativeElement.classList.contains('completed')).toBe(true);
  });
});