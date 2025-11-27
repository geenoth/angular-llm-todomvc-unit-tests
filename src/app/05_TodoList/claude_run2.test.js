import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoListComponent, Todo } from './todo-list.component';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoListComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should not render todo list when todos array is empty', () => {
    component.todos = [];
    fixture.detectChanges();
    const todoList = fixture.nativeElement.querySelector('[data-testid="todo-list"]');
    expect(todoList).toBeNull();
  });

  it('should render todo list when todos array has items', () => {
    component.todos = [
      { id: '1', title: 'Test Todo 1', completed: false },
      { id: '2', title: 'Test Todo 2', completed: true }
    ];
    fixture.detectChanges();
    const todoList = fixture.nativeElement.querySelector('[data-testid="todo-list"]');
    expect(todoList).not.toBeNull();
    const todoItems = fixture.nativeElement.querySelectorAll('.todo-list li');
    expect(todoItems.length).toBe(2);
  });

  it('should render todo items with correct title and completed class', () => {
    component.todos = [
      { id: '1', title: 'Test Todo 1', completed: false },
      { id: '2', title: 'Test Todo 2', completed: true }
    ];
    fixture.detectChanges();
    const todoItems = fixture.nativeElement.querySelectorAll('.todo-list li');
    expect(todoItems[0].textContent).toContain('Test Todo 1');
    expect(todoItems[0].classList).not.toContain('completed');
    expect(todoItems[1].textContent).toContain('Test Todo 2');
    expect(todoItems[1].classList).toContain('completed');
  });

  it('should toggle todo completion status on checkbox click', () => {
    const todo: Todo = { id: '1', title: 'Test Todo', completed: false };
    component.todos = [todo];
    fixture.detectChanges();
    const checkbox = fixture.nativeElement.querySelector('.toggle');
    checkbox.click();
    fixture.detectChanges();
    expect(todo.completed).toBe(true);
    checkbox.click();
    fixture.detectChanges();
    expect(todo.completed).toBe(false);
  });

  it('should call removeTodo method on destroy button click', () => {
    const todo: Todo = { id: '1', title: 'Test Todo', completed: false };
    component.todos = [todo];
    fixture.detectChanges();
    spyOn(component, 'removeTodo').and.callThrough();
    const destroyButton = fixture.nativeElement.querySelector('.destroy');
    destroyButton.click();
    expect(component.removeTodo).toHaveBeenCalledWith(todo);
  });

  it('should update rendering after toggling todo completion', () => {
    const todo: Todo = { id: '1', title: 'Test Todo', completed: false };
    component.todos = [todo];
    fixture.detectChanges();
    const checkbox = fixture.nativeElement.querySelector('.toggle');
    checkbox.click();
    fixture.detectChanges();
    const todoItem = fixture.nativeElement.querySelector('.todo-list li');
    expect(todoItem.classList).toContain('completed');
  });
});