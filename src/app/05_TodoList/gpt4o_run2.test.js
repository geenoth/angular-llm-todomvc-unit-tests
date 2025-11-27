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
      declarations: [TodoListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the todo list when todos are provided', () => {
    component.todos = [...mockTodos];
    fixture.detectChanges();

    const todoListElement = fixture.debugElement.query(
      By.css('[data-testid="todo-list"]')
    );
    expect(todoListElement).toBeTruthy();

    const items = fixture.debugElement.queryAll(By.css('ul.todo-list li'));
    expect(items.length).toBe(2);
    expect(items[0].nativeElement.textContent.trim()).toContain('Test Todo 1');
    expect(items[1].nativeElement.textContent.trim()).toContain('Test Todo 2');
  });

  it('should not render the todo list when there are no todos', () => {
    component.todos = [];
    fixture.detectChanges();

    const todoListElement = fixture.debugElement.query(
      By.css('[data-testid="todo-list"]')
    );
    expect(todoListElement).toBeNull();
  });

  it('should toggle todo.completed state when toggle is clicked', () => {
    component.todos = [...mockTodos];
    fixture.detectChanges();

    const firstTodo = component.todos[0];
    const toggleCheckbox = fixture.debugElement.query(
      By.css('ul.todo-list li:first-child input.toggle')
    );

    toggleCheckbox.nativeElement.click();
    fixture.detectChanges();

    expect(firstTodo.completed).toBe(true);
  });

  it('should call toggleTodo and log when toggle is clicked', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    component.todos = [...mockTodos];
    fixture.detectChanges();

    const toggleCheckbox = fixture.debugElement.query(
      By.css('ul.todo-list li:first-child input.toggle')
    );

    toggleCheckbox.nativeElement.click();
    fixture.detectChanges();

    expect(consoleSpy).toHaveBeenCalledWith('Toggled todo:', mockTodos[0]);
    consoleSpy.mockRestore();
  });

  it('should call removeTodo and log when destroy button is clicked', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    component.todos = [...mockTodos];
    fixture.detectChanges();

    const destroyButton = fixture.debugElement.query(
      By.css('ul.todo-list li:first-child button.destroy')
    );

    destroyButton.nativeElement.click();
    fixture.detectChanges();

    expect(consoleSpy).toHaveBeenCalledWith('Removing todo:', mockTodos[0]);
    consoleSpy.mockRestore();
  });

  it('should remove the todo from the DOM when removeTodo is called', () => {
    component.todos = [...mockTodos];
    fixture.detectChanges();

    const destroyButton = fixture.debugElement.query(
      By.css('ul.todo-list li:first-child button.destroy')
    );

    destroyButton.nativeElement.click();
    fixture.detectChanges();

    const items = fixture.debugElement.queryAll(By.css('ul.todo-list li'));
    expect(items.length).toBe(1);
    expect(items[0].nativeElement.textContent.trim()).toContain('Test Todo 2');
  });
});