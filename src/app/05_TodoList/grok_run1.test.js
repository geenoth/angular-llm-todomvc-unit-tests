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

  it('should render todo items with correct title and completed status', () => {
    component.todos = [
      { id: '1', title: 'Test Todo 1', completed: false },
      { id: '2', title: 'Test Todo 2', completed: true }
    ];
    fixture.detectChanges();
    const todoItems = fixture.nativeElement.querySelectorAll('.todo-list li');
    expect(todoItems[0].querySelector('label').textContent).toBe('Test Todo 1');
    expect(todoItems[0].classList.contains('completed')).toBe(false);
    expect(todoItems[1].querySelector('label').textContent).toBe('Test Todo 2');
    expect(todoItems[1].classList.contains('completed')).toBe(true);
  });

  it('should toggle todo completion status on checkbox click', () => {
    const todo: Todo = { id: '1', title: 'Test Todo', completed: false };
    component.todos = [todo];
    fixture.detectChanges();
    const checkbox = fixture.nativeElement.querySelector('.toggle');
    checkbox.click();
    fixture.detectChanges();
    expect(todo.completed).toBe(true);
    expect(fixture.nativeElement.querySelector('li').classList.contains('completed')).toBe(true);
  });

  it('should call removeTodo method on destroy button click', () => {
    const todo: Todo = { id: '1', title: 'Test Todo', completed: false };
    component.todos = [todo];
    fixture.detectChanges();
    jest.spyOn(component, 'removeTodo');
    const destroyButton = fixture.nativeElement.querySelector('.destroy');
    destroyButton.click();
    expect(component.removeTodo).toHaveBeenCalledWith(todo);
  });

  it('should update UI when todos input changes', () => {
    component.todos = [{ id: '1', title: 'Initial Todo', completed: false }];
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('.todo-list li').length).toBe(1);

    component.todos = [
      { id: '2', title: 'Updated Todo 1', completed: false },
      { id: '3', title: 'Updated Todo 2', completed: true }
    ];
    fixture.detectChanges();
    const todoItems = fixture.nativeElement.querySelectorAll('.todo-list li');
    expect(todoItems.length).toBe(2);
    expect(todoItems[0].querySelector('label').textContent).toBe('Updated Todo 1');
    expect(todoItems[1].querySelector('label').textContent).toBe('Updated Todo 2');
  });
});