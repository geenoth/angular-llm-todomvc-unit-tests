import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Todo, TodoListComponent } from './todo-list.component';
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
      declarations: [TodoListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the todos correctly', () => {
    component.todos = mockTodos;
    fixture.detectChanges();

    const todoListElement = fixture.debugElement.query(By.css('[data-testid="todo-list"]'));
    expect(todoListElement).toBeTruthy();

    const todoItems = fixture.debugElement.queryAll(By.css('.todo-list li'));
    expect(todoItems.length).toBe(mockTodos.length);

    expect(todoItems[0].nativeElement.textContent).toContain('Test Todo 1');
    expect(todoItems[1].nativeElement.textContent).toContain('Test Todo 2');
  });

  it('should call toggleTodo() and toggle the completed status of a todo', () => {
    component.todos = [...mockTodos];
    fixture.detectChanges();

    const checkbox = fixture.debugElement.queryAll(By.css('.toggle'))[0].nativeElement;
    checkbox.click();
    fixture.detectChanges();

    expect(component.todos[0].completed).toBe(true);
    expect(component.todos[1].completed).toBe(true); // Ensure other todos remain unaffected
  });

  it('should call removeTodo() and log the removed todo', () => {
    component.todos = [...mockTodos];
    fixture.detectChanges();

    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    const destroyButton = fixture.debugElement.queryAll(By.css('.destroy'))[0].nativeElement;
    destroyButton.click();
    fixture.detectChanges();

    expect(consoleLogSpy).toHaveBeenCalledWith('Removing todo:', mockTodos[0]);
    consoleLogSpy.mockRestore();
  });

  it('should not render the main element if the todos array is empty', () => {
    component.todos = [];
    fixture.detectChanges();

    const todoListElement = fixture.debugElement.query(By.css('[data-testid="todo-list"]'));
    expect(todoListElement).toBeNull();
  });
});